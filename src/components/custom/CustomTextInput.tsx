import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAppTheme } from '../../hooks/useAppTheme';

export type CustomTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureToggle?: boolean;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  secureTextEntry,
  secureToggle = false,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useAppTheme();
  const themeColors = Colors[colorScheme];
  const isPassword = secureTextEntry || secureToggle;

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: themeColors.text }]}>{label}</Text>}
      <View style={[
        styles.inputWrapper, 
        { 
          borderColor: error ? themeColors.error : themeColors.cardShadow,
          backgroundColor: themeColors.background 
        },
        error && styles.inputError
      ]}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input, 
            { color: themeColors.text },
            style
          ]}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={themeColors.icon}
          {...props}
        />
        {secureToggle && (
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={styles.icon}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={themeColors.icon} />
          </TouchableOpacity>
        )}
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
      {error && <Text style={[styles.error, { color: themeColors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 4,
  },
  inputError: {
    // Error styling is handled inline
  },
  error: {
    marginTop: 2,
    fontSize: 13,
  },
});

export default CustomTextInput; 