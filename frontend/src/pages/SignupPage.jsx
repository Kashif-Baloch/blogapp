import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { ImageIcon } from "lucide-react";
import { useGlobalContext } from "../context/context.jsx";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const { signUser } = useGlobalContext();
  const navigate = useNavigate();
  const [Image, setImage] = useState("");
  const imageRef = useRef("");
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    if (e.target.name == "image") {
      setCred({ ...cred, [e.target.name]: e.target.files[0] });
      buffer(e);
    } else if (e.target.name == "isAdmin") {
      setCred({
        ...cred,
        [e.target.name]: e.target.checked ? true : false,
      });
    } else {
      setCred({ ...cred, [e.target.name]: e.target.value });
    }
  };

  const buffer = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
    }
  };

  const setTheUserToAdminWithPass = () => {
    console.log(cred.isAdmin);
    setCred({ ...cred, isAdmin: !cred.isAdmin });
  };

  window.setTheUserToAdminWithPass = setTheUserToAdminWithPass;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signUser(
      cred.name,
      cred.email,
      cred.password,
      cred.role,
      cred.image,
      cred.isAdmin
    );

    if (user?.status == 200) {
      localStorage.setItem("token", user.data.token);
      alert(user.data.msg);
      navigate("/");
    } else {
      alert(user?.data.msg);
    }
  };

  return (
    <section>
      <div className="flex mt-[5rem] items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <FaBlog size={70} />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <NavLink
              to={"/login"}
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </NavLink>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div className="flex items-center justify-center">
                <img
                  onClick={() => {
                    imageRef.current.click();
                  }}
                  className={`${
                    Image ? "" : "hidden"
                  } border-blue hover:bg-gray-100 flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full border bg-white uppercase tracking-wide shadow-lg hover:text-gray-600`}
                  src={Image}
                  alt="Profile Image"
                />
                <label
                  className={`${
                    Image ? "hidden" : ""
                  } text-blue border-blue hover:bg-gray-100 flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full border bg-white uppercase tracking-wide shadow-lg hover:text-gray-600`}
                >
                  <ImageIcon />
                  <span className="mt-2 text-[13px] leading-normal">
                    Upload Image
                  </span>
                  <input
                    ref={imageRef}
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="name"
                    value={cred.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    id="name"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    name="email"
                    value={cred.email}
                    onChange={handleChange}
                    placeholder="Email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={cred.password}
                    onChange={handleChange}
                    name="password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="role"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Passion{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={cred.role}
                    onChange={handleChange}
                    name="role"
                    placeholder="Passion"
                    id="role"
                  ></input>
                </div>
              </div>
              {/* <div>
                <div className="flex flex-col">
                  <div className="my-2">
                    <label className="flex justify-between items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isAdmin"
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <span className="font-semibold text-gray-900 dark:text-gray-300">
                        Want to be a Author
                      </span>
                      <div className="relative w-11 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div> */}
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
