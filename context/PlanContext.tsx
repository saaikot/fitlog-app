'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Workout {
  id: string | number;
  name: string;
  category: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  image?: string;
  done?: boolean;
}

interface PlanContextType {
  planItems: Workout[];
  savedItems: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
  isInPlan: (id: string | number) => boolean;
  isInSaved: (id: string | number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planItems, setPlanItems] = useState<Workout[]>([]);
  const [savedItems, setSavedItems] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem('fitlog_plan');
    const storedSaved = localStorage.getItem('fitlog_saved');
    if (storedPlan) setPlanItems(JSON.parse(storedPlan));
    if (storedSaved) setSavedItems(JSON.parse(storedSaved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem('fitlog_plan', JSON.stringify(planItems));
  }, [planItems, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem('fitlog_saved', JSON.stringify(savedItems));
  }, [savedItems, loaded]);

  const addToPlan = (workout: Workout) => {
    setPlanItems((prev) => {
      if (prev.length >= 5) return prev;
      if (prev.some((item) => item.id === workout.id)) return prev;
      return [...prev, { ...workout, done: false }];
    });
  };

  const addToSaved = (workout: Workout) => {
    setSavedItems((prev) => {
      if (prev.some((item) => item.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromPlan = (id: string | number) => {
    setPlanItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: string | number) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const markAsDone = (id: string | number) => {
    setPlanItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const isInPlan = (id: string | number) => planItems.some((item) => item.id === id);
  const isInSaved = (id: string | number) => savedItems.some((item) => item.id === id);

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isInSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlan must be used within PlanProvider');
  return ctx;
}