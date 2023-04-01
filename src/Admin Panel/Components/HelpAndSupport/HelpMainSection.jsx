import React from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Help.module.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
export const HelpMainSection = () => {
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Help And Support</h1>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.HelpGridSection}>
        <div>
          <p>Getting Started</p>
          <ul>
            <li>General</li>
            <li>Authentication and verification</li>
            <li>Adding a payment method</li>
          </ul>
          <Link to={"/help"}>
            <div>
              <p>View More</p>
              <AiOutlineArrowRight />
            </div>
          </Link>
        </div>
        <div>
          <p>Managing my account</p>
          <ul>
            <li>Account information</li>
            <li>Identity verification</li>
            <li>Payment method</li>
            <li>Account Recovery</li>
          </ul>
          <Link to={"/help"}>
            <div>
              <p>View More</p>
              <AiOutlineArrowRight />
            </div>
          </Link>
        </div>
        <div>
          <p>Upload Service</p>
          <ul>
            <li>Creating a catalogue</li>
            <li>Tracing</li>
            <li>Manual Tracking</li>
            <li>Contact Information</li>
          </ul>
          <Link to={"/help"}>
            <div>
              <p>View More</p>
              <AiOutlineArrowRight />
            </div>
          </Link>
        </div>
      </div>
      <hr style={{ width: "90%", marginTop: "20px" }} />
      <div className={styles.HelpGridSectionTwo}>
        <div>
          <p>Taxes,Reports and Finalcial Service</p>
          <ul>
            <li>Tax report</li>
            <li>Payment report</li>
            <li>Account report</li>
            <li>Year Balance Report</li>
            <li>GST Report</li>
          </ul>
          <Link to={"/help"}>
            <div>
              <p>View More</p>
              <AiOutlineArrowRight />
            </div>
          </Link>
        </div>
        <div>
          <p>Other Topics</p>
          <ul>
            <li>troubleshooting</li>
            <li>Account Management</li>
          </ul>
          <Link to={"/help"}>
            <div>
              <p>View More</p>
              <AiOutlineArrowRight />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
