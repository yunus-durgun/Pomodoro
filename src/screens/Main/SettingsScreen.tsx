import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { CustomButton, CustomCard, CustomText, CustomTextInput } from '../../components/custom';
import { GradientBackground } from '../../components/GradientBackground';
import { Colors } from '../../constants/Colors';
import { Translations } from '../../constants/Translations';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import auth from '../../firebase/auth';
import { useAppTheme } from '../../hooks/useAppTheme';

const SettingsScreen = () => {
  const settings = useSettings();
  const { user } = useAuth();
  const colorScheme = useAppTheme();
  const t = Translations[settings.language];
  
  const [pomodoro, setPomodoro] = useState(settings.pomodoro.toString());
  const [shortBreak, setShortBreak] = useState(settings.shortBreak.toString());
  const [longBreak, setLongBreak] = useState(settings.longBreak.toString());
  const [theme, setTheme] = useState(settings.theme);
  const [sound, setSound] = useState(settings.sound);
  const [language, setLanguage] = useState(settings.language);

  const handleSave = async () => {
    await settings.setSettings({
      pomodoro: parseInt(pomodoro) || 25,
      shortBreak: parseInt(shortBreak) || 5,
      longBreak: parseInt(longBreak) || 15,
      theme,
      sound,
      language,
    });
    Alert.alert(t.success, t.settingsSaved);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/auth/login');
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <CustomText type="title" style={styles.sectionTitle}>{title}</CustomText>
      {children}
    </View>
  );

  return (
    <GradientBackground gradientType="forest">
      <ScrollView contentContainerStyle={styles.root}>
        <CustomText type="title" style={styles.mainTitle}>{t.settings}</CustomText>
        
        <CustomCard shadow backgroundColor={Colors[colorScheme].card} style={styles.card}>
          {/* User Info Section */}
          <SettingSection title="Kullanıcı Bilgileri">
            <View style={styles.userInfo}>
              <Ionicons name="person-circle-outline" size={48} color={Colors[colorScheme].primary} />
              <View style={styles.userDetails}>
                <CustomText type="title" style={styles.userEmail}>
                  {user?.email || 'Misafir Kullanıcı'}
                </CustomText>
                <CustomText type="label" style={styles.userType}>
                  {user?.isAnonymous ? 'Misafir Hesabı' : 'Kayıtlı Hesap'}
                </CustomText>
              </View>
            </View>
          </SettingSection>

          <SettingSection title={t.durationSettings}>
            <CustomTextInput
              label={t.pomodoroDuration}
              keyboardType="numeric"
              value={pomodoro}
              onChangeText={setPomodoro}
              leftIcon={<Ionicons name="timer-outline" size={20} color={Colors[colorScheme].primary} />}
            />
            <CustomTextInput
              label={t.shortBreakDuration}
              keyboardType="numeric"
              value={shortBreak}
              onChangeText={setShortBreak}
              leftIcon={<Ionicons name="cafe-outline" size={20} color={Colors[colorScheme].secondary} />}
            />
            <CustomTextInput
              label={t.longBreakDuration}
              keyboardType="numeric"
              value={longBreak}
              onChangeText={setLongBreak}
              leftIcon={<Ionicons name="bed-outline" size={20} color={Colors[colorScheme].accent} />}
            />
          </SettingSection>

          <SettingSection title={t.theme}>
            <View style={styles.buttonRow}>
              <CustomButton
                title={t.light}
                onPress={() => setTheme('light')}
                color={theme === 'light' ? Colors[colorScheme].primary : Colors[colorScheme].cardShadow}
                iconLeft={<Ionicons name="sunny-outline" size={20} color="#fff" />}
                size="medium"
                style={[styles.themeButton, theme === 'light' && styles.activeButton]}
              />
              <CustomButton
                title={t.dark}
                onPress={() => setTheme('dark')}
                color={theme === 'dark' ? Colors[colorScheme].primary : Colors[colorScheme].cardShadow}
                iconLeft={<Ionicons name="moon-outline" size={20} color="#fff" />}
                size="medium"
                style={[styles.themeButton, theme === 'dark' && styles.activeButton]}
              />
            </View>
          </SettingSection>

          <SettingSection title={t.soundEffect}>
            <CustomTextInput
              label={t.soundEffect}
              value={sound}
              onChangeText={setSound}
              leftIcon={<Ionicons name="musical-notes-outline" size={20} color={Colors[colorScheme].warning} />}
            />
          </SettingSection>

          <SettingSection title={t.language}>
            <View style={styles.buttonRow}>
              <CustomButton
                title={t.turkish}
                onPress={() => setLanguage('tr')}
                color={language === 'tr' ? Colors[colorScheme].success : Colors[colorScheme].cardShadow}
                size="medium"
                style={[styles.languageButton, language === 'tr' && styles.activeButton]}
              />
              <CustomButton
                title={t.english}
                onPress={() => setLanguage('en')}
                color={language === 'en' ? Colors[colorScheme].success : Colors[colorScheme].cardShadow}
                size="medium"
                style={[styles.languageButton, language === 'en' && styles.activeButton]}
              />
            </View>
          </SettingSection>

          <CustomButton
            title={t.save}
            onPress={handleSave}
            color={Colors[colorScheme].success}
            size="large"
            style={styles.saveButton}
            iconLeft={<Ionicons name="checkmark-circle-outline" size={24} color="#fff" />}
          />

          <CustomButton
            title="Çıkış Yap"
            onPress={handleLogout}
            color={Colors[colorScheme].error}
            size="large"
            style={styles.logoutButton}
            iconLeft={<Ionicons name="log-out-outline" size={24} color="#fff" />}
          />
        </CustomCard>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
  mainTitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 20,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userDetails: {
    flex: 1,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  userType: {
    fontSize: 14,
    opacity: 0.7,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  themeButton: {
    flex: 1,
    borderRadius: 12,
  },
  languageButton: {
    flex: 1,
    borderRadius: 12,
  },
  activeButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 12,
  },
  logoutButton: {
    borderRadius: 12,
  },
});

export default SettingsScreen; 