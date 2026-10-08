import { useEffect, useRef, useState } from "react";

const goal = 5000000;
const currency = (amount) => `${new Intl.NumberFormat("vi-VN").format(amount)} ₫`;
const initialSupporters = [
  { name: "Người bạn mẫu 01", amount: 1500000 },
  { name: "Người bạn mẫu 02", amount: 1000000 },
  { name: "Người bạn mẫu 03", amount: 750000 },
];
const storageKey = "canary-support-demo-v1";
function readDemo() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (Array.isArray(saved) && saved.length >= 3 && saved.length <= 20 && saved.every((row) =>
      typeof row.name === "string" && /^Người (bạn mẫu|xem bản mẫu) \d+$/.test(row.name) &&
      Number.isFinite(row.amount) && row.amount > 0 && row.amount <= 1500000)) return saved;
  } catch { /* Storage may be unavailable; the preview still works in memory. */ }
  return initialSupporters;
}

export default function SupportDemo() {
  const [supporters, setSupporters] = useState(readDemo);
  const [amount, setAmount] = useState(100000);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const dialog = useRef(null);
  const total = supporters.reduce((sum, row) => sum + row.amount, 0);
  const percent = Math.min(100, Math.round((total / goal) * 100));

  useEffect(() => {
    try { sessionStorage.setItem(storageKey, JSON.stringify(supporters)); } catch { /* In-memory fallback. */ }
  }, [supporters]);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function addSample() {
    setSupporters((rows) => [{ name: `Người xem bản mẫu ${String(rows.length - 2).padStart(2, "0")}`, amount }, ...rows]);
    setStatus(`Đã thêm ${currency(amount)} vào bản mẫu trên thiết bị này. Không có thanh toán hay đóng góp thực.`);
    setOpen(false);
  }

  return (
    <section className="support-demo section" id="dong-hanh" aria-labelledby="support-demo-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2 id="support-demo-title">Cùng Canary viết tiếp điều tử tế.</h2>
            <p>Khám phá cách đồng hành qua một trải nghiệm tương tác.</p>
          </div>
        </div>
        <p className="support-demo-disclosure">
          <strong>Dữ liệu mẫu · Không phải đóng góp thực.</strong> Mọi số tiền, mục tiêu, tên người đồng hành và trải nghiệm dưới đây đều hư cấu. Chỉ ảnh hoạt động ở các phần khác lấy từ tư liệu câu lạc bộ.
        </p>
        <div className="support-demo-grid">
          <div className="contribution-preview">
            <h3>Tiến độ đóng góp mẫu</h3>
            <p className="contribution-total">{currency(total)} <span>/ {currency(goal)} mục tiêu mẫu</span></p>
            <progress max={goal} value={Math.min(total, goal)} aria-label="Tiến độ đóng góp mẫu" />
            <p className="contribution-progress-label">{percent}% mục tiêu mẫu · {supporters.length} lượt minh họa</p>
            <fieldset className="sample-amounts">
              <legend>Chọn số tiền để thử</legend>
              <div>
                {[50000, 100000, 200000, 500000].map((value) => (
                  <button key={value} type="button" aria-pressed={amount === value} onClick={() => setAmount(value)}>{currency(value)}</button>
                ))}
              </div>
            </fieldset>
            <button className="button button-light" onClick={() => setOpen(true)} disabled={supporters.length >= 20}>Đóng góp thử · Xem QR mẫu</button>
            <p className="sample-local-note">Chỉ thay đổi bản mẫu trong phiên xem này. Không gửi tiền hay thông tin cá nhân.</p>
            {supporters.length >= 20 && <p className="sample-local-note">Bản mẫu đã đủ 20 lượt. Đặt lại dữ liệu để thử tiếp.</p>}
            <button className="sample-reset" onClick={() => { setSupporters(initialSupporters); setStatus("Đã đặt lại dữ liệu mẫu. Không có đóng góp thực."); }}>Đặt lại dữ liệu mẫu</button>
          </div>
          <div className="sample-supporters">
            <div className="supporter-heading"><h3>Những người đồng hành mẫu</h3><span className="demo-label">Danh sách hư cấu</span></div>
            <ul aria-label="Danh sách người đồng hành mẫu">
              {supporters.slice(0, 6).map((person, index) => (
                <li key={person.name}>
                  <span className="supporter-avatar" aria-hidden="true">♥</span>
                  <span><strong>{person.name}</strong><small>{index < supporters.length - 3 ? "Lượt thử trên thiết bị này" : "Ví dụ minh họa"}</small></span>
                  <span className="supporter-amount">{currency(person.amount)}</span>
                </li>
              ))}
            </ul>
            {supporters.length > 6 && <p className="sample-local-note">Hiển thị 6 lượt gần nhất trong {supporters.length} lượt mẫu.</p>}
            <p className="support-contact-note">Muốn tìm hiểu hoạt động thực tế?</p>
            <a className="text-link" href="mailto:chiminh75@gmail.com?subject=T%C3%ACm%20hi%E1%BB%83u%20c%C3%A1ch%20%C4%91%E1%BB%93ng%20h%C3%A0nh%20c%C3%B9ng%20Canary">Liên hệ để tìm hiểu</a>
          </div>
        </div>
        <p className="support-demo-status" role="status">{status}</p>
        <div className="sample-experiences">
          <h3>Trải nghiệm đồng hành · Câu chuyện mẫu</h3>
          <p>Hai ví dụ hư cấu để minh họa mục chia sẻ trải nghiệm.</p>
          <div>
            <details><summary>Chuẩn bị một buổi sẻ chia <span>Câu chuyện hư cấu</span></summary><p>“Mình thử cùng nhóm phân loại sách và chuẩn bị lời nhắn. Điều mình thích nhất là được góp một phần thời gian của mình.”</p><small>Người bạn mẫu 01 · Nội dung minh họa, không phải lời kể thực.</small></details>
            <details><summary>Lần đầu làm tình nguyện <span>Câu chuyện hư cấu</span></summary><p>“Mình bắt đầu từ một việc nhỏ: lắng nghe ý tưởng của nhóm và nhận một phần việc phù hợp. Mình muốn tiếp tục học cách làm việc cùng mọi người.”</p><small>Người bạn mẫu 02 · Nội dung minh họa, không phải lời kể thực.</small></details>
          </div>
        </div>
      </div>
      <dialog ref={dialog} className="sample-qr-dialog" aria-labelledby="sample-qr-title" aria-describedby="sample-qr-description" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const buttons = event.currentTarget.querySelectorAll("button");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setOpen(false);
      }}>
        <div className="sample-qr-heading"><h2 id="sample-qr-title">QR minh họa</h2><button className="sample-qr-close" aria-label="Đóng QR mẫu" onClick={() => setOpen(false)} autoFocus>×</button></div>
        <p id="sample-qr-description"><strong>Không thanh toán · Không quét để chuyển tiền.</strong> Đây là ảnh giữ chỗ, không chứa người nhận, tài khoản hay dữ liệu thanh toán.</p>
        <img src={`${import.meta.env.BASE_URL}images/support-qr-placeholder.svg`} alt="Ảnh QR giả lập bị gạch chéo, ghi DEMO — không thanh toán" width="260" height="260" />
        <p className="sample-qr-amount">Số tiền thử: <strong>{currency(amount)}</strong></p>
        <button className="button" onClick={addSample}>Áp dụng vào bản mẫu</button>
        <p className="sample-local-note">Nút này chỉ cập nhật tiến độ và danh sách mẫu. Không có giao dịch được thực hiện.</p>
      </dialog>
    </section>
  );
}
