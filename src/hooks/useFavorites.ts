import { useState, useEffect, useCallback } from 'react';

export interface FavoriteItem {
  id: string;
  tipo: 'voo' | 'hotel' | 'carro' | 'oferta';
  titulo: string;
  descricao?: string;
  preco?: string;
  imagem?: string;
  url?: string;
  addedAt: string;
}

const STORAGE_KEY = 'vootrip_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  // Save to localStorage whenever favorites change
  const saveFavorites = useCallback((items: FavoriteItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setFavorites(items);
  }, []);

  const addFavorite = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === item.id);
      if (exists) return prev;
      const newFavorites = [...prev, { ...item, addedAt: new Date().toISOString() }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(f => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const toggleFavorite = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === item.id);
      let newFavorites;
      if (exists) {
        newFavorites = prev.filter(f => f.id !== item.id);
      } else {
        newFavorites = [...prev, { ...item, addedAt: new Date().toISOString() }];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.some(f => f.id === id);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFavorites([]);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length
  };
}
