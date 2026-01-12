import { useEffect, useState, useRef } from "react";
import { useSection } from "../context/Context";
import styles from "./About.module.css";
const About = () => {
  const { setScrollState, cstate, setcstate } = useSection();

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
    setTimeout(() => {
      setcstate("open");
      setTimeout(() => {
        setTextStatus("open");
      }, 1200); // open mask 後再等 0.2 秒
    }, 2000);
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

  // -------------------------------------------------------

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

  const [activeSection, setActiveSection] = useState("");

  const companyRef = useRef(null);
  const partnerRef = useRef(null);
  const milestoneRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth", // 平滑滾動
      block: "start", // 對齊到頂部
    });
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
        threshold: 0.4, // 進入 40% 視窗就算
      }
    );

    observer.observe(companyRef.current);
    observer.observe(partnerRef.current);
    observer.observe(milestoneRef.current);

    return () => observer.disconnect();
  }, []);

  // -------------------------

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/milestone.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("milestone fetch error:", err));
  }, []);

  // -----------------------------------------------------------
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <section className={styles.about}>
        <div className={styles.wrapper}>
          <div
            className={styles.background}
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            }}
          />
        </div>
        <div className={styles.abtitle}>
          <div className={styles.abbg}>
            <img src="./images/about/aboutbg.webp" alt="bg" />
          </div>
          <div className={styles.abtitlec}>
            About us
            <span
              className={`${styles.fill} ${
                textstatus === "open" ? styles.active : ""
              }`}
            >
              About us
            </span>
          </div>
          <div className={styles.menu}>
            <div className={styles.menutext}>Menu</div>
            <div className={styles.mbtn} onClick={() => scrollTo(companyRef)}>
              <div className={styles.outside}>
                <div className={styles.mtop}>
                  <p>Company</p>
                  <div className={styles.mch}>
                    <div>公司簡介</div>
                    <div className={styles.mimg}>
                      <img src="./images/about/down.svg" alt="icon" />
                    </div>
                  </div>
                </div>
                <div className={`${styles.mtop} ${styles.hc}`}>
                  <p>Company</p>
                  <div className={styles.mch}>
                    <div>公司簡介</div>
                    <div className={styles.mimg}>
                      <img src="./images/about/down.svg" alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.mbtn} onClick={() => scrollTo(partnerRef)}>
              <div className={styles.outside}>
                <div className={styles.mtop}>
                  <p>Partners</p>
                  <div className={styles.mch}>
                    <div>合作夥伴</div>
                    <div className={styles.mimg}>
                      <img src="./images/about/down.svg" alt="icon" />
                    </div>
                  </div>
                </div>
                <div className={`${styles.mtop} ${styles.hc}`}>
                  <p>Partners</p>
                  <div className={styles.mch}>
                    <div>合作夥伴</div>
                    <div className={styles.mimg}>
                      <img src="./images/about/down.svg" alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.mbtn} onClick={() => scrollTo(milestoneRef)}>
              <div className={styles.outside}>
                <div className={styles.mtop}>
                  <p>Milestone</p>
                  <div className={styles.mch}>
                    <div>里程碑</div>
                    <div className={styles.mimg}>
                      <img src="./images/about/down.svg" alt="icon" />
                    </div>
                  </div>
                </div>
                <div className={`${styles.mtop} ${styles.hc}`}>
                  <p>Milestone</p>
                  <div className={styles.mch}>
                    <div>里程碑</div>
                    <div className={styles.mimg}>
                      <img src="./images/about/down.svg" alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.asvideo} style={{ aspectRatio: "16 / 10" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/f4NJW9S47uo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div ref={companyRef} data-section="company" className={styles.company}>
          <div className={styles.companytitle}>
            Company
            <span
              className={`${styles.fill} ${
                activeSection === "company" ? styles.active : ""
              }`}
            >
              Company
            </span>
          </div>
          <div className={styles.ctch}>
            <p
              className={`${activeSection === "company" ? styles.active : ""}`}
            >
              公司簡介
            </p>
          </div>
          <div className={styles.companyinfo}>
            <div className={styles.cileft}>
              <div className={styles.citafter}>Message</div>
              <div className={styles.leftimg}>
                <img src="./images/about/message.jpg" alt="message" />
              </div>
              <div className={styles.cibefor}>Message</div>
            </div>
            <div className={styles.ciright}>
              <div className={styles.subtitle}>
                安瑟樂威為國內首間民間電力合格交易者亦為可再生能源售電服務業者
              </div>
              <div className={styles.subinner}>
                安瑟樂威打造多元分散式能源參與能源市場的中央入口技術和財務平台。安瑟樂威為具有豐富法規、資通光、大小機電、前瞻整合技術和物聯網商業模式的100%本土團隊。提供用電戶輔導、永續能源整體一站式解決方案，從設計、建置、維運和持續最佳化永續能源對策。提供ESCO財務模式，和客戶形成長期夥伴關係，讓用電戶能夠專注於本業，輕鬆快步邁向永續淨零。安瑟樂威提供的解決方案包含符合各種場域的能源管理系統、儲能、可再生能源、智慧微電網等多元能源應用，且其電力交易平台已與台電平台無縫接軌，提供用電戶參與台電電力交易平台及綠電交易市場所需要的整合方案。目前已輔導超過100MW以上之彈性電力參與市場，以及協助每年轉供近3億度綠電。
              </div>
            </div>
          </div>
        </div>
        <div ref={partnerRef} data-section="partner" className={styles.partner}>
          <div className={styles.partnertitle}>
            Partners
            <span
              className={`${styles.fill} ${
                activeSection === "partner" ? styles.active : ""
              }`}
            >
              Partners
            </span>
          </div>
          <div className={styles.pnch}>
            <p
              className={`${activeSection === "partner" ? styles.active : ""}`}
            >
              合作夥伴
            </p>
          </div>
          <div className={styles.teaminfo}>
            <div className={styles.teamleft}>
              <div className={styles.teamtitle}>
                我們是國內最健全的輔助服務市場領銜專業團隊
              </div>
              <div className={styles.teaminfotext}>
                集結國內產業界實務經驗豐富的專家，並與工業技術研究院、金屬工業研究中心和大同大學產學研合作，提供從用戶輔導、潛能評估、硬體設備、軟體平台建置、維運和可持續能源對策略調度的最佳化服務。亦具有儲能系統、可再生能源、智慧微電網設計、建置和維運的專業團隊，能提供參與輔助服務市場及綠電交易所有需求的一站式服務。
              </div>
            </div>
            <div className={styles.teamright}>
              <div className={styles.textafter}>Elite Team</div>
              <div className={styles.teamimg}>
                <img src="./images/about/Elite.jpg" alt="team" />
              </div>
              <div className={styles.textbefroe}>Elite Team</div>
            </div>
          </div>
          <div className={styles.pris}>
            <div className={styles.pristitle}>Partner Institutions</div>
            <div className={styles.pristitlech}>合作企業</div>
            <div className={styles.prisimgs}>
              <div className={styles.pimg}>
                <img src="./images/about/pri1.png" alt="pris" />
              </div>
              <div className={styles.pimg}>
                <img src="./images/about/pri2.png" alt="pris" />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={milestoneRef}
          data-section="milestone"
          className={styles.milestone}
        >
          <div className={styles.milestonetitle}>
            Milestone
            <span
              className={`${styles.fill} ${
                activeSection === "milestone" ? styles.active : ""
              }`}
            >
              Milestone
            </span>
          </div>
          <div className={styles.mich}>
            <p
              className={`${
                activeSection === "milestone" ? styles.active : ""
              }`}
            >
              里程碑
            </p>
          </div>
          {/* <div className={styles.mitime}>
            {data.map((item) => (
              <div className={styles.milestoneset} key={item.new_ID}>
                <div className={styles.year}>{item.year}</div>
                <div className={styles.evens}>
                  {item.milestone.map((m, index) => (
                    <div className={styles.even} key={index}>
                      <div className={styles.month}>{m.month}</div>
                      <div className={styles.eveninfo}>{m.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
          <div className={styles.mitime}>
            {data.map((item) => {
              const isOpen = openId === item.new_ID;
              return (
                <div
                  className={styles.milestoneset}
                  key={item.new_ID}
                  onClick={() => toggle(item.new_ID)}
                >
                  <div className={styles.year}>
                    <span>{isOpen ? "-" : "+"}</span>
                    {item.year}
                  </div>

                  <div
                    className={`${styles.evens} ${
                      isOpen ? styles.open : styles.close
                    }`}
                  >
                    {item.milestone.map((m, index) => (
                      <div className={styles.even} key={index}>
                        <div className={styles.month}>{m.month}</div>
                        <div className={styles.eveninfo}>{m.event}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
      <button onClick={scrollToTop} className={styles.ontopbtn}>
        <img src="./images/about/up.svg" alt="icon" />
      </button>
    </>
  );
};

export default About;
