import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  gradientType?: 'primary' | 'secondary' | 'success' | 'sunset' | 'ocean' | 'forest';
  style?: any;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  gradientType = 'primary',
  style,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme].gradient[gradientType];

  return (
    <LinearGradient
      colors={colors}
      style={[styles.container, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 