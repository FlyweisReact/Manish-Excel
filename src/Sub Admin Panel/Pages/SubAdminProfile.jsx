import React, { useState } from "react";
import styles from "../Styles/Profile.module.css";
import profile_pic from "../Assets/profile_pic.png";
export const SubAdminProfile = () => {
  const [tab, setTab] = useState("overview");
  return (
    <div className={styles.main}>
      <div className={styles.profilePic}>
        <div>
          <div>
            <img
              width={"150px"}
              height={"150px"}
              style={{ borderRadius: "50%" }}
              src={profile_pic}
              alt={profile_pic}
            />
          </div>
          <div>
            <h2>Suraj Sharma</h2>
            <p className={styles.role}>Admin</p>
          </div>
        </div>
        <button>Update</button>
      </div>
      <p className={styles.AdminId}>ID:44555554</p>
      <div className={styles.TabTitle}>
        <div
          onClick={() => setTab("overview")}
          className={tab === "overview" && styles.active}
        >
          Overview
        </div>
        <div
          onClick={() => setTab("profilesummary")}
          className={tab === "profilesummary" && styles.active}
        >
          Profile Summary
        </div>
      </div>
      <hr />
      <div className={styles.profileDetail}>
        {tab === "overview" ? (
          <>
            {" "}
            <h2>Summary</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
              corrupti mollitia velit neque eligendi cumque. Ab ipsam
              repellendus fuga quidem iste, illum reiciendis placeat sint. Ipsum
              voluptas in ut quae.
            </p>
            <h2>Language Known</h2>
            <p>Hindi,English</p>
            <h2>Contact Information</h2>
            <p>+9121554487787</p>
            <p>abc@gmail.com</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
