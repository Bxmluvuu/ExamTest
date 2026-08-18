import { spawn } from 'child_process';
import path from 'path';

console.log('========================================================================');
console.log('  ExamPlatform — Comprehensive Database Seeding');
console.log('========================================================================');

const child = spawn('node', ['--env-file=.env.local', 'scripts/seed-internetworking.mjs'], {
  stdio: 'inherit',
  cwd: process.cwd(),
});

child.on('exit', code => {
  if (code === 0) {
    console.log('\n✓ All subjects and question banks seeded successfully into Supabase!');
  } else {
    console.error(`\n✗ Seeding exited with code ${code}`);
    process.exit(code || 1);
  }
});
