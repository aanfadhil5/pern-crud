import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.user_name.value,
      email: e.target.user_email.value,
      password: e.target.user_password.value,
    };

    try {
      fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(err.message);
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
                  <span>Full Name</span>
                  <input type="text" className="w-100" name="user_name" />
                </div>
                <div className="mb-4">
                  {" "}
                  <span>Email</span>{" "}
                  <input type="email" className="w-100" name="user_email" />
                </div>
                <div className="mb-4">
                  {" "}
                  <span>Password</span>{" "}
                  <input
                    type="password"
                    className="w-100"
                    name="user_password"
                  />
                </div>
                <button onClick={() => navigate("/")} type="button">
                  Have an Account
                </button>
                <div className="mb-3">
                  {" "}
                  <button className="btn btn-dark w-100">Register</button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
