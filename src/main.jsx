import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Login from "./Login and Signup/Login";
import ChatScreen from "./ChatScreen/chatscreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ChatScreen />}>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
