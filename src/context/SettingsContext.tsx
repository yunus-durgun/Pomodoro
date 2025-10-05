import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

export type Settings = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  theme: 'light' | 'dark';
  sound: string;
  language: 'tr' | 'en';
  setSettings: (settings: Partial<Omit<Settings, 'setSettings'>>) => void;
};

const defaultSettings: Omit<Settings, 'setSettings'> = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  theme: 'light',
  sound: 'default',
  language: 'tr',
};

const SettingsContext = createContext<Settings | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettingsState] = useState(defaultSettings);
  const { user } = useAuth();

  // Kullanıcıya özel key
  const getSettingsKey = () => (user ? `pomodoro_settings_${user.uid}` : 'pomodoro_settings_guest');

  // Kullanıcı değiştiğinde ayarları yükle
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const key = getSettingsKey();
        const savedSettings = await AsyncStorage.getItem(key);
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettingsState((prev) => ({ ...prev, ...parsedSettings }));
        } else {
          setSettingsState(defaultSettings);
        }
      } catch (error) {
        console.warn('Failed to load settings:', error);
        setSettingsState(defaultSettings);
      }
    };
    loadSettings();
  }, [user]);

  const setSettings = async (newSettings: Partial<Omit<Settings, 'setSettings'>>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettingsState(updatedSettings);
    // Kullanıcıya özel kaydet
    try {
      const key = getSettingsKey();
      await AsyncStorage.setItem(key, JSON.stringify(updatedSettings));
    } catch (error) {
      console.warn('Failed to save settings:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ ...settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}; 