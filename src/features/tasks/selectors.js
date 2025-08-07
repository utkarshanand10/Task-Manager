import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state) => state.tasks.items;
export const selectTaskStatus = (state) => state.tasks.status;

export const selectTasksByDate = createSelector(
  [selectTasks, (_, date) => date],
  (tasks, date) => tasks.filter((task) => task.date === date)
);

export const selectTaskCountsByCategory = createSelector(
  [selectTasks],
  (tasks) => {
    return tasks.reduce(
      (counts, task) => {
        counts[task.category] = (counts[task.category] || 0) + 1;
        return counts;
      },
      { success: 0, warning: 0, issue: 0, info: 0 }
    );
  }
);

export const selectTaskDates = createSelector([selectTasks], (tasks) => {
  const dates = new Set();
  tasks.forEach((task) => dates.add(task.date));
  return Array.from(dates).sort();
});

export const selectTasksByCategory = createSelector(
  [selectTasks, (_, category) => category],
  (tasks, category) => tasks.filter((task) => task.category === category)
);

export const selectRecentTasks = createSelector([selectTasks], (tasks) =>
  [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
);
