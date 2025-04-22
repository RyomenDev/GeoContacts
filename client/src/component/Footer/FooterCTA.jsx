import React from "react";
import { FooterData } from "../../Data";
import { Link } from "react-router-dom";


const FooterCTA = () => {
  const { heading, description, buttonData } = FooterData.cta;

  return (
    <>
      {/* <div className="relative z-10 text-center py-2 sm:py-5 md:py-7 px-4  bg-emerald-200/70"> */}
      <div className="relative z-10 text-center py-2 sm:py-5 md:py-7 px-4 bg-gradient-to-br from-green-950/90 via-emerald-950/70 to-gray-900/80  text-white">
        <h2 className="text-4xl font-bold mb-4 tracking-wide  drop-shadow-lg">
          {heading}
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base mb-6 ">
          {description}
        </p>
        <Link to={buttonData?.Path}>
          <button className="bg-white text-[#2ecc71] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
            {buttonData.Text}
          </button>
        </Link>
      </div>
    </>
  );
};

export default FooterCTA;
