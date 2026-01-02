import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import noImage from "./assets/noimage.jpg";

export function Favorites() {
  const [movies, setMovies] = useState([]);
  const [expandTitle, setExpandTitle] = useState({ index: "", open: false });
  const [movieData, setMovieData] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [lastPage, setLastPage] = useState();
  const [removedMovie, setRemovedMovie] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites"));
    setMovieData(data);
    setMovies(pagination(data).items);
  }, [curPage, removedMovie]);

  const removeFavorite = (movie) => {
    const filteredMovies = movieData.filter(
      (mov) => mov.imdbID !== movie.imdbID
    );

    localStorage.setItem("favorites", JSON.stringify(filteredMovies));
    setRemovedMovie(!removedMovie);
  };

  const pagination = (moviesData) => {
    const itemsPerPage = 4;
    const totalPages = Math.ceil(moviesData.length / itemsPerPage);
    const items = [];
    for (
      let i = curPage * itemsPerPage;
      i < itemsPerPage * (curPage + 1);
      i++
    ) {
      if (moviesData[i]) {
        items.push(moviesData[i]);
      }
    }

    if (totalPages < curPage + 1) {
      if (curPage === 0) {
        setCurPage(0);
      } else {
        setCurPage((prev) => prev - 1);
      }
    }

    setLastPage(totalPages);

    return {
      items,
    };
  };

  const handlePagination = (type) => {
    if (type === "next") {
      if (curPage + 1 < lastPage) {
        setCurPage((prev) => prev + 1);
      }
    }
    if (type === "prev") {
      if (curPage > 0) {
        setCurPage((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 gap-8">
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <div
            className="w-9/12 h-max flex flex flex-col gap-2 py-4 px-4 bg-stone-100"
            key={index}
          >
            <div
              className={`max-w-[500px] lg:max-w-[700px]  h-max py-1.5 sm:block hidden px-2 overflow-hidden  ease-in-out transition-[max-height] duration-1000 bg-orange-400 absolute -ml-8 -mt-8`}
            >
              {" "}
              <p className="text-orange-100 flex text-xl font-bold ">
                {movie.Title}
              </p>
            </div>
            <div
              onClick={
                movie.Title.length > 20
                  ? () => setExpandTitle({ index, open: !expandTitle.open })
                  : () => setExpandTitle({ index, open: false })
              }
              className={`w-56 ${
                expandTitle.index === index && expandTitle.open
                  ? "max-h-96"
                  : "max-h-10"
              } py-1.5 px-2 overflow-hidden block sm:hidden ease-in-out transition-[max-height] duration-1000 bg-orange-400 absolute -ml-8 -mt-8 ${
                movie.Title.length > 20 && "cursor-pointer hover:scale-101"
              }`}
            >
              <p className={`text-orange-100 flex text-xl font-bold `}>
                {movie.Title.length > 20 && (
                  <span>
                    <MdExpandMore className="text-3xl" />
                  </span>
                )}{" "}
                {movie.Title}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-20 mt-4">
              <img
                className="w-48 max-h-70 mx-auto sm:mx-0"
                src={movie?.Poster}
                alt={movie.Poster}
                onError={(e) => (e.target.src = noImage)}
              />
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl">
                  Type:{" "}
                  <span className="text-orange-400 font-bold">
                    {movie.Type}
                  </span>
                </p>
                <p className="text-xl">
                  Year:{" "}
                  <span className="text-orange-400 font-bold">
                    {movie.Year}
                  </span>
                </p>
              </div>
              <button
                onClick={() => removeFavorite(movie)}
                className="w-5/6 sm:w-32  mx-auto h-10 border-2 border-zinc-600 text-zinc-600 text-lg rounded-sm mt-auto ml-auto flex items-center justify-center gap-2 cursor-pointer hover:border-orange-400 hover:text-orange-400"
              >
                <span>
                  <MdFavorite className="text-orange-400 text-xl" />
                </span>
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>You have no favorite movies</p>
        </div>
      )}
      {movies.length > 0 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePagination("prev")}
            className="w-9 h-9 bg-orange-400 text-orange-100 flex items-center justify-center text-3xl rounded-sm cursor-pointer hover:bg-orange-500"
          >
            <MdNavigateBefore />
          </button>
          <p className="text-orange-400 text-xl">
            {curPage + 1}/{lastPage}
          </p>
          <button
            onClick={() => handlePagination("next")}
            className="w-9 h-9 bg-orange-400 text-orange-100 flex items-center justify-center text-3xl rounded-sm cursor-pointer hover:bg-orange-500"
          >
            <MdNavigateNext />
          </button>
        </div>
      )}
    </div>
  );
}
