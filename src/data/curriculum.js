// 30 days with 10 questions each, progressive difficulty, interactive learn phase
export const curriculum = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const tier = day <= 10 ? 'explorer' : day <= 20 ? 'thinker' : 'master';
  const catKeys = ['science','math','nature','words','world'];
  const category = catKeys[i % 5];
  
  return {
    id: day,
    category,
    difficultyTier: tier,
    lesson: `Day ${day} Lesson: ${category.toUpperCase()} concept ${day}`,
    interactive: { type: day % 6 === 0 ? 'numberline' : ['tapmatch','sortbuckets','buildsequence','reveal','wordbuild'][i % 5], target: `Interactive target for day ${day}` },
    quiz: Array.from({ length: 10 }, (_, q) => ({
      id: `${day}-${q}`,
      question: `Harder question ${q+1} for day ${day} in ${category}?`,
      options: ['Correct answer', 'Plausible distractor 1', 'Plausible distractor 2', tier === 'master' ? 'Near-miss distractor' : null].filter(Boolean),
      correct: 0
    }))
  };
});
