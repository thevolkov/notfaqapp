import type {User} from './userSlice';

export const constants: User[] = [
  {
    id: '0',
    name: 'Ebalanga',
    avatar: '/imgs/users/what.jpg',
    role: 'godmode',
    achievements: [],
    isPremium: true,
  },
  {
    id: '1',
    name: 'User',
    avatar: '/imgs/users/masson.jpg',
    role: 'user',
    achievements: [],
    isPremium: false,
  },
  {
    id: '2',
    name: 'Editor',
    avatar: '/imgs/users/robert.jpg',
    role: 'editor',
    achievements: [],
    allowedProjects: ['0001', '0002', '0005'],
    isPremium: false,
  },
  {
    id: '3',
    name: 'Editor-2',
    avatar: '/imgs/users/notElon.jpg',
    role: 'editor',
    achievements: [],
    allowedProjects: ['0006', '0007', '0008'],
    isPremium: true,
  },
];
