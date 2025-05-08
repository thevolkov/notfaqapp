// import React, { useReducer, useEffect, useState } from 'react';
// import { CProjectCard } from './components/CProjectCard/CProjectCard';
import { PProjects } from './pages/PProjects/PProjects';

const initialState = {
  projectsData: [
    {
      id: '001',
      title: 'Notcoin',
      image: '/imgs/projects/notcoin.jpg',
    },
    {
      id: '002',
      title: 'Dogs',
      image: '/imgs/projects/dogs.jpg',
    },
    {
      id: '003',
      title: 'Community',
      image: '/imgs/projects/community.jpg',
    },
    {
      id: '004',
      title: 'Not Pixel',
      image: '/imgs/projects/not-pixel.jpg',
    },
    {
      id: '007',
      title: 'Sticker Pack',
      image: '/imgs/projects/sticker-pack.jpg',
    },
    {
      id: '005',
      title: 'Earn',
      image: '/imgs/projects/earn.jpg',
    },
    {
      id: '006',
      title: 'Not Games',
      image: '/imgs/projects/not-games.jpg',
    },
    {
      id: '008',
      title: 'Void',
      image: '/imgs/projects/void.jpg',
    },
  ],
};

const App = () => {

  return (
    <>
    <PProjects data={initialState.projectsData} />
    </>
  );
};


export default App;
