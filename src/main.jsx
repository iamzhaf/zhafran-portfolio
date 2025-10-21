// main.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx";
import { createRoot } from "react-dom/client";
import Portfolio from "./App.jsx";
import BlogList from "./components/BlogList.jsx";
import BlogPost from "./components/BlogPost.jsx";

const banner_message = "Welcome to Zhafran's Portfolio";

function Layout() {
  const [dark, setDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check if there is a resize event immediately
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // unmount or remove event listener
  }, []);

  return (
    <div className={dark ? "min-h-screen bg-neutral-950 text-neutral-100" : "min-h-screen bg-neutral-50 text-neutral-900"}>
      <Navbar dark={dark} setDark={setDark} banner={banner_message} isMobile={isMobile ? "mobile" : "desktop"} />
      <Routes>
        <Route path="/" element={<Portfolio dark={dark} />} />
        <Route path="/writeups" element={<BlogList dark={dark}/>} />
        <Route path="/writeups/:id" element={<BlogPost dark={dark}/>} />
      </Routes>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
