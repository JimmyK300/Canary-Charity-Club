import { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import {
  Hero,
  Entries,
  SupportCTA,
  DemoNote,
} from "../../components/presentation";
export default function EventsPage() {
  const { event_overviews, project_overviews } = useContext(GlobalContext);
  return (
    <>
      <Hero
        title="Cùng nhau hành động."
        description="Những cuộc gặp gỡ, hoạt động và dự án được chia sẻ trên website Canary."
        image="images/archive/concert-tram-1280.webp"
        imageAlt="Các thành viên Canary trong ảnh recap Concert Trầm"
        caption="Concert Trầm · Tư liệu câu lạc bộ, Gen 2"
        imageHeight={849}
        compact
      />
      <Entries
        title="Hoạt động của Canary"
        data={event_overviews}
        type="event"
      />
      {Object.keys(project_overviews).length > 0 && (
        <Entries
          title="Dự án & hoạt động"
          data={project_overviews}
          type="project"
        />
      )}
      <section className="section container">
        <div className="empty-state">
          <h2>Hẹn gặp bạn trong hoạt động tiếp theo</h2>
          <p>
            Lịch sự kiện sắp tới chưa được xác nhận. Thông tin đăng ký sẽ được
            công bố khi sẵn sàng.
          </p>
        </div>
      </section>
      <SupportCTA />
      <DemoNote />
    </>
  );
}
