import { useContext } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import GlobalContext from "../../contexts/GlobalContext";
export default function DetailContent() {
  const { event_overviews, project_overviews, story_overviews } =
    useContext(GlobalContext);
  const [params] = useSearchParams();
  const { state } = useLocation();
  const id = params.get("id") || state?.id;
  const item = { ...event_overviews, ...project_overviews, ...story_overviews }[
    id
  ];
  const isStory = id?.startsWith("story");
  return (
    <article className="container detail-page">
      <Link className="text-link" to={isStory ? "/stories" : "/events"}>
        Quay lại {isStory ? "câu chuyện" : "hoạt động"}
      </Link>
      {item ? (
        <>
          <p className="demo-label">
            {item.verifiedAlbum
              ? "Tư liệu từ câu lạc bộ"
              : "Nội dung từ bản mẫu Canary"}
          </p>
          <h1>{item.title}</h1>
          <p className="detail-lead">
            {item.abstract || "Bài viết chi tiết đang được chuẩn bị."}
          </p>
          {item.photos?.map((photo) => (
            <figure className="detail-photo" key={photo.src}>
              <img
                src={`${import.meta.env.BASE_URL}${photo.src}`}
                alt={photo.alt}
                loading="lazy"
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
          <div className="empty-state">
            <h2>
              {item.verifiedAlbum
                ? "Thông tin hoạt động đang được cập nhật"
                : "Câu chuyện đang được hoàn thiện"}
            </h2>
            <p>
              {item.verifiedAlbum
                ? "Ảnh được lấy từ album của câu lạc bộ. Ngày tổ chức, báo cáo hoạt động và kết quả gây quỹ chưa được xác nhận để công bố trên website."
                : "Đây là phần giới thiệu từ bản mẫu. Bài viết đầy đủ và hình ảnh sẽ được bổ sung khi câu lạc bộ xác nhận nội dung."}
            </p>
          </div>
        </>
      ) : (
        <>
          <h1>Chưa tìm thấy bài viết</h1>
          <p>
            Bài viết có thể chưa được công bố. Bạn có thể khám phá các hoạt động
            và câu chuyện khác của Canary.
          </p>
          <Link className="button" to="/stories">
            Xem câu chuyện
          </Link>
        </>
      )}
    </article>
  );
}
