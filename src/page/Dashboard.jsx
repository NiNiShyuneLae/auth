import React from "react";
import Nav from "../components/Nav";
import Table from "../components/Table";
import { Link } from "react-router-dom";

const Dashboard = () => {

  return (
    <div className="container mx-auto">
      <Nav />
      <Link to={'/create'}>
      <div className="btn btn-secondary">
        Create Contact
      </div>
      </Link>
      <Table/>
    </div>
  );
};

export default Dashboard;
