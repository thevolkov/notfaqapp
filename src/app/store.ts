import { configureStore } from '@reduxjs/toolkit';
import projectsReducer, {
  addProject,
  updateProject,
  deleteProject
} from '../entities/project/projectSlice';
import userReducer, {
  setCurrentUser,
  updateUser
} from '../entities/user/userSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    user: userReducer,
  },
});

export { addProject, updateProject, deleteProject, setCurrentUser, updateUser };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
