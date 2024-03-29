/** @format */

import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Help.module.css";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";

export const HelpMainSection = () => {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [hid, setHid] = useState("");

  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets";
  const getHelp = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmail(res?.data?.data?.email);
      setPhone(res?.data?.data?.phone);
      setHid(res?.data?.data?._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getHelp();
  }, []);

  const handleDelete = async (hid) => {
    const urld = `https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets/${hid}`;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(urld, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getHelp();
    } catch (err) {
      console.log(err.message);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const urlx =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets";
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          urlx,
          { email, phone },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        getHelp();
      } catch (err) {
        console.log(err.message);
      }
    };
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClick}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email "
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email "
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
          <form>
            <label>Email</label>
            <input type="email" />
            <label>Mobile</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Help And Support</h1>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.HelpGridSection}>
        {
          <>
            <p>{email}</p>
            <p>{phone}</p>
            <button onClick={() => setModalShow(true)}>Update/Create</button>
            <button onClick={() => handleDelete(hid)}>Delete</button>
          </>
        }
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
