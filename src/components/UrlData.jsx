import styles from "./UrlData.module.css";

function UrlData({ url, index }) {
  console.log(url);
  return (
    <ul className={styles.urlData} role="list">
      <li>{index}</li>
      <li>{url.originalUrl}</li>
      <li>
        <a href={`${url.shortUrl}`}>{url.shortUrl}</a>
      </li>
      <li>{url.visited}</li>
    </ul>
  );
}

export default UrlData;
