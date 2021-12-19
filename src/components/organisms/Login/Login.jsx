import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../atoms/Input/Input.jsx";
import Submit from "../../atoms/Submit/Submit";
import Warning from "../../atoms/Warning/Warning";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setWarningMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("__tok");

  /**
   * If user is authenticated already > redirect to servers list home page
   */
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  /**
   * Submit login form and redirect to servers list home page
   */
  const submit = async (e) => {
    e.preventDefault();
    /**
     * Side note: Maybe not the most secure solution, but works for a demo
     * Better to set a cookie by BE > HttpOnly / SameSite=strict / secure,
     * So we use server validation instead
     * TBD with BE people
     */
    const url = "https://playground.nordsec.com/v1/tokens";
    setIsLoading(true);
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .catch(() => {
        setWarningMessage("Something wrong happened!");
      })
      .finally(() => {
        setIsLoading(false);
      });

    const json = await response.json();
    if (response.status === 200) {
      setWarningMessage("");
      sessionStorage.setItem("__tok", json.token);
      navigate("/");
    } else {
      setWarningMessage("Something wrong happened!");
    }
  };

  return (
    <section
      className="h-screen mx-auto flex items-center justify-center bg-white sm:bg-gray-100"
      data-testid="login"
    >
      <form
        className="bg-white max-w-md w-full p-6 sm:p-10 -mt-52 rounded sm:shadow"
        onSubmit={submit}
      >
        <Warning message={message} />
        <Input
          id="username"
          label="User Name"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="************"
          name="user[password]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="md:flex md:items-center">
          <Submit
            disabled={isLoading ? "disabled" : null}
            name={isLoading ? "loading.." : "Log In"}
          />
        </div>
      </form>
    </section>
  );
};

export default Login;
