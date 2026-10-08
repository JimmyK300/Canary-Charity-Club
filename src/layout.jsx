import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
const pages = [
  ["/", "Trang chủ"],
  ["/about", "Về Canary"],
  ["/events", "Hoạt động"],
  ["/stories", "Câu chuyện"],
  ["/donate", "Đồng hành"],
];
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = `${pages.find(([path]) => path === pathname)?.[1] || "Câu chuyện"} | Canary`;
  }, [pathname]);
  return (
    <GlobalContextProvider>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main").focus();
          document.getElementById("main").scrollIntoView();
        }}
      >
        Đến nội dung chính
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            className="brand"
            to="/"
            onClick={() => setMenuOpen(false)}
            aria-label="Canary, trang chủ"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/archive/canary-logo-160.webp`}
              alt=""
              width="42"
              height="42"
            />
            <span>
              Canary<small>Câu lạc bộ thiện nguyện</small>
            </span>
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Đóng" : "Menu"}
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
          <nav
            id="primary-navigation"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Điều hướng chính"
            onKeyDown={(e) => {
              if (e.key === "Escape") setMenuOpen(false);
            }}
          >
            {pages.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${path === "/donate" ? "nav-support " : ""}${isActive ? "active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" tabIndex="-1">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <div>
            <Link className="brand footer-brand" to="/">
              <img
                src={`${import.meta.env.BASE_URL}images/archive/canary-logo-160.webp`}
                width="42"
                height="42"
                alt=""
              />
              <span>Canary</span>
            </Link>
            <p>
              Kết nối trái tim để xây dựng
              <br />
              một cộng đồng tốt đẹp hơn.
            </p>
          </div>
          <nav aria-label="Điều hướng cuối trang">
            {pages.slice(1).map(([path, label]) => (
              <Link to={path} key={path}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="footer-contact">
            <h2>Kết nối cùng Canary</h2>
            <p>Kênh liên hệ chính thức đang được xác nhận.</p>
            <Link to="/donate">Chuẩn bị lời nhắn đồng hành</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>Canary Charity Club</span>
          <span>Bản trình diễn · Chưa tiếp nhận quyên góp trực tuyến</span>
        </div>
      </footer>
    </GlobalContextProvider>
  );
}
