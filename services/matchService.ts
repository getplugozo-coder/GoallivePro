
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Match } from '../types';

const COLLECTION_NAME = 'matches';

// بيانات تجريبية تظهر إذا لم تكن قاعدة البيانات مربوطة
const MOCK_MATCHES: Match[] = [
  {
    id: 'demo-1',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeLogo: 'https://ssl.gstatic.com/onebox/media/sports/logos/Th4f3Z7S_5-v9S8S899AOA_48x48.png',
    awayLogo: 'https://ssl.gstatic.com/onebox/media/sports/logos/paYnfbthYp99D7-9pD6_Yw_48x48.png',
    league: 'La Liga (Demo)',
    startTime: Timestamp.now(),
    status: 'live',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC4i9_E9_vO_vX5K9p8-P8fA',
    score: { home: 2, away: 1 }
  }
];

export const subscribeToMatches = (callback: (matches: Match[]) => void) => {
  if (!db) {
    console.warn("Using Mock Data: Firebase not configured.");
    callback(MOCK_MATCHES);
    return () => {};
  }

  const q = query(collection(db, COLLECTION_NAME), orderBy('startTime', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const matches = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Match[];
    
    // إذا كانت قاعدة البيانات فارغة، اعرض البيانات التجريبية
    if (matches.length === 0) {
      callback(MOCK_MATCHES);
    } else {
      callback(matches);
    }
  }, (error) => {
    console.error("Firestore Subscribe Error:", error);
    callback(MOCK_MATCHES);
  });
};

export const addMatch = async (matchData: Omit<Match, 'id'>) => {
  if (!db) throw new Error("Database not initialized");
  return await addDoc(collection(db, COLLECTION_NAME), matchData);
};

export const updateMatch = async (id: string, matchData: Partial<Match>) => {
  if (!db) throw new Error("Database not initialized");
  const matchRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(matchRef, matchData);
};

export const deleteMatch = async (id: string) => {
  if (!db) throw new Error("Database not initialized");
  const matchRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(matchRef);
};

export const createTimestamp = (date: Date) => {
  return Timestamp.fromDate(date);
};
