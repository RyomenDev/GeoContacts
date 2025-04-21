import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <>
      <div className="bg-emerald-50">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
