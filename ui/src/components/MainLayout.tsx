import React from 'react';
import { Outlet } from 'react-router-dom';
import NotificationsSystem, { useNotifications, wyboTheme } from 'reapop';

const MainLayout: React.FC = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div className="app-container">
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dismissNotification(id)}
        theme={wyboTheme}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
