import React, {useState, useEffect} from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Help.module.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from 'axios';

export const HelpMainSection = () => {
  const [help, setHelp] = useState([]);

  const url = "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/support-tickets";
  const getHelp = async ()=>{
    const token = localStorage.getItem("token");
    try{
      const res = await axios.get(url,
        {
          headers:{Authorization:`Bearer ${token}`}
        }  
      )
      setHelp(res?.data?.data);
    }catch(err){
      console.log(err.message);
    }
  }
 
  useEffect(()=>{
    getHelp();
  },[])

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Help And Support</h1>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.HelpGridSection}>
        {
          help?.map((ele)=>{
            return (
              <div>
              <p>{ele?.subject}</p>
              <Link to={"/help"}>
                <div>
                  <p>{ele?.description}</p>
                  <AiOutlineArrowRight />
                </div>
              </Link>
            </div>  
            )
          })       
        }
      </div>
    </div>
  );
};
