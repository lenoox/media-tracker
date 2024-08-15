import React, {useEffect, useState} from "react";
import {getAllCategories, getMovieByCategory,} from "../services/media.service";
import {MovieCard} from "../components/movie-card/movie-card";
import {Categories, CategoriesResponse, CategoryMediaList, Media, MediaList, MediaRequest,} from "../models/media";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {map} from "lodash";

export async function mediaByCategoriesLoader({
  params: { categoryId },
}: LoaderFunctionArgs<MediaRequest>): Promise<
  CategoryMediaList<MediaList<Media>>
> {
  return await getMovieByCategory(categoryId).then(
    (response: MediaList<Media>) => {
      const data: CategoryMediaList<MediaList<Media>> = {
        categoryId: categoryId,
        data: response,
      };
      return data;
    }
  );
}

export const Category = () => {
  const {
    categoryId,
    data: { results },
  } = useLoaderData() as CategoryMediaList<MediaList<Media>>;

  const [title, setTitle] = useState<string | undefined>(undefined);
  const getCategories = async (categoryId: string): Promise<void> => {
    const data: CategoriesResponse<Categories> = await getAllCategories();
    const currentCategory = data.genres.find((data) => data.id === +categoryId);
    setTitle(currentCategory?.name);
  };

  useEffect(() => {
    if (categoryId) {
      getCategories(categoryId).catch((e) => console.log(e));
    }
  }, [categoryId]);

  return (
    <>
      <h2 className="mb-10 text-center text-3xl text-stone-700 dark:text-white">
        {title}
      </h2>
      {results?.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {map(results,(media) => (
            <MovieCard media={media} key={media.id} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </>
  );
};
