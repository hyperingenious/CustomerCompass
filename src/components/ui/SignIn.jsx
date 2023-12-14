import { useEffect, useState } from "react";
import styles from "./SignIn.module.css";
import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { fetchLogin, resetAuthState } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    email: "test@gmail.com",
    password: "123456",
  });

  const { authenticated, status, isError } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Credential check
    if (!credentials.email) {
      toast.error("Enter valid email");
      return;
    }
    if (!credentials.password) {
      toast.error("Enter valid password");
      return;
    }

    dispatch(resetAuthState());
    dispatch(fetchLogin(credentials));
    setCredentials((cred) => ({ ...cred, email: "", password: "" }));
  }

  useEffect(
    function () {
      if (authenticated) navigate("/dashboard");
    },
    [isError, authenticated, navigate]
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.container}>
        <h1 className={styles.title}>Add your credentials</h1>
        <div className={styles.card}>
          <form onSubmit={(e) => handleSubmit(e, credentials)}>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials((cred) => ({ ...cred, email: e.target.value }))
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((cred) => ({
                  ...cred,
                  password: e.target.value,
                }))
              }
            />
            <div className={styles.buttons}>
              <Button type="submit" disabled={status === "loading"}>
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
