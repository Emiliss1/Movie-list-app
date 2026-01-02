import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import noImage from "./assets/noimage.jpg";

export function Search() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [expandTitle, setExpandTitle] = useState({ index: "", open: false });
  const [movie, setMovie] = useState();
  const [storageMovies, setStorageMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const movs = JSON.parse(localStorage.getItem("favorites"));
    if (movs) {
      setStorageMovies(movs);
    } else {
      setStorageMovies([]);
    }
    console.log("stor", movs);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(storageMovies);
    setIsLoading(true);
    if (search.trim(" ")) {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${search}&apikey=${
            import.meta.env.VITE_API_KEY
          }`
        );

        if (response.data.Response === "False") {
          setMovies();
          setIsLoading(false);
        } else {
          // const newResponse = response.data.Search.map((res, index) => {
          //   console.log("res", res);
          //   const image = new Image();
          //   image.src = res.Poster;
          //   if (image.width > 0) {
          //     return res;
          //   }
          // });
          // console.log(response);
          // console.log("neww", response.data.Search);

          // setMovies(newResponse);
          // console.log(movies);
          setMovies(response.data.Search);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setMovies();
        setIsLoading(false);
      }
    } else {
      setMovies([]);
      setIsLoading(false);
    }
  };

  const handleSetFavorite = (movie) => {
    console.log("storageeeeee", storageMovies);

    const data = [...storageMovies, movie];
    console.log("data", data);

    if (storageMovies) {
      setStorageMovies((prev) => [movie, ...prev]);
    } else {
      setStorageMovies([movie]);
    }
    console.log("storageeeeee", storageMovies);

    localStorage.setItem("favorites", JSON.stringify(data));
  };

  const handleRemoveMovie = (movie) => {
    const data = storageMovies.filter((mov) => mov.imdbID !== movie.imdbID);
    if (data.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(data));
      setStorageMovies(data);
    } else {
      localStorage.removeItem("favorites");
      setStorageMovies([]);
    }
    console.log("storagasdsad", storageMovies);

    console.log("storag", data);
  };

  return (
    <div className="mx-auto w-11/12  mt-4">
      <form onSubmit={handleSearch} className="w-full flex items-center gap-2">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-2 text-orange-500 text-lg h-10 bg-stone-100 rounded-sm"
          type="text "
        />
        <button
          className="w-32 h-9 bg-orange-400 text-orange-100 text-lg rounded-sm cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <div className="mx-auto flex text-orange-500 justify-center items-center mt-8">
          <svg
            class=" size-7 animate-spin bg-transparent  "
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25 fill-transparent"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 justify-self-center gap-14  lg:grid-cols-3 gap-y-8">
          {movies?.length > 0 ? (
            movies.map((movie, index) => (
              <div
                key={index}
                className="w-60 sm:w-64 h-108 flex flex flex-col gap-2 py-4 px-4 bg-stone-100"
              >
                <div
                  onClick={
                    movie.Title.length > 20
                      ? () => setExpandTitle({ index, open: !expandTitle.open })
                      : () => setExpandTitle({ index, open: false })
                  }
                  className={`w-50 sm:w-56 ${
                    expandTitle.index === index && expandTitle.open
                      ? "max-h-96"
                      : "max-h-10"
                  } py-1.5 px-2 overflow-hidden  ease-in-out transition-[max-height] duration-1000 bg-orange-400 absolute -ml-8 -mt-8 ${
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

                <img
                  className="w-48 max-h-70 mx-auto"
                  src={movie?.Poster}
                  alt={movie.Poster}
                  onError={(e) => (e.target.src = noImage)}
                />
                <p className="text-lg">
                  Type:{" "}
                  <span className="text-orange-400 font-bold">
                    {movie.Type}
                  </span>
                </p>
                <p className="text-lg">
                  Year:{" "}
                  <span className="text-orange-400 font-bold">
                    {movie.Year}
                  </span>
                </p>
                {storageMovies.some((mov) => mov?.imdbID === movie.imdbID) &&
                storageMovies.length > 0 &&
                movies?.length > 0 ? (
                  <button
                    onClick={() => {
                      handleRemoveMovie(movie);
                    }}
                    className="w-10 mt-auto rounded-sm cursor-pointer text-orange-400 h-10 flex items-center justify-center bg-zinc-200 group"
                  >
                    <MdFavorite className="text-2xl group-hover:scale-110" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleSetFavorite(movie);
                    }}
                    className="w-10 mt-auto rounded-sm cursor-pointer text-zinc-700 h-10 flex items-center justify-center bg-zinc-200 hover:text-orange-400"
                  >
                    <MdFavoriteBorder className="text-2xl" />
                  </button>
                )}
              </div>
            ))
          ) : !movies ? (
            <div className="col-span-4 text-xl text-orange-400 text-center">
              <p>Movie not found</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="col-span-4 text-xl text-orange-400 text-center">
              {" "}
              <p>Search for movies</p>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
