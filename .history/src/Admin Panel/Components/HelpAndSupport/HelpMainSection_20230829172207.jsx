import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Help.module.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export const HelpMainSection = () => {
  const [help, setHelp] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [hid, setHid] = useState("");

  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets";
  const getHelp = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmail(res?.data?.data?.email);
      setPhone(res?.data?.data?.phone);
      setHid(res?.data?.data?._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const [pemail, setPEmail] = useState("");
  const [pmobile, setPMobile] = useState("");

  useEffect(() => {
    getHelp();
  }, []);

  const handleDelete = async (hid)=>{
    const urld = `https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets/${hid}`;
    const token = localStorage.getItem("token");
    try{
      const res = await axios.delete(urld, 
        {
          headers:{Authorization:`Bearer ${token}`}
        }  
      )
     // console.log(res?.data);
      getHelp();
    }catch(err){
      console.log(err.message);
    }
  }

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    //const dispatch = useDispatch();
    const urlx = "https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets";
    const handleClick = async (e)=>{
      e.preventDefault();
      try{
  
        const res = await axios.post(urlx,
          {email, phone} ,
          {
           headers :{
            Authorization:`Bearer ${ud}`,
           }
          } 
        )
        console.log(res?.data);
        getHelp();
      }catch(err){
        console.log(err.message);
      }
    }
   // console.log(branch);
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
            <label>Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} required/>
            <label>Mobile</label>
            <input type="text" onChange={(e)=>setPhone(e.target.value)} required/>
            <button type="submit"  >Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);
  

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Help And Support</h1>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.HelpGridSection}>
        {
          <>
            <p>{email}</p>    
            <p>{phone}</p>
            <button onClick={()=>setModalShow(true)}>Update/Create</button>
            <button onClick={()=>handleDelete(hid)}>Delete</button>
          </>
        }
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};