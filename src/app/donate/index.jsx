import { useState } from "react";
import { Hero } from "../../components/presentation";
const initialMessage =
  "Chào Canary,\nTôi muốn tìm hiểu cách đồng hành cùng câu lạc bộ.\nHình thức tôi quan tâm: tình nguyện / tài trợ / đóng góp.\nTên của tôi: \nThông tin liên hệ: \nNhờ Canary gửi thông tin hoạt động và hướng dẫn đã được xác nhận.\nCảm ơn câu lạc bộ!";
export default function DonatePage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [status, setStatus] = useState("");
  const contactHref = `mailto:chiminh75@gmail.com?subject=${encodeURIComponent("Tìm hiểu cách đồng hành cùng Canary")}&body=${encodeURIComponent(message)}`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus(
        "Đã sao chép lời nhắn. Bạn có thể dùng nút liên hệ để mở ứng dụng email.",
      );
    } catch {
      setStatus(
        "Chưa sao chép được. Hãy chọn lời nhắn để sao chép thủ công hoặc tải bản nháp.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([message], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "loi-nhan-dong-hanh-canary.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Đã tải bản nháp lời nhắn. Lời nhắn chưa được gửi tới Canary.");
  }
  return (
    <>
      <Hero
        title="Sự sẻ chia bắt đầu từ bạn."
        description="Có nhiều cách để đồng hành: dành thời gian, chia sẻ nguồn lực hoặc hỗ trợ một hoạt động."
        image="images/archive/gia-dinh-3-1280.webp"
        imageAlt="Người lớn và trẻ em cùng chụp ảnh trong một phòng sinh hoạt"
        caption="Gia Đình 3 — Yêu · Tư liệu câu lạc bộ"
        imageHeight={853}
      >
        <button
          className="button"
          onClick={() =>
            document.getElementById("support-options").scrollIntoView()
          }
        >
          Tìm cách đồng hành
        </button>
      </Hero>
      <section className="section container" id="support-options">
        <div className="section-heading">
          <div>
            <h2>Bạn muốn đồng hành như thế nào?</h2>
            <p>Chọn điều phù hợp với bạn để bắt đầu một cuộc trò chuyện.</p>
          </div>
        </div>
        <div className="support-options">
          {[
            [
              "Tình nguyện",
              "Dành thời gian và kỹ năng cho một hoạt động của câu lạc bộ.",
            ],
            [
              "Tài trợ",
              "Trao đổi về nguồn lực có thể hỗ trợ các dự án và hoạt động.",
            ],
            [
              "Đóng góp",
              "Tìm hiểu nhu cầu và hướng dẫn đóng góp đã được xác nhận.",
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="donation-notice">
          <h2>Bắt đầu bằng một lời nhắn</h2>
          <p>
            Website chưa tiếp nhận thanh toán và chưa có hướng dẫn quyên góp đã
            được xác minh. Bạn có thể liên hệ người phụ trách bản trình diễn để
            hỏi thêm về hoạt động và cách đồng hành.
          </p>
          <div className="actions">
            <a className="button" href={contactHref}>
              Liên hệ để tìm hiểu
            </a>
            <button
              className="button button-outline"
              aria-expanded={open}
              aria-controls="request-draft"
              onClick={() => {
                setOpen(!open);
                setStatus("");
              }}
            >
              {open ? "Đóng bản nháp" : "Soạn lời nhắn trước"}
            </button>
          </div>
        </div>
        {open && (
          <div className="request-draft" id="request-draft">
            <h2>Chuẩn bị lời nhắn của bạn</h2>
            <p>
              Bản nháp được chỉnh sửa trên thiết bị của bạn. Nút liên hệ mở ứng
              dụng email; bạn kiểm tra và gửi khi sẵn sàng.
            </p>
            <label htmlFor="message">Lời nhắn về Canary</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="9"
            />
            <div className="actions">
              <a className="button" href={contactHref}>
                Mở email với lời nhắn
              </a>
              <button className="button button-outline" onClick={copy}>
                Sao chép lời nhắn
              </button>
              <button className="button button-outline" onClick={download}>
                Tải bản nháp
              </button>
            </div>
            <p className="request-status" role="status">
              {status}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
