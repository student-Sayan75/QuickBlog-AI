import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px- mt-20 md:px-16 max-md:px-8 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="mt-6 max-w-102.5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illo
            quod voluptates doloribus facilis suscipit obcaecati explicabo, cum
            laborum ad, natus sequi atque? Magnam autem repellat cum nemo
            mollitia dolor laboriosam voluptates quasi dolorem.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 ">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/50">
        Copyright 2026 &copy; Sayan Ali Mallick | Quickblog - All Rights
        Reserved{" "}
      </p>
    </div>
  );
};

export default Footer;
