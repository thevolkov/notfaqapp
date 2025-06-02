import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import projectsReducer, {
  addProject,
  updateProject,
  deleteProject,
} from '../entities/project/projectSlice';
import userReducer, { setCurrentUser, updateUser } from '../entities/user/userSlice';
import themeReducer, { setTheme, toggleTheme } from '../entities/theme/themeSlice';
import consoleReducer, { setInput, addLog, clearLogs, executeCommand } from '../entities/console/consoleSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    user: userReducer,
    theme: themeReducer,
    console: consoleReducer,
  },
});

export {
  addProject,
  updateProject,
  deleteProject,
  setCurrentUser,
  updateUser,
  setTheme,
  toggleTheme,
  setInput,
  addLog,
  clearLogs,
  executeCommand,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
