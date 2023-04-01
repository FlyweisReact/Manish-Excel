import React, { useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Roles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
export const RoleMainSection = () => {
  const [tab, setTab] = useState("all");
  const all = [
    {
      name: "Sameer Khurana",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331",
      role: "Admin",
      id: 12,
    },
    {
      name: "Sameer Khurana",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331",
      role: "Admin",
      id: 13,
    },
  ];
  const admin = [
    {
      name: "Sameer Khurana",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331",
      role: "Admin",
      id: 12,
    },
    {
      name: "Sameer Khurana",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331",
      role: "Admin",
      id: 12,
    },
  ];
  const subAdmin = [
    {
      name: "Sameer Khurana",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331",
      role: "Admin",
      id: 12,
    },
    {
      name: "Sameer Khurana",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rubio_Circle.png/899px-Rubio_Circle.png?20150804234331",
      role: "Admin",
      id: 12,
    },
  ];
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
            All
          </div>
          <div
            onClick={() => setTab("admin")}
            className={tab === "admin" && styles.active}
          >
            Admin(5)
          </div>
          <div
            onClick={() => setTab("subAdmin")}
            className={tab === "subAdmin" && styles.active}
          >
            Sub-Admin(20)
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
                            <img
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                              }}
                              src={ele.img}
                              alt="x"
                            />
                            {ele.name}
                          </div>
                        </td>
                        <td>{ele.id}</td>

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
                              src={ele.img}
                              alt="x"
                            />
                            {ele.name}
                          </div>
                        </td>
                        <td>{ele.id}</td>

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
                              src={ele.img}
                              alt="x"
                            />
                            {ele.name}
                          </div>
                        </td>
                        <td>{ele.id}</td>

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
