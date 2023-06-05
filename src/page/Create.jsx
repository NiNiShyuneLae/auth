import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";

const Create = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const nav = useNavigate();
  const [errors, setErrors] = useState([]);
  const token = Cookies.get('token')
  const [createContact] = useCreateContactMutation()
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,password_confirmation)
    const user = { name, phone , email , address};
    const {data} =await createContact({token,user})
    console.log(data)
    // if (error?.data) {
    //   setErrors(error?.data?.errors);
    // }
    if(data?.success) {
      console.log(data)
      nav('/')
    }
  };

  const con = errors?.password?.filter(e => e.match('confirmation'))
 

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className=" d-flex justify-content-center mt-5 flex-column w-25 container border gap-3 p-3 py-5 rounded shadow-lg"
      >
        <h4 className="text-center text-secondary fw-bold">Create Account</h4>
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
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control border-0 border-bottom shadow-sm"
              placeholder="Enter Your Phone Number"
            />
            {errors?.email?.map((error, index) => (
              <p key={index} className="mb-0 small text-danger">
                {error}
              </p>
            ))}
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control border-0 border-bottom shadow-sm"
              placeholder="Enter Your Email"
            />
            <p className="mb-0 small text-danger">{errors?.password?.filter(e => !(e.match('confirmation')))}</p>
          </div>
          <div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control border-0 border-bottom shadow-sm"
            placeholder="Enter Your Address"
          />
         <p className="mb-0 small text-danger">{errors?.password?.filter(e => (e.match('confirmation')))}</p>
          </div>
        
        </div>
        <button className="btn btn-secondary mx-auto mt-3">Create</button>
      </form>
    </div>
  );
};

export default Create;
