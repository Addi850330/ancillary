import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSection } from "../context/Context";
import styles from "./Solution.module.css";

const Solution = () => {
  const { setScrollState, cstate, setcstate, solustate, setSolustate } =
    useSection();

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
    setScrollState("close");
    if (solustate === "tra") {
      sctrade();
      setSolustate("");
    }
    if (solustate === "req") {
      screquirement();
      setSolustate("");
    }
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

  // -----------------------------
  const [offsetm, setOffsetm] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      // 滑鼠位置轉為 -0.5 ~ 0.5
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      setOffsetm({
        x: -x * 40, // 反向移動，數字越大移動越多
        y: -y * 40,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  // -------------------

  const [activeSection, setActiveSection] = useState("");
  const planning = useRef(null);
  // const pris = useRef(null);
  // const relist = useRef(null);

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
        threshold: 0.5,
      }
    );

    observer.observe(planning.current);
    // observer.observe(pris.current);
    // observer.observe(relist.current);

    return () => observer.disconnect();
  }, []);
  // --------------------------

  const [sectionChange, setSectionChange] = useState("trade");

  const tradeRef = useRef(null);
  const requirementRef = useRef(null);

  const sctrade = () => {
    scrollToTop();
    setSectionChange("trade");

    setTimeout(() => {
      tradeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1500);
  };

  const screquirement = () => {
    scrollToTop();
    setSectionChange("requirement");

    setTimeout(() => {
      requirementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1500);
  };

  // --------------------------------------

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
  // -------------------------------
  const [isHover, setIsHover] = useState("");

  // ---------------------------
  const [qaf, setQaf] = useState("");

  const qatoggletw = () => {
    if (qaf === "trwho") {
      setQaf("");
    } else {
      setQaf("trwho");
    }
  };
  const qatoggleco = () => {
    if (qaf === "condition") {
      setQaf("");
    } else {
      setQaf("condition");
    }
  };
  // -----------------------------------
  const [raf, setRaf] = useState("");

  const ratoggletw = () => {
    if (raf === "rawho") {
      setRaf("");
    } else {
      setRaf("rawho");
    }
  };
  // -------------------------
  const [cchover, setCchover] = useState("");

  return (
    <>
      <div
        className={`${
          sectionChange === "trade" ? styles.gbcliner : styles.regbcliner
        }`}
      ></div>
      <div className={styles.wrapper}>
        <div
          className={styles.background}
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          }}
        />
      </div>
      <div className={styles.wrapperm}>
        <div
          className={styles.backgroundm}
          style={{
            transform: `translate3d(${offsetm.x}px, ${offsetm.y}px, 0)`,
          }}
        />
      </div>
      <section className={styles.menu}>
        <div className={styles.menubg}>
          <img src="./images/solution/tr.webp" alt="bg" />
        </div>
        <div className={styles.abtitlec}>
          Solution
          <span
            className={`${styles.fill} ${
              textstatus === "open" ? styles.active : ""
            }`}
          >
            Solution
          </span>
        </div>
        <div className={styles.menulist}>
          <div className={styles.menutext}>Menu</div>
          <div
            className={styles.mbtn}
            onMouseEnter={() => setIsHover("trade")}
            onMouseLeave={() => setIsHover("")}
            onClick={sctrade}
          >
            <div className={styles.outside}>
              <div className={styles.mtop}>
                <p>參與電力交易平台</p>
                <img src="./images/about/down.svg" alt="icon" />
              </div>
              <div className={`${styles.mtop} ${styles.hc}`}>
                <p>參與電力交易平台</p>
                <img src="./images/about/down.svg" alt="icon" />
              </div>
            </div>
          </div>
          <div
            className={styles.mbtn}
            onMouseEnter={() => setIsHover("requirement")}
            onMouseLeave={() => setIsHover("")}
            onClick={screquirement}
          >
            <div className={styles.outside}>
              <div className={styles.mtop}>
                <p>綠電交易需求</p>
                <img src="./images/about/down.svg" alt="icon" />
              </div>
              <div className={`${styles.mtop} ${styles.hc}`}>
                <p>綠電交易需求</p>
                <img src="./images/about/down.svg" alt="icon" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mright}>
          <div
            className={`${styles.mrtitle} ${
              isHover === "trade" ? styles.active : ""
            }`}
          >
            參與電力交易平台
          </div>
          <div
            className={`${styles.mrtext}  ${
              isHover === "trade" ? styles.active : ""
            }`}
          >
            即刻上線，活化企業資產，增加企業韌性和收益，強化台灣電力系統彈性。
          </div>
          <div
            className={`${styles.mrtitle} ${
              isHover === "requirement" ? styles.active : ""
            }`}
          >
            滿足用電大戶義務及綠電交易需求
          </div>
          <div
            className={`${styles.mrtext} ${
              isHover === "requirement" ? styles.active : ""
            }`}
          >
            電力用戶所簽訂之用電契約，其契約容量在一定容量以上者，應於用電場所或適當場所，自行或提供場所設置一定裝置容量以上之再生能源發電設備、儲能設備或購買一定額度之再生能源電力及憑證。
          </div>
        </div>
      </section>
      {sectionChange === "trade" && (
        <section className={styles.trade} ref={tradeRef}>
          <div className={styles.companytitle}>
            參與電力交易平台
            <span
              className={`${styles.fill} ${
                textstatus === "open" ? styles.active : ""
              }`}
            >
              參與電力交易平台
            </span>
          </div>
          <div className={styles.ctch}>
            <p className={`${textstatus === "open" ? styles.active : ""}`}>
              Trade
            </p>
          </div>
          <div className={styles.report}>
            <div className={styles.cileft}>
              <div className={styles.leftimg}>
                <img src="./images/solution/trade.png" alt="message" />
              </div>
              <div className={styles.subtext}>
                （圖片內容取自：台灣電力公司-輔助服務及備用容量交易平台）
              </div>
            </div>
            <div className={styles.ciright}>
              <div className={styles.subtitle}>
                調頻備轉容量<div className={styles.drbl}></div>
              </div>
              <div className={styles.subinner}>
                1.接受EMS控制信號，自動調整其出力，於3分鐘內可增加或減少之備轉容量。
                <br />
                2.偵測電力系統頻率，於數秒內即時增加或減少之備轉容量。
              </div>
              <div className={styles.subtitle}>
                即時備轉容量<div className={styles.libr}></div>
              </div>
              <div className={styles.subinner}>
                1.因應機組跳機、系統負載突增或供需預測誤差，可於調度指令下達後，10分鐘內增加之備轉容量。
              </div>
              <div className={styles.subtitle}>
                備充備轉容量<div className={styles.yel}></div>
              </div>
              <div className={styles.subinner}>
                1.因應機組跳機、系統負載突增或供需預測誤差，可於調度指令下達後，30分鐘內增加之備轉容量。
              </div>
            </div>
          </div>
          <div className={styles.relist}>
            <div className={styles.list}>
              <div className={styles.item}>產品項目</div>
              <div className={styles.time}>反應時間</div>
              <div className={styles.time}>持續時間</div>
              <div className={styles.zone}>最小報價區間</div>
              <div className={styles.content}>容量費</div>
              <div className={styles.elec}>電能費</div>
              <div className={styles.power}>效能費</div>
            </div>
            <div className={`${styles.list} ${styles.coset}`}>
              <div className={styles.item}>{`調頻備轉輔助服務(dReg)`}</div>
              <div className={styles.time}>
                {`≤ 1秒(AFC)`}
                <br />
                {`每4秒(AGC)`}
              </div>
              <div className={styles.time}>
                追隨系統頻率
                <br />
                進行上下調頻
              </div>
              <div className={styles.zone}>1小時</div>
              <div className={styles.content}>競價</div>
              <div className={styles.elec}>無</div>
              <div className={styles.power}>依資源反應效能給定</div>
            </div>
            <div className={`${styles.list} ${styles.coset}`}>
              <div className={styles.item}>{`調頻備轉輔助服務(sReg)`}</div>
              <div className={styles.time}>≤ 10秒</div>
              <div className={styles.time}>
                追隨系統頻率
                <br />
                進行向下調頻
              </div>
              <div className={styles.zone}>1小時</div>
              <div className={styles.content}>競價</div>
              <div className={styles.elec}>無</div>
              <div className={styles.power}>依資源反應效能給定</div>
            </div>
            <div className={`${styles.list} ${styles.coset}`}>
              <div className={styles.item}>即時備轉輔助服務</div>
              <div className={styles.time}>≤ 10分鐘</div>
              <div className={styles.time}>1小時以上</div>
              <div className={styles.zone}>1小時</div>
              <div className={styles.content}>競價</div>
              <div className={styles.elec}>依日前邊際價格結算</div>
              <div className={styles.power}>依資源反應效能給定</div>
            </div>
            <div className={`${styles.list} ${styles.coset}`}>
              <div className={styles.item}>補充備轉輔助服務</div>
              <div className={styles.time}>≤ 30分鐘</div>
              <div className={styles.time}>2小時以上</div>
              <div className={styles.zone}>1小時</div>
              <div className={styles.content}>競價</div>
              <div className={styles.elec}>依日前報價結算</div>
              <div className={styles.power}>無</div>
            </div>
          </div>
          <div
            className={styles.planning}
            ref={planning}
            data-section="planning"
          >
            <div className={styles.pristitle}>Planning & Execution</div>
            <div className={styles.pristitlech}>安瑟樂威協助規劃流程</div>
            <div className={styles.scircle}>
              <div
                className={`${styles.cc} ${
                  activeSection === "planning" ? styles.active : ""
                }`}
                onMouseEnter={() => setCchover("second")}
                onMouseLeave={() => setCchover("")}
              >
                <img src="./images/solution/s2.png" alt="ss" />
                <div className={styles.mask}></div>
                <div className={styles.cctitle}>
                  02
                  <br />
                  流程規劃
                </div>
              </div>
              <div
                className={`${styles.cc} ${
                  activeSection === "planning" ? styles.active : ""
                }`}
                onMouseEnter={() => setCchover("third")}
                onMouseLeave={() => setCchover("")}
              >
                <img src="./images/solution/s3.png" alt="ss" />
                <div className={styles.mask}></div>
                <div className={styles.cctitle}>
                  03
                  <br />
                  系統導入
                </div>
              </div>
              <div
                className={`${styles.cc} ${
                  activeSection === "planning" ? styles.active : ""
                }`}
                onMouseEnter={() => setCchover("forth")}
                onMouseLeave={() => setCchover("")}
              >
                <img src="./images/solution/s4.png" alt="ss" />
                <div className={styles.mask}></div>
                <div className={styles.cctitle}>
                  04
                  <br />
                  能力驗證
                </div>
              </div>
              <div
                className={`${styles.cc} ${
                  activeSection === "planning" ? styles.active : ""
                }`}
                onMouseEnter={() => setCchover("fifth")}
                onMouseLeave={() => setCchover("")}
              >
                <img src="./images/solution/s5.png" alt="ss" />
                <div className={styles.mask}></div>
                <div className={styles.cctitle}>
                  05
                  <br />
                  正式上線
                </div>
              </div>
              <div
                className={`${styles.cc} ${
                  activeSection === "planning" ? styles.active : ""
                }`}
                onMouseEnter={() => setCchover("first")}
                onMouseLeave={() => setCchover("")}
              >
                <img src="./images/solution/s1.png" alt="ss" />
                <div className={styles.mask}></div>
                <div className={styles.cctitle}>
                  01
                  <br />
                  輔導評估
                </div>
              </div>
              <div className={styles.ssinfos}>
                <div
                  className={`${styles.ssinfo} ${
                    cchover === "first" ? styles.active : ""
                  }`}
                >
                  用電紀錄自用發電設備或生產流程允許短暫降低負載
                </div>
                <div
                  className={`${styles.ssinfo} ${
                    cchover === "second" ? styles.active : ""
                  }`}
                >
                  協助規劃設計抑低用電計畫和流程並完成台電資格審查、合約簽訂等
                </div>
                <div
                  className={`${styles.ssinfo} ${
                    cchover === "third" ? styles.active : ""
                  }`}
                >
                  系統設備的安裝及教育訓練
                </div>
                <div
                  className={`${styles.ssinfo} ${
                    cchover === "forth" ? styles.active : ""
                  }`}
                >
                  台電實際做通訊、抑低用電能力驗證
                </div>
                <div
                  className={`${styles.ssinfo} ${
                    cchover === "fifth" ? styles.active : ""
                  }`}
                >
                  準備待命接受調度
                </div>
              </div>
            </div>
          </div>
          <div className={styles.pris}>
            <div className={styles.pristitle}>FAQ</div>
            <div className={styles.pristitlech}>常見問題</div>
            <div className={styles.qas}>
              <div className={styles.qatitle} onClick={qatoggletw}>
                Q. 誰適合參與？
                <div className={styles.qaiocn}>
                  {qaf === "trwho" ? "-" : "+"}
                </div>
              </div>
              <div
                className={`${styles.qaan} ${
                  qaf === "trwho" ? styles.active : ""
                }`}
              >
                <div className={styles.ans}>01.提升企業形象者</div>
                <div className={styles.ans}>02.企業欲節能者</div>
                <div className={styles.ans}>03.用電大戶</div>
                <div className={styles.ans}>04.想控管自家能源系統者</div>
                <div className={styles.ans}>05.欲增加營業外收益之企業</div>
              </div>
              <div className={styles.qatitle} onClick={qatoggleco}>
                Q. 參加條件？
                <div className={styles.qaiocn}>
                  {qaf === "condition" ? "-" : "+"}
                </div>
              </div>
              <div
                className={`${styles.qaan} ${
                  qaf === "condition" ? styles.active : ""
                }`}
              >
                <div className={styles.ans}>01.擁有發電設備或儲能系統</div>
                <div className={styles.ans}>
                  02.可配合台電調度降低負載100kW的用電設備
                </div>
              </div>
            </div>
          </div>
          <button className={styles.changreqtra} onClick={screquirement}>
            綠電交易需求
          </button>
        </section>
      )}
      {sectionChange === "requirement" && (
        <section className={styles.requirement} ref={requirementRef}>
          <div className={styles.companytitle}>
            滿足用電大戶義務
            <br />
            及綠電交易需求
            <span
              className={`${styles.fill} ${
                textstatus === "open" ? styles.active : ""
              }`}
            >
              滿足用電大戶義務
              <br />
              及綠電交易需求
            </span>
          </div>
          <div className={styles.ctch}>
            <p className={`${textstatus === "open" ? styles.active : ""}`}>
              Requirement
            </p>
          </div>
          <div className={styles.reqlist}>
            <div className={styles.list}>
              <div className={styles.item}>產品項目</div>
              <div className={styles.time}>計算公式</div>
            </div>
            <div className={`${styles.list} ${styles.coset}`}>
              <div className={styles.item}>設計再生能源發電設備</div>
              <div className={styles.time}>義務裝置容量＝義務契約容量×10%</div>
            </div>
            <div className={`${styles.list} ${styles.coset}`}>
              <div className={styles.item}>購買再生能源電力及憑證</div>
              <div className={styles.time}>
                年度購買額度＝義務裝置容量×選購再生能源類別之每瓩年售電量
              </div>
            </div>
            <div className={`${styles.list} ${styles.coset}`}>
              <div className={styles.item}>設置儲能設備</div>
              <div className={styles.time}>
                設置容量＝義務裝置容量×最小供電時數2小時
              </div>
            </div>
            <div className={`${styles.list} ${styles.coset}`}>
              <div className={styles.item}>繳納代金</div>
              <div className={styles.time}>
                年度繳納金額＝義務裝置容量 2,500×度/瓩×4元/度(代金費率)
              </div>
            </div>
          </div>
          <div className={styles.planning} data-section="execution">
            <div className={styles.pristitle}>Planning & Execution</div>
            <div className={styles.pristitlech}>安瑟樂威協助規劃流程</div>
            <div className={styles.execution}>
              <div className={`${styles.excc} ${styles.active}`}>
                <img src="./images/solution/s1.png" alt="bg" />
                <div className={styles.exnum}>01</div>
                <div className={styles.extext}>了解需求</div>
              </div>
              <div className={`${styles.excc} ${styles.active}`}>
                <img src="./images/solution/s6.png" alt="bg" />
                <div className={styles.exnum}>02</div>
                <div className={styles.extext}>收集資訊</div>
              </div>
              <div className={`${styles.excc} ${styles.active}`}>
                <img src="./images/solution/s7.png" alt="bg" />
                <div className={styles.exnum}>03</div>
                <div className={styles.extext}>提供方案</div>
              </div>
              <div className={`${styles.excc} ${styles.active}`}>
                <img src="./images/solution/s3.png" alt="bg" />
                <div className={styles.exnum}>04</div>
                <div className={styles.extext}>導入</div>
              </div>
              <div className={styles.exico}>
                <img src="./images/solution/adl.svg" alt="" />
              </div>
              <div className={styles.exicon}>
                <img src="./images/solution/ra.svg" alt="" />
              </div>
              <div className={styles.exicons}>
                <img src="./images/solution/ra.svg" alt="" />
              </div>
            </div>
          </div>
          <div className={styles.pris}>
            <div className={styles.pristitle}>FAQ</div>
            <div className={styles.pristitlech}>常見問題</div>
            <div className={styles.qas}>
              <div className={styles.qatitle} onClick={ratoggletw}>
                Q. 誰適合參與？
                <div className={styles.qaiocn}>
                  {qaf === "trwho" ? "-" : "+"}
                </div>
              </div>
              <div
                className={`${styles.qaan} ${
                  raf === "rawho" ? styles.active : ""
                }`}
              >
                <div className={styles.ans}>01.提升企業形象者</div>
                <div className={styles.ans}>02.企業欲節能者</div>
                <div className={styles.ans}>03.用電大戶</div>
                <div className={styles.ans}>04.想控管自家能源系統者</div>
                <div className={styles.ans}>05.欲增加營業外收益之企業</div>
              </div>

              <div
                className={`${styles.qaan} ${
                  qaf === "condition" ? styles.active : ""
                }`}
              >
                <div className={styles.ans}>01.擁有發電設備或儲能系統</div>
                <div className={styles.ans}>
                  02.可配合台電調度降低負載100kW的用電設備
                </div>
              </div>
            </div>
          </div>
          <button className={styles.changreqtra} onClick={sctrade}>
            參與電力交易平台
          </button>
        </section>
      )}
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
      <Link
        className={styles.cclinks}
        to="https://www.ancillarypower.com/service-entrance/"
      >
        輔助服務試算器
      </Link>
      <button onClick={scrollToTop} className={styles.ontopbtn}>
        <img src="./images/about/up.svg" alt="icon" />
      </button>
    </>
  );
};

export default Solution;
