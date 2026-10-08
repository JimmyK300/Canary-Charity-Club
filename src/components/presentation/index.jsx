import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export function Hero({
  title,
  description,
  children,
  compact = false,
  image = "images/archive/canary-logo-800.webp",
  imageAlt = "Hình minh họa Canary Gen 3 từ tư liệu câu lạc bộ",
  caption = "Canary · Gen 3",
  imageHeight = 1280,
  imageWidth = 1280,
}) {
  return (
    <section className={`hero container ${compact ? "hero-compact" : ""}`}>
      <div className="hero-copy">
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
      <div className="hero-art">
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
        <span>{caption}</span>
      </div>
    </section>
  );
}
Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  compact: PropTypes.bool,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  caption: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
};
export function Entries({ title, description, data, type, limit }) {
  const entries = Object.entries(data || {})
    .filter(([, item]) => item.title)
    .slice(0, limit);
  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <span className="demo-label">
          {entries.every(([, item]) => item.verifiedAlbum)
            ? "Tư liệu từ câu lạc bộ"
            : "Nội dung từ bản mẫu Canary"}
        </span>
      </div>
      {entries.length ? (
        <div className={`entry-list ${type === "story" ? "story-list" : ""}`}>
          {entries.map(([id, item]) => (
            <article
              className={`entry ${item.verifiedAlbum ? "entry-photo" : ""}`}
              key={id}
            >
              {item.verifiedAlbum ? (
                <img
                  src={`${import.meta.env.BASE_URL}${item.thumbnail.src}`}
                  alt={item.thumbnail.alt}
                  width="640"
                  height="424"
                  loading="lazy"
                />
              ) : (
                <div className="entry-symbol" aria-hidden="true">
                  {type === "story" ? (
                    "“"
                  ) : (
                    <img
                      src={`${import.meta.env.BASE_URL}images/archive/canary-logo-160.webp`}
                      alt=""
                      width="48"
                      height="48"
                    />
                  )}
                </div>
              )}
              <div>
                <h3>{item.title}</h3>
                {item.abstract && <p>{item.abstract}</p>}
                <Link
                  className="text-link"
                  to={`/detail-page?id=${encodeURIComponent(id)}`}
                  state={{ id }}
                >
                  Đọc {type === "story" ? "câu chuyện" : "chi tiết"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Thông tin đang được chuẩn bị</h3>
          <p>Canary sẽ chia sẻ tại đây khi nội dung được công bố.</p>
          <Link to="/donate" className="text-link">
            Tìm hiểu cách đồng hành
          </Link>
        </div>
      )}
    </section>
  );
}
Entries.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  data: PropTypes.object,
  type: PropTypes.string,
  limit: PropTypes.number,
};
export function SupportCTA() {
  return (
    <section className="support-band">
      <div className="container support-inner">
        <div>
          <h2>Hãy đồng hành cùng chúng mình.</h2>
          <p>Từ thời gian, ý tưởng đến sự hỗ trợ của bạn.</p>
        </div>
        <Link className="button button-light" to="/donate">
          Tìm cách đồng hành
        </Link>
      </div>
    </section>
  );
}
export function DemoNote() {
  return (
    <p className="container demo-note">
      Bản trình diễn website · Ảnh hoạt động lấy từ tư liệu câu lạc bộ. Lịch
      hoạt động, báo cáo và hướng dẫn quyên góp vẫn
      cần Canary xác nhận.
    </p>
  );
}
