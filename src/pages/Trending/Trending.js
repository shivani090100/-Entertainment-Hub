import React, { useState, useEffect } from "react";
import axios from "axios";
import TrendingContent from "../../components/TrendingContent/TrendingContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import "./Trending.css";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      .then((res) => setContent(res.data.results))
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((item, index) => {
            return (
              <TrendingContent
                key={index} 
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.first_air_date || item.release_date}
                media_type={item.media_type}
                vote_average={item.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage} />
    </>
  );
};

export default Trending;
