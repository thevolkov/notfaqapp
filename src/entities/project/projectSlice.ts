import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {faqsData} from './faqs';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export type LinkKey = 'telegram' | 'community' | 'x' | 'web' | 'support';
export type Links = Record<LinkKey, string>;

export interface Project {
  id: string;
  title: string;
  image: string;
  desc: string;
  links: Links;
  faq: FAQ[];
}

interface ProjectsState {
  projects: Project[];
}

const loadFromLocalStorage = (): Project[] => {
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : [
    {
      id: '0001',
      title: 'Notcoin',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/notcoin.jpg',
      links: {
        telegram: 'https://t.me',
        community: 'https://t.me',
        x: 'https://x.com',
        web: 'https://ton.org',
        support: 'https://t.me/supp',
      },
      faq: faqsData,
    },
    {
      id: '0002',
      title: 'Dogs',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/dogs.jpg',
      links: {
        telegram: 'https://t.me',
        community: 'https://t.me',
        x: 'https://x.com',
        web: 'https://ton.org',
        support: 'https://t.me/supp',
      },
      faq: faqsData,
    },
    {
      id: '0003',
      title: 'Community',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/community.jpg',
      links: {
        telegram: 'https://t.me',
        community: 'https://t.me',
        x: 'https://x.com',
        web: 'https://ton.org',
        support: 'https://t.me/supp',
      },
      faq: faqsData,
    },
    {
      id: '0004',
      title: 'Not Pixel',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/not-pixel.jpg',
      links: {
        telegram: 'https://t.me',
        community: 'https://t.me',
        x: 'https://x.com',
        web: 'https://ton.org',
        support: 'https://t.me/supp',
      },
      faq: faqsData,
    },
    {
      id: '0005',
      title: 'Sticker Pack',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/sticker-pack.jpg',
      links: {
        telegram: 'https://t.me',
        community: 'https://t.me',
        x: '',
        web: 'https://ton.org',
        support: '',
      },
      faq: faqsData,
    },
    {
      id: '0006',
      title: 'Earn',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/earn.jpg',
      links: {
        telegram: 'https://t.me',
        community: 'https://t.me',
        x: '',
        web: 'https://ton.org',
        support: '',
      },
      faq: faqsData,
    },
    {
      id: '0007',
      title: 'Not Games',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/not-games.jpg',
      links: {
        telegram: 'https://t.me',
        community: 'https://t.me',
        x: 'https://x.com',
        web: '',
        support: '',
      },
      faq: faqsData,
    },
    {
      id: '0008',
      title: 'Void',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/void.jpg',
      links: {
        telegram: 'https://t.me',
        community: 'https://t.me',
        x: 'https://x.com',
        web: '',
        support: '',
      },
      faq: faqsData,
    },
    {
      id: '9999',
      title: 'Empty',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '',
      links: {
        telegram: 'https://t.me',
        community: '',
        x: '',
        web: '',
        support: '',
      },
      faq: [],
    },
  ];
};

const initialState: ProjectsState = {
  projects: loadFromLocalStorage(),
};

const saveToLocalStorage = (projects: Project[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push({...action.payload, id: uuidv4()});
      saveToLocalStorage(state.projects);
    },
    updateProject(state, action: PayloadAction<Project>) {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        saveToLocalStorage(state.projects);
      }
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
      saveToLocalStorage(state.projects);
    },
  },
});

export const {addProject, updateProject, deleteProject} = projectsSlice.actions;
export default projectsSlice.reducer;
