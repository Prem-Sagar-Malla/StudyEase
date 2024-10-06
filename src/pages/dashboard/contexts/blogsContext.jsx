import React, { createContext, useContext, useState } from 'react';

const blogsContext = createContext();


export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (newBlogs) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlogs]);
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blg => blg.id === updatedBlog.id ? updatedBlog : blg));
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blg => blg.id !== id));
  };


  return (
    <blogsContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog }}>
      {children}
    </blogsContext.Provider>
  );
};

export const useBlogs = () => {
  return useContext(blogsContext);
};
