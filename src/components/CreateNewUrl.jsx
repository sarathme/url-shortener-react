import InputGroup from "./InputGroup";
import styles from "./CreateNewUrl.module.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  let errors = {};

  if (!values.url) {
    errors.url = "Required Field";
  }

  return errors;
};

function CreateNewUrl() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { url: "" },
    validate,
    onSubmit: async (values) => {
      const { url: originalUrl } = values;
      console.log(localStorage.getItem("jtokenUrl"));
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/shorten`,
          { originalUrl },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jtokenUrl")}`,
            },
          }
        );

        toast.success("Url shortening successful");
        navigate("/app/url");
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
      }
    },
  });
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <InputGroup
        label="Enter Long URL"
        labelFor="url"
        placeholderText="Enter long Url here"
        type="text"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.url}
        error={formik.touched.url && formik.errors.url}
        errMsg={formik.errors.url}
      />
      <button type="submit">Shorten Url</button>
    </form>
  );
}

export default CreateNewUrl;
