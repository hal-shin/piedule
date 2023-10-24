import React, { ReactNode } from 'react';
import { APP_NAME } from '@/constants';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <nav className="flex px-4 py-4 justify-between bg-amber-200">
        <h1>{APP_NAME}</h1>
      </nav>
      <main>{children}</main>
    </div>
  );
};
