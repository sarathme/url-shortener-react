import { Link, useParams } from "react-router-dom";

function VerifiedAccount() {
  const { token } = useParams();
  console.log(token);

  localStorage.setItem("jtokenUrl", token);
  return (
    <div className="login-block">
      <h1>Account Already Verified </h1>
      <Link to="/login">Login to your account</Link>
    </div>
  );
}

export default VerifiedAccount;
