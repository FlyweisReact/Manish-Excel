import React, { useEffect, useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Roles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "../../../Redux/Auth/action";
export const RoleMainSection = () => {
  const [tab, setTab] = useState("all");
  const dispatch = useDispatch();
  const AllAdmins = useSelector((state) => state.AuthReducer.AllAdmins);

  const admin = AllAdmins?.filter((ele) => ele.role === "Admin");
  const subAdmin = AllAdmins.filter((ele) => ele.role === "Sub-Admin");
  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);
  console.log(AllAdmins);
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
            All({AllAdmins.length})
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
            Sub-Admin({subAdmin.length})
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
                ? AllAdmins?.map((ele) => (
                    <>
                      <tr>
                        <td>
                          <div>
                            <img
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                              }}
                              src={
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331"
                              }
                              alt="x"
                            />
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
                            <img
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                              }}
                              src={
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331"
                              }
                              alt="x"
                            />
                            {`${ele.firstName} ${ele.lastName}`}
                          </div>
                        </td>
                        <td>{ele._id}</td>
                        <td>{ele.role}</td>
                      </tr>
                    </>
                  ))
                : subAdmin?.map((ele) => (
                    <>
                      <tr>
                        <td>
                          <div>
                            <img
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                              }}
                              src={
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331"
                              }
                              alt="x"
                            />
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
