import { Component, Show } from 'solid-js';
import { focus } from '../store/navigation';

const Hero: Component = () => {
  return (
    <div class="hero-container">
      {/* Background Image avec transition */}
      <div class="hero-bg-wrapper">
        <Show when={focus.focusedMovie} fallback={<div class="hero-placeholder" />}>
          <img 
            // La clé "src" changeant forcera une petite transition si on gère bien le CSS
            src={`https://image.tmdb.org/t/p/original${focus.focusedMovie?.backdrop_path}`} 
            class="hero-bg"
            alt=""
          />
        </Show>
      </div>

      {/* Overlay dégradé pour la lisibilité */}
      <div class="hero-overlay" />

      {/* Contenu textuel */}
      <div class="hero-content">
        <Show when={focus.focusedMovie}>
          <h1 class="hero-title">{focus.focusedMovie.title}</h1>
          <div class="hero-metadata">
            <span class="rating">⭐ {focus.focusedMovie.vote_average?.toFixed(1)} </span>
            <span class="year">Sortie en {focus.focusedMovie.release_date?.split('-')[0]}</span>
          </div>
          <p class="hero-overview">{focus.focusedMovie.overview}</p>
        </Show>
      </div>
    </div>
  );
};

export default Hero;