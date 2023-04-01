import React, { useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/TotalProducts.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
export const TotalProductMainSection = () => {
  const [tab, setTab] = useState("all");
  const all = [
    {
      img: "https://th.bing.com/th/id/OIP.2cKAdWsLVWuqOBi25yBypAHaFL?pid=ImgDet&rs=1",
      product_id: "12",
      product_name: "dilyasis machine",
      in_stock: "available",
      quantity: 50,
      price: 500,
    },
    {
      img: "https://th.bing.com/th/id/OIP.2cKAdWsLVWuqOBi25yBypAHaFL?pid=ImgDet&rs=1",
      product_id: "12",
      product_name: "dilyasis machine",
      in_stock: "Unavailable",
      quantity: 50,
      price: 500,
    },
  ];
  const newProd = [
    {
      img: "https://th.bing.com/th/id/OIP.2cKAdWsLVWuqOBi25yBypAHaFL?pid=ImgDet&rs=1",
      product_id: "12",
      product_name: "dilyasis machine",
      in_stock: "available",
      quantity: 50,
      price: 500,
    },
    {
      img: "https://th.bing.com/th/id/OIP.2cKAdWsLVWuqOBi25yBypAHaFL?pid=ImgDet&rs=1",
      product_id: "12",
      product_name: "dilyasis machine",
      in_stock: "Unavailable",
      quantity: 50,
      price: 500,
    },
  ];
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <div className={styles.TitleSection}>
          <h1 className={stylesfromDash.Title}>Total Products(100)</h1>
          <button>Add Products</button>
        </div>
      </div>
      <div className={styles.ProductMain}>
        <p>Product Detail's</p>
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
            New(15)
          </div>
          <div
            onClick={() => setTab("ongoing")}
            className={tab === "ongoing" && styles.active}
          >
            Ongoing(15)
          </div>
          <div
            onClick={() => setTab("complated")}
            className={tab === "complated" && styles.active}
          >
            Complated(15)
          </div>
        </div>
        <hr />

        <div className={styles.InputBox}>
          <AiOutlineSearch className={styles.IconSearch} />
          <input
            type="text"
            placeholder="Search by Product Id,Product Name etc"
          />
        </div>
        <div className={styles.tableDiv}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>In Stock</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {tab === "all"
                ? all?.map((ele) => (
                    <>
                      <tr>
                        <td>
                          <img
                            width={"80px"}
                            height="80px"
                            src={ele.img}
                            alt={ele.img}
                          />
                        </td>
                        <td>{ele.product_id}</td>
                        <td>{ele.product_name}</td>
                        <td>
                          {ele.in_stock === "available" ? (
                            <>
                              <GoPrimitiveDot color="green" />
                              {ele.in_stock}
                            </>
                          ) : (
                            <>
                              <GoPrimitiveDot color="red" />
                              {ele.in_stock}
                            </>
                          )}
                        </td>
                        <td>{ele.quantity}</td>

                        <td>&#x20b9;{ele.price}</td>
                      </tr>
                    </>
                  ))
                : newProd?.map((ele) => (
                    <>
                      <tr>
                        <td>
                          <img
                            width={"80px"}
                            height="80px"
                            src={ele.img}
                            alt={ele.img}
                          />
                        </td>
                        <td>{ele.product_id}</td>
                        <td>{ele.product_name}</td>
                        <td>
                          {ele.in_stock === "available" ? (
                            <>
                              <GoPrimitiveDot color="green" />
                              {ele.in_stock}
                            </>
                          ) : (
                            <>
                              <GoPrimitiveDot color="red" />
                              {ele.in_stock}
                            </>
                          )}
                        </td>
                        <td>{ele.quantity}</td>

                        <td>&#x20b9;{ele.price}</td>
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
