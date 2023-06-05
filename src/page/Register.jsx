import React, { useState } from "react";
import { useRegisterAccMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [registerAcc] = useRegisterAccMutation();
  const nav = useNavigate();
  const [errors, setErrors] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,password_confirmation)
    const user = { name, email, password, password_confirmation };
    const { error ,data} = await registerAcc(user);
    if (error?.data) {
      setErrors(error?.data?.errors);
    }
    if(data?.success) {
      nav('/login')
    }
  };

  const con = errors?.password?.filter(e => e.match('confirmation'))
 

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className=" d-flex justify-content-center mt-5 flex-column w-25 container border gap-3 p-3 py-5 rounded shadow-lg"
      >
        <h4 className="text-center text-success fw-bold">Register Account</h4>
        <div className="d-flex flex-column gap-4 px-2">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control border-0 border-bottom shadow-sm"
              placeholder="Enter Your Name"
            />
            {errors?.name?.map((error, index) => (
              <p key={index} className="mb-0 small text-danger">
                {error}
              </p>
            ))}{" "}
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control border-0 border-bottom shadow-sm"
              placeholder="Enter Your Email"
            />
            {errors?.email?.map((error, index) => (
              <p key={index} className="mb-0 small text-danger">
                {error}
              </p>
            ))}
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control border-0 border-bottom shadow-sm"
              placeholder="Enter Your Password"
            />
            <p className="mb-0 small text-danger">{errors?.password?.filter(e => !(e.match('confirmation')))}</p>
          </div>
          <div>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="form-control border-0 border-bottom shadow-sm"
            placeholder="Confirm Password"
          />
         <p className="mb-0 small text-danger">{errors?.password?.filter(e => (e.match('confirmation')))}</p>
          </div>
        
        </div>
        <p className="text-center mb-0 mt-3">
          Already have an account?{" "}
          <span
            onClick={() => nav("/login")}
            className="cp text-success text-decoration-underline"
          >
            Login
          </span>
        </p>
        <button className="btn btn-success mx-auto">Create</button>
      </form>
    </div>
  );
};

export default Register;
