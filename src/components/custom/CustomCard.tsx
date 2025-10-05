import React from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAppTheme } from '../../hooks/useAppTheme';

export type CustomCardProps = ViewProps & {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  padding?: number;
  shadow?: boolean;
};

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  style,
  backgroundColor,
  borderColor,
  borderWidth = 0,
  padding = 16,
  shadow = true,
  ...props
}) => {
  const colorScheme = useAppTheme();
  const themeColors = Colors[colorScheme];

  const defaultBackgroundColor = backgroundColor || themeColors.card;
  const defaultBorderColor = borderColor || themeColors.cardShadow;

  return (
    <View
      style={[
        styles.card,
        shadow && (Platform.OS === 'web' ? styles.shadowWeb : styles.shadow),
        { 
          backgroundColor: defaultBackgroundColor, 
          borderColor: defaultBorderColor, 
          borderWidth, 
          padding 
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  shadowWeb: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
});

export default CustomCard; 