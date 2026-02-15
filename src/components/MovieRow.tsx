import { Component, createEffect, createResource, For, Suspense } from 'solid-js';
import { fetchMoviesByGenre } from '../services/api/tmdb';
import { focus, updateFocusedMovie } from '../store/navigation';

// On définit une Interface pour les "Props" (TypeScript)
interface MovieRowProps {
    title: string;
    genreId: number;
    rowIndex: number;
}

const MovieRow: Component<MovieRowProps> = (props) => {
    const [data] = createResource(() => props.genreId, fetchMoviesByGenre);
    
    const translateX = () => {
        if (focus.rowIndex !== props.rowIndex) return 0;
        // On décale de -215px par index, mais on garde une marge à gauche (5%)
        return -(focus.colIndex * 215);
    };

    createEffect(() => {
        // Si c'est ma ligne qui est sélectionnée
        if (focus.rowIndex === props.rowIndex && data()?.results) {
            const movie = data().results[focus.colIndex];
            if (movie) {
                updateFocusedMovie(movie); // On "pousse" le film vers le Hero
            }
        }
    });

    return (
        <section class="movie-row">
            <h2 style={{ padding: "0 5%" }}>{props.title}</h2>
            <div class="row-container" style={{ display: "flex", "overflow-x": "hidden", gap: "15px", padding: "10px 5%" }}>
                <Suspense fallback={<p>Chargement...</p>}>
                    <For each={data()?.results}>
                        {(movie, index) => {
                            const isFocused = () => focus.rowIndex === props.rowIndex && focus.colIndex === index();
                            return (
                                <div
                                    class="movie-card"
                                    style={{ 
                                            flex: "0 0 200px",
                                            transition: "transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)", // Courbe Netflix
                                            transform: `translateX(${translateX()}px)`,
                                            padding: "10px",
                                            // Effet visuel de focus
                                            //transform: isFocused() ? "scale(1.15)" : "scale(1)",
                                            "z-index": isFocused() ? "10" : "1",
                                        }}
                                >
                                    {/* Le cadre de focus (affiché seulement si focus) */}
                                    <div style={{
                                        position: "absolute",
                                        top: "0", left: "0", right: "0", bottom: "0",
                                        border: isFocused() ? "4px solid white" : "4px solid transparent",
                                        "border-radius": "16px", // Plus arrondi que l'image pour l'effet d'optique
                                        transition: "all 0.3s ease"
                                    }} />
                                    {/* L'image réelle */}
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        style={{
                                            width: "100%",
                                            "border-radius": "8px", // Arrondi de l'image
                                            display: "block",
                                            "box-shadow": isFocused() ? "0 10px 20px rgba(0,0,0,0.5)" : "none"
                                        }}
                                    />
                                </div>
                            )
                        }}
                    </For>
                </Suspense>
            </div>
        </section>
    );
};

export default MovieRow;