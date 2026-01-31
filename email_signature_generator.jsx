const { useState, useRef } = React;

function App() {
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: "",
    email: ""
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
    const html = sigRef.current.innerHTML;
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
        {/* INPUTS */}
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="title" placeholder="Designation" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
        </div>

        {/* PREVIEW + ACTIONS */}
        <div>
          <div ref={sigRef}>
            <table width="550" cellpadding="0" cellspacing="0" border="0"
              style={{ borderCollapse:"collapse", fontFamily:"Noto Sans", color:"#102a4c" }}>
              <tbody>
                <tr>
                  <td width="110" align="center"
                    style={{ padding:"10px", borderRight:"1px solid #ccc" }}>
                    LOGO
                  </td>

                  <td style={{ padding:"10px 15px" }}>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr><td style={{ fontSize:"18px", fontWeight:"bold" }}>{data.name}</td></tr>
                        <tr><td style={{ fontSize:"15px", color:"#6bbe45", paddingBottom:"10px" }}>{data.title}</td></tr>
                        <tr><td style={{ fontWeight:"bold" }}>RAMP360 Ground Handling Services Private Limited</td></tr>
                        <tr><td style={{ paddingTop:"6px" }}>☎ {data.phone}</td></tr>
                        <tr><td style={{ paddingTop:"3px" }}>✉ {data.email}</td></tr>
                        <tr><td style={{ paddingTop:"3px" }}>🌐 www.ramp360.in</td></tr>
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
