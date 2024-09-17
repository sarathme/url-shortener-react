import InputGroup from "./InputGroup";
import styles from "./CreateNewUrl.module.css";

function CreateNewUrl() {
  return (
    <form className={styles.form}>
      <InputGroup
        label="Enter Long URL"
        labelFor="url"
        placeholderText="Enter long Url here"
        type="text"
      />
    </form>
  );
}

export default CreateNewUrl;
