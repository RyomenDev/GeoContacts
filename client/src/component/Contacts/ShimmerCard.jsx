import { Mail, Phone, MapPin, MapPinned } from "lucide-react";

const ShimmerCard = ({idx,isList}) => {
  return (
      <div
      key={idx}
      className={`bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col overflow-hidden ${
        isList ? "min-h-[180px]" : "min-h-[320px]"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
        <div className="flex items-center gap-4 col-span-2 sm:col-span-1">
          <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>

        <div className="h-4 bg-gray-300 rounded col-span-2 sm:col-span-1"></div>

        <div className="flex flex-col gap-2 text-sm text-gray-700 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-300" />
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-300" />
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="flex items-center gap-2">
            <MapPinned className="w-4 h-4 text-gray-300" />
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 flex justify-center items-center mt-4 sm:mt-0">
          <div className="px-4 py-2 bg-gray-300 text-white rounded-lg w-20 h-8"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;