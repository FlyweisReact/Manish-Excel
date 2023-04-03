import React, {useState, useEffect} from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/PrivacyPolicy.module.css";
import axios from 'axios';
export const TermAndConditionMainSec = () => {
  const [terms, setTerms] = useState();
  const url = "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/terms";
  
  const getTerms = async ()=>{
    const token = localStorage.getItem("token");
    try{
      const res = await axios.get(url,
         {
          headers:{Authorization:`Bearer ${token}`}
         }
      )
      setTerms(res?.data?.data?.content);
    }catch(err){
      console.log(err.message);
    }
  }
  useEffect(()=>{
    getTerms();
  },[])

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Terms and Condition</h1>
        <button>Add</button>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.TextSection}>
        <p>
          {terms}
        </p>
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
