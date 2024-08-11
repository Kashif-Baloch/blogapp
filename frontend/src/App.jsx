import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import AddBlogPage from "./pages/AddBlogPage";
import IsAdminPage from "./pages/IsAdminPage";
import ProfilePage from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<BlogsPage />} path="/blogs" />
        <Route element={<AddBlogPage />} path="/addblog" />
        <Route element={<ProfilePage />} path="/profile" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<IsAdminPage />} path="/admin" />
        <Route element={<BlogPage />} path="/blog/:blogId" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
