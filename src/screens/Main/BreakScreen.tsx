import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';
import { CustomButton, CustomCard, CustomText } from '../../components/custom';
import { GradientBackground } from '../../components/GradientBackground';
import { Colors } from '../../constants/Colors';
import { Translations } from '../../constants/Translations';
import { useHistory } from '../../context/HistoryContext';
import { useSettings } from '../../context/SettingsContext';
import { useColorScheme } from '../../hooks/useColorScheme';

const SUGGESTIONS = [
  'Derin bir nefes al ve yavaşça ver.',
  'Kısa bir esneme yap.',
  'Bir bardak su iç.',
  'Gözlerini kapatıp 30 saniye dinlen.',
  'Bugünün motivasyon sözü: "Başlamak için mükemmel olmak zorunda değilsin, ama mükemmel olmak için başlamak zorundasın."',
];

const getRandomSuggestion = () => SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];

type BreakType = 'shortBreak' | 'longBreak';

const BreakScreen = () => {
  const settings = useSettings();
  const colorScheme = useColorScheme() || 'light';
  const t = Translations[settings.language];
  const [breakType, setBreakType] = useState<BreakType>('shortBreak');
  const [seconds, setSeconds] = useState(
    breakType === 'longBreak' ? settings.longBreak * 60 : settings.shortBreak * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const [suggestion, setSuggestion] = useState(getRandomSuggestion());
  const intervalRef = useRef<any>(null);
  const history = useHistory();

  useEffect(() => {
    setSuggestion(getRandomSuggestion());
  }, [breakType]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            handleBreakEnd();
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
    setSeconds(breakType === 'longBreak' ? settings.longBreak * 60 : settings.shortBreak * 60);
  }, [breakType, settings.longBreak, settings.shortBreak]);

  const handleBreakEnd = async () => {
    Vibration.vibrate(500);
    setIsRunning(false);
    await history.addSession({
      type: breakType,
      duration: breakType === 'longBreak' ? settings.longBreak * 60 : settings.shortBreak * 60,
      timestamp: Date.now(),
    });
  };

  const handleStartPause = () => {
    // Eğer sayaç durmuş ve 0 ise, tekrar başlatınca sıfırla
    const breakDuration = breakType === 'longBreak' ? settings.longBreak * 60 : settings.shortBreak * 60;
    if (!isRunning && seconds === 0) {
      setSeconds(breakDuration);
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(breakType === 'longBreak' ? settings.longBreak * 60 : settings.shortBreak * 60);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const getBreakInfo = () => {
    if (breakType === 'longBreak') {
      return {
        title: t.longBreak,
        subtitle: t.takeBreak,
        gradient: 'sunset' as const,
        icon: 'bed-outline',
        color: Colors[colorScheme].warning,
      };
    } else {
      return {
        title: t.shortBreak,
        subtitle: t.takeBreak,
        gradient: 'success' as const,
        icon: 'cafe-outline',
        color: Colors[colorScheme].success,
      };
    }
  };

  const breakInfo = getBreakInfo();

  return (
    <GradientBackground gradientType={breakInfo.gradient}>
      <View style={styles.root}>
        <CustomCard shadow backgroundColor={Colors[colorScheme].card} style={styles.card}>
          <View style={styles.header}>
            <Ionicons name={breakInfo.icon as any} size={48} color={breakInfo.color} />
            <CustomText type="title" style={styles.title}>{breakInfo.title}</CustomText>
            <CustomText type="subtitle" style={styles.subtitle}>{breakInfo.subtitle}</CustomText>
          </View>
          
          <View style={styles.timerContainer}>
            <CustomText type="title" style={styles.timer}>{formatTime(seconds)}</CustomText>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${((breakType === 'longBreak' ? settings.longBreak * 60 : settings.shortBreak * 60) - seconds) / (breakType === 'longBreak' ? settings.longBreak * 60 : settings.shortBreak * 60) * 100}%`,
                    backgroundColor: breakInfo.color
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.suggestionContainer}>
            <Ionicons name="bulb-outline" size={20} color={Colors[colorScheme].warning} />
            <CustomText type="label" style={styles.suggestionLabel}>Öneri</CustomText>
          </View>
          <CustomText type="subtitle" style={styles.suggestion}>{suggestion}</CustomText>
          
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
          
          <View style={styles.breakTypeRow}>
            <CustomButton
              title={t.shortBreak}
              onPress={() => setBreakType('shortBreak')}
              color={breakType === 'shortBreak' ? Colors[colorScheme].success : Colors[colorScheme].cardShadow}
              size="medium"
              style={[styles.breakTypeButton, breakType === 'shortBreak' && styles.activeButton]}
            />
            <CustomButton
              title={t.longBreak}
              onPress={() => setBreakType('longBreak')}
              color={breakType === 'longBreak' ? Colors[colorScheme].warning : Colors[colorScheme].cardShadow}
              size="medium"
              style={[styles.breakTypeButton, breakType === 'longBreak' && styles.activeButton]}
            />
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
  suggestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  suggestionLabel: {
    fontSize: 16,
    color: '#888',
  },
  suggestion: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#007AFF',
    fontStyle: 'italic',
    paddingHorizontal: 16,
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
  breakTypeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  breakTypeButton: {
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
});

export default BreakScreen; 