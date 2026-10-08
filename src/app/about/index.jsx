import { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import { Hero, SupportCTA, DemoNote } from "../../components/presentation";
export default function AboutPage() {
  const { hero_sections, statements } = useContext(GlobalContext);
  return (
    <>
      <Hero
        title="Về Canary"
        description={hero_sections.about.description}
        image="images/archive/quang-ngai-activity-1280.webp"
        imageAlt="Một thành viên Canary trò chuyện cùng các em nhỏ trong tư liệu Quảng Ngãi"
        caption="Quảng Ngãi — Trọn Niềm Vui · Tư liệu câu lạc bộ, Gen 2"
        imageHeight={1280}
        imageWidth={960}
        compact
      />
      <section className="section container statement-grid">
        {Object.entries(statements).map(([id, statement]) => (
          <article key={id}>
            <h2>{statement.title}</h2>
            <p>{statement.description}</p>
          </article>
        ))}
      </section>
      <section className="section container about-community">
        <h2>Không chỉ là một chuyến đi.</h2>
        <p>
          Canary là nơi học sinh, sinh viên cùng lan tỏa tinh thần sẻ chia đến
          cộng đồng.
        </p>
        <div className="empty-state">
          <h3>Gặp gỡ đội ngũ Canary</h3>
          <p>
            Danh sách thành viên và lịch sử hoạt động đang chờ câu lạc bộ xác
            nhận để công bố.
          </p>
        </div>
      </section>
      <SupportCTA />
      <DemoNote />
    </>
  );
}
