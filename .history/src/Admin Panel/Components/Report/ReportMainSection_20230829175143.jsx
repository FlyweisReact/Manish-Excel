import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Report.module.css";
import { ReportGraph } from "./ReportGraph";
import { GrRefresh } from "react-icons/gr";
import axios from "axios";

export const ReportMainSection = () => {
  const [barData, setBarData] = useState([]);
  const [ orderCount, setOrderCount] = useState(0)

  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/countorders";

  const getBarData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBarData(res?.data?.data);
      setOrderCount(res?.data?.data?.length)
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getBarData();
  }, []);

  console.log(barData , "barData")


  const lab = [];
  const bar_data = [];
  barData?.map((item) => {
    lab.push(item?.month);
    bar_data.push(item?.orderCount);
  });
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
        <h1 className={stylesfromDash.Title}>Total Products ({orderCount}) </h1>
      </div>
      <div className={styles.ReportGraph}>
        <div>
          <p>Order's Report</p>
          <div>
            {/* <GrRefresh
              size={20}
              color="#2A3A8F"
              style={{ cursor: "pointer" }}
            /> */}
            {/* <select>
              <option value="">This Month</option>
            </select>
            <select>
              <option value="">Company A</option>
            </select> */}
          </div>
        </div>
        <ReportGraph chartData={chartData} />
      </div>
    </div>
  );
};
