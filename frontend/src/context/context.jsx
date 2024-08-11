import { createContext, useContext, useState } from "react";
import axios from "axios";

const StateContext = createContext();

const StateProvider = (props) => {
  const [token, setToken] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const signUser = async (name, email, password, role, image, isAdmin) => {
    try {
      let bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("email", email);
      bodyFormData.append("password", password);
      bodyFormData.append("role", role);
      bodyFormData.append("image", image);
      bodyFormData.append("isAdmin", isAdmin);
      const sent_info = await axios({
        method: "POST",
        url: `http://localhost:3000/routes/users/signup`,
        data: bodyFormData,
      });
      sent_info?.status == 200 ? setToken(!token) : null;
      return sent_info;
    } catch (error) {
      return error.response;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const sent_info = await axios({
        method: "POST",
        url: `http://localhost:3000/routes/users/login`,
        data: { email, password },
      });
      sent_info?.status == 200 ? setToken(!token) : null;
      return sent_info;
    } catch (error) {
      return error.response;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(!token);
  };

  const sentMsg = async (name, email, msg) => {
    try {
      const sent_info = await axios({
        method: "POST",
        url: `http://localhost:3000/routes/msg/addmsg`,
        data: { name, email, msg },
      });
      return sent_info;
    } catch (error) {
      return error.response;
    }
  };

  const addBlog = async (image, title, bodycontent, category) => {
    try {
      let bodyFormData = new FormData();
      bodyFormData.append("image", image);
      bodyFormData.append("title", title);
      bodyFormData.append("bodycontent", bodycontent);
      bodyFormData.append("category", category);
      const sent_info = await axios({
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        url: `http://localhost:3000/routes/blogs/addblog`,
        data: bodyFormData,
      });
      console.log(sent_info);
      return sent_info;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  const getBlogs = async () => {
    try {
      const data = await axios({
        method: "GET",
        url: `http://localhost:3000/routes/blogs/getblogs`,
      });
      return data;
    } catch (error) {
      return error.response;
    }
  };

  const getBlog = async (id) => {
    try {
      const data = await axios({
        method: "GET",
        params: { id: id },
        url: `http://localhost:3000/routes/blogs/getblog/?id=${id}`,
      });
      return data;
    } catch (error) {
      return error.response;
    }
  };

  const filterBlogs = async (item) => {
    try {
      const data = await axios({
        method: "GET",
        url: `http://localhost:3000/routes/blogs/filterblogs/?filterItem=${item}`,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  const getUser = async (item) => {
    try {
      const data = await axios({
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        url: `http://localhost:3000/routes/users/getuser`,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  const deleteBlog = async (id, img) => {
    try {
      const data = await axios({
        method: "DELETE",
        url: `http://localhost:3000/routes/blogs/deleteblog?id=${id}`,
        data: { id, img },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  return (
    <StateContext.Provider
      value={{
        token,
        currentPage,
        getUser,
        deleteBlog,
        setCurrentPage,
        filterBlogs,
        signUser,
        loginUser,
        handleLogout,
        sentMsg,
        addBlog,
        getBlogs,
        getBlog,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(StateContext);
};

export { StateProvider, useGlobalContext };
