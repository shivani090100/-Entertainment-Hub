import axios from "axios";
import React, { useState, useEffect } from "react";

import CustomPagination from "../../components/CustomPagination/CustomPagination";
import Genres from "../../components/Genres";
import TrendingContent from "../../components/TrendingContent/TrendingContent";
import useGenres from "../../Hooks/useGenres";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenres(selectedGenres);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
      )
      .then((res) =>
        setMovies(res.data.results, setNumOfPages(res.data.total_pages))
      )
      .catch((error) => console.log(error));
  }, [page, genreForURL]);

  return (
    <>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        genres={genres}
        setSelectedGenres={setSelectedGenres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {movies &&
          movies.map((c) => (
            <TrendingContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};

export default Movies;
