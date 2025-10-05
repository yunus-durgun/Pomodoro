import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAppTheme } from '../../hooks/useAppTheme';

export type CustomTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'error' | 'label' | 'button' | 'link';
  color?: string;
};

const CustomText: React.FC<CustomTextProps> = ({ type = 'default', color, style, ...props }) => {
  const colorScheme = useAppTheme();
  const themeColors = Colors[colorScheme];

  const typeStyles: Record<string, TextStyle> = {
    default: { fontSize: 16, fontWeight: '400', color: themeColors.text },
    title: { fontSize: 24, fontWeight: '700', color: themeColors.text },
    subtitle: { fontSize: 18, fontWeight: '600', color: themeColors.text },
    error: { fontSize: 15, color: themeColors.error, fontWeight: '500' },
    label: { fontSize: 14, color: themeColors.text, fontWeight: '700' },
    button: { fontSize: 16, color: '#fff', fontWeight: '700' },
    link: { fontSize: 16, color: themeColors.primary, fontWeight: '500' },
  };

  return <Text style={[typeStyles[type], color && { color }, style]} {...props} />;
};

export default CustomText; 