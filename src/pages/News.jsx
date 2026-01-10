import React, { useEffect, useRef, useState } from "react";
import styles from "./News.module.css";
const News = () => {
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

  // ------------------------
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

  //  ---------data 處理-----
  const [newsdata, setNewsdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    fetch("/newsdata.json")
      .then((res) => res.json())
      .then((data) => setNewsdata(data))
      .catch((err) => console.error("fetch stats error:", err));
  }, []);

  // 計算目前頁面的資料
  const startIndex = (currentPage - 1) * pageSize;
  const currentNews = newsdata.slice(startIndex, startIndex + pageSize);

  // 公式 (1 - 1) * 5 = 0
  // slice(0, 5) → 第 1～5 筆
  //   (2 - 1) * 5 = 5
  // slice(5, 10) → 第 6～10 筆
  //   (3 - 1) * 5 = 10
  // slice(10, 15) → 第 11～15 筆

  // 計算總頁數
  const totalPages = Math.ceil(newsdata.length / pageSize);

  const getPaginationPages = (current, total) => {
    const pages = [];

    // 總頁數 <= 5，全部顯示
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    // 第一頁永遠存在
    pages.push(1);

    // 中間區段判斷
    if (current > 3) {
      pages.push("...");
    }

    // 計算中間頁碼
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 結尾省略
    if (current < total - 2) {
      pages.push("...");
    }

    // 最後一頁永遠存在
    pages.push(total);

    return pages;
  };

  // ------------------------------------------------------
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
      <section className={styles.newst}>
        <div className={styles.gbcliner}></div>
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
        <div className={styles.newtitle}>
          News
          <span
            className={`${styles.fill} ${
              textstatus === "open" ? styles.active : ""
            }`}
          >
            News
          </span>
        </div>
        <div className={styles.newsinfos}>
          {currentNews.map((item) => (
            <div className={styles.info} key={item.new_ID}>
              <div className={styles.newtime}>{item.newtime}</div>
              <div className={styles.newtitle}>{item.newtitle}</div>
              <div className={styles.newdesc}>{item.newdesc}</div>
              <div className={styles.nlicon}>
                <img src="./images/news/icon.svg" alt="icon" />
              </div>
              <div className={styles.newimg}>
                <img src={item.newimgUrl} alt="img" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {getPaginationPages(currentPage, totalPages).map((item, index) => {
            if (item === "...") {
              return (
                <span key={`dots-${index}`} className={styles.dots}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={item}
                className={`${styles.pageBtn} ${
                  currentPage === item ? styles.active : ""
                }`}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default News;
