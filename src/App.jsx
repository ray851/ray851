import React from "react";
import BlogPost from "./BlogPost";

const blogData = {
  title: "My First Blog Post",
  date: "Published on April 17, 2025",
  content: (
    <>
      <p>
        Welcome to my blog! This is a simple post created using React and
        Tailwind CSS. Here, I'll be talking about how to create beautiful
        websites using modern web technologies.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Why React?</h2>
      <p>
        React is a popular JavaScript library for building user interfaces.
        It allows developers to build fast and scalable web applications with
        reusable components.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Why Tailwind CSS?</h2>
      <p>
        Tailwind CSS is a utility-first CSS framework that provides
        everything you need to design your website. It's easy to use and
        enables rapid prototyping.
      </p>
    </>
  ),
};

function App() {
  return (
    <div className="App">
      <BlogPost {...blogData} />
    </div>
  );
}

export default App;