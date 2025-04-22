import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroImg from "../../assets/images/MDesign.png";

const roles = [
  "Contractor",
  "Geo Technician",
  "Home Owner",
  "Referral Partner",
  "Affiliate",
  "Community Partner",
];

const SmallHeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[33vh] bg-black text-white overflow-hidden">
      <img
        src={HeroImg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
      />
      <div className="absolute inset-0 bg-emerald-700 opacity-20" />
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70" /> */}

      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          GeoContacts
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base text-white/80 max-w-xl mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Connecting people by purpose, profession, and place.
        </motion.p>

        <motion.div
          key={roles[currentRole]}
          className="text-emerald-400 font-mono text-sm sm:text-lg h-6"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          — {roles[currentRole]} —
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SmallHeroSection;
