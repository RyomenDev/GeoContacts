const SectionHeader = ({ title }) => (
  <div className="relative flex items-center justify-between">
    <div className="relative z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 px-4 py-1 border border-emerald-300 rounded-full bg-white">
        {title}
      </h2>
    </div>

    <div className="flex-1 mr-2 h-[1px] bg-emerald-300" />

    {/* <span className="text-sm text-teal-600 cursor-pointer hover:text-teal-800 hover:scale-105 transition-transform duration-200 whitespace-nowrap">
      See All
    </span> */}
  </div>
);

export default SectionHeader;
