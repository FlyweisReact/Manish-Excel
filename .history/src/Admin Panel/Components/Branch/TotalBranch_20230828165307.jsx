/** @format */

import React, { useEffect, useState } from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Branch.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import axios from "axios";
import { Table, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

export const TotalBranch = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const Baseurl = `https://mr-manish-xcell-backend.vercel.app/`;
  const Auth = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchHandler = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/branches`);
      const res = response.data.data;
      setData(res);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const deleteHandler = async (payload) => {
    try {
      const res = await axios.delete(
        `${Baseurl}api/v1/admin/branches/${payload}`,
        Auth
      );
      const msg = res.data.message;
      toast.success(msg);
      fetchHandler();
    } catch {}
  };

  function MyVerticallyCenteredModal(props) {
    const [branch, setBranch] = useState("");
    const [gstId, setGstId] = useState("");
    const [address, setAddress] = useState("");
    const [licence, setLicense] = useState("");
    const [phone, setPhone] = useState("");

    const payload = { branch, gstId, address, licence, phone };

    const createBranch = async (e) => {
      e.preventDefault()
      try{
        const response = await axios.post(`${Baseurl}`)
      }catch(e){
        const msg = e.response.data.message
        toast.error(msg)
      }
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Branch
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form></Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Branch ({data?.length})</h1>
      </div>
      <div className={styles.inputBoxMainDiv}>
        <button>Add Branch</button>
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
              <th></th>
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
                <td>
                  <span className="flex-cont">
                    <AiFillDelete onClick={() => deleteHandler(i._id)} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
