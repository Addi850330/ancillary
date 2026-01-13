import { useEffect, useState } from "react";
import { useSection } from "../context/Context";
import styles from "./Contact.module.css";
const Contact = () => {
  // -----------開場------
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
    setScrollState("close");
    setTimeout(() => {
      setcstate("open");

      setTimeout(() => {
        setTextStatus("open");
      }, 1200); // open mask 後再等 0.2 秒
    }, 1000);
  };
  // ------------------------------------------------------

  useEffect(() => {
    openpage();
  }, []);

  // -------------------------------
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
  // -----------------------------------------
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.company.trim()) newErrors.company = "請填寫公司 / 組織名稱";
    if (!formData.name.trim()) newErrors.name = "請填寫聯繫人姓名";
    if (!formData.phone.trim()) newErrors.phone = "請填寫聯繫電話";
    if (!formData.email.trim()) newErrors.email = "請填寫聯繫電子信箱";
    if (!formData.message.trim()) newErrors.message = "請填寫內容";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // 表單資料正確
    console.log("送出資料:", formData);
    alert("送出成功！");

    // 清空表單（可選）
    setFormData({
      company: "",
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    setErrors({});
  };
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
      <section className={styles.contactlist}>
        <div className={styles.newtitle}>
          Contact
          <span
            className={`${styles.fill} ${
              textstatus === "open" ? styles.active : ""
            }`}
          >
            Contact
          </span>
        </div>
        <div className={styles.formlist}>
          <form onSubmit={handleSubmit}>
            <label>
              <div> 公司 / 組織名稱</div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              {errors.company && (
                <p style={{ color: "red" }}>{errors.company}</p>
              )}
            </label>

            <label>
              <div>聯繫人姓名</div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </label>

            <label>
              <div>聯繫電話</div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </label>

            <label>
              <div>聯繫電子信箱</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </label>

            <label>
              <div>內容</div>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p style={{ color: "red" }}>{errors.message}</p>
              )}
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
