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
    word_bank?: string[];
    blanks?: any[];
    matching_pairs?: any[];
    shuffled_matching_rights?: Array<{ id: string; right: string }>;
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
 * Selects questions according to Blueprint, mode, filters, and comprehensive fallback rules
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

  // 1. Available pool: published questions or all available
  let availablePool = allQuestions.filter(q => q.status === 'published');
  if (availablePool.length === 0) {
    availablePool = [...allQuestions];
  }

  if (availablePool.length === 0) {
    return [];
  }

  const selectedSet = new Set<string>();
  const chosenQuestions: Question[] = [];

  const addQuestion = (q: Question) => {
    if (chosenQuestions.length < targetCount && !selectedSet.has(q.id)) {
      selectedSet.add(q.id);
      chosenQuestions.push(q);
      return true;
    }
    return false;
  };

  const recentSet = new Set(recentQuestionIds);

  // Filter based on Exam Mode
  if (mode === 'mistakes') {
    // Priority: mistake question pool
    const mistakeSet = new Set(mistakeQuestionIds);
    const mistakesPool = availablePool.filter(q => mistakeSet.has(q.id));
    
    // Pick mistakes first
    for (const q of shuffleArray(mistakesPool)) {
      addQuestion(q);
    }
    // Fill the rest with general pool if not enough mistakes recorded yet
    for (const q of shuffleArray(availablePool)) {
      addQuestion(q);
    }
  } else if (mode === 'chapter') {
    let chapterPool = availablePool;
    if (selectedChapterId) {
      chapterPool = chapterPool.filter(q => q.chapter_id === selectedChapterId);
    }
    if (selectedTopicIds && selectedTopicIds.length > 0) {
      const topicSet = new Set(selectedTopicIds);
      chapterPool = chapterPool.filter(q => q.topic_id && topicSet.has(q.topic_id));
    }

    if (chapterPool.length === 0) {
      chapterPool = availablePool; // Fallback to all if chapter filter was empty
    }

    // Difficulty preference
    if (selectedDifficulty) {
      const matchingDiff = chapterPool.filter(q => q.difficulty === selectedDifficulty);
      const nonRecent = matchingDiff.filter(q => !recentSet.has(q.id));
      for (const q of shuffleArray(nonRecent.length > 0 ? nonRecent : matchingDiff)) {
        addQuestion(q);
      }
    }

    // Fill remaining within chapter pool avoiding recent if possible
    const nonRecentChapter = chapterPool.filter(q => !recentSet.has(q.id));
    for (const q of shuffleArray(nonRecentChapter)) {
      addQuestion(q);
    }
    for (const q of shuffleArray(chapterPool)) {
      addQuestion(q);
    }

    // If still need more questions and specific chapter was too small, fill from rest of subject
    if (chosenQuestions.length < targetCount) {
      for (const q of shuffleArray(availablePool)) {
        addQuestion(q);
      }
    }
  } else if (mode === 'weakness') {
    // Upweight topics with weakness
    const weakSet = new Set(weakTopicNames.map(t => t.toLowerCase()));
    const weakPool = availablePool.filter(q => q.topic_title && weakSet.has(q.topic_title.toLowerCase()));
    
    // Pick from weak pool
    for (const q of shuffleArray(weakPool)) {
      addQuestion(q);
    }

    // Fill the rest from general pool
    for (const q of shuffleArray(availablePool)) {
      addQuestion(q);
    }
  } else {
    // Mode: 'exam' (Blueprint Mode)
    if (blueprint && blueprint.topic_distribution && blueprint.topic_distribution.length > 0) {
      const quotas = calculateBlueprintQuota(
        targetCount,
        blueprint.topic_distribution,
        blueprint.difficulty_distribution || { easy: 0.25, medium: 0.55, hard: 0.20 }
      );

      // Attempt quota match
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
          addQuestion(shuffled[i]);
        }
      }
    }

    // Fallback: If still under targetCount, fill with remaining non-recent questions
    const remainingNonRecent = availablePool.filter(q => !selectedSet.has(q.id) && !recentSet.has(q.id));
    for (const q of shuffleArray(remainingNonRecent)) {
      addQuestion(q);
    }

    // Ultimate fallback: Any remaining published question across all chapters
    const remainingAny = availablePool.filter(q => !selectedSet.has(q.id));
    for (const q of shuffleArray(remainingAny)) {
      addQuestion(q);
    }
  }

  // Safety net: If no questions were selected, pick whatever is available
  if (chosenQuestions.length === 0 && availablePool.length > 0) {
    for (const q of shuffleArray(availablePool)) {
      addQuestion(q);
    }
  }

  // Map to immutable snapshots with randomized choice order / bank order
  return chosenQuestions.map(q => {
    const qType = q.question_type || 'single_choice';

    if (qType === 'fill_in_the_blank') {
      return {
        question: q,
        shuffledChoices: [],
        snapshot: {
          text: q.question_text,
          difficulty: q.difficulty || 'medium',
          chapter_title: q.chapter_title || 'General',
          topic_title: q.topic_title || 'General',
          question_type: 'fill_in_the_blank',
          word_bank: shuffleArray(q.word_bank || []),
          blanks: q.blanks || [],
        },
      };
    }

    if (qType === 'matching') {
      const pairs = q.matching_pairs || [];
      const rights = pairs.map(p => ({ id: p.id, right: p.right }));
      return {
        question: q,
        shuffledChoices: [],
        snapshot: {
          text: q.question_text,
          difficulty: q.difficulty || 'medium',
          chapter_title: q.chapter_title || 'General',
          topic_title: q.topic_title || 'General',
          question_type: 'matching',
          matching_pairs: pairs,
          shuffled_matching_rights: shuffleArray(rights),
        },
      };
    }

    const rawChoices = q.choices && q.choices.length > 0 ? q.choices : [
      { choice_key: 'A' as const, choice_text: 'ตัวเลือก A' },
      { choice_key: 'B' as const, choice_text: 'ตัวเลือก B' },
      { choice_key: 'C' as const, choice_text: 'ตัวเลือก C' },
      { choice_key: 'D' as const, choice_text: 'ตัวเลือก D' },
    ];

    // Maintain stable keys or shuffle
    const choices = rawChoices.map((c, index) => {
      const displayKey = (c.choice_key || c.key || ['A', 'B', 'C', 'D'][index] || 'A') as 'A' | 'B' | 'C' | 'D';
      return {
        key: displayKey,
        text: c.choice_text || c.text || '',
      };
    });

    return {
      question: q,
      shuffledChoices: choices,
      snapshot: {
        text: q.question_text,
        difficulty: q.difficulty || 'medium',
        chapter_title: q.chapter_title || 'General',
        topic_title: q.topic_title || 'General',
        question_type: qType,
      },
    };
  });
}
