import React from "react";

import Hero1 from "./components/hero1";
import Hero2 from "./components/hero2";
import Hero3 from "./components/hero3";
import Hero4 from "./components/hero4";
import Hero5 from "./components/hero5";

const Home = () => {
  return (
    <div className="container-fluid p-0 m-0">
      <Hero1 />
      <Hero2 />
      <Hero3 />
      {/* <Hero4 /> */}
      {/* <Hero5 /> */}
    </div>
  );
};

export default Home;
