import type { Question, ExamBlueprint, QuestionDifficulty, AttemptQuestion, ExamMode } from './types/database';

export interface BlueprintSelectionParams {
  blueprint?: ExamBlueprint;
  allQuestions: Question[];
  mode: ExamMode;
  targetCount: number;
  selectedChapterId?: string;
  selectedTopicIds?: string[];
  selectedDifficulty?: QuestionDifficulty;
  recentQuestionIds?: string[];
  mistakeQuestionIds?: string[];
  weakTopicNames?: string[];
}

export interface SelectedQuestionItem {
  question: Question;
  shuffledChoices: Array<{ key: string; text: string }>;
  snapshot: {
    text: string;
    difficulty: QuestionDifficulty;
    chapter_title: string;
    topic_title: string;
    question_type: Question['question_type'];
  };
}

/**
 * Fisher-Yates array shuffle helper
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Computes exact quota allocation for Blueprint
 */
export function calculateBlueprintQuota(
  totalCount: number,
  topicDistribution: Array<{ topic: string; weight: number }>,
  difficultyDistribution: { easy: number; medium: number; hard: number }
): Array<{ topic: string; difficulty: QuestionDifficulty; count: number }> {
  const quotas: Array<{ topic: string; difficulty: QuestionDifficulty; count: number }> = [];

  // Normalize weights if needed
  const totalTopicWeight = topicDistribution.reduce((acc, t) => acc + t.weight, 0) || 1;
  const totalDiffWeight = (difficultyDistribution.easy + difficultyDistribution.medium + difficultyDistribution.hard) || 1;

  let allocated = 0;
  const diffKeys: QuestionDifficulty[] = ['easy', 'medium', 'hard'];

  for (const topicItem of topicDistribution) {
    const topicShare = (topicItem.weight / totalTopicWeight) * totalCount;
    for (const diff of diffKeys) {
      const diffWeight = difficultyDistribution[diff] / totalDiffWeight;
      const count = Math.round(topicShare * diffWeight);
      if (count > 0) {
        quotas.push({ topic: topicItem.topic, difficulty: diff, count });
        allocated += count;
      }
    }
  }

  // Adjust difference to match exact totalCount
  let diff = totalCount - allocated;
  if (quotas.length > 0 && diff !== 0) {
    // Distribute remainder to first/largest quota items
    quotas[0].count = Math.max(1, quotas[0].count + diff);
  }

  return quotas;
}

/**
 * Selects questions according to Blueprint, mode, filters, and fallback rules
 */
export function selectQuestionsForAttempt(params: BlueprintSelectionParams): SelectedQuestionItem[] {
  const {
    blueprint,
    allQuestions,
    mode,
    targetCount,
    selectedChapterId,
    selectedTopicIds,
    selectedDifficulty,
    recentQuestionIds = [],
    mistakeQuestionIds = [],
    weakTopicNames = [],
  } = params;

  // 1. Filter only published questions with choices
  let availablePool = allQuestions.filter(q => q.status === 'published' && q.choices && q.choices.length > 0);

  if (availablePool.length === 0) {
    return [];
  }

  const selectedSet = new Set<string>();
  const chosenQuestions: Question[] = [];

  // Filter based on Exam Mode
  if (mode === 'mistakes') {
    // Priority: mistake question pool
    const mistakeSet = new Set(mistakeQuestionIds);
    const mistakesPool = availablePool.filter(q => mistakeSet.has(q.id));
    const pool = mistakesPool.length > 0 ? mistakesPool : availablePool;
    for (const q of shuffleArray(pool)) {
      if (chosenQuestions.length >= targetCount) break;
      if (!selectedSet.has(q.id)) {
        selectedSet.add(q.id);
        chosenQuestions.push(q);
      }
    }
  } else if (mode === 'chapter') {
    let filtered = availablePool;
    if (selectedChapterId) {
      filtered = filtered.filter(q => q.chapter_id === selectedChapterId);
    }
    if (selectedTopicIds && selectedTopicIds.length > 0) {
      const topicSet = new Set(selectedTopicIds);
      filtered = filtered.filter(q => q.topic_id && topicSet.has(q.topic_id));
    }
    if (selectedDifficulty) {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // Pick questions from filtered pool, avoiding recent ones if possible
    const recentSet = new Set(recentQuestionIds);
    const nonRecent = filtered.filter(q => !recentSet.has(q.id));
    const poolToUse = nonRecent.length >= targetCount ? nonRecent : filtered;

    for (const q of shuffleArray(poolToUse)) {
      if (chosenQuestions.length >= targetCount) break;
      if (!selectedSet.has(q.id)) {
        selectedSet.add(q.id);
        chosenQuestions.push(q);
      }
    }
  } else if (mode === 'weakness') {
    // Upweight topics with weakness
    const weakSet = new Set(weakTopicNames.map(t => t.toLowerCase()));
    const weakPool = availablePool.filter(q => q.topic_title && weakSet.has(q.topic_title.toLowerCase()));
    
    // Pick 70% from weak pool, 30% from general pool
    const weakTarget = Math.min(Math.ceil(targetCount * 0.7), weakPool.length);
    for (const q of shuffleArray(weakPool)) {
      if (chosenQuestions.length >= weakTarget) break;
      if (!selectedSet.has(q.id)) {
        selectedSet.add(q.id);
        chosenQuestions.push(q);
      }
    }

    // Fill the rest from general pool
    for (const q of shuffleArray(availablePool)) {
      if (chosenQuestions.length >= targetCount) break;
      if (!selectedSet.has(q.id)) {
        selectedSet.add(q.id);
        chosenQuestions.push(q);
      }
    }
  } else {
    // Mode: 'exam' (Blueprint Mode)
    const recentSet = new Set(recentQuestionIds);

    if (blueprint && blueprint.topic_distribution && blueprint.topic_distribution.length > 0) {
      const quotas = calculateBlueprintQuota(
        targetCount,
        blueprint.topic_distribution,
        blueprint.difficulty_distribution || { easy: 0.2, medium: 0.6, hard: 0.2 }
      );

      // Attempt exact quota match
      for (const quota of quotas) {
        let matching = availablePool.filter(q => 
          q.topic_title?.toLowerCase() === quota.topic.toLowerCase() &&
          q.difficulty === quota.difficulty &&
          !selectedSet.has(q.id) &&
          !recentSet.has(q.id)
        );

        // Fallback 1: Allow recent questions from same (topic, difficulty)
        if (matching.length < quota.count) {
          matching = availablePool.filter(q => 
            q.topic_title?.toLowerCase() === quota.topic.toLowerCase() &&
            q.difficulty === quota.difficulty &&
            !selectedSet.has(q.id)
          );
        }

        // Fallback 2: Allow any difficulty from same topic
        if (matching.length < quota.count) {
          matching = availablePool.filter(q => 
            q.topic_title?.toLowerCase() === quota.topic.toLowerCase() &&
            !selectedSet.has(q.id)
          );
        }

        const shuffled = shuffleArray(matching);
        for (let i = 0; i < Math.min(quota.count, shuffled.length); i++) {
          if (chosenQuestions.length >= targetCount) break;
          selectedSet.add(shuffled[i].id);
          chosenQuestions.push(shuffled[i]);
        }
      }
    }

    // Fallback: If still under targetCount, fill with remaining unselected questions
    if (chosenQuestions.length < targetCount) {
      const remainingNonRecent = availablePool.filter(q => !selectedSet.has(q.id) && !recentSet.has(q.id));
      for (const q of shuffleArray(remainingNonRecent)) {
        if (chosenQuestions.length >= targetCount) break;
        selectedSet.add(q.id);
        chosenQuestions.push(q);
      }
    }

    // Ultimate fallback: Any remaining published question
    if (chosenQuestions.length < targetCount) {
      const remainingAny = availablePool.filter(q => !selectedSet.has(q.id));
      for (const q of shuffleArray(remainingAny)) {
        if (chosenQuestions.length >= targetCount) break;
        selectedSet.add(q.id);
        chosenQuestions.push(q);
      }
    }
  }

  // Map to immutable snapshots with randomized choice order
  return chosenQuestions.map(q => {
    const rawChoices = q.choices || [];
    // Shuffle choices while maintaining standard display keys A, B, C, D
    const shuffledChoices = shuffleArray(rawChoices).map((c, index) => {
      const displayKey = (['A', 'B', 'C', 'D'][index] || 'A') as 'A' | 'B' | 'C' | 'D';
      return {
        key: displayKey,
        text: c.choice_text || c.text || '',
        originalKey: (c.choice_key || c.key || displayKey) as 'A' | 'B' | 'C' | 'D',
      };
    });

    return {
      question: q,
      shuffledChoices: shuffledChoices.map(c => ({ key: c.key, text: c.text })),
      snapshot: {
        text: q.question_text,
        difficulty: q.difficulty,
        chapter_title: q.chapter_title || 'General',
        topic_title: q.topic_title || 'General',
        question_type: q.question_type,
      },
    };
  });
}
