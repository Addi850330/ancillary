import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSection } from "../context/Context";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const {
    setSection,
    section,
    scrollState,
    setScrollState,
    activeSection,
    setcstate,
  } = useSection();

  const navigate = useNavigate();
  const location = useLocation(); // 取得當前路徑

  // 封裝通用跳轉邏輯
  const handleNavigate = (path) => {
    if (location.pathname === path) {
      setcstate("open");
      return; // 如果是當前頁面，直接 return，不動作
    }
    setcstate("close");
  };

  const [hidenav, setHidenav] = useState("close");
  const hidenavopen = () => {
    setHidenav("open");
  };
  const hidenavclose = () => {
    setHidenav("close");
  };
  return (
    <>
      <nav
        className={`${styles.nav} ${
          scrollState === "open" ? styles.active : ""
        } ${activeSection === "four" ? styles.blacks : ""}`}
      >
        <Link
          to={"/"}
          className={`${styles.logo} ${hidenav === "open" ? styles.hide : ""}`}
          onClick={() => handleNavigate("/")}
        >
          <div className={styles.logoimgs}>
            <img
              className={`${styles.firimg} ${
                scrollState === "open" ? styles.active : ""
              }`}
              src="./images/AClogo.svg"
              alt="logo"
            />
            <img
              className={`${styles.secimg}  ${
                scrollState === "open" ? styles.active : ""
              }`}
              src="./images/ACcolorlogo.svg"
              alt="logo"
            />
          </div>
          <div
            className={`${styles.logotext} ${
              scrollState === "open" ? styles.active : ""
            } ${activeSection === "four" ? styles.blacks : ""}`}
          >
            <p>Ancillary Power</p>
            <p>安瑟樂威</p>
          </div>
        </Link>
        <div className={styles.navlinks}>
          <Link
            to={"/news"}
            className={styles.nl}
            onClick={() => handleNavigate("/news")}
          >
            <div className={styles.nltc}>
              <div
                className={`${styles.nta} ${
                  scrollState === "open" ? styles.active : ""
                } ${activeSection === "four" ? styles.blacks : ""}`}
              >
                <div>最新消息</div>
                <div>最新消息</div>
              </div>
            </div>
            <div
              className={`${styles.nlte} ${
                scrollState === "open" ? styles.active : ""
              } ${activeSection === "four" ? styles.blacks : ""}`}
            >
              NEWS
            </div>
          </Link>
          <Link
            to={"/solution"}
            className={styles.nl}
            onClick={() => handleNavigate("/solution")}
          >
            <div className={styles.nltc}>
              <div
                className={`${styles.nta} ${
                  scrollState === "open" ? styles.active : ""
                } ${activeSection === "four" ? styles.blacks : ""}`}
              >
                <div>解決方案</div>
                <div>解決方案</div>
              </div>
            </div>
            <div
              className={`${styles.nlte} ${
                scrollState === "open" ? styles.active : ""
              } ${activeSection === "four" ? styles.blacks : ""}`}
            >
              SOLUTION
            </div>
          </Link>
          <Link
            to={"/about"}
            className={styles.nl}
            onClick={() => handleNavigate("/about")}
          >
            <div className={styles.nltc}>
              <div
                className={`${styles.nta} ${
                  scrollState === "open" ? styles.active : ""
                } ${activeSection === "four" ? styles.blacks : ""}`}
              >
                <div>關於我們</div>
                <div>關於我們</div>
              </div>
            </div>
            <div
              className={`${styles.nlte} ${
                scrollState === "open" ? styles.active : ""
              } ${activeSection === "four" ? styles.blacks : ""}`}
            >
              ABOUT
            </div>
          </Link>
          <Link to={"/contact"} className={styles.nl}>
            <div className={styles.nltc}>
              <div
                className={`${styles.nta} ${
                  scrollState === "open" ? styles.active : ""
                } ${activeSection === "four" ? styles.blacks : ""}`}
              >
                <div>聯絡我們</div>
                <div>聯絡我們</div>
              </div>
            </div>
            <div
              className={`${styles.nlte} ${
                scrollState === "open" ? styles.active : ""
              } ${activeSection === "four" ? styles.blacks : ""}`}
            >
              CONTACT
            </div>
          </Link>
          <button
            className={`${styles.buger} ${
              hidenav === "open" ? styles.active : ""
            }`}
            onClick={hidenavopen}
          >
            <span
              className={`${styles.topline} ${
                hidenav === "open" ? styles.active : ""
              }`}
            ></span>
            <span className={styles.middleline}></span>
            <span
              className={`${styles.bottomline} ${
                hidenav === "open" ? styles.active : ""
              }`}
            ></span>
          </button>
          <div
            className={`${styles.account} ${
              scrollState === "open" ? styles.active : ""
            } ${activeSection === "four" ? styles.blacks : ""}`}
          >
            <button className={styles.acfalse}>
              <img
                className={`${scrollState === "close" ? styles.active : ""} ${
                  activeSection === "four" ? styles.blacks : ""
                }`}
                src="./images/sign.svg"
                alt="signimg"
              />
              <img
                className={`${scrollState === "open" ? styles.active : ""} ${
                  activeSection === "four" ? styles.black : ""
                }`}
                src="./images/signb.svg"
                alt="signimg"
              />
            </button>
            {/* <button className={styles.actrue}>
              <img src="./images/signout.svg" alt="outimg" />
            </button> */}
          </div>
        </div>
      </nav>
      <div
        className={`${styles.hidenavst} ${
          hidenav === "open" ? styles.active : ""
        }`}
      >
        <div
          className={`${styles.blackbg} ${
            hidenav === "open" ? styles.active : ""
          }`}
        ></div>
        <div
          className={`${styles.logobtn} ${
            hidenav === "open" ? styles.active : ""
          }`}
        >
          <div className={styles.hidelogo}>
            <div className={styles.hlimg}>
              <img src="./images/AClogo.svg" alt="hlogo" />
            </div>
            <div className={styles.hltitle}>Ancillary Power</div>
          </div>
          <div onClick={hidenavclose} className={styles.closebtn}>
            <img src="./images/cross.svg" alt="closebtn" />
          </div>
        </div>
        <div
          className={`${styles.innerlinks} ${
            hidenav === "open" ? styles.active : ""
          }`}
        >
          <div className={styles.hnl}>
            <div className={styles.hnle}>
              <div className={styles.htlet}>
                <div>NEWS</div>
                <div>NEWS</div>
              </div>
            </div>
            <p className={styles.hnlc}>最新消息</p>
          </div>
          <div className={styles.hnl}>
            <div className={styles.hnle}>
              <div className={styles.htlet}>
                <div>SOLUTION</div>
                <div>SOLUTION</div>
              </div>
            </div>
            <p className={styles.hnlc}>解決方案</p>
          </div>
          <div className={styles.hnlot}>
            <div className={styles.otlink}>
              <span>- </span>參與電力交易平台
            </div>
            <div className={styles.otlink}>
              <span>- </span>滿足用電大戶義務及綠電交易需求
            </div>
            <div className={styles.otlink}>
              <span>- </span>輔助服務試算器
            </div>
          </div>
          <div className={styles.hnl}>
            <div className={styles.hnle}>
              <div className={styles.htlet}>
                <div>ABOUT</div>
                <div>ABOUT</div>
              </div>
            </div>
            <p className={styles.hnlc}>關於我們</p>
          </div>
          <div className={styles.hnl}>
            <div className={styles.hnle}>
              <div className={styles.htlet}>
                <div>CONTACT</div>
                <div>CONTACT</div>
              </div>
            </div>
            <p className={styles.hnlc}>聯絡我們</p>
          </div>
        </div>
        <div
          className={`${styles.footer} ${
            hidenav === "open" ? styles.active : ""
          }`}
        >
          <div className={styles.officeinfo}>
            <div className={styles.tel}>
              {`TEL：(02) 2727-2988 、(02) 7755-5030`}
            </div>
            <div className={styles.locate}>
              100510台北市中正區新生南路一段50號4樓之5
            </div>
          </div>
          <div className={styles.authorize}>
            <div className={styles.webauth}>
              © Copyright 2022｜Ancillary Power Co., Ltd.
            </div>
            <div className={styles.webdesign}>
              <div>Designed by Shiuan｜隱私權政策</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
