import React, { useEffect, useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/TotalProducts.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../Redux/Auth/action";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  const ud = localStorage.getItem("token");
  const [productId, setPid] = useState("");
  const [productName, setPname] = useState("");
  const [stock, setStock] = useState("");
  const [quantity, setQ] = useState("");
  const [price, setPrice] = useState("");
  const image = "https://i.mydramalist.com/R6W7x_5f.jpg";
  //console.log(image, productId, productName, stock, quantity, price);
  const dispatch = useDispatch();
  const url = "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/products";
  const handleClick = async (e)=>{
    e.preventDefault();
    try{
      console.log(image, productId, productName, stock, quantity, price);
      const res = await axios.post(url,
        {image,productId, productName, stock, quantity, price} ,
        {
         headers :{
          Authorization:`Bearer ${ud}`,
         }
        } 
      )
      console.log(res?.data);
      dispatch(getAllProducts());
    }catch(err){
      console.log(err.message);
    }
  }
  console.log(image, productId, productName, stock, quantity, price);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleClick}>
        <label >Product Id</label>
        <input type="text" id="name" name="name" required onChange={(e)=>setPid(e.target.value)}/>
        
        <label >Product Name</label>
        <input type="text" id="email" name="email" required onChange={(e)=>setPname(e.target.value)}/>
        
        <label >Stock</label>
        <input type="text" id="password" name="password" required onChange={(e)=>setStock(e.target.value)}/>
        
        <label >Quantity</label>
        <input type="text" id="phone" name="phone"  required 
          onChange={(e)=>setQ(e.target.value)}
        />
        <label for="phone">Price</label>
        <input type="text" id="phone" name="phone"  required 
          onChange={(e)=>setPrice(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



export const TotalProductMainSection = () => {
  const [tab, setTab] = useState("all");
  const [searchData, setSearchData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
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
          <button onClick={setModalShow}>Add Products</button>
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
