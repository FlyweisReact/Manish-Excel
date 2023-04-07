import React, { useState, useEffect } from "react";
import styles from "../../Styles/DashBoard.module.css";

import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CiExport, CiImport } from "react-icons/ci";
import { BsEyeFill, BsFillBoxFill, BsFilterLeft } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { FiFilter } from "react-icons/fi";
import { MainInfo } from "./MainInfo";
import { OrderStatusModal } from "./OrderStatusMadal";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
export const MainSection = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("order");
  const [OpenModal, setOpenModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const url = "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/orders";
  const getAllOrders = async ()=>{
    const token = localStorage.getItem("token");
    try{
      const res = await axios.get(url,
        {
          headers:{Authorization:`Bearer ${token}`}
        }
      )
      setOrders(res?.data?.data);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getAllOrders();
  },[])

  const ongoingOrders = orders?.filter((item)=>{
    return item?.orderStatus === "ongoing";
  })

  //console.log(orders);

  const completedOrders = orders?.filter((item)=>{
    return item?.orderStatus === "delivered";
  })

  const [query, setQuery] = useState("");


  const searchData = !query ? orders :
                  orders?.filter((item)=>{
                    return (
                      item?.catalogueId?.orderId?.includes(query)
                    )
                  })
  console.log(searchData);

  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };
  return (
    <div className={styles.mainSection}>
      <MainInfo />
      <OrderStatusModal OpenModal={OpenModal} HandleModal={HandleModal} />
      <div className={styles.mainGrid}>
        <div onClick={() => navigate("/subadmin-totalcustomer")}>
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
        <div onClick={() => navigate("/subadmin-totalproducts")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Products</p>
              <span></span>
            </div>
            <div>
              <BsFillBoxFill />
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
            Ongoing({ongoingOrders.length})
          </div>
          <div
            onClick={() => setTab("complated")}
            className={tab === "complated" && styles.active}
          >
            Complated({completedOrders?.length})
          </div>
        </div>
        <hr />
        <div className={styles.filterSection}>
          <div>
            <div>
              <AiOutlineSearch className={styles.filterSectionIconSearch} />
              <input type="text" placeholder="Search by order Id,Customer Id" 
                onChange={(e)=>setQuery(e.target.value)}
              />
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
                Order Date <AiFillCaretDown />
              </th>
              {/*<th>
                Status <AiFillCaretDown />
  </th>*/}
              <th>Total Amount</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {tab === "order"
              ? searchData.length >0 
              ?
                searchData?.map((ele)=>(
                  <>
                  <tr>
                    <td>{ele?.catalogueId?.orderId}</td>
                    <td>{ele.userId}</td>
                    <td>{ele.totalPackages}</td>
                    <td>{ele.createdAt}</td>
                    <td>
                      {ele?.catalogueId?.totalAmount}
                    </td>
                    <td>{ele.address}</td>
                  </tr>
                </>                 
                ))  
              
              :orders.map((ele) => (
                <>
                <tr>
                  <td>{ele?.catalogueId?.orderId}</td>
                  <td>{ele.userId}</td>
                  <td>{ele.totalPackages}</td>
                  <td>{ele.createdAt}</td>
                  <td>
                    {ele?.catalogueId?.totalAmount}
                  </td>
                  <td>{ele.address}</td>
                </tr>
              </>
                ))
              : tab === "ongoing"
              ? ongoingOrders.map((ele) => (
                <>
                <tr>
                  <td>{ele?.catalogueId?.orderId}</td>
                  <td>{ele.userId}</td>
                  <td>{ele.totalPackages}</td>
                  <td>{ele.createdAt}</td>
                  <td>
                    {ele?.catalogueId?.totalAmount}
                  </td>
                  <td>{ele.address}</td>
                </tr>
              </>
                ))
              : completedOrders.map((ele) => (
                <>
                <tr>
                  <td>{ele?.catalogueId?.orderId}</td>
                  <td>{ele.userId}</td>
                  <td>{ele.totalPackages}</td>
                  <td>{ele.createdAt}</td>
                  <td>
                    {ele?.catalogueId?.totalAmount}
                  </td>
                  <td>{ele.address}</td>
                </tr>
              </>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
