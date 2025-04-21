import { RouterProvider } from "react-router-dom";
// import GoogleMap from "./container/Map.jsx";
// import Contact from "./container/contact.jsx";
import { router } from "./routes";

function App() {
  return (
    <>
      <div className="bg-emerald-50">
        {/* <GoogleMap /> */}
        {/* <Contact /> */}
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
