import { RingLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="">
      <RingLoader color="#e74c3c" loading={true} size={60} />
    </div>
  );
};

export default Spinner;

// const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div
//         className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"
//         style={{ animationDuration: "2s" }}
//       ></div>
//     </div>
//   );
// };

// export default Spinner;
