import React, { useEffect, useState } from "react";
import styles from "../../Styles/DashBoard.module.css";
import { MdOutlineEditNote } from "react-icons/md";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CiExport, CiImport } from "react-icons/ci";
import {
  BsBuildingFillCheck,
  BsEyeFill,
  BsFillBoxFill,
  BsFilterLeft,
} from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { FiFilter } from "react-icons/fi";
import { MainInfo } from "./MainInfo";
import { OrderStatusModal } from "./OrderStatusMadal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getAllProducts,
  GetBranches,
} from "../../../Redux/Auth/action";
export const MainSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.AuthReducer.branches);
  const products = useSelector((state) => state.AuthReducer.products);
  const orders = useSelector((state) => state.AuthReducer.orders);
  const [tab, setTab] = useState("order");
  const [OpenModal, setOpenModal] = useState(false);
  // console.log(orders);
  const orderedData = [
    {
      Order_Id: "125",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: "5555",
    },
    {
      Order_Id: "126",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: "5555",
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
      Payment: "5555",
    },
    {
      Order_Id: "126",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: "5555",
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
      Payment: "5555",
    },
    {
      Order_Id: "126",
      Customer_Id: "24545",
      Package: "dummy",
      Delivery_Date: "54545454",
      Status: true,
      Total_Amount: "5000",
      Payment: "5555",
    },
  ];
  useEffect(() => {
    dispatch(GetBranches());
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);
  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };
  return (
    <div className={styles.mainSection}>
      <MainInfo />
      <OrderStatusModal OpenModal={OpenModal} HandleModal={HandleModal} />
      <div className={styles.mainGrid}>
        <div onClick={() => navigate("/branch")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Branch</p>
              <span>{branches.length}</span>
            </div>
            <div>
              <BsBuildingFillCheck />
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/totalcustomer")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Customer</p>
              <span></span>
            </div>
            <div>
              <FcBusinessman />
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/totalproducts")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Products</p>
              <span>{products.length}</span>
            </div>
            <div>
              <BsFillBoxFill />
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/totalorders")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Orders</p>
              <span>{orders.length}</span>
            </div>
            <div>
              <MdOutlineEditNote />
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
            Completed(60)
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
                      <td>{ele.Payment}</td>
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
