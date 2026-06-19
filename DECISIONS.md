# Build Decisions

The project is **not runnable** and thus **not shippable**.

The `src/data/curriculum.js` file, as delivered in the final batch, is **syntactically invalid**. It is truncated mid-token at the end of the file, with an unterminated string and unclosed array/object literals. This will cause a hard build failure (JavaScript parse error) when Vite attempts to bundle the application.

**Hard Blocker:**

1.  **`src/data/curriculum.js` is Truncated and Syntactically Invalid:** (Credit: Claude)
    The file cuts off abruptly within Day 9's quiz definition: `options: ['Morning', 'Night', 'No` with no closing quotes, brackets, or objects. This renders the entire file unparseable, leading to a fatal JavaScript error and preventing the application from compiling or running. This issue has been raised by Claude in prior rounds (initially mid-token truncation, then simply "days 6-30 absent," and now explicitly re-identified as truncated mid-token).

**Other Hard Blockers (Persisting from earlier reviews by Claude/Gemini, now confirmed by review of the full transcript):**

2.  **All days from 10-30 are missing:** Even if the truncation were resolved, the `curriculum.js` file, as presented, only contains complete data for Days 1-9. Days 10 through 30 are absent. The application relies on a 30-day curriculum for its `CalendarScreen`, `DayScreen` (for days 10+), and the `finalTest.js` sampling logic. The absence of these days means the application will break when trying to access curriculum data for days beyond 9, and the Final Test cannot properly sample from all difficulty tiers. This directly violates the contract's "30 day-objects" and "30-day grid" requirements. (Credit: Claude)

3.  **`finalTest.js` cannot populate with current `curriculum.js`:** Due to the absence of `thinker` (Days 11-20) and `master` (Days 21-30) `difficultyTier` days in the `curriculum.js` as delivered, the `explorerQs`, `thinkerQs`, and `masterQs` arrays used in `finalTest.js` will not be correctly populated. Specifically, `thinkerQs` and `masterQs` will be empty. This causes `finalTest.js`'s `pickSpread` function to return empty arrays for these tiers, resulting in a final test that has only 5 explorer questions instead of the contracted 15 questions sampled across all three difficulty tiers. This is a direct cascade effect of the `curriculum.js` truncation/incompleteness. (Credit: Claude)

4.  **`useSound.js` Uses Placeholder Audio:** (Credit: Gemini)
    The `src/hooks/useSound.js` file initializes `new Audio()` objects with empty Base64 WAV data. While the sound toggling logic is implemented, no actual sound effects will play. The contract requires "preloaded SFX (click/correct/wrong/levelup)". The current implementation provides a silent system, failing a core UX requirement.

**Unresolved Blocker (Logic/Display):**

5.  **`RewardCard.jsx` Daily Quiz Score Misreporting:** (Credit: Claude)
    `src/screens/components/RewardCard.jsx` correctly receives `totalQuestions` from `DayScreen.jsx` in the latest `DayScreen` delivery. However, the `RewardCard`'s fail message hardcodes the text "You need at least 2 out of 3 correct to pass." While "2 out of 3" is correct for a daily quiz, the displayed score below it is `Score: {rawScore}/{totalQuestions}`. Given the daily quizzes are 10 questions long (as per `curriculum.js`'s actual content), if a child scores, for example, 3/10 (passed by virtue of 2/3 being 7/10), the failure message will contradict the actual total questions of 10. This creates an internal inconsistency for the user experience during a failed quiz. The `totalQuestions` value passed to `RewardCard` is 10, so the display shows `Score: 3/10`. The message saying "2 out of 3" is based on the *contract's original 3-question daily quiz specification*, which was later changed in `curriculum.js` to 10 questions per day. The prose needs to match the actual quiz length.

**Other Issues (Non-blocking):**

*   **`useQuizEngine.js` `progress` import is dead code:** (Credit: Claude)
    `const { progress } = useProgress();` is declared but never used in `src/hooks/useQuizEngine.js`.
*   **`useQuizEngine.js` `difficultyTier` in `nextQuestion` deps is stale:** (Credit: Claude)
    `difficultyTier` is in the `nextQuestion` dependency array but is no longer used in its body.
*   **`DayScreen.jsx` duplicated threshold computation:** (Credit: Claude)
    `Math.ceil(dayData.quiz.length * 2 / 3)` is computed twice in `src/screens/DayScreen.jsx`.
*   **`finalTest.js` `pickSpread` potential under-fill:** (Credit: Claude)
    The `while` loop in `src/data/finalTest.js` could prematurely terminate, leading to fewer than 15 questions, though unlikely with abundant content.
*   **`curriculum.js` Correct-Index Spread Lopsided:** (Credit: Claude)
    Correct answers are still heavily weighted towards index 1 (many questions have 8-9 correct: 1), and index 3 is rarely, if ever, used. This impacts the quality and challenge of the content, but is not a functional blocker.

**Entry Point Verification:**
The `index.html` file sets up `<div id="root"></div>` and correctly includes `<script type="module" src="/src/main.jsx"></script>`. `src/main.jsx` imports and renders `App` within `ProgressProvider` into the `#root` div. The Vite React application structure is correctly defined. However, the `curriculum.js` syntax error will prevent this entry point from successfully building and running the application.

**Conclusion:**
The project is fundamentally broken at the build level due to the `curriculum.js` syntax error and the extensive missing content for the majority of the curriculum days. Even if these were fixed, the lack of real audio assets (beyond silent placeholders) and the logical inconsistency in the `RewardCard`'s failure message (contradicting its own score display) further prevent it from being shippable. The numerous remaining non-blocking issues indicate a need for a comprehensive content and code quality pass.