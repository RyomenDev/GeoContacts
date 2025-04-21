import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout";

import { GoogleMap, Contact } from "../container";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Contact />} />
        {/* <Route path="location" element={<GoogleMap />} /> */}
      </Route>
    </Route>
  )
);

export { router };
