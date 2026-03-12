import React from 'react';
import { Outlet } from 'react-router-dom';
import NotificationHandler from '@/components/NotificationHandler';

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <NotificationHandler />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
