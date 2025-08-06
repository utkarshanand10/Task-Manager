import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filters: { category: "" },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: nanoid(), ...action.payload });
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = { category: "" };
    },
  },
});

export const { addTask, editTask, deleteTask, setFilters, resetFilters } =
  taskSlice.actions;
export default taskSlice.reducer;
