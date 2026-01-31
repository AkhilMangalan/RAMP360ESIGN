const { useState, useRef } = React;

function App() {
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
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
    document.execCommand("copy");
    taRef.current.style.display = "none";
  };

  const downloadHTML = () => {
    const html = `
<table cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif; color:#102b4e;">
<tr>
  <td style="padding-right:15px;">
    <img src="https://raw.githubusercontent.com/AkhilMangalan/Image/main/RAMP-360-Logo.png" width="110" />
  </td>

  <td>
    <div style="font-size:14px;font-weight:bold;">${data.name}</div>
    <div style="color:#72bf44;font-weight:bold;">${data.title}</div>
    <div style="font-weight:bold;">RAMP360 Ground Handling Services<br>Private Limited</div>

    <table cellpadding="0" cellspacing="0" style="margin-top:6px;font-size:13px;">
      <tr>
        <td><img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" width="14"></td>
        <td style="padding-left:6px;">${data.phone}</td>
      </tr>
      <tr>
        <td><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="14"></td>
        <td style="padding-left:6px;">${data.email}</td>
      </tr>
      <tr>
        <td><img src="https://cdn-icons-png.flaticon.com/512/25/25284.png" width="14"></td>
        <td style="padding-left:6px;">www.ramp360.in</td>
      </tr>
    </table>

    <div style="margin-top:8px;">
      <a href="https://maps.app.goo.gl/FjvDmwcM9bpUuACD6">
        <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width="18">
      </a>
      <a href="https://www.linkedin.com/company/ramp360/">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="18">
      </a>
      <a href="https://instagram.com/ramp360.in">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="18">
      </a>
      <a href="https://x.com/ramp360_in">
        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" width="18">
      </a>
    </div>

    ${data.calendar ? `
    <div style="margin-top:8px;">
      <a href="${data.calendar}" style="background:#102b4e;color:#72bf44;padding:6px 10px;text-decoration:none;border-radius:4px;font-size:12px;">
        Book My Calendar
      </a>
    </div>` : ``}
  </td>
</tr>
</table>
`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "signature.htm";
    a.click();
  };

  return (
    <div className="app">
      <h1>Email Signature Generator</h1>

      <textarea ref={taRef} style={{ position:"absolute", left:"-9999px" }} readOnly />

      <div className="grid">
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="title" placeholder="Designation" onChange={handleChange} />
          <input name="calendar" placeholder="Calendar URL (optional)" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
        </div>

        <div>
          <div ref={sigRef} className="signature">
            <img src="https://raw.githubusercontent.com/AkhilMangalan/Image/main/RAMP-360-Logo.png" />
            <div>
              <div className="name">{data.name}</div>
              <div className="title">{data.title}</div>
              <div className="company">
                RAMP360 Ground Handling Services<br/>Private Limited
              </div>
              <div>{data.phone}</div>
              <div>{data.email}</div>
              <div>www.ramp360.in</div>

              <div className="icons">
                <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" />
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" />
                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" />
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" />
              </div>

              {data.calendar && (
                <a href={data.calendar}>Book My Calendar</a>
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
