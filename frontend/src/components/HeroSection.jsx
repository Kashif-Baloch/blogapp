import React from "react";

const HeroSection = () => {
  return (
    <div className="md:mt-[13rem] mt-[8rem] gap-7 flex items-center justify-center flex-col">
      <h1 className="md:text-8xl text-[3rem] text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        KC BLOG
      </h1>
      <h1
        id="text"
        className="text-center text-[1.3rem] md:text-7xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-5xl font-black"
      >
        Want To Know About Things Happening In The World
      </h1>
    </div>
  );
};

export default HeroSection;
