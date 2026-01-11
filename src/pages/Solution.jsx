import { useEffect, useState, useRef } from "react";
import styles from "./Solution.module.css";

const Solution = () => {
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

  return (
    <>
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
      <section className={styles.menu}></section>
      <section className={styles.trade}></section>
      <section className={styles.requirement}></section>
    </>
  );
};

export default Solution;
