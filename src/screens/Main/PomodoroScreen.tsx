import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';

import { CustomButton, CustomCard, CustomText } from '../../components/custom';
import { GradientBackground } from '../../components/GradientBackground';
import { Colors } from '../../constants/Colors';
import { Translations } from '../../constants/Translations';
import { useHistory } from '../../context/HistoryContext';
import { useSettings } from '../../context/SettingsContext';
import { useAppTheme } from '../../hooks/useAppTheme';

const PomodoroScreen = () => {
  const settings = useSettings();
  const colorScheme = useAppTheme();
  const t = Translations[settings.language];
  const [seconds, setSeconds] = useState(settings.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef<any>(null);
  const history = useHistory();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    setSeconds(settings.pomodoro * 60);
  }, [settings.pomodoro]);

  const handleTimerEnd = async () => {
    Vibration.vibrate(500);
    setIsRunning(false);
    const newCount = pomodoroCount + 1;
    setPomodoroCount(newCount);
    await history.addSession({
      type: 'pomodoro',
      duration: settings.pomodoro * 60,
      timestamp: Date.now(),
    });
    // No mode change, no navigation
  };

  const handleStartPause = () => {
    // Eğer sayaç durmuş ve 0 ise, tekrar başlatınca sıfırla
    if (!isRunning && seconds === 0) {
      setSeconds(settings.pomodoro * 60);
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(settings.pomodoro * 60);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <GradientBackground gradientType="primary">
      <View style={styles.root}>
        <CustomCard shadow backgroundColor={Colors[colorScheme].card} style={styles.card}>
          <View style={styles.header}>
            <Ionicons name="timer-outline" size={48} color={Colors[colorScheme].primary} />
            <CustomText type="title" style={styles.title}>{t.pomodoro}</CustomText>
            <CustomText type="subtitle" style={styles.subtitle}>{t.backToWork}</CustomText>
          </View>
          <View style={styles.timerContainer}>
            <CustomText type="title" style={styles.timer}>{formatTime(seconds)}</CustomText>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${((settings.pomodoro * 60 - seconds) / (settings.pomodoro * 60)) * 100}%`,
                    backgroundColor: Colors[colorScheme].primary
                  }
                ]} 
              />
            </View>
          </View>
          <View style={styles.buttonRow}>
            <CustomButton
              title={isRunning ? t.pause : t.start}
              onPress={handleStartPause}
              iconLeft={<Ionicons name={isRunning ? 'pause' : 'play'} size={20} color="#fff" />}
              color={isRunning ? Colors[colorScheme].warning : Colors[colorScheme].success}
              size="large"
              style={styles.actionButton}
            />
            <CustomButton
              title={t.reset}
              onPress={handleReset}
              iconLeft={<Ionicons name="refresh" size={20} color="#fff" />}
              color={Colors[colorScheme].error}
              size="large"
              style={styles.actionButton}
            />
          </View>
          <View style={styles.statusRow}>
            <Ionicons name="checkmark-circle-outline" size={20} color={Colors[colorScheme].success} />
            <CustomText type="label" style={styles.statusText}>
              {t.completedPomodoros}: {pomodoroCount}
            </CustomText>
          </View>
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
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  timerContainer: {
    marginVertical: 24,
    alignItems: 'center',
    width: '100%',
  },
  timer: {
    fontSize: 64,
    letterSpacing: 4,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
  },
});

export default PomodoroScreen; 