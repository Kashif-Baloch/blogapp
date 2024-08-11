import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const BlogPage = ({ request, params }) => {
  let { blogId } = useParams();
  const { getBlog } = useGlobalContext();
  const [blog, setBlog] = useState(false);

  const fetchABlog = async () => {
    const blog = await getBlog(blogId);
    blog.status == 200 ? setBlog(blog.data.blog) : setBlog(false);
  };

  useEffect(() => {
    fetchABlog();
  }, []);

  return (
    <div className="mt-[7rem] mb-6">
      <div className="w-[70%] mx-auto">
        {blog ? (
          <div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <span className="sr-only">{blog.author.name}</span>
                <img
                  className="h-16 w-16 object-cover object-left-top rounded-full"
                  src={`http://localhost:3000/userImages/${blog.author.image}`}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {blog.author.name}
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime="2020-03-16">
                    {new Date(blog.date).toLocaleString()}
                  </time>
                </div>
              </div>
            </div>
            <div>
              <img
                className="w-full my-10"
                src={`http://localhost:3000/blogImages/${blog.image}`}
                alt="Blog Image"
              />
              <div>
                <h1 className="mt-2 w-[80%] mx-auto text-2xl font-bold text-gray-900">
                  {blog.title}
                </h1>
                <p
                  className="my-10 w-[80%] mx-auto text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: blog.bodycontent }}
                ></p>
              </div>
            </div>
          </div>
        ) : (
          <h1>Wait for while</h1>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
