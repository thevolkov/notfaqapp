import type {User} from './userSlice';

export const constants: User[] = [
  {
    id: '000000000',
    name: 'Ebalanga',
    userName: '@ebalanga',
    avatar: 'imgs/users/Peralta.jpg',
    role: 'godmode',
    achievements: ['not-platinum', 'dogs-gold-bone'],
    isPremium: true,
  },
  {
    id: '000000001',
    name: 'Chewbacca',
    userName: '@chew123',
    avatar: 'imgs/users/masson.jpg',
    role: 'user',
    achievements: ['dogs-silver-bone', 'golden-px'],
    isPremium: true,
  },
  {
    id: '-1',
    name: 'voucher',
    userName: '@voucher',
    avatar: 'imgs/projects/voucher.jpg',
    role: 'voucher',
    achievements: [],
    allowedProjects: [],
    isPremium: false,
  },
];
