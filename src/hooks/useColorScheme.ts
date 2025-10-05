import { useColorScheme as _useColorScheme } from 'react-native';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export function useColorScheme(): 'light' | 'dark' {
  const systemColorScheme = _useColorScheme() as 'light' | 'dark';
  
  // Use system theme for now, settings theme will be handled in individual components
  return systemColorScheme || 'light';
}
