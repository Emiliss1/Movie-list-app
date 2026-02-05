import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "../App.css";
import axios from "axios";
import { Search } from "./Search";
import { Favorites } from "./Favorites";

function App() {
  const [component, setComponent] = useState(<Search />);
  const [activeComp, setActiveComp] = useState("search");

  return (
    <div className="flex flex-col min-h-screen grow">
      <div className="w-5/6 sm:w-96 rounded-sm py-1 flex items-center justify-center mt-20 bg-orange-400 h-max mx-auto">
        <h1 className="text-center text-6xl  text-orange-100 ">Movie List</h1>
      </div>
      <div className="w-11/12 lg:w-[1000px] bg-white h-max pb-4 mb-28 mx-auto mt-10">
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 items-center border-b-2 border-orange-300 w-11/12 mx-auto py-4 justify-around">
          <button
            onClick={() => {
              setComponent(<Search />);
              setActiveComp("search");
            }}
            className={`w-5/6 sm:w-52 h-12 text-xl font-bold text-orange-400 bg-stone-100 ${
              activeComp === "search" && "border-l-6"
            } rounded-sm  cursor-pointer hover:scale-101`}
          >
            Search movies
          </button>
          <button
            onClick={() => {
              setComponent(<Favorites />);
              setActiveComp("fav");
            }}
            className={`w-5/6 sm:w-52 h-12 text-xl font-bold text-orange-400 ${
              activeComp === "fav" && "border-l-6"
            } bg-stone-100 rounded-sm cursor-pointer hover:scale-101`}
          >
            Favorites
          </button>
        </div>
        {component && component}
      </div>
      <div className="grow"></div>
      <footer className="bg-white py-12">
        <p className="text-lg text-zinc-800 pl-8">© Emilis Paškevičius</p>
      </footer>
    </div>
  );
}

export default App;
