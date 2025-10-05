import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CustomButton, CustomCard, CustomText, CustomTextInput } from '../../src/components/custom';
import { GradientBackground } from '../../src/components/GradientBackground';
import { Colors } from '../../src/constants/Colors';
import { Translations } from '../../src/constants/Translations';
import { useSettings } from '../../src/context/SettingsContext';
import auth from '../../src/firebase/auth';
import { useAppTheme } from '../../src/hooks/useAppTheme';

const RegisterScreen = () => {
  const settings = useSettings();
  const colorScheme = useAppTheme();
  const t = Translations[settings.language];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.');
      setTimeout(() => router.replace('/auth/login'), 1500);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground gradientType="success">
      <View style={styles.root}>
        <CustomCard shadow backgroundColor={Colors[colorScheme].card} style={styles.card}>
          <View style={styles.header}>
            <Ionicons name="person-add-outline" size={64} color={Colors[colorScheme].success} />
            <CustomText type="title" style={styles.title}>Kayıt Ol</CustomText>
            <CustomText type="subtitle" style={styles.subtitle}>
              Yeni bir hesap oluşturmak için bilgilerinizi girin
            </CustomText>
          </View>
          
          <CustomTextInput
            label="E-posta"
            placeholder="E-posta adresiniz"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            leftIcon={<Ionicons name="mail-outline" size={20} color={Colors[colorScheme].success} />}
            error={error && error.toLowerCase().includes('email') ? error : undefined}
          />
          <CustomTextInput
            label="Şifre"
            placeholder="Şifreniz (en az 6 karakter)"
            secureTextEntry
            secureToggle
            value={password}
            onChangeText={setPassword}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors[colorScheme].success} />}
            error={error && error.toLowerCase().includes('password') ? error : undefined}
          />
          <CustomTextInput
            label="Şifre Tekrar"
            placeholder="Şifrenizi tekrar girin"
            secureTextEntry
            secureToggle
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors[colorScheme].success} />}
          />
          {error && !error.toLowerCase().includes('email') && !error.toLowerCase().includes('password') && (
            <CustomText type="error" style={styles.errorText}>{error}</CustomText>
          )}
          {success && (
            <CustomText type="subtitle" style={styles.successText}>{success}</CustomText>
          )}
          
          <CustomButton
            title={loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
            onPress={handleRegister}
            loading={loading}
            iconLeft={<Ionicons name="person-add-outline" size={20} color="#fff" />}
            color={Colors[colorScheme].success}
            size="large"
            style={styles.registerButton}
          />
          <CustomButton
            title="Girişe Dön"
            onPress={() => router.push('/auth/login')}
            disabled={loading}
            iconLeft={<Ionicons name="arrow-back-outline" size={20} color="#fff" />}
            color={Colors[colorScheme].primary}
            size="large"
            style={styles.backButton}
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
  successText: {
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.light.success,
  },
  registerButton: {
    marginBottom: 12,
    borderRadius: 12,
  },
  backButton: {
    borderRadius: 12,
  },
});

export default RegisterScreen; 