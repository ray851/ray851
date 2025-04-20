import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Sample blog post data
const blogPosts = [
  {
    id: "post-1",
    title: "My First Blog Post",
    date: "April 17, 2025",
    image: "/screenshot-20251.jpg",
    content: (
      <>
        <p>
          Welcome to my blog! This is a simple post created using React and Tailwind CSS.
          Here, I'll be talking about how to create beautiful websites using modern web technologies.
        </p>
        <h2 className="text-3xl font-semibold text-gray-800 mt-8">Why React?</h2>
        <p>
          React is a popular JavaScript library for building user interfaces. It allows developers to build fast and scalable web applications with reusable components.
        </p>
        <h2 className="text-3xl font-semibold text-gray-800 mt-8">Why Tailwind CSS?</h2>
        <p>
          Tailwind CSS is a utility-first CSS framework that provides everything you need to design your website. It’s fast to learn, highly customizable, and enables rapid prototyping.
        </p>
        <p>
          Tailwind helps make the development process more efficient and enjoyable, especially for beginners who want to focus more on the design and layout rather than spending time writing complex CSS.
        </p>
      </>
    ),
  },
  {
    id: "post-2",
    title: "Exploring JavaScript Tips",
    date: "April 18, 2025",
    image: "/script-js-25.jpg",
    content: (
      <>
        <p>
          JavaScript is everywhere! From client-side interactivity to full-stack applications with Node.js, its flexibility makes it powerful.
        </p>
        <p>
          In this post, we’ll share some lesser-known but useful tips to improve your JS workflow.
        </p>
      </>
    ),
  },
  {
    id: "post-3",
    title: "Why Tailwind Just Works",
    date: "April 19, 2025",
    image: "/tailwind-css-25.jpg",
    content: (
      <>
        <p>
          Tailwind CSS might look weird at first, but once you get the hang of it, you’ll wonder how you ever wrote CSS without it.
        </p>
        <p>
          Let’s explore how utility classes boost productivity and help maintain scalable UIs.
        </p>
      </>
    ),
  },
];

const BlogPost = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});
  const [isSubscribing, setIsSubscribing] = useState(false);
  const currentPost = blogPosts[currentIndex];

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, "comments"),
          where("postId", "==", currentPost.id)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());

        setComments((prev) => ({
          ...prev,
          [currentPost.id]: data,
        }));
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, [currentPost.id]);

  const currentComments = comments[currentPost.id] || [];

  const handleNameChange = (e) => setName(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "" || comment.trim() === "") return;

    const newComment = {
      postId: currentPost.id,
      name: name.trim(),
      text: comment.trim(),
      date: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "comments"), newComment);
      setComments((prev) => ({
        ...prev,
        [currentPost.id]: [...(prev[currentPost.id] || []), newComment],
      }));
      setName("");
      setComment("");
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentIndex < blogPosts.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <img
        src={currentPost.image}
        alt="Blog Header"
        className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
      />

      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
          {currentPost.title}
        </h1>
        <p className="text-lg text-gray-500 mt-4">
          Published on{" "}
          <span className="font-semibold text-indigo-600">{currentPost.date}</span>
        </p>
      </header>

      <div className="prose prose-lg text-gray-700 space-y-6 mb-8">
        {currentPost.content}
      </div>

      {/* Post Navigation */}
      <div className="flex justify-center items-center gap-4 mb-10">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded font-medium flex items-center gap-1 ${
            currentIndex === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          ← Previous
        </button>
        <span className="text-gray-700 font-medium">
          {currentIndex + 1} of {blogPosts.length}
        </span>
        <button
          onClick={goToNext}
          disabled={currentIndex === blogPosts.length - 1}
          className={`px-4 py-2 rounded font-medium flex items-center gap-1 ${
            currentIndex === blogPosts.length - 1
              ? "bg-indigo-300 text-white cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Next →
        </button>
      </div>

      {/* Comment Form */}
      <div id="commentForm" className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Add a Comment
        </h3>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Your name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your comment here..."
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Submit Comment
          </button>
        </form>
      </div>

      {/* Comments */}
      <div className="mt-10 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">Comments</h3>
        {currentComments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="space-y-4">
            {currentComments.map((comment, index) => (
              <li
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <p className="font-semibold text-indigo-600">{comment.name}</p>
                <p className="text-gray-700">{comment.text}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(comment.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Newsletter */}
      <div className="mt-16 bg-gray-50 p-6 rounded-lg shadow-inner text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Subscribe to our newsletter
        </h3>
        <p className="text-gray-600 mb-4">
          Get the latest posts delivered straight to your inbox.
        </p>
        <form
          onSubmit={() => setIsSubscribing(true)}
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-4 max-w-md mx-auto"
        >
          <input type="hidden" name="access_key" value="0bc6d6b8-0ae1-42b8-b308-b39719d90415" />
          <input type="hidden" name="subject" value="New Newsletter Signup" />
          <input type="hidden" name="from_name" value="My Blog" />
          <input type="hidden" name="redirect" value="visuopost.netlify.app" />
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
          <input
            type="email"
            name="email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Your email address"
          />
          <button
            type="submit"
            disabled={isSubscribing}
            className={`w-full py-2 rounded-lg transition ${
              isSubscribing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white`}
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500">
        <p>Thank you for reading!</p>
        <p className="text-sm text-gray-400">
          Published with Rayan B using React and Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default BlogPost;
