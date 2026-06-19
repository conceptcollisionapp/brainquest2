# Build Decisions

The project is **not runnable** and thus **not shippable**.

**Hard Blocker: Styling is Missing (Found by Claude and Grok)**
The application uses numerous Tailwind CSS utility classes (e.g., `flex`, `bg-white`, `rounded-3xl`, `shadow-xl`, `text-center`, `max-w-xl`, `mx-auto`, `text-6xl`, `mb-4`, etc.) in almost every component. However, the `package.json` file does not include Tailwind CSS as a dependency, nor is there a `tailwind.config.js` or any `@tailwind` directives in `src/styles/global.css`. Without Tailwind CSS being properly configured and built, all these utility classes are inert. The application will render with default browser styling, making the UI largely unformatted, difficult to use, and failing the "Kid UX" and responsiveness requirements of the contract. This is a critical build configuration error, first flagged by Claude, then incorrectly retracted by Claude, then re-identified by Gemini, then again incorrectly retracted by Claude, but is evident by inspecting literally any JSX file that has a `className` prop and comparing it to the CSS files. For instance, `src/components/Layout.jsx` uses `className="min-h-screen bg-[var(--color-bg)]"`, and `min-h-screen` is a Tailwind class, not a custom one. This problem persists across the entire codebase.

**Hard Blocker: Placeholder Audio (Found by Gemini)**
The `src/hooks/useSound.js` file initializes `new Audio()` objects with empty Base64 WAV data (`'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='`). While this prevents runtime errors, it means no actual sound effects will ever play. The contract explicitly lists "preloaded SFX (click/correct/wrong/levelup)" as a requirement for `useSound.js` and "Sound: off by default (autoplay-safe), toggle persisted, all SFX gated on `settings.sound`." While the gating logic is in place, the complete absence of actual sound content means the "Sound" feature is fundamentally broken.

**Unresolved Blocker: `useQuizEngine.js` `progress` import is dead code (Found by Claude)**
In `src/hooks/useQuizEngine.js`, `const { progress } = useProgress();` is declared, but the `progress` variable is never used within the hook. This is dead code and should be removed for cleanliness.

**Unresolved Blocker: `useQuizEngine.js` `difficultyTier` in `nextQuestion` deps is stale (Found by Claude)**
The `nextQuestion` `useCallback` hook in `src/hooks/useQuizEngine.js` lists `difficultyTier` in its dependency array (`[currentQ, questions.length, score]`). However, the `difficultyTier` variable is no longer directly used within the `nextQuestion` function's body (as the star thresholds now use `len` directly instead of `difficultyTier`-specific lookups). This is a minor, harmless stale dependency, but it's unnecessary noise.

**Unresolved Blocker: `DayScreen.jsx` duplicated threshold computation (Found by Claude)**
In `src/screens/DayScreen.jsx`, the expression `Math.ceil(dayData.quiz.length * 2 / 3)` is computed twice: once for `const passed` and again directly in the `RewardCard`'s `passed` prop. While it doesn't cause a bug due to `dayData` being stable, it's inefficient and prone to drift if only one instance is updated in the future. It should be extracted to a single variable.

**Unresolved Blocker: `finalTest.js` `pickSpread` potential under-fill (Found by Claude)**
The `while` loop in `src/data/finalTest.js`'s `pickSpread` function, despite the `addedThisCycle` and `idx` guards, can still prematurely terminate if `addedThisCycle` becomes `false` due to an iteration landing on an already-used index while `result.length < n` is still true and unused items exist later in the `remaining` array. This would lead to the `finalTest` array being shorter than `n` (25 questions) even if enough questions are available. While currently benign due to abundant data, it's a robustness issue.

---

**Entry Point Verification:**
The `index.html` file correctly sets up a root HTML structure with preloaded fonts and a `<div id="root"></div>`. It includes `<script type="module" src="/src/main.jsx"></script>` to load the React application. `src/main.jsx` correctly imports `React`, `ReactDOM`, `App`, `ProgressProvider`, and the global styles, rendering `App` wrapped in `ProgressProvider` into the `#root` div. The structure is correct for a Vite React application.

**Conclusion:**
Despite multiple rounds of fixes, the project remains non-shippable due to the fundamental lack of CSS styling (Tailwind not integrated) and the complete absence of sound effects. These are core functional and aesthetic requirements that are completely unmet. Several minor code quality issues also remain, but they are overshadowed by the critical build configuration and missing asset problems.