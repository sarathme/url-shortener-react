import styles from "./InputGroup.module.css";

function InputGroup({
  label,
  labelFor,
  placeholderText,
  type,
  value,
  onChange,
  onBlur,
  error,
  errMsg,
}) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={labelFor}>
        {label}
        {error && <span>{errMsg}</span>}
      </label>
      <input
        name={labelFor}
        id={labelFor}
        type={type}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputGroup;
