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
    taRef.current.value = sigRef.current.innerHTML;
    taRef.current.style.display = "block";
    taRef.current.select();
    document.execCommand("copy");
    taRef.current.style.display = "none";
  };

  const downloadHTML = () => {
    const html = sigRef.current.innerHTML;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);

    const safeName = data.name.replace(/\s+/g, "_");
    a.download = safeName + ".htm";
    a.click();
  };

  return (
    <div className="app">
      <h1>Email Signature Generator</h1>

      <textarea ref={taRef} style={{ position:"absolute", left:"-9999px" }} readOnly />

      <div className="grid">
        {/* INPUTS */}
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="title" placeholder="Designation" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="calendar" placeholder="Calendar URL (optional)" onChange={handleChange} />
        </div>

        {/* PREVIEW */}
        <div>
          <div ref={sigRef}>
            <table width="550" cellPadding="0" cellSpacing="0" border="0"
              style={{ borderCollapse:"collapse", fontFamily:"Noto Sans", color:"#102a4c" }}>
              <tbody>
                <tr>
                  {/* LOGO */}
                  <td width="110" align="center"
                    style={{ padding:"10px", borderRight:"1px solid #ccc" }}>
                    <img
                      src="https://raw.githubusercontent.com/AkhilMangalan/Image/main/RAMP-360-Logo.png"
                      width="90"
                      alt="RAMP360"
                    />
                  </td>

                  {/* CONTENT */}
                  <td style={{ padding:"10px 15px" }}>
                    <table width="100%" cellPadding="0" cellSpacing="0" border="0">
                      <tbody>
                        <tr><td style={{ fontSize:"18px", fontWeight:"bold" }}>{data.name}</td></tr>
                        <tr><td style={{ fontSize:"15px", color:"#6bbe45", paddingBottom:"10px" }}>{data.title}</td></tr>
                        <tr><td style={{ fontWeight:"bold" }}>RAMP360 Ground Handling Services Private Limited</td></tr>

                        <tr><td style={{ paddingTop:"6px" }}>☎ {data.phone}</td></tr>
                        <tr><td style={{ paddingTop:"3px" }}>✉ {data.email}</td></tr>
                        <tr><td style={{ paddingTop:"3px" }}>🌐 www.ramp360.in</td></tr>

                        {/* SOCIAL ICONS */}
                        <tr>
                          <td style={{ paddingTop:"8px" }}>
                            <a href="https://maps.app.goo.gl/FjvDmwcM9bpUuACD6">
                              📍
                            </a>&nbsp;
                            <a href="https://www.linkedin.com/company/ramp360/">in</a>&nbsp;
                            <a href="https://instagram.com/ramp360.in">📸</a>&nbsp;
                            <a href="https://x.com/ramp360_in">X</a>
                          </td>
                        </tr>

                        {/* CALENDAR */}
                        {data.calendar && (
                          <tr>
                            <td style={{ paddingTop:"8px" }}>
                              <a href={data.calendar}
                                 style={{ background:"#102a4c", color:"#6bbe45", padding:"6px 10px",
                                          textDecoration:"none", borderRadius:"4px", fontSize:"12px" }}>
                                Book My Calendar
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button onClick={copySignature}>Copy Signature</button>
          <button onClick={downloadHTML}>Download .htm</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
