import React from "react";

const Carousel = () => {
  const img = [
    "cr1.jpg",
    "cr2.jpg",
    "cr3.jpg",
    "cr4.jpg",
    "cr5.jpg",
    "cr6.jpg",
  ];
  return (
    <div className="flex w-[60%] mx-auto flex-wrap items-center justify-center gap-4 px-1 my-10">
      {img.map((elem, index) => {
        return (
          <img
            key={index}
            className="md:w-[20%] w-[36%] rounded-md hover:opacity-75"
            src={elem}
          />
        );
      })}
    </div>
  );
};

export default Carousel;
