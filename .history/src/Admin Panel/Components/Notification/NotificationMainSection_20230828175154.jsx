import React, { useState, useEffect } from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import styles from "../../Styles/Notification.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AddNotificationModal } from "./AddNotificationModal";
import axios from 'axios';
import { Modal, Button , Form , Table} from 'react-bootstrap'

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

    const urla =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/notifications/";
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          urla,
          { title, message },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        getNotifications();
        props.onHide();
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


      <div className="myTable">
          <Table>
            <thead>
              <tr>
                <th>Notification</th>
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
                      <AiFillEdit
                        onClick={() => {
                          setId(i._id);
                          setEdit(true);
                          setModalShow(true);
                        }}
                        style={{ color: "#4287f5" }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};