import { motion } from "framer-motion";
import Lottie from "lottie-react";
import WorldLottie from "../../assets/world.json";
import { FeaturedData } from "../../Data";

const FeatureSection = () => {
  const { title, description, features } = FeaturedData;
  return (
    <section className="relative w-full py-20 px-6 overflow-hidden bg-gradient-to-br from-emerald-950/90 via-green-950 to-gray-900/90 text-white">
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-[rgba(0,0,0,1)] to-transparent z-10 pointer-events-none" />

      <div className="absolute inset-0 z-0 opacity-20">
        <Lottie
          animationData={WorldLottie}
          loop
          autoPlay
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Why Choose <span className="text-emerald-400">{title}</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/30 transition duration-300"
          >
            <div className="mb-4 text-emerald-300">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent opacity-20"
      />
    </section>
  );
};

export default FeatureSection;

// const FeatureSection = () => {
//   return (
//     <section className="relative w-full py-20 px-6 bg-gradient-to-br from-emerald-950 via-black to-gray-900 text-white">
//       <div className="max-w-7xl mx-auto text-center mb-12">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-5xl font-extrabold mb-4"
//         >
//           Why Choose <span className="text-emerald-400">Whispora Blog</span>?
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="text-lg text-gray-300 max-w-2xl mx-auto"
//         >
//           Empower your voice. Express yourself. Connect with the world.
//         </motion.p>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
//         {features.map((feature, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ delay: i * 0.2, duration: 0.5 }}
//             className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/30 transition duration-300"
//           >
//             <div className="mb-4 text-emerald-300">{feature.icon}</div>
//             <h3 className="text-xl font-semibold mb-2 text-white">
//               {feature.title}
//             </h3>
//             <p className="text-gray-300">{feature.desc}</p>
//           </motion.div>
//         ))}
//       </div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 0.3 }}
//         transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
//         className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent opacity-20"
//       />
//     </section>
//   );
// };
