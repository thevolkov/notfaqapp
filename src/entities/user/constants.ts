import type {User} from './userSlice';

export const constants: User[] = [
  {
    id: '000000000',
    name: 'Ebalanga',
    userName: '@ebalanga',
    avatar: 'imgs/users/what.jpg',
    role: 'godmode',
    achievements: ['not-platinum'],
    isPremium: true,
  },
  {
    id: '000000001',
    name: 'Chewbacca',
    userName: '@chew123',
    avatar: 'imgs/users/masson.jpg',
    role: 'user',
    achievements: ['dogs-silver-bone'],
    isPremium: false,
  },
  {
    id: '000000002',
    name: 'Chi-Pick',
    userName: '',
    avatar: 'imgs/users/robert.jpg',
    role: 'editor',
    achievements: ['dogs-gold-bone', 'golden-px'],
    allowedProjects: ['0001', '0002', '0005'],
    isPremium: true,
  },
  {
    id: '000000003',
    name: 'Sub Zero',
    userName: '@sv_cheater',
    avatar: '',
    role: 'editor',
    achievements: [],
    allowedProjects: ['0006', '0007', '0008'],
    isPremium: true,
  },
];
