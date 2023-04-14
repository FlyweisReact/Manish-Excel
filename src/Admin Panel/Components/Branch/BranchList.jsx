import React from "react";
import styles from "../../Styles/Branch.module.css";
export const BranchList = ({ data, key, HandleBranchLoginModal }) => {
  return (
    <div key={key} className={styles.BranchList}>
      <div>
        <h2>{data.branch}</h2>
        <p>{data.branch_add}</p>
      </div>
     {/* <button onClick={HandleBranchLoginModal}>Login</button> */}
    </div>
  );
};
