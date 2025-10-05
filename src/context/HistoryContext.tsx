import { addDoc, collection, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import db from '../firebase/firestore';
import { useAuth } from './AuthContext'; // AuthContext ile güncel kullanıcıyı al

export type PomodoroSession = {
  type: 'pomodoro' | 'shortBreak' | 'longBreak';
  duration: number; // saniye
  timestamp: number; // Date.now()
  userId?: string;
};

export type HistoryContextType = {
  history: PomodoroSession[];
  addSession: (session: PomodoroSession) => Promise<void>;
  fetchHistory: () => Promise<void>;
  clearHistory: () => Promise<void>;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<PomodoroSession[]>([]);
  const { user } = useAuth(); // Artık güncel kullanıcıyı buradan alıyoruz

  // Firestore'dan geçmişi çek
  const fetchHistory = async () => {
    try {
      if (user) {
        const q = query(
          collection(db, 'sessions'), 
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const data: PomodoroSession[] = [];
        querySnapshot.forEach((doc) => {
          const sessionData = doc.data();
          data.push({
            type: sessionData.type,
            duration: sessionData.duration,
            timestamp: sessionData.timestamp,
            userId: sessionData.userId,
          });
        });
        setHistory(data);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      setHistory([]);
    }
  };

  // Yeni oturum ekle
  const addSession = async (session: PomodoroSession) => {
    try {
      if (user) {
        await addDoc(collection(db, 'sessions'), {
          ...session,
          userId: user.uid,
          timestamp: Timestamp.now().toMillis(),
        });
        await fetchHistory();
      }
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  // Geçmişi temizle
  const clearHistory = async () => {
    try {
      setHistory([]);
      // Firestore'dan silme işlemi eklenebilir
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  return (
    <HistoryContext.Provider value={{ history, addSession, fetchHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within a HistoryProvider');
  return ctx;
};