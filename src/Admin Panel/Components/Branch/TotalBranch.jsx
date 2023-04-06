import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Branch.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import { BranchList } from "./BranchList";
import { BranchLogin } from "./BranchLogin";
import { useDispatch, useSelector } from "react-redux";
import { GetBranches } from "../../../Redux/Auth/action";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  const ud = localStorage.getItem("token");
  const [branch, setBranch] = useState("");
  const dispatch = useDispatch();
  const url = "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/branches";
  const handleClick = async (e)=>{
    e.preventDefault();
    try{

      const res = await axios.post(url,
        {branch} ,
        {
         headers :{
          Authorization:`Bearer ${ud}`,
         }
        } 
      )
      console.log(res);
      dispatch(GetBranches());
    }catch(err){
      console.log(err.message);
    }
  }
  console.log(branch);
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
          <label>Branch</label>
          <input type="text" onChange={(e)=>setBranch(e.target.value)} required/>
          <button type="submit"  >Add Branch</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const TotalBranch = () => {
  const branches = useSelector((state) => state.AuthReducer.branches);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBranches());
  }, [dispatch]);
  //console.log(branches);

  const HandleBranchLoginModal = () => {
    setShow(!show);
  };
  const HandleSearch = (e) => {
    const { value } = e.target;
    //console.log(branches);
    if (value === "") {
      setSearchData(branches);
      console.log(searchData);
    } else {
      const temp = branches?.filter((item) => {
        return (
          item?.branch?.includes(value) 
        );
      });
      setSearchData(temp);
    }
    console.log(searchData);
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
          <input type="text" placeholder="Search by branch name" onChange={HandleSearch}/>
        </div>
        <button onClick={()=>setModalShow(true)}>
          Add Branch</button>
      </div>
      <div className={styles.branchListDiv}>
        <BranchLogin
          OpenModal={show}
          HandleBranchLoginModal={HandleBranchLoginModal}
          branch={branches}
        />
        {searchData?.length>0 ?
            searchData?.map((ele)=>{
              <>
                <BranchList
                  key={ele.id}
                  data={ele}
                  HandleBranchLoginModal={HandleBranchLoginModal}
                />
            </>            
            })
        :branches?.map((ele) => (
          <>
            <BranchList
              key={ele.id}
              data={ele}
              HandleBranchLoginModal={HandleBranchLoginModal}
            />
          </>
        ))}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
