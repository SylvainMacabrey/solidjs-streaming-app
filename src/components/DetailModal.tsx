import { Component, Show, createSignal, createResource, createEffect } from 'solid-js';
import { focus, modal, play, setPlay } from '../store/navigation';
import { fetchMovieTrailer } from '../services/api/tmdb';

const DetailModal: Component = () => {
  
    // On récupère l'URL seulement quand un film est focus
    const [trailerUrl] = createResource(() => focus.focusedMovie?.id, fetchMovieTrailer);
    console.log(trailerUrl);

    // Reset de l'état de lecture quand on ferme la modal
    createEffect(() => {
        if (!modal.isDetailOpen) setPlay("isMoviePlaying", false);
    });

    return (
        <>
            <Show when={modal.isDetailOpen && !play.isMoviePlaying}>
                <div class="detail-overlay">
                    <div class="detail-container">
                        <button class="close-hint">Appuyez sur 'Retour' pour fermer</button>

                        <img class="detail-backdrop" src={`https://image.tmdb.org/t/p/original${focus.focusedMovie?.backdrop_path}`} />
                        
                        <div class="detail-body">
                            <h1>{focus.focusedMovie?.title}</h1>
                            <div class="detail-stats">
                                <span class="rating">⭐ {focus.focusedMovie.vote_average?.toFixed(1)} </span>
                                <span class="year">Sortie en {focus.focusedMovie.release_date?.split('-')[0]}</span>
                            </div>
                            <p class="detail-description">{focus.focusedMovie?.overview}</p>
                            
                            <div class="detail-actions">
                                <button class="btn-play">Lecture</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
            <Show when={play.isMoviePlaying && trailerUrl()}>
                <div class="fullscreen-player">
                    <iframe
                        src={`${trailerUrl()}&autoplay=1&controls=1&modestbranding=1&rel=0`}
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                    />
                </div>
            </Show>
            <Show when={play.isMoviePlaying && !trailerUrl()}>
                <div class="fullscreen-player-error">
                    <p>Nous n'avons de bande d'annonce à vous montrer.</p>
                </div>
            </Show>
        </>
        
    );
};

export default DetailModal;