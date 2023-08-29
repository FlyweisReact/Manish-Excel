import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import { useDispatch } from "react-redux";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/HubAndCities.module.css";
import axios from "axios";
import  { Table , Modal , Form , Button} from 'react-bootstrap '


export const HubAndCitiesMainSection = () => {
  const [city, setCity] = useState([]);

  const url =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/hub-cities";


  const getAllCities = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCity(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    

    getAllCities();
  }, []);
  const [modalShow, setModalShow] = React.useState(false);

  const handleDelete = async (id) => {
    const ud = localStorage.getItem("token");
    const url = `https://mr-manish-xcell-backend.vercel.app/api/v1/admin/hub-cities/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${ud}` },
      });
      getAllCities();
    } catch (err) {
      console.log(err.message);
    }
  };
  
  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [city, setCity] = useState("");
    const dispatch = useDispatch();
    const url =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/hub-cities";
  
    
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          url,
          { city },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
         getAllCities();
      } catch (err) {
        console.log(err.message);
      }
    };

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
            <label for="name">City</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setCity(e.target.value)}
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
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <div className={styles.TitleSection}>
          <h1 className={stylesfromDash.Title}>Hub And Cities</h1>
          <button onClick={() => setModalShow(true)}>Add </button>
        </div>
        <div className={styles.CityMainDiv}>
          {city?.map((ele) => (
            <>
              <div>
                <img
                  height={"290px"}
                  width="274px"
                  src="https://th.bing.com/th/id/OIP.zl79_GKCfWACAEqohlVH7QHaE7?pid=ImgDet&rs=1"
                  alt="x"
                />
                <p>{ele.city}</p>
                <button onClick={() => handleDelete(ele._id)}>Delete</button>
              </div>
            </>
          ))}
        </div>

        <div className="myTable">
          <Table>
            <thead>
              <tr>
                <th>City</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {city?.map((i, index) => (
                <tr key={index}>
                  <td> {i.city} </td>
                  <td>
                    <span className="flex-cont">
                      <AiFillDelete
                        onClick={() => handleDelete(i._id)}
                        style={{ color: "#c5161d" }}
                      />
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

      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
