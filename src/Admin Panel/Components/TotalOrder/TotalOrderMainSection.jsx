import React, { useEffect, useState } from "react";
import styles from "../../Styles/TotalOrder.module.css";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { BsFilterLeft } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../Redux/Auth/action";
export const TotalOrderMainSection = () => {
  const [tab, setTab] = useState("all");
  const orders = useSelector((state) => state.AuthReducer.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  console.log(orders);
  const orderedData = [
    {
      order_id: 122,
      customer_id: 222,
      package: "kidney",
      date: "12/12/2222",
      location: "delhi",
    },
    {
      order_id: 122,
      customer_id: 222,
      package: "kidney",
      date: "12/12/2222",
      location: "delhi",
    },
  ];

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Orders(100)</h1>
        <div className={styles.mainOrder}>
          <p>Order's Details</p>
        </div>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("all")}
            className={tab === "all" && styles.active}
          >
            All Orders
          </div>
          <div
            onClick={() => setTab("new")}
            className={tab === "new" && styles.active}
          >
            New(50)
          </div>
          <div
            onClick={() => setTab("ongoing")}
            className={tab === "ongoing" && styles.active}
          >
            Ongoing(60)
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
        <div className={styles.MainTableDiv}>
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
                <th>Order Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {tab === "all"
                ? orderedData.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.order_id}</td>
                        <td>{ele.customer_id}</td>
                        <td>{ele.package}</td>
                        <td>{ele.date}</td>
                        <td>{ele.location}</td>
                        <td>
                          <button>Details</button>
                        </td>
                      </tr>
                    </>
                  ))
                : tab === "ongoing"
                ? orderedData.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.order_id}</td>
                        <td>{ele.customer_id}</td>
                        <td>{ele.package}</td>
                        <td>{ele.date}</td>
                        <td>{ele.location}</td>
                        <td>
                          <button>Details</button>
                        </td>
                      </tr>
                    </>
                  ))
                : orderedData.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.order_id}</td>
                        <td>{ele.customer_id}</td>
                        <td>{ele.package}</td>
                        <td>{ele.date}</td>
                        <td>{ele.location}</td>
                        <td>
                          <button>Details</button>
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
