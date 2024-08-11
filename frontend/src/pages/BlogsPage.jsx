import React, { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import Skelton from "../components/Skelton";
import { useGlobalContext } from "../context/context";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState("");
  const [secBlogs, setSecBlogs] = useState("");
  const { getBlogs, currentPage, setCurrentPage, filterBlogs } =
    useGlobalContext();
  useEffect(() => {
    blogFetcher();
  }, []);

  const filterItems = async (item) => {
    if (item == "Clear Filter") {
      const blogsData = await getBlogs();
      if (blogsData.status == 200) {
        setBlogs(blogsData.data.blogs);
        setSecBlogs(blogsData.data.blogs);
      } else {
        setBlogs([]);
      }
    } else {
      const filteredBlogs = await filterBlogs(item);
      if (filteredBlogs.status == 200) {
        setBlogs(filteredBlogs.data.blogs);
        setSecBlogs(filteredBlogs.data.blogs);
      } else {
        setBlogs([]);
      }
    }
  };

  const recordsPerPage = 6;
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

  const blogFetcher = async () => {
    const blogsData = await getBlogs();
    if (blogsData.status == 200) {
      setBlogs(blogsData.data.blogs);
      setSecBlogs(blogsData.data.blogs);
      const categories = blogsData.data.blogs.map((elem) => elem.category);
      const uniqueCategories = [...new Set(categories)];
      localStorage.setItem("categories", JSON.stringify(uniqueCategories));
    } else {
      setBlogs([]);
    }
  };

  const searchFilter = async (e) => {
    // const blogsData = await getBlogs();
    // if (blogsData.status == 200) {
    const result = blogs.filter((elem) => {
      return elem.title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    e.target.value == "" ? setBlogs(secBlogs) : setBlogs(result);
    // } else {
    //   setBlogs([]);
    // }
  };

  return (
    <div>
      {blogs ? (
        <Blogs
          records={records}
          filterItems={filterItems}
          searchFilter={searchFilter}
        />
      ) : (
        <Skelton />
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
    </div>
  );
};

export default BlogsPage;
