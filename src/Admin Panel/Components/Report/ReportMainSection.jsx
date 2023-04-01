import React, { useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Report.module.css";
import { ReportGraph } from "./ReportGraph";
import { GrRefresh } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdCloudDownload } from "react-icons/io";
export const ReportMainSection = () => {
  const [tab, setTab] = useState("all");
  const all = [
    {
      company_name: "abcc",
      order_type: "medical",
      product_name: "machine",
      date: "20/12/2022",
      quantity: "22",
    },
  ];
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [300, 200, 50, 100, 320, 250, 280, 300, 300, 300, 290, 300],
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
      <div className={stylesfromDash.mainOrderSection}>
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
      </div>
    </div>
  );
};
