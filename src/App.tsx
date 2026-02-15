import { Component, onMount, onCleanup, createResource } from 'solid-js';
import { moveFocus, focus, toggleDetail, modal, setPlay, play } from "./store/navigation";
import Home from './components/Home';
import { fetchGenreList, fetchMovieTrailer } from './services/api/tmdb';
import DetailModal from './components/DetailModal';

const App: Component = () => {

  const [genres] = createResource(fetchGenreList);
  
  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const genresCount = genres()?.length || 0;
      if (!(modal.isDetailOpen)) {
        if (e.key === "ArrowUp") moveFocus("up", 20, genresCount);
        if (e.key === "ArrowDown") moveFocus("down", 20, genresCount);
        if (e.key === "ArrowLeft") moveFocus("left", 20, genresCount);
        if (e.key === "ArrowRight") moveFocus("right", 20, genresCount);
        if (e.key === "Enter") {
          const movie = focus.focusedMovie;
          if (movie) {
            toggleDetail(true);
            return;
          }
        }
      }
      if (modal.isDetailOpen) {
        if (e.key === "Enter") {
          setPlay("isMoviePlaying", true);
        }
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        if (modal.isDetailOpen && !play.isMoviePlaying) {
          toggleDetail(false);
          return;
        }
        if (play.isMoviePlaying) {
          setPlay("isMoviePlaying", false);
          return;
        }
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    onCleanup(() => globalThis.removeEventListener("keydown", handleKeyDown));
  });
  
  return (
    <>
      <Home />
      <DetailModal />
    </>
    
  );
};

export default App;


