const Features = ({ Data}) => {
    const { title, description, features } = Data;
  return (
    <>
      <section className="relative bg-emerald-100 py-20 px-4">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#fcfafa] to-transparent z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            {title}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            {description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {" "}
            {/*[@media(max-width:338px)]:grid-cols-1*/}
            {features?.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-56">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/90 to-transparent" />
                </div>

                <div className="flex justify-center -mt-6 z-10 relative">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    {feature.icon}
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;

