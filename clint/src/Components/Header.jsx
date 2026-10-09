import React, { useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { img } from "motion/react-client";

const Header = () => {
  const { input, setInput } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput("");
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="" className="w-2.5" />
        </div>
        <h1 className="text-3xl sm:text-6xl  font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary">blogging</span> <br />{" "}
          platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          This is a space to think out loud, to share what matters, and to write
          without filters. wheather it's one word or thousand your story starts
          here.
        </p>

        <form
          onSubmit={(e) => {
            onSubmitHandler(e);
          }}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search for blogs"
            className="w-full pl-4 outline-none"
            required
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 m-1.5 rounded hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
          >
            {" "}
            {input.trim() === "" ? (
              // search icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <circle cx="11" cy="11" r="7" />{" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20 20-4-4"
                />
              </svg>
            ) : (
              // cross icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6 6 18"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
