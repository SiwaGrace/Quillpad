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
import JournalDetailPage from "./components/JournalComponents/JournalDetailPage.jsx";
import EditEntryPage from "./components/JournalComponents/EditEntryPage.jsx";

import SplashScreen from "./components/Dashboard/SplashScreen.jsx";
import VisionBoard from "./pages/VisionBoard.jsx";
import CaptureVision from "./components/Dashboard/CaptureVision.jsx";
import VisionDetails from "./components/VisionComponents/VisionDetails.jsx";
import SubVisionInput from "./components/SubVision/SubVisionInput.jsx";
import SubVisionDetail from "./components/SubVision/SubVisionDetail.jsx";
import SubVisionList from "./components/SubVision/SubvisonList.jsx";
import SubVisionEdit from "./components/SubVision/SubVisionEdit.jsx";
import VisionEdit from "./components/VisionComponents/VisionEdit.jsx";
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

      {/* Layout pages (Navbar + Footer) */}
      <Route element={<App />}>
        {/* Dashboard & static pages */}
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

        {/* Journal */}
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

        <Route
          path="journal/:id/edit"
          element={
            <PrivateRoute>
              <EditEntryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="journal/:id"
          element={
            <PrivateRoute>
              <JournalDetailPage />
            </PrivateRoute>
          }
        />

        {/* Vision */}
        <Route
          path="vision"
          element={
            <PrivateRoute>
              <VisionBoard />
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
          path="/visions/:id/edit"
          element={
            <PrivateRoute>
              <VisionEdit />
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

        {/* SubVisions */}
        <Route
          path="visions/:id/subvisions"
          element={
            <PrivateRoute>
              <SubVisionList />
            </PrivateRoute>
          }
        />
        <Route
          path="visions/:id/subvision/create-subvision"
          element={
            <PrivateRoute>
              <SubVisionInput />
            </PrivateRoute>
          }
        />
        <Route
          path="visions/:id/subvision/:subId/edit"
          element={
            <PrivateRoute>
              <SubVisionEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="visions/:id/subvision/:subId"
          element={
            <PrivateRoute>
              <SubVisionDetail />
            </PrivateRoute>
          }
        />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </HelmetProvider>
  </Provider>,
  // </StrictMode>
);
