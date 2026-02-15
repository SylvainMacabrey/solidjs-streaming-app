import { Component, createResource, For, Suspense } from "solid-js";
import { fetchGenreList } from "../services/api/tmdb";
import MovieRow from "./MovieRow";
import { focus } from "../store/navigation";
import Hero from "./Hero";

const Home: Component = () => {
    // On récupère la liste des genres dynamiquement
    const [genres] = createResource(fetchGenreList);

    const VIEWPORT_OFFSET = 389;

    return (
        <main style={{ background: "#101010", height: "100vh", overflow: "hidden" }}>
            {/* 1. HERO FIXE */}
            <div style={{ height: "45vh", position: "fixed", top: 0, left: 0, right: 0, "z-index": 100 }}>
                <Hero />
            </div>

            <Suspense fallback={<p>Initialisation des catégories...</p>}>
                <div
                    class="movies-list-container"
                    style={{ 
                        "position": "absolute",
                        "top": "0",
                        "left": "0",
                        "right": "0",
                        "z-index": "10", // Doit être supérieur au Hero
                        "padding-bottom": "100px",
                        "transition": "transform 0.5s cubic-bezier(0.2, 0, 0.2, 1)",
                        "transform": `translateY(${-(focus.rowIndex * 355.66) + VIEWPORT_OFFSET}px)` 
                    }}>
                    <For each={genres()}>
                        {(genre, index) => (
                            // On crée une rangée pour chaque genre retourné par l'API
                            <MovieRow title={genre.name} genreId={genre.id} rowIndex={index()} />
                        )}
                    </For>
                </div>
            </Suspense>
        </main>
    );
}

export default Home;