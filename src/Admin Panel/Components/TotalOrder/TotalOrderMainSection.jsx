import React, { useEffect, useState } from "react";
import styles from "../../Styles/TotalOrder.module.css";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { BsFilterLeft } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../Redux/Auth/action";
export const TotalOrderMainSection = () => {
  const [tab, setTab] = useState("all");
  const orders = useSelector((state) => state.AuthReducer.orders);
  //console.log(orders);
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  console.log(orders);
  const orderedData = [
    {
      order_id: 122,
      customer_id: 222,
      package: "kidney",
      date: "12/12/2222",
      location: "delhi",
    },
    {
      order_id: 122,
      customer_id: 222,
      package: "kidney",
      date: "12/12/2222",
      location: "delhi",
    },
  ];

  let newOrder = [];
  if(orders?.length<=3) newOrder = orders;
  else newOrder = orders?.slice(0,3);
 // const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState();

  const searchData = !query ? orders :
                  orders?.filter((item)=>{
                    return (
                      item?.catalogueId.orderId?.includes(query)
                    )
                  })

  /*const HandleSearch = (e) => {
    const { value } = e.target;
    if (value === "") {
      setSearchData(orders);
    } else {
      //console.log(value);
      const temp = orders.filter((item) => {
        console.log(item?.catalogueId.orderId);
        return (
          item?.catalogueId.orderId?.toString()?.includes(value.toString())
        );
      });
      setSearchData(temp);
    }
    //console.log(searchData);
  };*/

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Orders(100)</h1>
        <div className={styles.mainOrder}>
          <p>Order's Details</p>
        </div>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("all")}
            className={tab === "all" && styles.active}
          >
            All Orders
          </div>
          <div
            onClick={() => setTab("new")}
            className={tab === "new" && styles.active}
          >
            New
          </div>
          {/*<div
            onClick={() => setTab("ongoing")}
            className={tab === "ongoing" && styles.active}
          >
            Ongoing
  </div>
          <div
            onClick={() => setTab("complated")}
            className={tab === "complated" && styles.active}
          >
            Complated
  </div>*/}
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
        <div className={styles.MainTableDiv}>
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
                <th>Order Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {tab === "all"
                ? searchData?.length >0 ? 
                
                searchData?.map((ele)=>(
                  <>
                  <tr>
                    <td>{ele.catalogueId.orderId}</td>
                    <td>{ele.userId}</td>
                    <td>{ele.totalPackages}</td>
                    <td>{ele.createdAt}</td>
                    <td>{ele.address}</td>
                    <td>
                      <button>Details</button>
                    </td>
                  </tr>
                </>                
                ))
                
                
                :
                orders.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.catalogueId.orderId}</td>
                        <td>{ele.userId}</td>
                        <td>{ele.totalPackages}</td>
                        <td>{ele.createdAt}</td>
                        <td>{ele.address}</td>
                        <td>
                          <button>Details</button>
                        </td>
                      </tr>
                    </>
                  ))
                : tab === "new"
                ? newOrder.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.catalogueId.orderId}</td>
                        <td>{ele.catalogueId.name}</td>
                        <td>{ele.totalPackages}</td>
                        <td>{ele.createdAt}</td>
                        <td>{ele.address}</td>
                        <td>
                          <button>Details</button>
                        </td>
                      </tr>
                    </>
                  ))
                : orderedData.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.order_id}</td>
                        <td>{ele.customer_id}</td>
                        <td>{ele.package}</td>
                        <td>{ele.date}</td>
                        <td>{ele.location}</td>
                        <td>
                          <button>Details</button>
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
