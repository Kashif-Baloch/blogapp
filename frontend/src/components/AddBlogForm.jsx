import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useGlobalContext } from "../context/context";

const AddBlogForm = () => {
  const [content, setContent] = useState({
    image: "",
    title: "",
    category: "",
    description: "",
  });
  const { addBlog } = useGlobalContext();

  // Handles input changes for the blog post content.
  const handleChange = (e) => {
    if (e.target.name == "image") {
      setContent({ ...content, [e.target.name]: e.target.files[0] });
    } else {
      setContent({ ...content, [e.target.name]: e.target.value });
    }
  };

  // Handles the submission of the blog post.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.description) {
      alert("description is necessary");
    } else {
      const response = await addBlog(
        content.image,
        content.title,
        content.description,
        content.category
      );

      alert(response.data.msg);
    }
  };

  console.log(content);

  return (
    <div>
      <div className="mt-[9rem] list-disc mb-[5rem]">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="flex-1 items-center max-w-screen-sm mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
                    <div className="relative w-full">
                      <div className="items-center justify-center max-w-xl mx-auto">
                        <label
                          className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                          id="drop"
                        >
                          <span className="flex items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <span className="font-medium text-gray-600">
                              Drop files to Attach, or
                              <span className="text-blue-600 underline ml-[4px]">
                                browse
                              </span>
                            </span>
                          </span>
                          <input
                            type="file"
                            name="image"
                            className="hidden"
                            required
                            accept="*"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="text-xl text-gray-600">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 outline-purple-600 transition-all border-gray-300 p-2 w-full"
                    name="title"
                    id="title"
                    value={content.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="text-xl text-gray-600">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 outline-purple-600 transition-all border-gray-300 p-2 w-full"
                    name="category"
                    id="category"
                    value={content.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="description"
                    className="text-xl text-gray-600"
                  >
                    Content <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <Editor
                    name="description"
                    id="description"
                    containerProps={{
                      style: {
                        resize: "vertical",
                        height: "400px",
                        background: "white",
                        color: "black",
                      },
                    }}
                    value={content.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-center items-center p-1">
                  <button
                    role="submit"
                    className="p-2 px-6 transition-all border hover:bg-gray-200 text-gray-800 hover:text-gray-900"
                    required
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-[70%] mx-auto">
            <h1 className="font-bold text-3xl my-12">{content.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: content.description }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogForm;
