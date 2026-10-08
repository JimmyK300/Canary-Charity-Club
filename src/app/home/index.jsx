import { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../contexts/GlobalContext";
import {
  Hero,
  Entries,
  SupportCTA,
  DemoNote,
} from "../../components/presentation";
export default function HomePage() {
  const { event_overviews, story_overviews } = useContext(GlobalContext);
  return (
    <>
      <Hero
        title="Cùng nhau lan tỏa yêu thương."
        description="Canary kết nối những trái tim muốn sẻ chia, cùng hướng đến một cộng đồng tốt đẹp hơn."
        image="images/archive/concert-tram-1280.webp"
        imageAlt="Các thành viên Canary trong ảnh recap Concert Trầm"
        caption="Concert Trầm · Tư liệu câu lạc bộ, Gen 2"
        imageHeight={849}
      >
        <div className="actions">
          <Link className="button" to="/events">
            Khám phá hoạt động
          </Link>
          <Link className="text-link" to="/about">
            Gặp gỡ Canary
          </Link>
        </div>
      </Hero>
      <section className="intro-strip">
        <div className="container">
          <span className="intro-mark" aria-hidden="true">
            ♥
          </span>
          <div>
            <h2>Mọi hành động tử tế đều có ý nghĩa.</h2>
            <p>
              Chúng tôi tin rằng những điều nhỏ bé có thể tạo nên thay đổi lớn
              lao.
            </p>
          </div>
          <Link to="/about" className="text-link">
            Về câu lạc bộ
          </Link>
        </div>
      </section>
      <Entries
        title="Những hoạt động đã chia sẻ"
        description="Gặp gỡ cộng đồng qua những câu chuyện của Canary."
        data={event_overviews}
        type="event"
        limit={2}
      />
      <Entries
        title="Những kỉ niệm của chúng tôi"
        data={story_overviews}
        type="story"
        limit={3}
      />
      <SupportCTA />
      <DemoNote />
    </>
  );
}
