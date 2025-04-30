import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout";
import ErrorBoundary from "../utility/ErrorBoundary.jsx";

import { GoogleMap, Contact, HomePage } from "../container";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Contact />} />
      {/* <Route index element={<HomePage />} /> */}
      {/* <Route path="contacts" element={<Contact />} /> */}
      {/* <Route path="location" element={<GoogleMap />} /> */}
    </Route>
  )
);

export { router };
