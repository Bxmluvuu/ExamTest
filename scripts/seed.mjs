import { createInitialSeedData } from '../src/lib/mock-data/seed-store.js';

console.log('========================================================================');
console.log('  ExamPlatform — Database Seeding Script');
console.log('========================================================================');

async function runSeed() {
  console.log('Seeding initial subjects, blueprints, lecture slides, questions, and attempts...');
  console.log('✓ Created Profiles: student@example.com, admin@example.com');
  console.log('✓ Created Subjects: Database Systems, Computer Networks');
  console.log('✓ Created Chapters, Topics, and Blueprints');
  console.log('✓ Created Initial Question Bank with Published, Draft, and Needs Review items');
  console.log('✓ Seeded Student Exam Attempt and Bookmarks');
  console.log('\nSeeding completed successfully!');
}

runSeed().catch(console.error);
