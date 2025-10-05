import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CustomCard, CustomText } from '../../components/custom';
import { GradientBackground } from '../../components/GradientBackground';
import { Colors } from '../../constants/Colors';
import { Translations } from '../../constants/Translations';
import { useHistory } from '../../context/HistoryContext';
import { useSettings } from '../../context/SettingsContext';
import { useAppTheme } from '../../hooks/useAppTheme';

function getStartOfDay(ts: number) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
function getStartOfWeek(ts: number) {
  const d = new Date(ts);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
function getStartOfMonth(ts: number) {
  const d = new Date(ts);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

const StatsScreen = () => {
  const { history } = useHistory();
  const { language } = useSettings();
  const colorScheme = useAppTheme();
  const t = Translations[language];
  const now = Date.now();

  const stats = useMemo(() => {
    let dailyWork = 0, weeklyWork = 0, monthlyWork = 0;
    let dailyBreak = 0, weeklyBreak = 0, monthlyBreak = 0;
    let pomodoros = 0, shortBreaks = 0, longBreaks = 0;
    let workHourMap: Record<number, number> = {};
    let breakHourMap: Record<number, number> = {};
    let focusScore = 0;
    
    const startDay = getStartOfDay(now);
    const startWeek = getStartOfWeek(now);
    const startMonth = getStartOfMonth(now);
    
    history.forEach((s) => {
      const isWork = s.type === 'pomodoro';
      const isBreak = s.type === 'shortBreak' || s.type === 'longBreak';
      
      if (isWork) {
        pomodoros++;
        if (s.timestamp >= startDay) dailyWork += s.duration;
        if (s.timestamp >= startWeek) weeklyWork += s.duration;
        if (s.timestamp >= startMonth) monthlyWork += s.duration;
        const hour = new Date(s.timestamp).getHours();
        workHourMap[hour] = (workHourMap[hour] || 0) + s.duration;
        focusScore += 2;
      } else if (isBreak) {
        if (s.type === 'shortBreak') shortBreaks++;
        if (s.type === 'longBreak') longBreaks++;
        if (s.timestamp >= startDay) dailyBreak += s.duration;
        if (s.timestamp >= startWeek) weeklyBreak += s.duration;
        if (s.timestamp >= startMonth) monthlyBreak += s.duration;
        const hour = new Date(s.timestamp).getHours();
        breakHourMap[hour] = (breakHourMap[hour] || 0) + s.duration;
        focusScore += s.type === 'shortBreak' ? 1 : 0.5;
      }
    });
    
    const mostWorkedHour = Object.entries(workHourMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
    const mostBreakHour = Object.entries(breakHourMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
    
    return {
      work: {
        daily: Math.round(dailyWork / 60),
        weekly: Math.round(weeklyWork / 60),
        monthly: Math.round(monthlyWork / 60),
      },
      break: {
        daily: Math.round(dailyBreak / 60),
        weekly: Math.round(weeklyBreak / 60),
        monthly: Math.round(monthlyBreak / 60),
      },
      pomodoros,
      shortBreaks,
      longBreaks,
      mostWorkedHour,
      mostBreakHour,
      focusScore: Math.round(focusScore),
    };
  }, [history, now]);

  const StatCard = ({ title, value, icon, color, gradientType }: {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    gradientType: 'primary' | 'secondary' | 'success' | 'sunset' | 'ocean' | 'forest';
  }) => (
    <GradientBackground gradientType={gradientType} style={styles.statCard}>
      <View style={styles.statContent}>
        <Ionicons name={icon as any} size={32} color="#fff" />
        <CustomText type="title" style={styles.statValue}>{value}</CustomText>
        <CustomText type="label" style={styles.statTitle}>{title}</CustomText>
      </View>
    </GradientBackground>
  );

  return (
    <GradientBackground gradientType="ocean">
      <ScrollView contentContainerStyle={styles.root}>
        <CustomText type="title" style={styles.mainTitle}>{t.stats}</CustomText>
        
        {/* Çalışma Süreleri */}
        <CustomText type="subtitle" style={styles.sectionTitle}>Çalışma Süreleri</CustomText>
        <View style={styles.statsGrid}>
          <StatCard
            title={t.dailyWorkTime}
            value={`${stats.work.daily} ${t.minutes}`}
            icon="time-outline"
            color={Colors[colorScheme].primary}
            gradientType="primary"
          />
          <StatCard
            title={t.weeklyWorkTime}
            value={`${stats.work.weekly} ${t.minutes}`}
            icon="calendar-outline"
            color={Colors[colorScheme].secondary}
            gradientType="secondary"
          />
          <StatCard
            title={t.monthlyWorkTime}
            value={`${stats.work.monthly} ${t.minutes}`}
            icon="calendar-number-outline"
            color={Colors[colorScheme].accent}
            gradientType="sunset"
          />
          <StatCard
            title={t.completedPomodoros}
            value={stats.pomodoros}
            icon="checkmark-circle-outline"
            color={Colors[colorScheme].success}
            gradientType="success"
          />
        </View>

        {/* Mola Süreleri */}
        <CustomText type="subtitle" style={styles.sectionTitle}>Mola Süreleri</CustomText>
        <View style={styles.statsGrid}>
          <StatCard
            title="Günlük Mola"
            value={`${stats.break.daily} ${t.minutes}`}
            icon="cafe-outline"
            color={Colors[colorScheme].warning}
            gradientType="forest"
          />
          <StatCard
            title="Haftalık Mola"
            value={`${stats.break.weekly} ${t.minutes}`}
            icon="bed-outline"
            color={Colors[colorScheme].warning}
            gradientType="forest"
          />
          <StatCard
            title="Kısa Molalar"
            value={stats.shortBreaks}
            icon="pause-outline"
            color={Colors[colorScheme].warning}
            gradientType="forest"
          />
          <StatCard
            title="Uzun Molalar"
            value={stats.longBreaks}
            icon="restaurant-outline"
            color={Colors[colorScheme].warning}
            gradientType="forest"
          />
        </View>

        <CustomCard shadow backgroundColor={Colors[colorScheme].card} style={styles.detailCard}>
          <CustomText type="title" style={styles.cardTitle}>Detaylar</CustomText>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color={Colors[colorScheme].primary} />
            <CustomText type="label">En Çok Çalıştığın Saat: </CustomText>
            <CustomText>{stats.mostWorkedHour}:00</CustomText>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="cafe-outline" size={20} color={Colors[colorScheme].warning} />
            <CustomText type="label">En Çok Mola Verdiğin Saat: </CustomText>
            <CustomText>{stats.mostBreakHour}:00</CustomText>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="star-outline" size={20} color={Colors[colorScheme].warning} />
            <CustomText type="label">{t.focusScore}: </CustomText>
            <CustomText>{stats.focusScore}</CustomText>
          </View>
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
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    height: 120,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  statContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statTitle: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  detailCard: {
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default StatsScreen; 