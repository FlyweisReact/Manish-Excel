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
import FileSaver from "file-saver";
import axios from "axios";

export const MainSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.AuthReducer.branches);
  const products = useSelector((state) => state.AuthReducer.products);
  const orders = useSelector((state) => state.AuthReducer.orders);
  const [ users , setUsers ] = useState(0)
  const [tab, setTab] = useState("order");
  const [OpenModal, setOpenModal] = useState(false);

  const ongoingOrders = orders?.filter((item)=>{
    return item?.orderStatus === "ongoing";
  })


  const completedOrders = orders?.filter((item)=>{
    return item?.orderStatus === "delivered";
  })


  const fetchCustomer = async () => {
    try{
      const res = await axios.get("https://mr-manish-xcell-backend.vercel.app/api/v1/users")
      
    }catch{}
  }


  const [query, setQuery] = useState("");


  const searchData = !query
    ? orders
    : orders?.filter((item) => {
        return           item?.customerId?.includes(query) ||
          item?.orderId?.includes(query);
      });
  const ongoingsearchData = !query ? ongoingOrders :
                  ongoingOrders?.filter((item)=>{
                    return (
                      item?.catalogueId?.orderId?.includes(query)
                    )
                  });
    const completedsearchData = !query ? completedOrders :
                  completedOrders?.filter((item)=>{
                    return (
                      item?.catalogueId?.orderId?.includes(query)
                    )
                  });


  const urldown = "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/download";


  const getDownloads = async()=>{
    try{
      const res = await fetch(urldown);
      const blob = await res.blob();
      FileSaver.saveAs(blob,"orders.xlsx");
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    dispatch(GetBranches());
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);
  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };

  const handleDownload = ()=>{
    getDownloads();
  }

  return (
    <div className={styles.mainSection}>
      <MainInfo />
      <OrderStatusModal OpenModal={OpenModal} HandleModal={HandleModal} />
      <div className={styles.mainGrid}>
        <div onClick={() => navigate("/branch")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Branch</p>
              <span>{branches?.length}</span>
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
              <span>{products?.length}</span>
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
              <span>{orders?.length}</span>
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
            Ongoing({ongoingOrders?.length})
          </div>
          <div
            onClick={() => setTab("complated")}
            className={tab === "complated" && styles.active}
          >
            Completed({completedOrders?.length})
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
            <button onClick={handleDownload}>
              <CiExport className={styles.filterSectionIconBtn} />
              Export
            </button>
          </div>
        </div>
        <table>
          <thead>
          <tr>
              <th>Patient Name</th>
              <th>Order Id</th>
              <th>Patient Id</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Total Packages</th>
            </tr>
          </thead>
          <tbody>
            {tab === "order"
              ? 
                searchData?.map((ele)=>(
                  <>
              <tr>
                <td>{ele?.name}</td>
                <td>{ele?.catalogueId?.orderId? ele?.catalogueId?.orderId : ele?.orderId}</td>
                <td>{ele?.customerId}</td>
                <td>{ele?.createdAt}</td>
                <td>{ele?.totalAmount}</td>
                <td>{ele?.totalPackages}
              </td>
              </tr>
                  </>              
                ))
              
              
              : tab === "ongoing" ?
                  ongoingsearchData?.map((ele,i)=>(
                    <>
              <tr>
                <td>{ele?.name}</td>
                <td>{ele?.catalogueId?.orderId? ele?.catalogueId?.orderId : ele?.orderId}</td>
                <td>{ele?.customerId}</td>
                <td>{ele?.createdAt}</td>
                <td>{ele?.totalAmount}</td>
                <td>{ele?.totalPackages}
              </td>
              </tr>
                  </>                
                  ))
               
              : 
                
              completedsearchData?.map((ele,i)=>(
                <>
              <tr>
                <td>{ele?.name}</td>
                <td>{ele?.catalogueId?.orderId? ele?.catalogueId?.orderId : ele?.orderId}</td>
                <td>{ele?.customerId}</td>
                <td>{ele?.createdAt}</td>
                <td>{ele?.totalAmount}</td>
                <td>{ele?.totalPackages}
              </td>
              </tr>
              </>         
              ))
              
              }
          </tbody>
        </table>
      </div>
    </div>
  );
};
