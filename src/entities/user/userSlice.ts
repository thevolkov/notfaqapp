import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {users} from './users';

export type Role = 'user' | 'editor' | 'godmode';

export interface User {
  id: string;
  name: string;
  role: Role;
  allowedProjects: string[];
  // achievement: Badges;
}

interface UserState {
  currentUser: User | null;
  users: User[];
}

const initialState: UserState = {
  currentUser: users[0],
  users: users,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<string>) {
      state.currentUser = state.users.find((user) => user.id === action.payload) || null;
    },
    updateUser(state, action: PayloadAction<{id: string; role: Role; allowedProjects: string[]}>) {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          role: action.payload.role,
          allowedProjects: action.payload.role === 'editor' ? action.payload.allowedProjects : [],
        };
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = state.users[userIndex];
        }
      }
    },
  },
});

export const {setCurrentUser, updateUser} = userSlice.actions;
export default userSlice.reducer;
