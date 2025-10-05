import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

export type CustomButtonProps = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  color?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
};

const sizeStyles = {
  small: { padding: 8, fontSize: 14 },
  medium: { padding: 12, fontSize: 16 },
  large: { padding: 16, fontSize: 18 },
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  loading = false,
  iconLeft,
  iconRight,
  color = '#007AFF',
  textColor = '#fff',
  size = 'medium',
  style,
  disabled,
  ...props
}) => {
  const btnStyle = [
    styles.button,
    { backgroundColor: color, padding: sizeStyles[size].padding, opacity: disabled ? 0.6 : 1 },
    style,
  ];
  const txtStyle = [styles.text, { color: textColor, fontSize: sizeStyles[size].fontSize }];
  return (
    <TouchableOpacity style={btnStyle} disabled={disabled || loading} {...props}>
      <View style={styles.contentRow}>
        {iconLeft && <View style={styles.icon}>{iconLeft}</View>}
        {loading ? <ActivityIndicator color={textColor} style={{ marginHorizontal: 8 }} /> : <Text style={txtStyle}>{title}</Text>}
        {iconRight && <View style={styles.icon}>{iconRight}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  text: {
    fontWeight: 'bold',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default CustomButton; 