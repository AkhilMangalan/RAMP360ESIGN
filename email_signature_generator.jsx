const { useState, useRef } = React;
const LOGO_BASE64 ="data:image/png;base64,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";
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

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const copySignature = () => {
    taRef.current.value = sigRef.current.innerHTML;
    taRef.current.style.display = "block";
    taRef.current.select();
    document.execCommand("copy");
    taRef.current.style.display = "none";
  };

  const downloadHTML = () => {
    const blob = new Blob([sigRef.current.innerHTML], {
      type: "text/html;charset=utf-8"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const safeName = (data.name || "signature")
      .toUpperCase()
      .replace(/\s+/g, "_");
    a.download = safeName + ".htm";
    a.click();
  };

  return (
    <div className="app">
      <h1>Email Signature Generator</h1>

      <textarea
        ref={taRef}
        style={{ position: "absolute", left: "-9999px" }}
        readOnly
      />

      <div className="grid">
        {/* INPUTS */}
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input
            name="title"
            placeholder="Designation"
            onChange={handleChange}
          />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input
            name="calendar"
            placeholder="Calendar URL (optional)"
            onChange={handleChange}
          />
        </div>

        {/* PREVIEW */}
        <div>
          <div ref={sigRef}>
            <table
              width="550"
              cellPadding="0"
              cellSpacing="0"
              border="0"
              style={{
                borderCollapse: "collapse",
                fontFamily: "Noto Sans",
                color: "#102a4c"
              }}
            >
              <tbody>
                <tr>
                  {/* LOGO */}
                  <td
                    width="110"
                    align="center"
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #ccc"
                    }}
                  >
                    <img
                      src={LOGO_BASE64}
                      width="150"
                      style={{
                        display: "block",
                        border: 0,
                        maxWidth: "150px"
                      }}
                      alt="RAMP360"
                    />
                  </td>

                  {/* CONTENT */}
                  <td style={{ padding: "10px 15px" }}>
                    <table
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td style={{ fontSize: "18px", fontWeight: "bold" }}>
                            {data.name.toUpperCase()}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              fontSize: "15px",
                              color: "#6bbe45",
                              paddingBottom: "10px"
                            }}
                          >
                            {data.title}
                          </td>
                        </tr>

                        <tr>
                          <td style={{ fontWeight: "bold" }}>
                            RAMP360 Ground Handling Services Private Limited
                          </td>
                        </tr>

                        {/* PHONE */}
                        <tr>
                          <td style={{ paddingTop: "6px" }}>
                           <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" width="16"
                              style={{ marginRight: 6 }} />
                            {data.phone}
                          </td>
                        </tr>

                        {/* EMAIL */}
                        <tr> <td>
                         <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="16"
                              style={{ marginRight: 6 }} />
                            {data.email}
                           </td> </tr>

                        {/* WEBSITE */}
                        <tr>
                          <td style={{ paddingTop: "3px" }}>
                           <img src="https://cdn-icons-png.flaticon.com/512/25/25284.png"
                              width="16"
                              style={{ marginRight: 6 }}
                            />
                            www.ramp360.in
                          </td>
                        </tr>

                        {/* SOCIAL */}
                        <tr>
                          <td style={{ paddingTop: "8px" }}>
                            <a href="https://maps.app.goo.gl/FjvDmwcM9bpUuACD6">
                              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width="18" style={{ marginRight: 6 }} />
                            </a>
                            <a href="https://www.linkedin.com/company/ramp360/">
                             <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="18" style={{ marginRight: 6 }} />
                            </a>
                            <a href="https://instagram.com/ramp360.in">
                               <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png width="18" style={{ marginRight: 6 }} />
                            </a>
                            <a href="https://x.com/ramp360_in">
                               <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" width="18" />
                            </a>
                          </td>
                        </tr>

                        {/* CALENDAR */}
                        {data.calendar && (
                          <tr>
                            <td style={{ paddingTop: "8px" }}>
                              <a
                                href={data.calendar}
                                style={{
                                  background: "#102a4c",
                                  color: "#6bbe45",
                                  padding: "6px 10px",
                                  textDecoration: "none",
                                  borderRadius: "4px",
                                  fontSize: "12px"
                                }}
                              >
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
