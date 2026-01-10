import { useEffect, useState } from "react";
import styles from "./About.module.css";
const About = () => {
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

  // ---------------
  const [textstatus, setTextStatus] = useState("close");

  useEffect(() => {
    // 組件載入後 1.5 秒執行
    const timer = setTimeout(() => {
      setTextStatus("open");
    }, 500);

    // 清除定時器（很重要！防止組件卸載後還執行）
    return () => clearTimeout(timer);
  }, []); // 空依賴 → 只在初次渲染執行一次

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
            <div className={styles.mbtn}>
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
            <div className={styles.mbtn}>
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
            <div className={styles.mbtn}>
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
        </div>
      </section>
    </>
  );
};

export default About;
