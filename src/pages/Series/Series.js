import axios from "axios";
import React, { useState, useEffect } from "react";

import CustomPagination from "../../components/CustomPagination/CustomPagination";
import Genres from "../../components/Genres";
import TrendingContent from "../../components/TrendingContent/TrendingContent";
import useGenres from "../../Hooks/useGenres";
const Series = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenres(selectedGenres);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
      )
      .then((res) =>
      setSeries(res.data.results, setNumOfPages(res.data.total_pages))
      )
      .catch((error) => console.log(error));
  }, [page, genreForURL]);

  return (
    <>
      <span className="pageTitle">TV Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        genres={genres}
        setSelectedGenres={setSelectedGenres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {series &&
          series.map((item, index) => {
            return (
              <TrendingContent
                key={index}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.first_air_date || item.release_date}
                media_type="tv"
                vote_average={item.vote_average}
              />
            );
          })}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};

export default Series;
