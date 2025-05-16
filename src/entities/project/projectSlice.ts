import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface FAQ {
  question: string;
  answer: string;
}

export type LinkKey = 'tg' | 'x' | 'web' | 'supp';
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
        tg: 'https://t.me',
        x: 'https://x.com',
        web: 'https://ton.org',
        supp: 'https://t.me/supp',
      },
      faq: [
        {
          question: 'Вы создали Telegram Mini App и хотели бы показать его другим и выпустить глобально, но что делать, если вы хотите собирать статистику со своего Mini App?',
          answer: 'Для разработки Mini App понадобится установленный Node.js. Если Node.js не установлен, его можно скачать по ссылке. Рекомендуется оставить путь установки по умолчанию, чтобы избежать потенциальных проблем в будущем.'
        }
      ],
    },
    {
      id: '0002',
      title: 'Dogs',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/dogs.jpg',
      links: {
        tg: 'https://t.me',
        x: 'https://x.com',
        web: 'https://ton.org',
        supp: 'https://t.me/supp',
      },
      faq: [{question: 'What?', answer: 'This is a sample.'}],
    },
    {
      id: '0003',
      title: 'Community',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/community.jpg',
      links: {
        tg: 'https://t.me',
        x: 'https://x.com',
        web: 'https://ton.org',
        supp: 'https://t.me/supp',
      },
      faq: [{question: 'What?', answer: 'This is a sample.'}],
    },
    {
      id: '0004',
      title: 'Not Pixel',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/not-pixel.jpg',
      links: {
        tg: 'https://t.me',
        x: 'https://x.com',
        web: 'https://ton.org',
        supp: 'https://t.me/supp',
      },
      faq: [{question: 'What?', answer: 'This is a sample.'}],
    },
    {
      id: '0005',
      title: 'Sticker Pack',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/sticker-pack.jpg',
      links: {
        tg: 'https://t.me',
        x: '',
        web: 'https://ton.org',
        supp: '',
      },
      faq: [{question: 'What?', answer: 'This is a sample.'}],
    },
    {
      id: '0006',
      title: 'Earn',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/earn.jpg',
      links: {
        tg: 'https://t.me',
        x: '',
        web: 'https://ton.org',
        supp: '',
      },
      faq: [{question: 'What?', answer: 'This is a sample.'}],
    },
    {
      id: '0007',
      title: 'Not Games',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/not-games.jpg',
      links: {
        tg: 'https://t.me',
        x: 'https://x.com',
        web: '',
        supp: '',
      },
      faq: [{question: 'What?', answer: 'This is a sample.'}],
    },
    {
      id: '0008',
      title: 'Void',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/imgs/projects/void.jpg',
      links: {
        tg: 'https://t.me',
        x: 'https://x.com',
        web: '',
        supp: '',
      },
      faq: [{question: 'What?', answer: 'This is a sample.'}],
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
