import React from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/HubAndCities.module.css";
export const HubAndCitiesMainSection = () => {
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <div className={styles.TitleSection}>
          <h1 className={stylesfromDash.Title}>Hub And Cities</h1>
          <button>Add </button>
        </div>
        <div className={styles.CityMainDiv}>
          <div>
            <img
              height={"290px"}
              width="274px"
              src="https://th.bing.com/th/id/OIP.zl79_GKCfWACAEqohlVH7QHaE7?pid=ImgDet&rs=1"
              alt="x"
            />
            <button>Delete</button>
          </div>
          <div>
            <img
              height={"290px"}
              width="274px"
              src="https://th.bing.com/th/id/OIP.zl79_GKCfWACAEqohlVH7QHaE7?pid=ImgDet&rs=1"
              alt="x"
            />
            <button>Delete</button>
          </div>
          <div>
            <img
              height={"290px"}
              width="274px"
              src="https://th.bing.com/th/id/OIP.zl79_GKCfWACAEqohlVH7QHaE7?pid=ImgDet&rs=1"
              alt="x"
            />
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
