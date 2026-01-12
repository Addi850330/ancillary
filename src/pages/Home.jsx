import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSection } from "../context/Context";
import styles from "./Home.module.css";
const Home = () => {
  const {
    section,
    scrollState,
    setScrollState,
    activeSection,
    setActiveSection,
    cstate,
    setcstate,
    setSolustate,
  } = useSection();

  const navigate = useNavigate();

  const traset = () => {
    setSolustate("tra");
    setcstate("close");
  };
  const reqset = () => {
    setSolustate("req");
    setcstate("close");
  };

  const [textstatus, setTextStatus] = useState("close");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openpage = () => {
    scrollToTop();
    setcstate("close");
    setTimeout(() => {
      setcstate("open");

      setTimeout(() => {
        setTextStatus("open");
      }, 1200); // open mask 後再等 0.2 秒
    }, 1000);
  };

  useEffect(() => {
    openpage();
  }, []); //  只在初次渲染執行一次
  // ------------------------------------------------------
  // ------------------

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setScrollState("close");
      } else {
        setScrollState("open");
      }
    };

    // 初始檢查（避免一進頁面狀態不正確）
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ----------------
  const [offsetcc, setOffsetcc] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      // 滑鼠位置轉為 -0.5 ~ 0.5
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      setOffsetcc({
        x: -x * 20, // 反向移動，數字越大移動越多
        y: -y * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  // -------------use ref---------------

  const sectionRefs = {
    one: useRef(null),
    two: useRef(null),
    three: useRef(null),
    four: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      {
        root: null,
        threshold: 0.4, // 60% 進入視窗才算
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   console.log(activeSection);
  // }, [activeSection]);
  // ------------------------------------------------

  const [pt, setPt] = useState(0);

  useEffect(() => {
    // 副作用操作
    let p = 0;
    const timer = setInterval(() => {
      // console.log("執行副作用");
      if (p < 3) {
        p++;
        setPt(p);
        // console.log(p + "test");
      } else {
        p = 0;
        // console.log(p + "test");
        setPt(p);
      }
    }, 15000);
    // 返回清理函式
    return () => {
      clearInterval(timer);
      // console.log("清理副作用");
    };
  }, []);

  // ---------------
  const [circle, setCircle] = useState({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setCircle({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCircle((prev) => ({
      ...prev,
      active: false,
    }));
  };
  // ---------------------------------------
  const [circlesec, setCirclesec] = useState({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMoveSec = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setCirclesec({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeaveSec = () => {
    setCirclesec((prev) => ({
      ...prev,
      active: false,
    }));
  };
  // ----------------------------------------
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch("/homepagedata.json")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("fetch stats error:", err));
  }, []);
  // ------------------------
  const [pts, setPts] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPts((prev) => (prev + 1) % stats.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [stats.length]);

  // useEffect(() => {
  //   console.log(pts);
  // }, [pts]);
  // -------------------------------------
  const [newsdata, setNewsdata] = useState([]);

  useEffect(() => {
    fetch("/newsdata.json")
      .then((res) => res.json())
      .then((data) => setNewsdata(data))
      .catch((err) => console.error("fetch stats error:", err));
  }, []);

  // -------------------------------
  const [statitoggle, setStatitoggle] = useState("close");

  const statswitch = () => {
    if (statitoggle === "close") {
      setStatitoggle("open");
    }
    if (statitoggle === "open") {
      setStatitoggle("close");
    }
  };
  // ----------------------------------
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      // 滑鼠位置轉為 -0.5 ~ 0.5
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      setOffset({
        x: -x * 20, // 反向移動，數字越大移動越多
        y: -y * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // -------------------------------

  const [circlecc, setCirclecc] = useState({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMovecc = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setCirclecc({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeavecc = () => {
    setCirclecc((prev) => ({
      ...prev,
      active: false,
    }));
  };

  return (
    <>
      <section
        className={`${styles.carosal} ${
          scrollState === "open" ? styles.cremove : ""
        }`}
        ref={sectionRefs.one}
        data-section="one"
      >
        <div
          className={`${styles.bgfirst} ${
            pt === 0 ? styles.active : styles.remove
          }`}
        >
          <img
            className={`${pt === 0 ? styles.active : ""}`}
            src="./images/carousel/ca1.webp"
            alt="cbg"
          />
        </div>
        <div
          className={`${styles.bgsecond} ${
            pt === 1 ? styles.active : styles.remove
          }`}
        >
          <img
            className={`${pt === 1 ? styles.active : ""}`}
            src="./images/carousel/ca2.webp"
            alt="cbg"
          />
        </div>
        <div
          className={`${styles.bgthird} ${
            pt === 2 ? styles.active : styles.remove
          }`}
        >
          <img
            className={`${pt === 2 ? styles.active : ""}`}
            src="./images/carousel/ca3.webp"
            alt="cbg"
          />
        </div>
        <div
          className={`${styles.bgforth} ${
            pt === 3 ? styles.active : styles.remove
          }`}
        >
          <img
            className={`${pt === 3 ? styles.active : ""}`}
            src="./images/carousel/ca4.webp"
            alt="cbg"
          />
        </div>
        <div className={styles.titles}>
          <div className={`${styles.title} ${pt === 0 ? styles.active : ""}`}>
            <p>開啟新綠能時代</p>
            <p>MAKE MONEY & GO GREEN</p>
            <p>{`2026.01.21 (WED.)`}</p>
            <p>台南樹谷園區服務中心 101 會議室</p>
          </div>
          <div className={`${styles.title}  ${pt === 1 ? styles.active : ""}`}>
            <p>虛擬電廠先行者</p>
          </div>
          <div className={`${styles.title}  ${pt === 2 ? styles.active : ""}`}>
            <p>國內首間合格交易聚合商</p>
          </div>
          <div className={`${styles.title}  ${pt === 3 ? styles.active : ""}`}>
            <p>電力交易暨多元能源整合應用專家</p>
          </div>
        </div>
        <div className={styles.mask}>
          <div
            className={`${styles.mk} ${
              scrollState === "open" ? styles.active : ""
            } ${activeSection === "three" ? styles.grays : ""} ${
              activeSection === "four" ? styles.blacks : ""
            }`}
          ></div>
          <div
            className={`${styles.mk} ${
              scrollState === "open" ? styles.active : ""
            } ${activeSection === "three" ? styles.grays : ""} ${
              activeSection === "four" ? styles.blacks : ""
            }`}
          ></div>
          <div
            className={`${styles.mk} ${
              scrollState === "open" ? styles.active : ""
            } ${activeSection === "three" ? styles.grays : ""} ${
              activeSection === "four" ? styles.blacks : ""
            }`}
          ></div>
          <div
            className={`${styles.mk} ${
              scrollState === "open" ? styles.active : ""
            } ${activeSection === "three" ? styles.grays : ""} ${
              activeSection === "four" ? styles.blacks : ""
            }`}
          ></div>
          <div
            className={`${styles.bgms} ${
              scrollState === "open" ? styles.active : ""
            }`}
            style={{
              transform: `translate3d(${offsetcc.x}px, ${offsetcc.y}px, 0)`,
            }}
          ></div>
        </div>
      </section>
      <section
        className={styles.business}
        ref={sectionRefs.two}
        data-section="two"
      >
        <div className={styles.title}>
          <div className={styles.titlefirst}>Our</div>
          <div className={styles.titlesecond}>
            Business
            <span
              className={`${styles.fill} ${
                scrollState === "open" ? styles.active : ""
              }`}
            >
              Business
            </span>
          </div>
        </div>
        {/* ----sticky----- */}
        <div className={styles.businesscards}>
          <div className={styles.bcard}>
            <div className={styles.bigicon}>
              <img src="./images/bcicon/c1.svg" alt="bigicon" />
            </div>
            <div className={styles.innertext}>
              <p>
                多元整合需量反應、儲能、再生能源，參與輔助服務平台及綠電交易，協助企業將能源資產收益最大化。
              </p>
            </div>
            <div className={styles.bcimg}>
              <img src="./images/card/card1.webp" alt="cimg" />
            </div>
            <div className={styles.bctitle}>
              <div className={styles.btcicon}>
                <img src="./images/bcicon/ico1.svg" alt="cicon" />
              </div>
              <div className={styles.bctt}>一站式能源整體規劃服務</div>
            </div>
          </div>
          <div className={styles.bcard}>
            <div className={styles.bigicon}>
              <img src="./images/bcicon/c2.svg" alt="bigicon" />
            </div>
            <div className={styles.innertext}>
              <p>提供專業規劃評估、系統導入作業至正式上線暨維運等整合服務。</p>
            </div>
            <div className={styles.bcimg}>
              <img src="./images/card/card2.webp" alt="cimg" />
            </div>
            <div className={styles.bctitle}>
              <div className={styles.btcicon}>
                <img src="./images/bcicon/ico2.svg" alt="cicon" />
              </div>
              <div className={styles.bctt}>擁有專業服務團隊</div>
            </div>
          </div>
          <div className={styles.bcard}>
            <div className={styles.bigicon}>
              <img src="./images/bcicon/c3.svg" alt="bigicon" />
            </div>
            <div className={styles.innertext}>
              <p>
                提供人性化界面服務平台、操作流暢系統，讓您掌握即時系統狀態。
              </p>
            </div>
            <div className={styles.bcimg}>
              <img src="./images/card/card3.webp" alt="cimg" />
            </div>
            <div className={styles.bctitle}>
              <div className={styles.btcicon}>
                <img src="./images/bcicon/ico3.svg" alt="cicon" />
              </div>
              <div className={styles.bctt}>提供專業管理系統</div>
            </div>
          </div>
          <div className={styles.bcard}>
            <div className={styles.bigicon}>
              <img src="./images/bcicon/c4.svg" alt="bigicon" />
            </div>
            <div className={styles.innertext}>
              <p>24-7-365專業調度維運中心，掌握電網即時狀態。</p>
            </div>
            <div className={styles.bcimg}>
              <img src="./images/card/card4.webp" alt="cimg" />
            </div>
            <div className={styles.bctitle}>
              <div className={styles.btcicon}>
                <img src="./images/bcicon/ico4.svg" alt="cicon" />
              </div>
              <div className={styles.bctt}>全時維運作業</div>
            </div>
          </div>
        </div>
      </section>
      <section
        className={styles.survive}
        ref={sectionRefs.three}
        data-section="three"
      >
        <div className={styles.survivetitle}>
          <div className={styles.stitlefirst}>Our</div>
          <div className={styles.stitlesecond}>
            Survive
            <span
              className={`${styles.fill} ${
                activeSection === "three" ? styles.active : ""
              }`}
            >
              Survive
            </span>
          </div>
        </div>
        <div className={styles.trre}>
          <div
            className={styles.trade}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              traset();
              navigate("/solution");
            }}
          >
            <div className={styles.trtitle}>Trade</div>
            <div className={styles.trtitlech}>參與電力交易平台</div>
            <div className={styles.trinfo}>
              即刻上線，活化企業資產，增加企業韌性和收益，強化台灣電力系統彈性。
            </div>
            <div className={styles.trbtn}>
              <span></span>

              <div className={styles.trbtnlink}>View more</div>
              <div className={styles.trbtnimg}>
                <img src="./images/trade/arrow.svg" alt="arrow" />
              </div>
            </div>
            <div
              className={styles.trcircle}
              style={{
                left: `${circle.x}px`,
                top: `${circle.y}px`,
                transform: `translate(-50%, -50%) scale(${
                  circle.active ? 1 : 0
                })`,
              }}
            >
              <img src="./images/trade/tr1.png" alt="click" />
              <p>Click</p>
            </div>
          </div>
          <div
            className={`${styles.trade} ${styles.requirement}`}
            onMouseMove={handleMouseMoveSec}
            onMouseLeave={handleMouseLeaveSec}
            onClick={() => {
              reqset();
              navigate("/solution");
            }}
          >
            <div className={styles.trtitle}>Requirement</div>
            <div className={styles.trtitlech}>
              滿足用電大戶義務及綠電交易需求
            </div>
            <div className={styles.trinfo}>最佳化配置</div>
            <div className={styles.trbtn}>
              <span></span>

              <div className={styles.trbtnlink}>View more</div>
              <div className={styles.trbtnimg}>
                <img src="./images/trade/arrow.svg" alt="arrow" />
              </div>
            </div>
            <div
              className={styles.trcircle}
              style={{
                left: `${circlesec.x}px`,
                top: `${circlesec.y}px`,
                transform: `translate(-50%, -50%) scale(${
                  circlesec.active ? 1 : 0
                })`,
              }}
            >
              <img src="./images/trade/tr2.png" alt="click" />
              <p>Click</p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.statistics} ${
            statitoggle === "open" ? styles.allop : ""
          }`}
          onClick={statswitch}
        >
          <div
            className={styles.bgmask}
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            }}
          ></div>
          {stats.map((item, index) => {
            const isActive = index === pts;
            return (
              <div
                className={`${styles.info} ${
                  isActive ? styles.active : styles.hidden
                } ${statitoggle === "open" ? styles.allop : ""}`}
                key={item.info_ID}
              >
                <div className={styles.infoimg}>
                  <div
                    className={`${styles.infobgc} ${
                      isActive ? styles.active : styles.hidden
                    } ${statitoggle === "open" ? styles.allop : ""}`}
                  >
                    <img src="./images/stat/circle.svg" alt="bg" />
                  </div>
                  <div className={styles.infoicon}>
                    <img src={item.infoiconUrl} alt={item.infoname} />
                  </div>
                </div>
                <div className={styles.infodata}>
                  <div className={styles.infoname}>{item.infoname}</div>
                  <div className={styles.infovalue}>
                    {item.infovalue}
                    <span className={styles.infounit}>{item.infounit}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={styles.statbtn}>
            <span></span>
            <div
              className={`${styles.sbicon} ${
                statitoggle === "open" ? styles.topstyle : ""
              }`}
            >
              <img src="./images/trade/arrow.svg" alt="arrow" />
            </div>
            <div className={styles.opentext}>
              {statitoggle === "close" ? `View more` : `Close info`}
            </div>
          </div>
        </div>
      </section>
      <section
        className={styles.newst}
        ref={sectionRefs.four}
        data-section="four"
      >
        <div className={styles.newtitle}>
          News
          <span
            className={`${styles.fill} ${
              activeSection === "four" ? styles.active : ""
            }`}
          >
            News
          </span>
        </div>
        <div className={styles.newsinfos}>
          {newsdata.slice(0, 5).map((item) => (
            <div className={styles.info} key={item.new_ID}>
              <div className={styles.newtime}>{item.newtime}</div>
              <div className={styles.newtitle}>{item.newtitle}</div>
              <div className={styles.newdesc}>{item.newdesc}</div>
              <div className={styles.nlicon}>
                <img src="./images/news/icon.svg" alt="icon" />
              </div>
            </div>
          ))}
        </div>
        <Link
          to={"/news"}
          className={styles.newssbtn}
          onClick={() => setcstate("close")}
        >
          View more
        </Link>
      </section>
      <div
        className={styles.textanime}
        onMouseMove={handleMouseMovecc}
        onMouseLeave={handleMouseLeavecc}
      >
        <div className={`${styles.textc} ${styles.txanime}`}>Contact Us</div>
        <div
          className={styles.mousecircle}
          style={{
            left: `${circlecc.x}px`,
            top: `${circlecc.y}px`,
            transform: `translate(-50%, -50%) scale(${
              circlecc.active ? 1 : 0
            })`,
          }}
        >
          Contact Us
        </div>
      </div>
    </>
  );
};

export default Home;
