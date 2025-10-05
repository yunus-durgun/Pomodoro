import { useColorScheme as _useColorScheme } from 'react-native';
import { useSettings } from '../context/SettingsContext';

export function useAppTheme(): 'light' | 'dark' {
  const settings = useSettings();
  const systemColorScheme = _useColorScheme() as 'light' | 'dark';
  
  // Use the theme from settings if it's set, otherwise use system theme
  return settings.theme || systemColorScheme || 'light';
} 