import React, { useState } from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import styles from "../../Styles/Notification.module.css";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AddNotificationModal } from "./AddNotificationModal";
export const NotificationMainSection = () => {
  const [tab, setTab] = useState("all");
  const [OpenModal, setOpenModal] = useState(false);
  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };
  const data = [1, 2, 3];
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Notifications</h1>
        <button onClick={HandleModal}>Add Notification</button>
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
            <div
              onClick={() => setTab("read")}
              className={tab === "read" && styles.active}
            >
              Read(50)
            </div>
          </div>
          <Link to={"/notification"}>
            <div className={styles.MarkAsRead}>
              <IoCheckmarkDoneSharp color="#2A3A8F" size={25} />
              <p> Mark as read</p>
            </div>
          </Link>
        </div>
        <hr />
        <div className={styles.NotificationTitle}>
          <p>Notification</p>
          <p>Action</p>
        </div>
        <hr />
        {tab === "all"
          ? data.map((ele) => (
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
    </div>
  );
};
