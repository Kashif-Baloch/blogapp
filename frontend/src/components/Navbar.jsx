import React, { useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, handleLogout, setCurrentPage } = useGlobalContext();

  const [checkAdmin, setCheckAdmin] = useState({
    isAdmin: false,
    isAuthentic: false,
  });
  const handleNav = () => {
    const menu = document.querySelector("#menu");
    menu.classList.toggle("hidden");
  };

  const handleLog = () => {
    handleLogout();
    setCheckAdmin(false);
    navigate("/");
  };

  useEffect(() => {
    const decodedToken = localStorage.getItem("token")
      ? decodeToken(localStorage.getItem("token"))
      : null;
    if (decodedToken) {
      setCheckAdmin({
        isAdmin: decodedToken.isAdmin,
        isAuthentic: true,
      });
    }
  }, [token]);

  // useEffect(() => {
  //   document.addEventListener("click", (e) => {
  //     console.log(e.target);
  //     if (!e.target.classList.contains("menu-button")) {
  //       document.querySelector("#menu").classList.add("hidden");
  //     } else {
  //       document.querySelector("#menu").classList.remove("hidden");
  //     }
  //   });

  //   return () => {
  //     window.removeEventListener("click", () => {});
  //   };
  // }, []);

  return (
    <header>
      <nav
        className="
        shadow-md
          flex flex-wrap
          items-center
          justify-between
          fixed
          top-0
          left-0
          w-full
          py-4
          md:py-3
          px-8
          text-lg text-gray-700
          bg-white
          backdrop-filter
          backdrop-blur-3xl
          bg-opacity-60
          firefox:bg-opacity-60
          z-50
        "
      >
        <div>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
              setCurrentPage(1);
            }}
            to={"/"}
          >
            <FaBlog className="text-4xl md:text-6xl" />
          </Link>
        </div>

        <div id="menu-button" className="md:hidden" onClick={handleNav}>
          <FiAlignJustify className="menu-button" size={30} />
        </div>

        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="menu"
        >
          <ul
            className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
          >
            <li>
              <Link
                onClick={() => {
                  handleNav;
                  window.scrollTo(0, 0);
                  setCurrentPage(1);
                }}
                to={"/"}
                className="md:p-4 py-2 block hover:text-purple-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleNav;
                  window.scrollTo(0, 0);
                  setCurrentPage(1);
                }}
                to={"/blogs"}
                className="md:p-4 py-2 block hover:text-purple-400"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleNav;
                  window.scrollTo(0, 0);
                  setCurrentPage(1);
                }}
                to={"/contact"}
                className="md:p-4 py-2 block hover:text-purple-400"
              >
                Contact
              </Link>
            </li>
            {checkAdmin.isAdmin && (
              <li>
                <Link
                  onClick={() => {
                    handleNav;
                    window.scrollTo(0, 0);
                    setCurrentPage(1);
                  }}
                  to={"/admin"}
                  className="md:p-4 py-2 block hover:text-purple-400"
                >
                  Admin
                </Link>
              </li>
            )}
            {checkAdmin.isAuthentic ? (
              <div className="md:flex">
                <li>
                  <Link
                    onClick={() => {
                      handleNav;
                      window.scrollTo(0, 0);
                      setCurrentPage(1);
                    }}
                    to={"/addblog"}
                    className="md:p-4 py-2 block hover:text-purple-400"
                  >
                    Add Blog
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      handleNav;
                      window.scrollTo(0, 0);
                      setCurrentPage(1);
                    }}
                    to={"/profile"}
                    className="md:p-4 py-2 block hover:text-purple-400"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLog();
                      window.scrollTo(0, 0);
                      setCurrentPage(1);
                    }}
                    className="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  >
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <div className="md:flex">
                <li>
                  <Link
                    onClick={() => {
                      handleNav;
                      window.scrollTo(0, 0);
                      setCurrentPage(1);
                    }}
                    to={"/login"}
                    className="md:p-4 py-2 block hover:text-purple-400"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      handleNav;
                      window.scrollTo(0, 0);
                      setCurrentPage(1);
                    }}
                    to={"/signup"}
                    className="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  >
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
