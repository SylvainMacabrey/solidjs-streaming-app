import { createStore } from "solid-js/store";

interface NavigationFocus {
    rowIndex: number,
    colIndex: number,
    focusedMovie: any | null
}

interface NavigationState {
  isDetailOpen: boolean;
}

export const [focus, setFocus] = createStore<NavigationFocus>({
    rowIndex: 0,
    colIndex: 0,
    focusedMovie: null as any
});

export const [modal, setModal] = createStore<NavigationState>({
  isDetailOpen: false,
});

export const [play, setPlay] = createStore({
  isMoviePlaying: false, 
});

// Fonction pour déplacer le focus
export const moveFocus = (direction: 'up' | 'down' | 'left' | 'right', maxCols: number, maxRows: number) => {
  setFocus((p) => {
    switch (direction) {
      case 'up': return { colIndex: 0, rowIndex: Math.max(0, p.rowIndex - 1) };
      case 'down': return { colIndex: 0, rowIndex: Math.min(maxRows - 1, p.rowIndex + 1) };
      case 'left': return { ...p, colIndex: Math.max(0, p.colIndex - 1) };
      case 'right': return { ...p, colIndex: Math.min(maxCols - 1, p.colIndex + 1) };
      default: return p;
    }
  });
};

export const updateFocusedMovie = (movie: any) => {
  setFocus("focusedMovie", movie);
};

export const toggleDetail = (open: boolean) => setModal("isDetailOpen", open);
