import { View, type ViewProps } from 'react-native';
import { Colors } from '../constants/Colors';
import { useAppTheme } from '../hooks/useAppTheme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const colorScheme = useAppTheme();
  const themeColors = Colors[colorScheme];
  
  // Use provided colors or fallback to theme colors
  const backgroundColor = colorScheme === 'light' 
    ? (lightColor || themeColors.background)
    : (darkColor || themeColors.background);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
