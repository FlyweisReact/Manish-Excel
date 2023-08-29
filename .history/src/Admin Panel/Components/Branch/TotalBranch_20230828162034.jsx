import React, { useEffect, useState } from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Branch.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import { BranchLogin } from "./BranchLogin";
import { useDispatch, useSelector } from "react-redux";
import { GetBranches } from "../../../Redux/Auth/action";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  const ud = localStorage.getItem("token");
  const [branch, setBranch] = useState("");
  const [licence, setLicence] = useState("");
  const [gstId, setGstId] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/branches";
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        url,
        { branch, licence, gstId, phone, address },
        {
          headers: {
            Authorization: `Bearer ${ud}`,
          },
        }
      );
      //console.log(res);
      dispatch(GetBranches());
    } catch (err) {
      console.log(err.message);
    }
  };
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
          <input
            type="text"
            onChange={(e) => setBranch(e.target.value)}
            required
          />
          <label>Liscence Number</label>
          <input
            type="text"
            onChange={(e) => setLicence(e.target.value)}
            required
          />
          <label>GST No.</label>
          <input
            type="text"
            onChange={(e) => setGstId(e.target.value)}
            required
          />
          <label>Phone No.</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label>Address</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit">Add Branch</button>
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
  //const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBranches());
  }, [dispatch]);
  console.log(branches);

  const HandleBranchLoginModal = () => {
    setShow(!show);
  };
 
  const [branchData, setBranchData] = useState();

  function MyVerticallyCenteredModal2(props) {
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
          <table className={styles.Branchdet}>
            <thead>
              <tr>
                <th>Liscense No.</th>
                <th>GST No.</th>
                <th>Phone</th>
                <th>Members</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{branchData?.licence}</td>
                <td>{branchData?.gstId}</td>
                <td>{branchData?.phone}</td>
                <td>
                  {branchData?.members?.map((ele, i) => (
                    <ul>
                      <li>{ele?.firstName + " " + ele?.lastName}</li>
                    </ul>
                  ))}
                </td>
                <td>{branchData?.address}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const [modalshow2, setModalShow2] = useState(false);

  const handleClick = async (id) => {
    setModalShow2(true);
    const urlbd = `https://mr-manish-xcell-backend.vercel.app/api/v1/branches/${id}`;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(urlbd, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranchData(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
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

        <button onClick={() => setModalShow(true)}>Add Branch</button>
      </div>
      <div className={styles.branchListDiv}>
        <BranchLogin
          OpenModal={show}
          HandleBranchLoginModal={HandleBranchLoginModal}
          branch={branches}
        />
        {
          /*searchData?.length>0 
          ?
            searchData?.map((ele)=>{
              <>
              {console.log(ele)}
                <BranchList
                  key={ele.id}
                  data={ele}
                  HandleBranchLoginModal={HandleBranchLoginModal}
                />
            </>            
            })
        :*/ branches?.map((ele) => (
            <>
              <div
                className={styles.BranchCont}
                onClick={() => handleClick(ele?._id)}
              >
                <p>{ele?.branch}</p>
              </div>
              {/*<BranchList
              key={ele.id}
              data={ele}
             
            />*/}
            </>
          ))
        }
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal2
        show={modalshow2}
        onHide={() => setModalShow2(false)}
      />
    </div>
  );
};
