import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const request = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (request.status === 200) {
        sessionStorage.setItem("token", JSON.stringify(response));
        navigate("/dashboard", { replace: true });
      } else {
        setErrorList(response);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  {" "}
                  <span>Email or username</span>
                  <span>{errorList}</span>
                  <input type="text" className="w-100" name="email" />
                </div>
                <div className="mb-4">
                  {" "}
                  <span>Password</span>{" "}
                  <input type="password" className="w-100" name="password" />
                </div>
                <button onClick={() => navigate("/register")} type="button">
                  Create Account
                </button>
                <div className="mb-3">
                  {" "}
                  <button className="btn btn-dark w-100">Login</button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
