import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {projectsData} from './constants';

export interface FAQ {
  id: string;
  published: boolean;
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
  published: boolean;
  links: Links;
  faq: FAQ[];
}

interface ProjectsState {
  projects: Project[];
}

const loadFromLocalStorage = (): Project[] => {
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : projectsData;
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
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
  },
});

export const {addProject, updateProject, deleteProject, setProjects} = projectsSlice.actions;
export default projectsSlice.reducer;
