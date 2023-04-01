import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Branch.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import { BranchList } from "./BranchList";
import { BranchLogin } from "./BranchLogin";
import { useDispatch, useSelector } from "react-redux";
import { GetBranches } from "../../../Redux/Auth/action";
export const TotalBranch = () => {
  const branches = useSelector((state) => state.AuthReducer.branches);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBranches());
  }, [dispatch]);
  console.log(branches);

  const HandleBranchLoginModal = () => {
    setShow(!show);
  };
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>
          Total Branch ({branches.length})
        </h1>
      </div>
      <div className={styles.inputBoxMainDiv}>
        <div className={styles.inputBox}>
          <AiOutlineSearch className={stylesfromDash.filterSectionIconSearch} />
          <input type="text" placeholder="Search by branch name" />
        </div>
        <button>Add Branch</button>
      </div>
      <div className={styles.branchListDiv}>
        <BranchLogin
          OpenModal={show}
          HandleBranchLoginModal={HandleBranchLoginModal}
          branch={branches}
        />
        {branches?.map((ele) => (
          <>
            <BranchList
              key={ele.id}
              data={ele}
              HandleBranchLoginModal={HandleBranchLoginModal}
            />
          </>
        ))}
      </div>
    </div>
  );
};
