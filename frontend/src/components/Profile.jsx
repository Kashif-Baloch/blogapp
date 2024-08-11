import React, { useEffect, useState } from "react";
import Card from "./Card";
import Blogs from "./Blogs";
import Skelton from "./Skelton";
import { useGlobalContext } from "../context/context";

const Profile = () => {
  const [data, setData] = useState("");
  const [blogs, setBlogs] = useState("");
  const [secBlogs, setSecBlogs] = useState("");
  const { getUser, currentPage, setCurrentPage, deleteBlog } =
    useGlobalContext();

  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = blogs.slice(firstIndex, lastIndex);
  const npage = Math.ceil(blogs.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  const goToNextPage = () => {
    window.scrollTo(0, 600);
    if (currentPage !== npage) setCurrentPage(currentPage + 1);
  };

  const delete_blog = async (id, img) => {
    const resData = await deleteBlog(id, img);
    alert(resData.data.msg);
    fetchUserWithBlogs();
  };

  const goToPrevPage = () => {
    window.scrollTo(0, 600);
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const fetchUserWithBlogs = async () => {
    const resData = await getUser();
    if (resData.status == 200) {
      setData(resData.data.user);
      setBlogs(resData.data.blogs);
      setSecBlogs(resData.data.blogs);
      const categories = resData.data.blogs.map((elem) => elem.category);
      const uniqueCategories = [...new Set(categories)];
      localStorage.setItem("categories", JSON.stringify(uniqueCategories));
    } else {
      setData([]);
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchUserWithBlogs();
  }, []);

  const filterItems = async (item) => {
    if (item == "Clear Filter") {
      setBlogs(secBlogs);
    } else {
      const filteredBlogs = secBlogs.filter(
        (elem) => elem.category.toLowerCase() == item.toLowerCase()
      );
      setBlogs(filteredBlogs);
    }
  };

  const searchFilter = async (e) => {
    const result = blogs.filter((elem) => {
      return elem.title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    e.target.value == "" ? setBlogs(secBlogs) : setBlogs(result);
  };

  return (
    <div className="mt-[5rem]">
      <Card userData={data} userBlogs={blogs} />

      {data ? (
        <Blogs
          auth={true}
          type={"profile"}
          delete_blog={delete_blog}
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

export default Profile;
