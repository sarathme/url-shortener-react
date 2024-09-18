# URL Shortener React

## Client Routing Definition

```jsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./pages/AppLayout";
import CreateNewUrl from "./components/CreateNewUrl";
import VerifiedAccount from "./pages/VerifiedAccount";
import AlreadyVerified from "./pages/AlreadyVerified";
import AllUrls from "./components/AllUrls";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="app" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verify-account/:token" element={<VerifiedAccount />} />
          <Route path="alreadyVerified" element={<AlreadyVerified />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword/:resetToken" element={<ResetPassword />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="url" />} />
            <Route path="url" element={<AllUrls />} />
            <Route path="shorten" element={<CreateNewUrl />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
```

## Pages Components

### Login Component

```jsx
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Please provide a email address";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.password) {
    errors.password = "Please enter a password";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain atleast 8 characters";
  }

  return errors;
};
function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const { email, password } = values;
      const loggingToast = toast.loading("Logging In. Please Wait...");
      try {
        setIsLoggingIn(true);
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
          { email, password },
          { withCredentials: true }
        );

        localStorage.setItem("jtokenUrl", res.data.token);
        navigate("/app");
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setIsLoggingIn(false);
        toast.dismiss(loggingToast);
      }
    },
  });

  return (
    <form className="login-block" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="heading-primary">Login</h1>
      <InputGroup
        label="Email"
        labelFor="email"
        placeholderText="Email Address"
        type="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email}
        errMsg={formik.errors.email}
      />
      <InputGroup
        label="Password"
        labelFor="password"
        placeholderText="Your Password"
        type="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password}
        errMsg={formik.errors.password}
      />
      <div className="cta">
        <Link to="/signup">Don&apos;t have a account? Sign Up</Link>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </div>
      <button type="submit" disabled={isLoggingIn}>
        Login
      </button>
    </form>
  );
}

export default Login;
```

### Signup Component

```jsx
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Please provide a email address";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.name) {
    errors.name = "Please provide a name";
  }
  if (!values.password) {
    errors.password = "Please enter a password";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain atleast 8 characters";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "This field cannot be empty";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords are not same";
  }

  return errors;
};

function SignUp() {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const body = { ...values };

      delete body.confirmPassword;
      const signupToast = toast.loading("Creating User...");
      try {
        setIsCreating(true);
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/users/signup`,
          body,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        toast.dismiss(signupToast);
        toast.success(res.data.message);
        toast.success(
          "Please Verify your account by clicking the link received in your provided email"
        );
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        setIsCreating(false);
        toast.dismiss(signupToast);
      }
    },
  });

  return (
    <form className="login-block" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="heading-primary">Create New Account</h1>
      <InputGroup
        label="Name"
        labelFor="name"
        placeholderText="Enter Your Name"
        type="text"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.touched.name && formik.errors.name}
        errMsg={formik.errors.name}
      />
      <InputGroup
        label="Email"
        labelFor="email"
        placeholderText="Email Address"
        type="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email}
        errMsg={formik.errors.email}
      />
      <InputGroup
        label="Password"
        labelFor="password"
        placeholderText="Your Password"
        type="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password}
        errMsg={formik.errors.password}
      />
      <InputGroup
        label="Confirm Password"
        labelFor="confirmPassword"
        placeholderText="Retype your password"
        type="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        errMsg={formik.errors.confirmPassword}
      />
      <div className="cta">
        <Link to="/login">Already have a acoount? Login</Link>
      </div>
      <button type="submit" disabled={isCreating}>
        Create User
      </button>
    </form>
  );
}

export default SignUp;
```

### Applayout component

```js
import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import axios from "axios";

function AppLayout() {
  useEffect(() => {
    async function checkLogin() {
      try {
        await axios.get;
      } catch (err) {}
    }
  });

  return (
    <main className="app-layout">
      <NavBar />

      <SideBar />
      <Outlet />
    </main>
  );
}

export default AppLayout;
```
