import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/TotalCustomer.module.css";
import { BsEyeFill } from "react-icons/bs";
import { SingleCostomerInfoModal } from "./SingleCostomerInfoModal";
import { AddCustomerModal } from "./AddCustomerModal";
import axios from "axios";

export const TotalCustomerMainSection = () => {
  const [tab, setTab] = useState("all");
  const [CustomerInfoModal, setCustomerInfoModal] = useState(false);
  const [addCustModal, setAddCustModal] = useState(false);
  const [customer, setCustomer] = useState([]);
  const HandleModal = () => {
    setCustomerInfoModal(!CustomerInfoModal);
  };
  const HandleAddCustoModal = () => {
    setAddCustModal(!addCustModal);
  };

  const getAllCustomers = async (url) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res?.data?.data?.data);
      setCustomer(res?.data?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const url =
      "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/users";
    getAllCustomers(url);
  }, []);

  let newCustomer = [];
  if(customer?.length<=5) newCustomer = customer;
  else newCustomer = customer?.slice(-5);

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Customer (100)</h1>
      </div>

      <div className={styles.inputBoxMainDiv}>
        <div className={styles.inputBox}>
          <AiOutlineSearch className={stylesfromDash.filterSectionIconSearch} />
          <input type="text" placeholder="Search by Name,Town,State etc" />
        </div>
        <AddCustomerModal
          openModal={addCustModal}
          HandleModal={HandleAddCustoModal}
        />
        <button onClick={HandleAddCustoModal}>Create Order</button>
      </div>

      <div className={styles.CustomerMain}>
        <p>Customer Detail's</p>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("all")}
            className={tab === "all" && styles.active}
          >
            All Customers
          </div>
          <div
            onClick={() => setTab("new")}
            className={tab === "new" && styles.active}
          >
            New({newCustomer?.length})
          </div>
        </div>
        <hr />
        <SingleCostomerInfoModal
          openModal={CustomerInfoModal}
          HandleModal={HandleModal}
        />
        <div className={styles.tableDiv}>          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>State</th>
                <th>District</th>
                <th>Pincode</th>
              </tr>
            </thead>

            <tbody>
              {tab === "all"
                ? customer?.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.middleName}</td>
                        <td>{ele.lastName}</td>

                        <td>{ele.firstLineAddress + ele.secondLineAddress}</td>
                        <td>{ele.state}</td>
                        <td>{ele.district}</td>
                        <td>{ele.pincode}</td>
                        <td>
                          {" "}
                          <BsEyeFill
                            onClick={HandleModal}
                            cursor={"pointer"}
                            color="#C5161D"
                          />
                        </td>
                      </tr>
                    </>
                  ))
                : newCustomer?.map((ele) => (
                    <>
                      <tr>
                      <td>{ele.middleName}</td>
                        <td>{ele.lastName}</td>

                        <td>{ele.firstLineAddress + ele.secondLineAddress}</td>
                        <td>{ele.state}</td>
                        <td>{ele.district}</td>
                        <td>{ele.pincode}</td>
                        <td>
                          {" "}
                          <BsEyeFill
                            onClick={HandleModal}
                            cursor={"pointer"}
                            color="#C5161D"
                          />
                        </td>
                      </tr>
                    </>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
