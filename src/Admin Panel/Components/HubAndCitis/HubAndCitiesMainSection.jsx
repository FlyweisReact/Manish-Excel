import React, { useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/HubAndCities.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHubAndCities } from "../../../Redux/Auth/action";
export const HubAndCitiesMainSection = () => {
  const dispatch = useDispatch();
  const citys = useSelector((state) => state.AuthReducer.citys);
  useEffect(() => {
    dispatch(getHubAndCities());
  }, [dispatch]);
  console.log(citys?.data);

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <div className={styles.TitleSection}>
          <h1 className={stylesfromDash.Title}>Hub And Cities</h1>
          <button>Add </button>
        </div>
        <div className={styles.CityMainDiv}>
          {citys?.data?.map((ele) => (
            <>
              <div>
                <img
                  height={"290px"}
                  width="274px"
                  src="https://th.bing.com/th/id/OIP.zl79_GKCfWACAEqohlVH7QHaE7?pid=ImgDet&rs=1"
                  alt="x"
                />
                <p>{ele.city}</p>
                <button>Delete</button>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
