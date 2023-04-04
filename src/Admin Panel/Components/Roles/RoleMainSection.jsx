import React, { useEffect, useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Roles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "../../../Redux/Auth/action";
import axios from 'axios';
export const RoleMainSection = () => {
  const [tab, setTab] = useState("all");
  const [all, setAll] = useState([]);
  const url =
    "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin";
  const getAllAdmins = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res?.data?.data);
      setAll(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAllAdmins();
  }, []);

  const admin = [];
  const sub_admin = [];

  all?.map((item) => {
    if (item?.role === "Admin") {
      admin.push(item);
    } else if (
      item?.role === "Sub-Admin" ||
      item?.role === "Sub-admin" ||
      item?.role === "sub-admin"
    ) {
      sub_admin.push(item);
    }
  });
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.RoleMain}>
        <div className={styles.SearchBox}>
          <div>
            <AiOutlineSearch className={styles.SearchIcon} />
            <input type="text" placeholder="Search by order Id,Customer Id" />
          </div>
          <button>Search</button>
        </div>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("all")}
            className={tab === "all" && styles.active}
          >
            All({admin?.length})
          </div>
          <div
            onClick={() => setTab("admin")}
            className={tab === "admin" && styles.active}
          >
            Admin({admin.length})
          </div>
          <div
            onClick={() => setTab("subAdmin")}
            className={tab === "subAdmin" && styles.active}
          >
            Sub-Admin({sub_admin.length})
          </div>
        </div>
        <hr />
        <div className={styles.tableDiv}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {tab === "all"
                ? all?.map((ele) => (
                    <>
                      <tr>
                        <td>
                          <div>
                            {`${ele.firstName} ${ele.lastName}`}
                          </div>
                        </td>
                        <td>{ele._id}</td>
                        <td>{ele.role}</td>
                      </tr>
                    </>
                  ))
                : tab === "admin"
                ? admin?.map((ele) => (
                    <>
                      <tr>
                        <td>
                          <div>
                            {`${ele.firstName} ${ele.lastName}`}
                          </div>
                        </td>
                        <td>{ele._id}</td>
                        <td>{ele.role}</td>
                      </tr>
                    </>
                  ))
                : sub_admin?.map((ele) => (
                    <>
                      <tr>
                        <td>
                          <div>
                            {`${ele.firstName} ${ele.lastName}`}
                          </div>
                        </td>
                        <td>{ele._id}</td>
                        <td>{ele.role}</td>
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
