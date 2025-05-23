import type {User} from './userSlice';

export const users: User[] = [
  {
    id: '0',
    name: 'Ebalanga',
    role: 'godmode',
    allowedProjects: [],
  },
  {
    id: '1',
    name: 'User',
    role: 'user',
    allowedProjects: [],
  },
  {
    id: '2',
    name: 'Editor',
    role: 'editor',
    allowedProjects: ['0001', '0002', '0005'],
  },
]