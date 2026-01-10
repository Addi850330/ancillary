import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.ftitle}>
        <div className={styles.oflogo}>
          <img src="./images/AClogo.svg" alt="logo" />
        </div>
        <div className={styles.ofname}>安瑟樂威</div>
        <div className={styles.ofnameEn}>
          <div>Ancillary</div>
          <div>Power</div>
        </div>
      </div>
      <div className={styles.tel}>Tel：(02) 2727-2988 | (02) 7755-5030</div>
      <div className={styles.locate}>
        100510台北市中正區新生南路一段50號4樓之5
      </div>
      <div className={styles.copyright}>
        © Copyright 2022 ｜ Ancillary Power Co., Ltd. ｜ Designed by Shiuan ｜
        隱私權政策
      </div>
    </div>
  );
};

export default Footer;
