
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
import { Match, MatchStatus } from '../types';

const COLLECTION_NAME = 'matches';

export const subscribeToMatches = (callback: (matches: Match[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('startTime', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const matches = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Match[];
    callback(matches);
  });
};

export const addMatch = async (matchData: Omit<Match, 'id'>) => {
  return await addDoc(collection(db, COLLECTION_NAME), matchData);
};

export const updateMatch = async (id: string, matchData: Partial<Match>) => {
  const matchRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(matchRef, matchData);
};

export const deleteMatch = async (id: string) => {
  const matchRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(matchRef);
};

export const createTimestamp = (date: Date) => {
  return Timestamp.fromDate(date);
};
