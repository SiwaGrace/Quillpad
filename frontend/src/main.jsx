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
import Dashboard from "./pages/Dashborad.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import JournalPage from "./pages/JournalPage.jsx";
import NewEntryPage from "./components/JournalComponents/NewEntryPage.jsx";
import EntryDetailPage from "./components/JournalComponents/EntryDetailPage.jsx";
import EditEntryPage from "./components/JournalComponents/NewEntryPage.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="journal/new" element={<NewEntryPage />} />
        <Route path="journal/:id" element={<EntryDetailPage />} />
        <Route path="journal/:id/edit" element={<EditEntryPage />} />
      </Route>
      <Route>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgotpass" element={<ForgotPassword />} />
      </Route>
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
