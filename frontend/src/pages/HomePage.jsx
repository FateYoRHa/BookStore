import { useState } from "react";
import { Link } from "react-router";

import NavBar from "./components/NavBar";
import RateLimitedUI from "./components/RateLimitedUI";
import Carousel from "./components/Carousel";
const HomePage = () => {
  const { isRateLimited, setIsRateLimited } = useState(true);
  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimitedUI />}

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="carousel w-5xl h-100">
            <Carousel />
          </div>

          <div className="mx-auto text-center">
            <h1 className="text-5xl font-bold font-serif">
              "Discover Your Next Favorite Book"
            </h1>
            <p className="py-6 font-sans">Curated reads for curious minds</p>
            <div className="float-end justify-content">
              <button className="btn btn-primary">Shop Now</button>
              <Link className="py-5 pl-5 link">Discover Categories</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
