import React, { useState } from "react";
import styles from "../../Styles/DashBoard.module.css";
import {
  MdHistory,
  MdOutlineDashboardCustomize,
  MdOutlineNotificationAdd,
  MdOutlinePrivacyTip,
  MdReportGmailerrorred,
} from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { TbHelpOctagon } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import CityIcon from "../../Assets/City.svg";
import { OrderStatusModal } from "./OrderStatusMadal";
export const SiderBar = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };
  const navigate = useNavigate();
  const HandleLogout = () => {
    navigate("/");
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.welcomeBox}>
        <h2>Welcome,</h2>
        <div>
          <p>Sub-Admin</p>
          <p>ID:{"123555445"}</p>
        </div>
      </div>
      <div className={styles.menu}>
        <Link to={"/subadmindashboard"}>
          <div>
            <MdOutlineDashboardCustomize />
            <p>Dashboard</p>
          </div>
        </Link>
        <div className={styles.dropdown}>
          <OrderStatusModal OpenModal={OpenModal} HandleModal={HandleModal} />
          <BiCurrentLocation />
          <p>Tracking</p>
          <FiChevronDown
            onClick={() => {
              setShowDropDown(!showDropdown);
            }}
            className={styles.DownIcon}
          />
          <div className={showDropdown ? styles.dropdownContent : styles.show}>
            {/* <Link to={"/deliverystatus"}> */}
            <p onClick={HandleModal}> Order Tracking</p>
            {/* </Link> */}
            {/* <Link to={"/customerstatus"}> */}
            <p onClick={HandleModal}> Customer Tracking</p>
            {/* </Link> */}
          </div>
        </div>
        <div className={styles.dropdown}>
          <Link to="/subadmin-notification">
            <div>
              <MdOutlineNotificationAdd />
              <p>Notifications</p>
            </div>
          </Link>
          <FiChevronDown className={styles.DownIcon} />
        </div>
        {/*<div className={styles.dropdown}>
          <MdHistory />
          <p>History</p>
          <FiChevronDown className={styles.DownIcon} />
        </div>*/}
        <Link to={"/subadmin-hubandcities"}>
          <div>
            <img width={"20px"} src={CityIcon} alt={CityIcon} />
            <p>Hub Cities</p>
          </div>
        </Link>

        <div>
          <AiOutlineMessage />
          <p>SMS Notification</p>
        </div>
        <Link to={"/subadmin-help"}>
          <div>
            <FiHelpCircle />
            <p>Help and Support</p>
          </div>
        </Link>
        <Link to={"/subadmin-privacy"}>
          <div>
            <MdOutlinePrivacyTip />
            <p>Privacy Policy</p>
          </div>
        </Link>
        <Link to={"/subadmin-terms"}>
          <div>
            <GrNotes />
            <p>Term & Condition</p>
          </div>
        </Link>
        <Link to={"/subadmin-roles"}>
          <div>
            <MdReportGmailerrorred />
            <p>Roles</p>
          </div>
        </Link>
        <Link to={"/subadmin-reports"}>
          <div>
            <BsGraphUpArrow />
            <p>Report</p>
          </div>
        </Link>
        <Link to={"/subadmin-help"}>
          <div>
            <TbHelpOctagon />
            <p>Help</p>
          </div>
        </Link>
        <div onClick={HandleLogout}>
          <HiOutlineLogout />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};
