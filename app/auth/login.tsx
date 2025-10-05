import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CustomButton, CustomCard, CustomText, CustomTextInput } from '../../src/components/custom';
import { GradientBackground } from '../../src/components/GradientBackground';
import { Colors } from '../../src/constants/Colors';
import { Translations } from '../../src/constants/Translations';
import { useSettings } from '../../src/context/SettingsContext';
import auth from '../../src/firebase/auth';
import { useAppTheme } from '../../src/hooks/useAppTheme';

const LoginScreen = () => {
  const settings = useSettings();
  const colorScheme = useAppTheme();
  const t = Translations[settings.language];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <GradientBackground gradientType="primary">
      <View style={styles.root}>
        <CustomCard shadow backgroundColor={Colors[colorScheme].card} style={styles.card}>
          <View style={styles.header}>
            <Ionicons name="timer-outline" size={64} color={Colors[colorScheme].primary} />
            <CustomText type="title" style={styles.title}>Pomodoro Timer</CustomText>
            <CustomText type="subtitle" style={styles.subtitle}>
              Lütfen Giriş yap
            </CustomText>
          </View>
          
          <CustomTextInput
            label="E-posta"
            placeholder="E-posta adresiniz"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            leftIcon={<Ionicons name="mail-outline" size={20} color={Colors[colorScheme].primary} />}
            error={error && error.toLowerCase().includes('email') ? error : undefined}
          />
          <CustomTextInput
            label="Şifre"
            placeholder="Şifreniz"
            secureTextEntry
            secureToggle
            value={password}
            onChangeText={setPassword}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors[colorScheme].primary} />}
            error={error && error.toLowerCase().includes('password') ? error : undefined}
          />
          {error && !error.toLowerCase().includes('email') && !error.toLowerCase().includes('password') && (
            <CustomText type="error" style={styles.errorText}>{error}</CustomText>
          )}
          
          <CustomButton
            title={loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            onPress={handleLogin}
            loading={loading}
            iconLeft={<Ionicons name="log-in-outline" size={20} color="#fff" />}
            color={Colors[colorScheme].success}
            size="large"
            style={styles.loginButton}
          />
          <CustomButton
            title="Kayıt Ol"
            onPress={() => router.push('/auth/register')}
            disabled={loading}
            iconLeft={<Ionicons name="person-add-outline" size={20} color="#fff" />}
            color={Colors[colorScheme].accent}
            size="large"
            style={styles.registerButton}
          />
        </CustomCard>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
    fontSize: 16,
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
  },
  loginButton: {
    marginBottom: 12,
    borderRadius: 12,
  },
  guestButton: {
    marginBottom: 12,
    borderRadius: 12,
  },
  registerButton: {
    borderRadius: 12,
  },
});

export default LoginScreen; 