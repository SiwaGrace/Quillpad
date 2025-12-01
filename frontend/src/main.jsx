// cleanest and most scalable routing structure
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "react-hot-toast";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Root from "./Root.jsx";
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Pages
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";

import Dashboard from "./pages/Dashborad.jsx";
import About from "./pages/About.jsx";
import JournalPage from "./pages/JournalPage.jsx";
import NewEntryPage from "./components/JournalComponents/NewEntryPage.jsx";
import EntryDetailPage from "./components/JournalComponents/EntryDetailPage.jsx";
import EditEntryPage from "./components/JournalComponents/EditEntryPage.jsx";

import SplashScreen from "./components/Dashboard/SplashScreen.jsx";
import VisionBoard from "./pages/VisionBoard.jsx";
import CaptureVision from "./components/Dashboard/CaptureVision.jsx";
import Visionfirst from "./components/whatever/visionfirst.jsx";
import VisionDetails from "./pages/VisionDetails.jsx";
import SubVisionInput from "./components/VisionDetailComponents/SubVisionInput.jsx";
import SingleJournalPage from "./components/JournalComponents/SingleJournalPage.jsx";
// import MultiColorSpinner from "./components/Homepage/MultiColorSpinner.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    // Root wrapper (optional)
    <Route path="/" element={<Root />}>
      {/* Public pages — NO NAVBAR */}
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgotpass" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="splashscreen" element={<SplashScreen />} />
      <Route path="vv" element={<Visionfirst />} />

      {/* Layout pages (Navbar + Footer) */}
      <Route element={<App />}>
        {/* Protected routes */}
        <Route
          path="home"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />

        <Route
          path="journal"
          element={
            <PrivateRoute>
              <JournalPage />
            </PrivateRoute>
          }
        />

        <Route
          path="journal/new"
          element={
            <PrivateRoute>
              <NewEntryPage />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="journal/single"
          element={
            <PrivateRoute>
              <SingleJournalPage />
            </PrivateRoute>
          }
        /> */}

        <Route
          path="journal/:id"
          element={
            <PrivateRoute>
              <EntryDetailPage />
            </PrivateRoute>
          }
        />

        <Route
          path="journal/:id/edit"
          element={
            <PrivateRoute>
              <EditEntryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="vision"
          element={
            <PrivateRoute>
              <VisionBoard />
            </PrivateRoute>
          }
        />

        <Route
          path="createsub-vision"
          element={
            <PrivateRoute>
              <SubVisionInput />
            </PrivateRoute>
          }
        />

        <Route
          path="createvision"
          element={
            <PrivateRoute>
              <CaptureVision />
            </PrivateRoute>
          }
        />

        <Route
          path="visions/:id"
          element={
            <PrivateRoute>
              <VisionDetails />
            </PrivateRoute>
          }
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </HelmetProvider>
  </Provider>
  // </StrictMode>
);
