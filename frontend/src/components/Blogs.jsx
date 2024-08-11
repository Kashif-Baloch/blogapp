import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Blogs = ({
  searchFilter,
  type,
  records,
  filterItems,
  delete_blog,
  auth,
}) => {
  const uniqueCate = localStorage.getItem("categories");
  const uniqueCategories = JSON.parse(uniqueCate);
  return (
    <div>
      <div className="relative container mx-auto mt-[5rem] px-6 pt-16 pb-20 lg:px-5 lg:pt-24 lg:pb-16">
        <div className="absolute inset-0">
          <div className="h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Column me neatly.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              This is your life and it's ending one minute @ a time...
            </p>
          </div>
          <div className="my-5 flex items-center flex-wrap gap-2 justify-between">
            <input
              type="text"
              className="p-2 mb-1 rounded-md border outline-none"
              placeholder="Search Here"
              onChange={searchFilter}
            />
            <div className="group relative">
              <a className="bg-gray-200 py-2 cursor-pointer px-10 w-full">
                Filter By
              </a>
              <ul className="bg-gray-200 border-t border-black mt-1 hidden group-hover:flex p-3 flex-col items-start justify-center gap-3 absolute z-50 w-full">
                {uniqueCategories.map((elem, index) => {
                  return (
                    <li
                      key={index}
                      className="border-b border-gray-300 cursor-pointer hover:text-purple-600"
                      onClick={() => {
                        filterItems(elem);
                      }}
                    >
                      {elem}
                    </li>
                  );
                })}
                <li
                  className="border-b border-gray-300 cursor-pointer hover:text-purple-600"
                  onClick={() => {
                    filterItems("Clear Filter");
                  }}
                >
                  Clear Filter
                </li>
              </ul>
            </div>
          </div>

          {records.length < 1 ? (
            <div className="flex h-[40rem] my-16 gap-5 items-center justify-center flex-col">
              <img
                className="w-[30rem] sm:w-[20rem] lg:w-[30rem] drop-shadow-xl"
                src="/Empty-folder.svg"
                alt=""
              />
              <h1 className="text-center text-xl sm:text-3xl">
                {type !== "profile"
                  ? "Oops Blogs Will be Uploaded later"
                  : "Oops You have not uploaded any Blog"}
              </h1>
            </div>
          ) : (
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {records.map((elem) => {
                return (
                  <div
                    key={elem._id}
                    className="flex flex-col mt-4 max-w-[98%] overflow-hidden rounded-lg shadow-lg"
                  >
                    <div className="flex-shrink-0">
                      <Link to={`/blog/${elem._id}`}>
                        <img
                          className="h-48 w-full object-cover"
                          src={`http://localhost:3000/blogImages/${elem.image}`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-purple-600">
                          <Link
                            to={`/blog/${elem._id}`}
                            className="hover:underline"
                          >
                            {elem.category}
                          </Link>
                        </p>
                        <div className="mt-2 block">
                          <Link
                            to={`/blog/${elem._id}`}
                            className="text-xl font-semibold text-gray-900"
                          >
                            {elem.title.length > 42
                              ? `${elem.title.slice(0, 42)} ....`
                              : elem.title}
                          </Link>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: `${elem.bodycontent.slice(0, 180)} ....`,
                            }}
                            className="mt-3 h-36 overflow-hidden text-base text-gray-500 text-ellipsis"
                          ></p>
                        </div>
                      </div>
                      {auth && (
                        <div className="flex gap-2">
                          <span
                            onClick={() => {
                              delete_blog(elem._id, elem.image);
                            }}
                            className="border rounded-sm p-1 cursor-pointer hover:bg-gray-100"
                          >
                            <MdDelete size={25} />
                          </span>
                        </div>
                      )}
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <span className="sr-only">{elem.author.name}</span>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`http://localhost:3000/userImages/${elem.author.image}`}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {elem.author.name}
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime="2020-03-16">
                              {new Date(elem.date).toLocaleString()}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
