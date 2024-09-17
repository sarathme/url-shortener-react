import { useEffect, useState } from "react";
import styles from "./AllUrls.module.css";
import Spinner from "./Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UrlData from "./UrlData";

function AllUrls() {
  const [isLoading, setIsLoading] = useState(false);
  const [urls, seturls] = useState([]);

  useEffect(() => {
    async function fetchUrls() {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/shorten`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jtokenUrl")}`,
          },
        }
      );

      seturls(res.data.data.urls);
      setIsLoading(false);
    }

    fetchUrls();
  }, []);

  if (isLoading) return <Spinner />;

  console.log("URLS", urls);
  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <ul className={styles.headingRow} role="list">
          <li>S.No.</li>
          <li>Original URL</li>
          <li>Short URL</li>
          <li>No. Of Times Clicked</li>
        </ul>
        {urls.map((url, i) => (
          <UrlData key={url.shortId} index={i + 1} url={url} />
        ))}
      </div>
    </div>
  );
}

export default AllUrls;
