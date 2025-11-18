// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { store } from "./store/store";
// import { Provider } from "react-redux";
// import { HelmetProvider } from "react-helmet-async";

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
// } from "react-router-dom";

// import App from "./App.jsx";
// import Root from "./Root.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import Dashboard from "./pages/Dashborad.jsx";
// import LoginPage from "./pages/Auth/LoginPage.jsx";
// import RegisterPage from "./pages/Auth/RegisterPage.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import About from "./pages/About.jsx";
// import JournalPage from "./pages/JournalPage.jsx";
// import NewEntryPage from "./components/JournalComponents/NewEntryPage.jsx";
// import EntryDetailPage from "./components/JournalComponents/EntryDetailPage.jsx";
// import EditEntryPage from "./components/JournalComponents/NewEntryPage.jsx";
// import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
// import ResetPassword from "./pages/Auth/ResetPassword.jsx";
// import SplashScreen from "./components/Homepage/SplashScreen.jsx";
// import MultiColorSpinner from "./components/Homepage/MultiColorSpinner.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       {/* navbar */}
//       <Route path="/" element={<App />}>
//         <Route path="home" element={<Dashboard />} />
//         <Route path="about" element={<About />} />
//         <Route path="journal" element={<JournalPage />} />
//         <Route path="journal/new" element={<NewEntryPage />} />
//         <Route path="journal/:id" element={<EntryDetailPage />} />
//         <Route path="journal/:id/edit" element={<EditEntryPage />} />
//       </Route>
//       {/* independent */}
//       <Route>
//         <Route index element={<HomePage />} />
//         <Route path="login" element={<LoginPage />} />
//         <Route path="register" element={<RegisterPage />} />
//         <Route path="forgotpass" element={<ForgotPassword />} />
//         <Route path="reset-password/:token" element={<ResetPassword />} />
//         {/* <Route path="splashscreen" element={<SplashScreen />} /> */}
//         <Route path="splashscreen" element={<MultiColorSpinner />} />
//       </Route>
//     </>
//   )
// );

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <HelmetProvider>
//         <RouterProvider router={router} />
//       </HelmetProvider>
//     </Provider>
//   </StrictMode>
// );

// check my route  <Route path="/" element={<App />}>; and see why i've divided my route into two befor implementing these below
// <Route path="/" element={<Root />}>
//   <Route element={<App />}>
//     {/* Public routes */}
//     <Route path="login" element={<LoginPage />} />
//     <Route path="register" element={<RegisterPage />} />
//     <Route path="forgotpass" element={<ForgotPassword />} />
//     <Route path="reset-password/:token" element={<ResetPassword />} />

//     {/* Protected routes */}
//     <Route
//       path="home"
//       element={
//         <PrivateRoute>
//           <Dashboard />
//         </PrivateRoute>
//       }
//     />
//     {/* Add more protected routes here using PrivateRoute */}
//   </Route>
// </Route>;

// cleanest and most scalable routing structure
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

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
import EditEntryPage from "./components/JournalComponents/NewEntryPage.jsx";

import SplashScreen from "./components/Homepage/SplashScreen.jsx";
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
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
