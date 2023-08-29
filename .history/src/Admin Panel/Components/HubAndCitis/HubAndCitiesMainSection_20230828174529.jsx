/** @format */

import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/HubAndCities.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHubAndCities } from "../../../Redux/Auth/action";
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";



export const HubAndCitiesMainSection = () => {
  const dispatch = useDispatch();
  const citys = useSelector((state) => state.AuthReducer.citys);
  const [modalShow, setModalShow] = React.useState(false);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    dispatch(getHubAndCities());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const ud = localStorage.getItem("token");
    const url = `https://mr-manish-xcell-backend.vercel.app/api/v1/admin/hub-cities/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${ud}` },
      });
      dispatch(getHubAndCities());
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <div className={styles.TitleSection}>
          <h1 className={stylesfromDash.Title}>Hub And Cities</h1>
          <button
            onClick={() => {
              setEdit(false)
              setModalShow(true);
            }}
          >
            Add{" "}
          </button>
        </div>

        <div className="myTable">
          <Table>
            <thead>
              <tr>
                <th>City</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {citys?.data?.map((i, index) => (
                <tr key={index}>
                  <td> {i.city} </td>
                  <td>
                    <span className="flex-cont">
                      <AiFillDelete
                        onClick={() => handleDelete(i._id)}
                        style={{ color: "#c5161d" }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
