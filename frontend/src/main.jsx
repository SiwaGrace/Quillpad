import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import JournalPage from "./pages/JournalPage.jsx";
import NewEntryPage from "./pages/NewEntryPage.jsx";
import EntryDetailPage from "./pages/EntryDetailPage.jsx";
import EditEntryPage from "./pages/NewEntryPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="journal" element={<JournalPage />} />
      <Route path="journal/new" element={<NewEntryPage />} />
      <Route path="journal/:id" element={<EntryDetailPage />} />
      <Route path="journal/:id/edit" element={<EditEntryPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
