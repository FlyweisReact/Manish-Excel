import React, { useEffect, useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/TotalProducts.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../Redux/Auth/action";
export const TotalProductMainSection = () => {
  const [tab, setTab] = useState("all");
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();
  var products = useSelector((state) => state.AuthReducer.products);
  const HandleSearch = (e) => {
    const { value } = e.target;
    if (value === "") {
      dispatch(getAllProducts());
    } else {
      const temp = products.filter((item) => {
        return item.productName.includes(value);
      });
      setSearchData(temp);
    }
  };

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
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <div className={styles.TitleSection}>
          <h1 className={stylesfromDash.Title}>
            Total Products({products.length})
          </h1>
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
            All Products
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
            onChange={(e) => HandleSearch(e)}
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
                ? searchData?.length > 0
                  ? searchData?.map((ele) => (
                      <>
                        <tr key={ele._id}>
                          <td>
                            <img
                              width={"80px"}
                              height="80px"
                              src={ele.image}
                              alt={ele.image}
                            />
                          </td>
                          <td>{ele.productId}</td>
                          <td>{ele.productName}</td>
                          <td>
                            {ele.quantity > 0 ? (
                              <>
                                <GoPrimitiveDot color="green" />
                                available
                              </>
                            ) : (
                              <>
                                <GoPrimitiveDot color="red" />
                                unavailable
                              </>
                            )}
                          </td>
                          <td>{ele.quantity}</td>

                          <td>&#x20b9;{ele.price}</td>
                        </tr>
                      </>
                    ))
                  : products &&
                    products?.map((ele) => (
                      <>
                        <tr key={ele._id}>
                          <td>
                            <img
                              width={"80px"}
                              height="80px"
                              src={ele.image}
                              alt={ele.image}
                            />
                          </td>
                          <td>{ele.productId}</td>
                          <td>{ele.productName}</td>
                          <td>
                            {ele.quantity > 0 ? (
                              <>
                                <GoPrimitiveDot color="green" />
                                available
                              </>
                            ) : (
                              <>
                                <GoPrimitiveDot color="red" />
                                unavailable
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
