import React, { useState, useEffect } from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import styles from "../../Styles/Notification.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AddNotificationModal } from "./AddNotificationModal";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const NotificationMainSection = () => {
  const [tab, setTab] = useState("all");
  const [OpenModal, setOpenModal] = useState(false);
  const [not, setNot] = useState([]);

  const url = "https://mr-manish-xcell-backend.vercel.app/api/v1/notifications/";

  const getNotifications = async()=>{
    const token = localStorage.getItem("token");
    try{
      const res = await axios.get(url,
        {
          headers: {Authorization: `Bearer ${token}`}
        }  
      )
      setNot(res?.data?.data);

    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getNotifications();
  },[])

  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };
  const data = [1, 2, 3];

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const image = "https://i.mydramalist.com/R6W7x_5f.jpg";
    //console.log(image, productId, productName, stock, quantity, price);
    // const dispatch = useDispatch();
    const urla =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/notifications/";
    const handleClick = async (e) => {
      e.preventDefault();
      try {
      //  console.log(image, productId, productName, stock, quantity, price);
        const res = await axios.post(
          urla,
          { title, message },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        console.log(res?.data);
        // dispatch(getAllProducts());
        getNotifications();
      } catch (err) {
        console.log(err.message);
      }
    };
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
            <label for="name">Title</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            <label for="email">Message</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              onChange={(e) => setMessage(e.target.value)}
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

  const [modalShow, setModalShow] = React.useState(false);

  const handleDelete = async (id)=>{
    const urld = `https://mr-manish-xcell-backend.vercel.app/api/v1/notifications/${id}`;
    const token = localStorage.getItem("token");
    try{
      const res = await axios.delete(urld,
        {
          headers:{Authorization: `Bearer ${token}`}
        }  
      )
      console.log(res?.data);
      getNotifications();

    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Notifications</h1>
        <button onClick={()=>setModalShow(true)}>Add Notification</button>
      </div>
      <AddNotificationModal OpenModal={OpenModal} HandleModal={HandleModal} />
      <div className={styles.NotificationMainSection}>
        <div className={styles.TabMain}>
          {" "}
          <div className={styles.TabTitle}>
            <div
              onClick={() => setTab("all")}
              className={tab === "all" && styles.active}
            >
              All Notification
            </div>
            {/*<div
              onClick={() => setTab("read")}
              className={tab === "read" && styles.active}
            >
              Read(50)
  </div>*/}
          </div>
          {/*<Link to={"/notification"}>
            <div className={styles.MarkAsRead}>
              <IoCheckmarkDoneSharp color="#2A3A8F" size={25} />
              <p> Mark as read</p>
            </div>
          </Link>*/}
        </div>
        <hr />
        <div className={styles.NotificationTitle}>
          <p>Notification</p>
          <p>Action</p>
        </div>
        <hr />
        {tab === "all"
          ? not?.map((ele) => (
              <>
                <div className={styles.Notification}>
                  <h6>{ele?.title}</h6>
                  <p>
                    {ele?.message}
                  </p>
                  <RiDeleteBin6Line
                    style={{ cursor: "pointer", color: "#C5161D" }}
                    size={65}
                    onClick = {()=>handleDelete(ele._id)}
                  />
                </div>
                <hr />
              </>
            ))
          : data.map((ele) => (
              <>
                <div className={styles.Notification}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                    aliquam laboriosam odio nesciunt necessitatibus? Eligendi,
                    reprehenderit inventore exercitationem sunt similique nam
                    ex, a quos ullam veniam tempora ea, sequi cupiditate?
                  </p>
                  <RiDeleteBin6Line
                    style={{ cursor: "pointer", color: "#C5161D" }}
                    size={65}
                  />
                </div>
                <hr />
              </>
            ))}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};