import React, { useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/PrivacyPolicy.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTerms } from "../../../Redux/Auth/action";
export const TermAndConditionMainSec = () => {
  const terms = useSelector((state) => state.AuthReducer.terms);
  const dispatch = useDispatch();
  console.log(terms);
  useEffect(() => {
    dispatch(getTerms());
  }, [dispatch]);
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Terms and Condition</h1>
        <button>Add</button>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.TextSection}>
        <p>{terms?.content}</p>
      </div>
      <div className={styles.termAndConditionLastDiv}>
        <div>
          <input type="checkbox" />
          <p>I agree my consent with following terms and condition </p>
        </div>
        <button>Agree</button>
      </div>
    </div>
  );
};
