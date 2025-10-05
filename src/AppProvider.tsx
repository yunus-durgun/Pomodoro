import React, { ReactNode } from 'react';
import { AuthProvider } from './context/AuthContext';
import { HistoryProvider } from './context/HistoryContext';
import { SettingsProvider } from './context/SettingsContext';

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <HistoryProvider>
          {children}
        </HistoryProvider>
      </SettingsProvider>
    </AuthProvider>
  );
} 