import { useCallback, useEffect, useState } from 'react';
import { defaultPortfolioData, type PortfolioData } from './types';

const THEME_STORAGE_KEY = 'portfolio-theme';

function loadThemeFromStorage(): PortfolioData['theme'] | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return null;
}

function saveThemeToStorage(theme: PortfolioData['theme']) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch {
    // ignore storage errors
  }
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(() => {
    const savedTheme = loadThemeFromStorage();
    if (savedTheme) {
      return { ...defaultPortfolioData, theme: savedTheme };
    }
    return defaultPortfolioData;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading state to preserve the loading screen animation
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const save = useCallback(
    async (next: PortfolioData): Promise<boolean> => {
      // Save theme preferences to localStorage
      saveThemeToStorage(next.theme);
      setData(next);
      return true;
    },
    [],
  );

  const reload = useCallback(() => {
    const savedTheme = loadThemeFromStorage();
    if (savedTheme) {
      setData({ ...defaultPortfolioData, theme: savedTheme });
    } else {
      setData(defaultPortfolioData);
    }
  }, []);

  return { data, loading, error: null, save, reload };
}
