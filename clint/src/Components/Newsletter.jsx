import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 max-sm:px-10 ">
      <h1 className="md:text-4xl text-2xl font-semibold">Never miss a Blog!</h1>
      <p className="md-text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest blog, new tecg, and exclusive news.
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 max-sm:scale-75">
        <input
          type="text"
          placeholder="Enter your e-mail id"
          required
          className=" border bordeer-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
        />
        <button
          type="submit"
          className="max-sm:px-4 md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
