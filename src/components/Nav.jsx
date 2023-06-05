import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutAccMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { remove } from "../redux/slice";
import {CgProfile} from 'react-icons/cg'
import {  setSearch } from "../redux/contactSlice";

const Nav = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const [logoutAcc] = useLogoutAccMutation();
  const search = useSelector(state => state.contact.search)

  const logoutHandler = async () => {
    const { data } = await logoutAcc(token);
    if (data?.success) {
      dispatch(remove());
      nav("/login");
    }
  };

  return (
    <div className="container mb-3 d-flex align-items-center justify-content-between bg-info bg-opacity-25 px-4 py-2 rounded-bottom">
      <h4>Contact Dashboard</h4>
      <div className="d-flex gap-3 align-items-center">
        <input type="text" value={search} onChange={e => dispatch(setSearch(e.target.value),)}  placeholder="Search..." className="form-control"/>
        <div className="d-flex align-items-center gap-2 bg-white px-2 py-1 rounded">
          <CgProfile className="h2 mb-0"/>
          <div>
            <small className="mb-0 text-capitalize d-block fw-bold">{user.name}</small>
            <small>{user.email}</small>
          </div>
        </div>
        <div>
          <button onClick={logoutHandler} className="btn btn-info">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
