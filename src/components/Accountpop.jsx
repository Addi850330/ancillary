import React, { useState } from "react";
import { useSection } from "../context/Context";
import styles from "./Accountpop.module.css";
const Accountpop = () => {
  const { acc, setAcc } = useSection();
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({
    account: "",
    password: "",
    confirmPassword: "",
  });

  const acclose = () => {
    setAcc("close");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.account || !form.password) {
      alert("請填寫所有欄位");
      return;
    }

    if (mode === "register") {
      if (!form.confirmPassword) {
        alert("請再次輸入密碼");
        return;
      }
      if (form.password !== form.confirmPassword) {
        alert("兩次密碼不一致");
        return;
      }
    }

    //  這裡之後會串 API
    console.log("送出資料:", form, "模式:", mode);
  };

  return (
    <div
      className={`${styles.acconten} ${acc === "open" ? styles.active : ""}`}
    >
      <div className={styles.clbtn} onClick={() => setAcc("close")}>
        x
      </div>
      <div className={styles.logo}>
        <div>
          <img src="./images/AClogo.svg" alt="logo" />
        </div>
        <div>Ancillary Power</div>
      </div>
      {/* 切換按鈕 */}
      <div className={styles.tabs}>
        <button
          className={mode === "login" ? styles.active : ""}
          onClick={() => setMode("login")}
        >
          登入
        </button>
        <button
          className={mode === "register" ? styles.active : ""}
          onClick={() => setMode("register")}
        >
          註冊
        </button>
      </div>

      {/* 表單 */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="account"
          placeholder="帳號"
          value={form.account}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="密碼"
          value={form.password}
          onChange={handleChange}
        />

        {mode === "register" && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="再次確認密碼"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        )}

        <button type="submit" className={styles.submit}>
          {mode === "login" ? "登入" : "註冊"}
        </button>
      </form>
    </div>
  );
};

export default Accountpop;
