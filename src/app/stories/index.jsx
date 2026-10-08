import { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import {
  Hero,
  Entries,
  SupportCTA,
  DemoNote,
  PhotoGallery,
} from "../../components/presentation";
export default function StoriesPage() {
  const { story_overviews, archive_gallery } = useContext(GlobalContext);
  return (
    <>
      <Hero
        title="Mỗi chuyến đi, một câu chuyện."
        description="Những khoảnh khắc được lưu lại trong các album của Canary."
        image="images/archive/quang-ngai-activity-1280.webp"
        imageAlt="Một thành viên Canary trò chuyện cùng các em nhỏ trong tư liệu Quảng Ngãi"
        caption="Quảng Ngãi — Trọn Niềm Vui · Tư liệu câu lạc bộ, Gen 2"
        imageHeight={1280}
        imageWidth={960}
        compact
      />
      <Entries
        title="Những kỉ niệm của chúng tôi"
        data={story_overviews}
        type="story"
      />
      <PhotoGallery photos={archive_gallery} />
      <SupportCTA />
      <DemoNote />
    </>
  );
}
