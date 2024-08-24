import React, {useEffect, useState} from "react";
import {popularMovie, searchMovies} from "../services/media.service";
import {MovieCard} from "../components/movie-card/movie-card";
import {Media, MediaList} from "../models/media";
import {useSearchMedia} from "../context/search-media-provider";
import {map} from "lodash";


export const HomePage = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [movies, setMovies] = useState<Media[]>([]);
  const [searchMedia] = useSearchMedia();


  useEffect(() => {
    const popularMedia = async () => {
      const { results }: MediaList<Media> = await popularMovie();
      setMovies(results);
      setTitle("Popular Productions");
    };
    popularMedia().catch((e)=>console.log(e))
  }, []);
  useEffect(() => {
    const searchMovie = async () => {
      const { results }: MediaList<Media> = await searchMovies(searchMedia);
      setTitle(`Results for ${searchMedia}`);
      setMovies(results);
    };
    if(searchMedia.length>0){
      searchMovie().catch((e)=>console.log(e))
    }

  }, [searchMedia]);
  return (
    <div data-cy="home-page" data-testid="home-page">
      <h2 data-cy="home-title" className="mb-10 text-center text-3xl text-stone-700 dark:text-white">
        {title}
      </h2>
        {movies?.length > 0 ? (
            <div data-cy="home-movies" className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {map(movies,(media) => (
                  <MovieCard media={media} key={media.id} />
              ))}
            </div>
        ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
        )}
    </div>
  );
};
