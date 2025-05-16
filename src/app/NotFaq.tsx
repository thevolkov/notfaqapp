import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectsListPage from '../pages/ProjectsListPage';
import ProjectPage from '../pages/ProjectPage';
import UserPage from '../pages/UserPage';
import Footer from '../shared/ui/Footer';
import './NotFaq.css';

import IconButton from '../shared/ui/IconButton';
import UserSwitcherModal from '../features/user-switcher/UserSwitcherModal';

export default function NotFaq() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="content">
        <Routes>
          <Route path="/" element={<ProjectsListPage/>}/>
          <Route path="/project/:id" element={<ProjectPage/>}/>
          <Route path="/user" element={<UserPage/>}/>
        </Routes>
      </div>
      <Footer />

      <div className="user-switch">
        <IconButton
          iconId="users"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {
        isModalOpen &&
          <UserSwitcherModal
              onClose={() => setIsModalOpen(false)}
          />
      }
    </>
  );
}
