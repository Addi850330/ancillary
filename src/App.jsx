import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import News from "./pages/News";
import About from "./pages/About";
import { SectionProvider } from "./context/Context";
// import './App.css'

function App() {
  return (
    <BrowserRouter>
      <SectionProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />{" "}
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </SectionProvider>
    </BrowserRouter>
  );
}

export default App;
