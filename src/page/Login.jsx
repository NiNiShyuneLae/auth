import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAccMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { add } from "../redux/slice";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAcc] = useLoginAccMutation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const user = { email, password };
    console.log(email, password);
    const { error, data} = await loginAcc(user);
    if (error?.data) {
      setErrors(error?.data?.errors);
    }
    if (data?.success) {
      dispatch(add(data));
      console.log(data)
      nav("/");
    }
  };

  console.log(errors);

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className=" d-flex justify-content-center mt-5 flex-column w-25 container border gap-3 p-3 py-5 rounded shadow-lg"
      >
        <h4 className="text-center text-primary fw-bold">Login Account</h4>
        <div className="d-flex flex-column gap-4 px-2">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control border-0 border-bottom shadow-sm"
              placeholder="Enter Your Email"
            />
            <p className="mb-0 small text-danger">{errors?.email?.[0]}</p>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control border-0 border-bottom shadow-sm"
              placeholder="Enter Your Password"
            />
            <p className="mb-0 small text-danger">{errors?.password?.[0]}</p>
          </div>
        </div>
        <p className="text-center mb-0 mt-3">
          Don't have an account?{" "}
          <span
            onClick={() => nav("/register")}
            className="cp text-primary text-decoration-underline"
          >
            Register
          </span>
        </p>
        <button className="btn btn-primary mx-auto">Create</button>
      </form>
    </div>
  );
};

export default Login;
