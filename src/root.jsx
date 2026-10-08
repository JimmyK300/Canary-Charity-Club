import { createRoot } from "react-dom/client";
import { Routes, Route, HashRouter, Link } from "react-router-dom";
import "./global.css";

import Layout from "./layout";

import HomePage from "./app/home";
import AboutPage from "./app/about/";
import FundraisingPage from "./app/donate/";
import Events from "./app/events/";
import Story from "./app/stories/";
import DetailContent from "./app/detailPage";

const root = document.getElementById("root");

createRoot(root).render(
  <HashRouter>
    <Routes>
      {/* Layout wraps all children routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="detail-page" element={<DetailContent />} />
        <Route path="donate" element={<FundraisingPage />} />
        <Route path="events" element={<Events />} />
        <Route path="stories" element={<Story />} />
        <Route
          path="*"
          element={
            <section className="container detail-page">
              <h1>Chưa tìm thấy trang</h1>
              <p>
                Đường dẫn này chưa có nội dung. Hãy trở về trang chủ để khám phá
                Canary.
              </p>
              <Link className="button" to="/">
                Về trang chủ
              </Link>
            </section>
          }
        />
      </Route>
    </Routes>
  </HashRouter>,
);
