import classNames from "classnames";
import { FormEvent, useState } from "react";

import s from "./Login.module.scss";
import usePlayerAuth from "@lib/hooks/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const { login } = usePlayerAuth("/", true);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const wrong = await login(username, passwd);
    if (wrong) setIsWrong(true);
  };

  return (
    <form
      className={classNames(s.form, isWrong ? "invalid" : "")}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col p-12 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="border"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="border"
            type="password"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />
        </div>
        <button className="filled">Login</button>
      </div>
    </form>
  );
};

export default Login;
