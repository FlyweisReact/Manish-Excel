/** @format */

import React, { useEffect, useState } from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Branch.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import { BranchLogin } from "./BranchLogin";
import { useDispatch, useSelector } from "react-redux";
import { GetBranches } from "../../../Redux/Auth/action";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Table } from "react-bootstrap";



export const TotalBranch = () => {
  const [data, setData] = useState([]);

  const fetchHandler = async () => {
    try {
      const response = await axios.get(
        `https://mr-manish-xcell-backend.vercel.app/api/v1/branches`
      );
      const res = response.data.data;
      setData(res);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
  }, []);



  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>
          Total Branch ({data?.length})
        </h1>
      </div>
      <div className={styles.inputBoxMainDiv}>
        <button>Add Branch</button>
      </div>
      <div className={styles.branchListDiv}>
       
      </div>

      <div className="myTable">
        <Table>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Address</th>
              <th>License</th>
              <th>GstId</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <tr key={index}>
                <td> {i.branch} </td>
                <td> {i.address} </td>
                <td> {i.licence} </td>
                <td> {i.gstId} </td>
                <td> {i.phone} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
