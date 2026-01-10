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

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.background}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      />
    </div>
  );
};

export default About;
