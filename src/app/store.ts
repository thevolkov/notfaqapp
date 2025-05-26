import {configureStore} from '@reduxjs/toolkit';
import projectsReducer, {
  addProject,
  updateProject,
  deleteProject,
} from '../entities/project/projectSlice';
import userReducer, {setCurrentUser, updateUser} from '../entities/user/userSlice';
import themeReducer, {setTheme, toggleTheme} from '../entities/theme/themeSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    user: userReducer,
    theme: themeReducer,
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
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
