import React, { useState } from "react";
import styles from "../../Styles/DashBoard.module.css";

import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CiExport, CiImport } from "react-icons/ci";
import { BsEyeFill, BsFillBoxFill, BsFilterLeft } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { FiFilter } from "react-icons/fi";
import { MainInfo } from "./MainInfo";
import { OrderStatusModal } from "./OrderStatusMadal";
export const MainSection = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("order");
  const [OpenModal, setOpenModal] = useState(false);
  const orderedData = [
    {
      Order_Id: "125",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: false,
    },
    {
      Order_Id: "126",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: true,
    },
  ];
  const onGoingData = [
    {
      Order_Id: "125",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: false,
    },
    {
      Order_Id: "126",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: true,
    },
  ];
  const CompletedData = [
    {
      Order_Id: "125",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: true,
    },
    {
      Order_Id: "126",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: true,
    },
  ];

  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };
  return (
    <div className={styles.mainSection}>
      <MainInfo />
      <OrderStatusModal OpenModal={OpenModal} HandleModal={HandleModal} />
      <div className={styles.mainGrid}>
        <div onClick={() => navigate("/subadmin-totalcustomer")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Customer</p>
              <span>545</span>
            </div>
            <div>
              <FcBusinessman />
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/subadmin-totalproducts")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Products</p>
              <span>55</span>
            </div>
            <div>
              <BsFillBoxFill />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainOrderSection}>
        <h1 className={styles.Title}>Order's Details</h1>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("order")}
            className={tab === "order" && styles.active}
          >
            All Orders
          </div>
          <div
            onClick={() => setTab("ongoing")}
            className={tab === "ongoing" && styles.active}
          >
            Ongoing(50)
          </div>
          <div
            onClick={() => setTab("complated")}
            className={tab === "complated" && styles.active}
          >
            Complated(60)
          </div>
        </div>
        <hr />
        <div className={styles.filterSection}>
          <div>
            <div>
              <AiOutlineSearch className={styles.filterSectionIconSearch} />
              <input type="text" placeholder="Search by order Id,Customer Id" />
            </div>
            <button>Search</button>
          </div>
          <div>
            <FiFilter className={styles.filterSectionIcon} />
            <BsFilterLeft className={styles.filterSectionIcon} />
            <button>
              <CiImport className={styles.filterSectionIconBtn} />
              Import
            </button>
            <button>
              <CiExport className={styles.filterSectionIconBtn} />
              Export
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                Order Id <AiFillCaretDown />
              </th>
              <th>
                Customer Id <AiFillCaretDown />
              </th>
              <th>
                Package <AiFillCaretDown />
              </th>
              <th>
                Delivery Date <AiFillCaretDown />
              </th>
              <th>
                Status <AiFillCaretDown />
              </th>
              <th>Total Amount</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {tab === "order"
              ? orderedData.map((ele) => (
                  <>
                    <tr>
                      <td>{ele.Order_Id}</td>
                      <td>{ele.Customer_Id}</td>
                      <td>{ele.Package}</td>
                      <td>{ele.Delivery_Date}</td>
                      <td>
                        <BsEyeFill
                          onClick={HandleModal}
                          cursor={"pointer"}
                          color="#C5161D"
                        />
                      </td>
                      <td>{ele.Total_Amount}</td>
                      <td>
                        {ele.Payment ? (
                          <>
                            <p className={styles.paid}>Paid</p>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => navigate("/new-invoice")}
                              className={styles.paindingInvoiceBtn}
                            >
                              P.Invoice
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  </>
                ))
              : tab === "ongoing"
              ? onGoingData.map((ele) => (
                  <>
                    <tr>
                      <td>{ele.Order_Id}</td>
                      <td>{ele.Customer_Id}</td>
                      <td>{ele.Package}</td>
                      <td>{ele.Delivery_Date}</td>
                      <td>
                        <BsEyeFill
                          onClick={HandleModal}
                          cursor={"pointer"}
                          color="#C5161D"
                        />
                      </td>
                      <td>{ele.Total_Amount}</td>
                      <td>{ele.Payment}</td>
                    </tr>
                  </>
                ))
              : CompletedData.map((ele) => (
                  <>
                    <tr>
                      <td>{ele.Order_Id}</td>
                      <td>{ele.Customer_Id}</td>
                      <td>{ele.Package}</td>
                      <td>{ele.Delivery_Date}</td>
                      <td>
                        <BsEyeFill
                          onClick={HandleModal}
                          cursor={"pointer"}
                          color="#C5161D"
                        />
                      </td>
                      <td>{ele.Total_Amount}</td>
                      <td>{ele.Payment}</td>
                    </tr>
                  </>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
