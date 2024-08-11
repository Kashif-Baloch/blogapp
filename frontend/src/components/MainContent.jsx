import React, { useEffect, useState } from "react";
// import Nav from "./Nav";
import Carousel from "./Carousel";
import Sponser from "./Sponser";
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";

const MainContent = () => {
  const [blogs, setBlogs] = useState("");
  const { getBlogs, currentPage, setCurrentPage } = useGlobalContext();

  useEffect(() => {
    blogFetcher();
  }, []);

  const blogFetcher = async () => {
    const blogsData = await getBlogs();
    if (blogsData.status == 200) {
      setBlogs(blogsData.data.blogs);
    } else {
      setBlogs([]);
    }
  };

  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = blogs.slice(firstIndex, lastIndex);
  const npage = Math.ceil(blogs.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  const goToNextPage = () => {
    window.scrollTo(0, 0);
    if (currentPage !== npage) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    window.scrollTo(0, 0);
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  console.log(currentPage, npage);

  return (
    <div className="mt-32">
      {/* <Nav /> */}
      {/* <h1 className="text-purple-500 my-12 text-center text-2xl md:text-3xl font-bold ">
        Let's Know About Ideas By Reading
        <br /> These Intresting Blog
      </h1> */}
      <div className="container  mx-auto flex flex-wrap py-6">
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          {blogs ? (
            blogs.length < 1 ? (
              <div className="h-32 md:h-96 flex justify-center items-center">
                <p className="text-2xl font-bold text-center">No blogs found</p>
              </div>
            ) : (
              records.map((elem, index) => {
                return (
                  <article
                    key={index}
                    className="flex flex-col w-full shadow my-4"
                  >
                    <Link to={`/blog/${elem._id}`} className="hover:opacity-75">
                      <img
                        className="w-full h-[27rem]"
                        src={`http://localhost:3000/blogImages/${elem.image}`}
                      />
                    </Link>
                    <div className="bg-white flex flex-col justify-start p-6">
                      <Link
                        to={`/blog/${elem._id}`}
                        className="text-purple-700 text-sm font-bold uppercase pb-4"
                      >
                        {elem.category}
                      </Link>
                      <Link
                        to={`/blog/${elem._id}`}
                        className="text-3xl font-bold hover:text-gray-700 pb-4"
                      >
                        {elem.title.length > 42
                          ? `${elem.title.slice(0, 42)}...`
                          : elem.title}
                      </Link>
                      <p to={`/blog/${elem._id}`} className="text-sm pb-3">
                        By
                        <Link
                          to={`/blog/${elem._id}`}
                          className="font-semibold mx-1 hover:text-gray-800"
                        >
                          {elem.author.name}
                        </Link>
                        , Published on {new Date(elem.date).toLocaleString()}
                      </p>
                      <Link
                        to={`/blog/${elem._id}`}
                        dangerouslySetInnerHTML={{
                          __html: elem.bodycontent.slice(0, 180),
                        }}
                        className="pb-6"
                      ></Link>
                      <Link
                        to={`/blog/${elem._id}`}
                        className="uppercase text-gray-800 hover:text-black"
                      >
                        Continue Reading
                      </Link>
                    </div>
                  </article>
                );
              })
            )
          ) : (
            <article className="flex flex-col shadow my-4 animate-pulse">
              <a className="">
                <div className="w-full h-96 bg-gray-300 rounded"></div>
              </a>
              <div className="text-gray-300 flex flex-col justify-start p-6">
                <a className="text-gray-300 my-3 bg-gray-300 text-sm font-bold uppercase">
                  Technology
                </a>
                <a className="text-3xl my-3 font-bold text-gray-300 bg-gray-300 pb-4">
                  Lorem Ipsum Dolor Sit Amet Dolor Sit Amet
                </a>
                <p className="text-sm pb-3 my-3 text-gray-300 bg-gray-300"></p>
                <a className="pb-6 my-3 text-gray-300 bg-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula
                  lacus
                </a>
                <a className="uppercase text-gray-300 bg-gray-300">
                  Continue Reading
                </a>
              </div>
            </article>
          )}
          <div className="flex justify-center gap-6 items-center py-8">
            <a
              onClick={goToPrevPage}
              className={`${
                currentPage !== 1 ? "" : "pointer-events-none"
              } h-10 w-10 cursor-pointer border px-10 hover:bg-gray-200 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3`}
            >
              Prev
            </a>
            <a
              onClick={goToNextPage}
              className={`${
                currentPage !== npage ? "" : "pointer-events-none"
              } h-10 w-10 cursor-pointer border px-10 hover:bg-gray-200 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3`}
            >
              Next
            </a>
          </div>
        </section>

        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl font-semibold pb-5">About Us</p>
            <p className="pb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              mantis est eu odio sagittis tristique. Vestibulum ut finibus leo.
              In hac habitasse platea dictumst.
            </p>
            <a
              href="#"
              className="w-full bg-purple-800 text-white font-bold text-sm uppercase rounded hover:bg-purple-700 flex items-center justify-center px-2 py-3 mt-4"
            >
              Get to know us
            </a>
          </div>

          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl font-semibold pb-5">Instagram</p>
            <div className="grid grid-cols-3 gap-3">
              <img className="hover:opacity-75" src="/p2.jpg" />
              <img className="hover:opacity-75" src="/p1.jpg" />
              <img className="hover:opacity-75" src="/p2.jpg" />
              <img className="hover:opacity-75" src="/p1.jpg" />
              <img className="hover:opacity-75" src="/p3.jpg" />
              <img className="hover:opacity-75" src="/p1.jpg" />
              <img className="hover:opacity-75" src="/p2.jpg" />
              <img className="hover:opacity-75" src="/p1.jpg" />
              <img className="hover:opacity-75" src="/p3.jpg" />
            </div>
            <a
              href="#"
              className="w-full bg-purple-800 text-white font-bold text-sm uppercase rounded hover:bg-purple-700 flex items-center justify-center px-2 py-3 mt-6"
            >
              Follow
            </a>
          </div>
        </aside>
      </div>
      <Sponser />
      <Carousel />
    </div>
  );
};

export default MainContent;
