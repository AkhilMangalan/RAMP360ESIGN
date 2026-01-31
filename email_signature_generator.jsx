const { useState, useRef } = React;

function App() {
  const [data, setData] = useState({
    name: "",
    title: "",
    company: "RAMP360 Ground Handling Services Private Limited",
    phone: "",
    email: "",
    website: "",
    calendar: ""
  });

  const sigRef = useRef(null);
  const taRef = useRef(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const copySignature = () => {
    if (!sigRef.current || !taRef.current) return;
    taRef.current.value = sigRef.current.innerText;
    taRef.current.style.display = "block";
    taRef.current.select();
    try { document.execCommand("copy"); } catch (e) {}
    taRef.current.style.display = "none";
  };

  const downloadHTML = () => {
    const html = `
<div style="font-family:Noto Sans,Arial;color:#102b4e;display:flex;gap:16px;align-items:center;">
  <img src="https://raw.githubusercontent.com/AkhilMangalan/Image/main/RAMP-360-Logo.png" width="120" />
  <div>
    <div style="font-size:16px;font-weight:700;text-transform:uppercase;">${data.name}</div>
    <div style="color:#72bf44;font-weight:600;">${data.title}</div>
    <div style="font-weight:600;">${data.company}</div>
    <div>📞 ${data.phone}</div>
    <div>✉ ${data.email}</div>
    <div>🌐 ${data.website}</div>
    <div style="margin-top:6px;">
      <a href="https://maps.app.goo.gl/FjvDmwcM9bpUuACD6">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/googlemaps.svg" width="18"/>
      </a>
      <a href="https://www.linkedin.com/company/ramp360/">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg" width="18"/>
      </a>
      <a href="https://instagram.com/ramp360.in">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg" width="18"/>
      </a>
      <a href="https://x.com/ramp360_in">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/x.svg" width="18"/>
      </a>
    </div>
    ${data.calendar ? `<a href="${data.calendar}" style="display:inline-block;margin-top:6px;padding:6px 10px;background:#102b4e;color:#72bf44;text-decoration:none;border-radius:4px;">Book My Calendar</a>` : ``}
  </div>
</div>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "signature.html";
    a.click();
  };

  return (
    <div className="app">
      <h1>Email Signature Generator</h1>

      <textarea ref={taRef} className="absolute -left-[9999px] top-0" readOnly />

      <div className="grid">
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="title" placeholder="Designation" onChange={handleChange} />
          <input name="company" value={data.company} onChange={handleChange} />
          <input name="calendar" placeholder="Calendar URL (optional)" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="website" placeholder="Website" onChange={handleChange} />
        </div>

        <div>
          <div ref={sigRef} id="signature" className="signature">
            <img src="https://raw.githubusercontent.com/AkhilMangalan/Image/main/RAMP-360-Logo.png" />
            <div>
              <div className="name">{data.name}</div>
              <div className="title">{data.title}</div>
              <div className="company">{data.company}</div>
              <div>📞 {data.phone}</div>
              <div>✉ {data.email}</div>
              <div>🌐 {data.website}</div>

              <div className="icons">
                <a href="https://maps.app.goo.gl/FjvDmwcM9bpUuACD6" target="_blank">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/googlemaps.svg" width="20" />
                </a>
                <a href="https://www.linkedin.com/company/ramp360/" target="_blank">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg" width="20" />
                </a>
                <a href="https://instagram.com/ramp360.in" target="_blank">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg" width="20" />
                </a>
                <a href="https://x.com/ramp360_in" target="_blank">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/x.svg" width="20" />
                </a>
              </div>

              {data.calendar && (
                <a href={data.calendar} style={{ display: "inline-block", marginTop: "6px" }}>
                  Book My Calendar
                </a>
              )}
            </div>
          </div>

          <button onClick={copySignature}>Copy Signature</button>
          <button onClick={downloadHTML}>Download HTML</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
