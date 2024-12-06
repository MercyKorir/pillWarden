import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import AuthWrapper from "./components/AuthWrapper";
import SignUp from "./components/SignUp";
import CreateMedication from "./components/CreateMedication";
import ProtectedRouteWrapper from "./components/ProtectedRouteWrapper";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <AuthWrapper>
              <SignUp />
            </AuthWrapper>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthWrapper>
              <ForgotPassword />
            </AuthWrapper>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <AuthWrapper>
              <ResetPassword />
            </AuthWrapper>
          }
        />
        <Route
          path="/create-medication"
          element={
            <ProtectedRouteWrapper>
              <CreateMedication />
            </ProtectedRouteWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
