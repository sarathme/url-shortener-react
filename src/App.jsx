import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./pages/AppLayout";
import CreateNewUrl from "./components/CreateNewUrl";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="app" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword/:resetToken" element={<ResetPassword />} />
          <Route path="app" element={<AppLayout />}>
            <Route path="url" element={<h1>URLs</h1>} />
            <Route path="createNew" element={<CreateNewUrl />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
