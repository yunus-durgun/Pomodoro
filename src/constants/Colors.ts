/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Enhanced colors for better UI
    primary: '#4A90E2',
    secondary: '#7B68EE',
    accent: '#FF6B6B',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    card: '#FFFFFF',
    cardShadow: '#E0E0E0',
    gradient: {
      primary: ['#667eea', '#764ba2'],
      secondary: ['#f093fb', '#f5576c'],
      success: ['#4facfe', '#00f2fe'],
      sunset: ['#fa709a', '#fee140'],
      ocean: ['#667eea', '#764ba2'],
      forest: ['#a8edea', '#fed6e3'],
    },
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Enhanced colors for dark theme
    primary: '#64B5F6',
    secondary: '#9575CD',
    accent: '#FF8A80',
    success: '#81C784',
    warning: '#FFB74D',
    error: '#E57373',
    card: '#1E1E1E',
    cardShadow: '#000000',
    gradient: {
      primary: ['#2C3E50', '#34495E'],
      secondary: ['#8E44AD', '#9B59B6'],
      success: ['#27AE60', '#2ECC71'],
      sunset: ['#E74C3C', '#F39C12'],
      ocean: ['#2980B9', '#3498DB'],
      forest: ['#16A085', '#1ABC9C'],
    },
  },
};
