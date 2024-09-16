import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

function NotFound() {
  return (
    <div className="login-block">
      <h2>This route is not defined</h2>
      <Link to="/">Back to App</Link>
    </div>
  );
}

export default NotFound;
