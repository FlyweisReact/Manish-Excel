/** @format */

import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/HubAndCities.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHubAndCities } from "../../../Redux/Auth/action";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  const ud = localStorage.getItem("token");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/hub-cities";
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        url,
        { city },
        {
          headers: {
            Authorization: `Bearer ${ud}`,
          },
        }
      );
      // console.log(res);
      dispatch(getHubAndCities());
      props.onHide();
    } catch (err) {
      console.log(err.message);
    }
  };
  //  console.log(branch);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleClick}>
          <label for="name">City</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setCity(e.target.value)}
          />

          <input type="submit" value="Submit" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const HubAndCitiesMainSection = () => {
  const dispatch = useDispatch();
  const citys = useSelector((state) => state.AuthReducer.citys);
  const [modalShow, setModalShow] = React.useState(false);
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
          <button onClick={() => setModalShow(true)}>Add </button>
        </div>
        <div className={styles.CityMainDiv}>
          {citys?.data?.map((ele , index) => (
            <div>
              <img
                height={"290px"}
                width="274px"
                src="https://th.bing.com/th/id/OIP.zl79_GKCfWACAEqohlVH7QHaE7?pid=ImgDet&rs=1"
                alt="x"
              />
              <p>{ele.city}</p>
              <button onClick={() => handleDelete(ele._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
