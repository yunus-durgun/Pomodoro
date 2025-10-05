import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CustomButton, CustomCard, CustomText } from '../../components/custom';
import { GradientBackground } from '../../components/GradientBackground';
import { Colors } from '../../constants/Colors';
import { Translations } from '../../constants/Translations';
import { useSettings } from '../../context/SettingsContext';
import { useAppTheme } from '../../hooks/useAppTheme';

const HomeScreen = () => {
  const settings = useSettings();
  const colorScheme = useAppTheme();
  const t = Translations[settings.language];

  return (
    <GradientBackground gradientType="primary">
      <View style={styles.root}>
        <CustomCard shadow backgroundColor={Colors[colorScheme].card} style={styles.card}>
          <View style={styles.header}>
            <Ionicons name="timer-outline" size={64} color={Colors[colorScheme].primary} />
            <CustomText type="title" style={styles.title}>Pomodoro Timer</CustomText>
            <CustomText type="subtitle" style={styles.subtitle}>
              {t.backToWork}
            </CustomText>
          </View>
          
          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle-outline" size={24} color={Colors[colorScheme].success} />
              <CustomText type="label" style={styles.featureText}>Focus on your tasks</CustomText>
            </View>
            <View style={styles.feature}>
              <Ionicons name="time-outline" size={24} color={Colors[colorScheme].primary} />
              <CustomText type="label" style={styles.featureText}>Track your productivity</CustomText>
            </View>
            <View style={styles.feature}>
              <Ionicons name="stats-chart-outline" size={24} color={Colors[colorScheme].secondary} />
              <CustomText type="label" style={styles.featureText}>Monitor your progress</CustomText>
            </View>
          </View>
          
          <CustomButton
            title="Start Pomodoro"
            onPress={() => {}}
            color={Colors[colorScheme].success}
            size="large"
            style={styles.startButton}
            iconLeft={<Ionicons name="play" size={24} color="#fff" />}
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
    alignItems: 'center',
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
  features: {
    width: '100%',
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  featureText: {
    fontSize: 16,
  },
  startButton: {
    borderRadius: 12,
    width: '100%',
  },
});

export default HomeScreen; 