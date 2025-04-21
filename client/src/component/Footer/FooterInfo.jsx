import React from "react";
import { FooterData, ContactData } from "../../Data";
import SocialMedia from "../../utility/SocialMedia.jsx";

const FooterInfo = () => {
  const { branding, copyright, devSupport } = FooterData;
  const { email, number } = { ContactData };

  return (
    <div className="relative z-10 py-2 sm:py-6 md:py-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-emerald-400">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h3 className="text-2xl font-semibold tracking-wide mb-1 text-black">
          {branding.title}
        </h3>
        <p className="text-sm text-black/80">{branding.tagline}</p>
      </div>

      <div className="text-sm text-black/80 text-center md:text-left leading-snug">
        <p>{copyright.text}</p>
        <a
          href={copyright.privacyPolicy.link}
          className="underline hover:text-black"
        >
          {copyright.privacyPolicy.label}
        </a>
      </div>

      <div className="space-y-1 text-center md:text-left">
        {number && (
          <div>
            <a
              href={`tel:${number}`}
              className="hover:underline text-yellow-400"
            >
              {number}
            </a>
          </div>
        )}
        {email && (
          <div>
            <a
              href={`mailto:${email}`}
              className="hover:underline text-yellow-400"
            >
              {email}
            </a>
          </div>
        )}
      </div>

      <div>
        <SocialMedia />
      </div>

      <div className="flex flex-col items-center md:items-end text-black/80 text-center md:text-right">
        <span className="text-sm">{devSupport.label}</span>
        <span className="text-md font-semibold">{devSupport.name}</span>
      </div>
    </div>
  );
};

export default FooterInfo;
