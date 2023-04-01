import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import styles from "../../Styles/OrderStatusModal.module.css";
import { OrderUpdateStatusModal } from "./OrderUpdateStatusModal";
import { StatusTrack } from "./StatusTrack";
import ProductImg from "../../Assets/Product_img.png";
export const OrderStatusModal = ({ OpenModal, HandleModal }) => {
  const [tab, setTab] = useState("delivery");
  const [openMod, setOpenMod] = useState(false);
  const HandleStatusUpdateModal = () => {
    setOpenMod(!openMod);
  };
  return (
    <div className={OpenModal ? styles.modalVisible : styles.modal}>
      <div className={styles.ModalMainDiv}>
        <div className={styles.ModalTitleDiv}>
          <p>Order Status</p>
          <MdOutlineClose
            onClick={HandleModal}
            size={35}
            className={styles.CloseICon}
          />
        </div>
        <div className={styles.Main}>
          <div className={styles.MainFirstDiv}>
            <div className={styles.TabTitle}>
              <div
                onClick={() => setTab("delivery")}
                className={tab === "delivery" && styles.active}
              >
                Delivery Status
              </div>
              <div
                onClick={() => setTab("customer")}
                className={tab === "customer" && styles.active}
              >
                Customer Status
              </div>
            </div>
            {tab === "delivery" ? (
              <div
                style={{ marginTop: "60px" }}
                className={styles.customerSection}
              >
                <div>
                  <StatusTrack />
                </div>
              </div>
            ) : (
              <div className={styles.customerSection}>
                <div className={styles.customerSectionBtn}>
                  <OrderUpdateStatusModal
                    OpenModal={openMod}
                    HandleModal={HandleStatusUpdateModal}
                  />
                  <button onClick={HandleStatusUpdateModal}>
                    Update Status
                  </button>
                </div>
                <div>
                  <StatusTrack />
                </div>
              </div>
            )}
          </div>
          <div className={styles.MainSecondDiv}>
            <h2>Order Detail's</h2>
            <img
              src={ProductImg}
              className={styles.ProductImg}
              alt={ProductImg}
            />
            <div>
              <p>Order ID:</p>
              <div>
                <p>10000555522</p>
              </div>
            </div>
            <div>
              <p>Customer Name:</p>
              <div>
                <p>ABC</p>
              </div>
            </div>
            <div>
              <p>Order Type:</p>
              <div>
                <p>Package</p>
              </div>
            </div>
            <div>
              <p>Order Date:</p>
              <div>
                <p>DD/MM/YY</p>
              </div>
            </div>
            <div>
              <p>Payment Status:</p>
              <div>
                <p>Pending</p>
              </div>
            </div>
            <h2>Branch Details</h2>
            <div>
              <p>Branch:</p>
              <div>
                <p>Kanpur Branch</p>
              </div>
            </div>
            <div>
              <p>Sub Admin:</p>
              <div>
                <p>Viraj</p>
              </div>
            </div>
            <div>
              <p>Contact:</p>
              <div>
                <p>10000555522</p>
              </div>
            </div>
            <div>
              <p>Address:</p>
              <div>
                <p>
                  A66 sector 25,
                  <br />
                  Kanpur
                </p>
              </div>
            </div>
            <h2>Package Details</h2>
            <div>
              <p>Package ID:</p>
              <div>
                <p>10000555522</p>
              </div>
            </div>
            <div>
              <p>Number of items:</p>
              <div>
                <p>10000555522</p>
              </div>
            </div>
            <div>
              <p>Total Packages:</p>
              <div>
                <p>10000555522</p>
              </div>
            </div>
            <div>
              <p>Address:</p>
              <div>
                <p>
                  A66 sector 25,
                  <br />
                  Kanpur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
