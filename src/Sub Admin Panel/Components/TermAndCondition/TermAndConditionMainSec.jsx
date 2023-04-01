import React from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/PrivacyPolicy.module.css";
export const TermAndConditionMainSec = () => {
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Terms and Condition</h1>
        <button>Add</button>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.TextSection}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          magnam, pariatur est nihil obcaecati explicabo, voluptatum ratione
          corporis maxime eius a sed veritatis quis hic quam mollitia accusamus
          assumenda delectus! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. A, deleniti! Eligendi, obcaecati natus itaque illo soluta,
          debitis inventore rerum cumque veritatis nemo minima amet corporis
          impedit? Inventore libero esse enim. Placeat accusantium, recusandae
          amet fuga nam beatae nostrum perspiciatis eveniet vel impedit! Officia
          quos, rem similique doloremque, error sequi, dolore distinctio hic
          temporibus iusto architecto totam minus eveniet animi. Minus! Labore
          suscipit quaerat non minus, fugit exercitationem doloremque incidunt,
          omnis illum qui ducimus rerum asperiores aliquid! Ducimus dolore,
          illo, doloribus saepe accusamus fuga iure iste voluptatibus doloremque
          laborum, quidem repellat!
        </p>
      </div>
      <div className={styles.termAndConditionLastDiv}>
        <div>
          <input type="checkbox" />
          <p>I agree my consent with following terms and condition </p>
        </div>
        <button>Agree</button>
      </div>
    </div>
  );
};
