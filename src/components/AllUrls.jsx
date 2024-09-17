import { useEffect, useState } from "react";
import styles from "./AllUrls.module.css";
import Spinner from "./Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AllUrls() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUrls() {
      const token = localStorage.getItem("jtokenUrl");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/shorten/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        navigate("/login");
      }
    }

    fetchUrls();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <ul className={styles.headingRow} role="list">
          <li>S.No.</li>
          <li>Original URL</li>
          <li>Short URL</li>
          <li>No. Of Times Clicked</li>
        </ul>
        <ul className={styles.urlData} role="list">
          <li>Hi</li>
          <li>Hi</li>
          <li>Hi</li>
          <li>Hi</li>
        </ul>
      </div>
    </div>
  );
}

export default AllUrls;
