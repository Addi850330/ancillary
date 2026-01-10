import { createContext, useContext, useEffect, useState } from "react";

const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [section, setSection] = useState("close");
  const [scrollState, setScrollState] = useState("close");
  const [activeSection, setActiveSection] = useState("one");
  return (
    <SectionContext.Provider
      value={{
        section,
        setSection,
        scrollState,
        setScrollState,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

// 自訂 hook（推薦）
export const useSection = () => useContext(SectionContext);
