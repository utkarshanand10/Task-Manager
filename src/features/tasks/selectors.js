import { createSelector } from "@reduxjs/toolkit";

// Base selector to access task items array
export const selectTasks = (state) => state.tasks.items || [];

// Filter tasks by selected date
export const selectTasksByDate = createSelector(
  [selectTasks, (_, date) => date],
  (tasks, date) => tasks.filter((task) => task.date === date)
);

// Count tasks per category (memoized)
export const selectTaskCountsByCategory = createSelector(
  [selectTasks],
  (tasks) => {
    const counts = {
      success: 0,
      warning: 0,
      issue: 0,
      info: 0,
    };

    tasks.forEach((task) => {
      if (counts.hasOwnProperty(task.category)) {
        counts[task.category]++;
      }
    });

    return counts;
  }
);
