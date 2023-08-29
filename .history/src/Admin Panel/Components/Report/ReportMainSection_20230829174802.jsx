import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Report.module.css";
import { ReportGraph } from "./ReportGraph";
import { GrRefresh } from "react-icons/gr";
import axios from "axios";

export const ReportMainSection = () => {
  const [barData, setBarData] = useState([]);
  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/countorders";

  const getBarData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBarData(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getBarData();
  }, []);


  const lab = [];
  const bar_data = [];
  barData?.map((item) => {
    lab.push(item?.month);
    bar_data.push(item?.orderCount);
  });
  // console.log(lab);
  // console.log(bar_data);
  const chartData = {
    labels: lab,
    datasets: [
      {
        data: bar_data,
        backgroundColor: "#6092C0",
        barThickness: "60",
        padding: "5",
      },
    ],
  };

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Products(100)</h1>
      </div>
      <div className={styles.ReportGraph}>
        <div>
          <p>Order's Report</p>
          <div>
            <GrRefresh
              size={20}
              color="#2A3A8F"
              style={{ cursor: "pointer" }}
            />
            <select>
              <option value="">This Month</option>
            </select>
            <select>
              <option value="">Company A</option>
            </select>
          </div>
        </div>
        <ReportGraph chartData={chartData} />
      </div>
      {/*<div className={stylesfromDash.mainOrderSection}>
        <h1 className={styles.Title}>Report List</h1>
        <div className={stylesfromDash.TabTitle}>
          <div
            onClick={() => setTab("all")}
            className={tab === "all" && stylesfromDash.active}
          >
            All Products
          </div>
          <div
            onClick={() => setTab("new")}
            className={tab === "new" && stylesfromDash.active}
          >
            New(50)
          </div>
          <div
            onClick={() => setTab("ongoing")}
            className={tab === "ongoing" && stylesfromDash.active}
          >
            Ongoing(60)
          </div>
          <div
            onClick={() => setTab("complated")}
            className={tab === "complated" && stylesfromDash.active}
          >
            Complated(60)
          </div>
        </div>
        <hr />
        <div className={stylesfromDash.filterSection}>
          <div>
            <div>
              <AiOutlineSearch
                className={stylesfromDash.filterSectionIconSearch}
                size={25}
              />
              <input
                type="text"
                placeholder="Search by Product name,Product Id"
              />
            </div>
            <button>Search</button>
          </div>
          <div>
            <FiFilter size={25} />
            <BsFilterLeft size={25} />
            <button>Add</button>
          </div>
        </div>
        <div className={styles.tableDiv}>
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Order Type</th>
                <th>Product Name</th>
                <th>Date</th>
                <th>Qauntity</th>
                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              {tab === "all"
                ? all.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.company_name}</td>
                        <td>{ele.order_type}</td>
                        <td>{ele.product_name}</td>
                        <td>{ele.date}</td>
                        <td>{ele.quantity}</td>
                        <td>
                          <IoMdCloudDownload size={20} color="#C5161D" />
                        </td>
                      </tr>
                    </>
                  ))
                : tab === "new"
                ? all.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.company_name}</td>
                        <td>{ele.order_type}</td>
                        <td>{ele.product_name}</td>
                        <td>{ele.date}</td>
                        <td>{ele.quantity}</td>
                        <td>
                          <IoMdCloudDownload size={20} color="#C5161D" />
                        </td>
                      </tr>
                    </>
                  ))
                : tab === "ongoing"
                ? all.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.company_name}</td>
                        <td>{ele.order_type}</td>
                        <td>{ele.product_name}</td>
                        <td>{ele.date}</td>
                        <td>{ele.quantity}</td>
                        <td>
                          <IoMdCloudDownload size={20} color="#C5161D" />
                        </td>
                      </tr>
                    </>
                  ))
                : all.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.company_name}</td>
                        <td>{ele.order_type}</td>
                        <td>{ele.product_name}</td>
                        <td>{ele.date}</td>
                        <td>{ele.quantity}</td>
                        <td>
                          <IoMdCloudDownload size={20} color="#C5161D" />
                        </td>
                      </tr>
                    </>
                  ))}
            </tbody>
          </table>
        </div>
      </div>*/}
    </div>
  );
};
