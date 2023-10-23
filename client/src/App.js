import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import AuthWrapper from "./components/AuthWrapper";

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
      </Routes>
    </div>
  );
}

export default App;
