import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import { useDispatch, useSelector } from "react-redux";
import { getHubAndCities } from "../../../Redux/Auth/action";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/HubAndCities.module.css";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export const HubAndCitiesMainSection = () => {
  const [city, setCity] = useState([]);
  const dispatch = useDispatch();
  const url =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/hub-cities";


  const getAllCities = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res?.data?.data);
      setCity(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    

    getAllCities();
  }, []);
  const [modalShow, setModalShow] = React.useState(false);

  const handleDelete = async (id) => {
    const ud = localStorage.getItem("token");
    const url = `https://mr-manish-xcell-backend.vercel.app/api/v1/admin/hub-cities/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${ud}` },
      });
      //console.log(res);
      getAllCities();
    } catch (err) {
      console.log(err.message);
    }
  };
  
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
         //console.log(res?.data);
         getAllCities();
        
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
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <div className={styles.TitleSection}>
          <h1 className={stylesfromDash.Title}>Hub And Cities</h1>
          <button onClick={() => setModalShow(true)}>Add </button>
        </div>
        <div className={styles.CityMainDiv}>
          {city?.map((ele) => (
            <>
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
            </>
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
