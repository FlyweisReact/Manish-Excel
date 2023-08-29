/** @format */

import React, { useEffect, useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/PrivacyPolicy.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTerms } from "../../../Redux/Auth/action";
import { Modal , Button , Form , Table } from "react-bootstrap";
import axios from "axios";

export const TermAndConditionMainSec = () => {
  const terms = useSelector((state) => state.AuthReducer.terms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTerms());
  }, [dispatch]);

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const url = "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/terms";
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          url,
          { content },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        dispatch(getTerms());
      } catch (err) {
        console.log(err.message);
      }
    };
    return (
      <Modal
        {...props}
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
            <label>Terms</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setContent(e.target.value)}
            />
            <input type="submit" value="Submit" />
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
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Terms and Condition</h1>
        <button onClick={() => setModalShow(true)}>Add</button>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.TextSection}>
        <p>{terms?.content}</p>
      </div>


      <div className="myTable">
          <Table>
            <thead>
              <tr>
                <th>Terms and Condition</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td> {terms?.content} </td>
              <td></td>
            </tr>
              {citys?.data?.map((i, index) => (
                <tr key={index}>
                  <td> {i.city} </td>
                  <td>
                    <span className="flex-cont">
                     
                      <AiFillEdit
                        onClick={() => {
                          setId(i._id);
                          setEdit(true);
                          setModalShow(true);
                        }}
                        style={{ color: "#4287f5" }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
