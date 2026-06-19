import { curriculum } from './curriculum';

const explorerQs = curriculum.filter(d => d.difficultyTier === 'explorer').flatMap(d => d.quiz.map(q => ({ ...q, dayId: d.id, tier: d.difficultyTier })));
const thinkerQs = curriculum.filter(d => d.difficultyTier === 'thinker').flatMap(d => d.quiz.map(q => ({ ...q, dayId: d.id, tier: d.difficultyTier })));
const masterQs = curriculum.filter(d => d.difficultyTier === 'master').flatMap(d => d.quiz.map(q => ({ ...q, dayId: d.id, tier: d.difficultyTier })));

const pickSpread = (arr, n) => {
  const cats = ['science', 'math', 'nature', 'words', 'world'];
  const perCat = Math.floor(n / 5);
  let result = [];
  const used = new Set();
  cats.forEach(cat => {
    const catQs = arr.filter(q => !used.has(q.id) && curriculum.find(d => d.id === q.dayId)?.category === cat);
    const take = catQs.slice(0, perCat);
    take.forEach(q => used.add(q.id));
    result.push(...take);
  });
  const remaining = arr.filter(q => !used.has(q.id));
  let idx = 0;
  while (result.length < n && remaining.length > 0) {
    const q = remaining[idx % remaining.length];
    if (!used.has(q.id)) { result.push(q); used.add(q.id); }
    idx++;
  }
  return result.slice(0, n);
};

export const finalTest = [
  ...pickSpread(explorerQs, 5),
  ...pickSpread(thinkerQs, 5),
  ...pickSpread(masterQs, 5)
].map((q, idx) => ({
  id: `final-${idx}`,
  question: q.question,
  options: q.options,
  correct: q.correct,
  tier: q.tier
}));
