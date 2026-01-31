const { useState, useRef } = React;

function App() {
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: ""
  });

  const taRef = useRef(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const downloadHTML = () => {
    const html = `
<table width="550" cellpadding="0" cellspacing="0" border="0"
  style="border-collapse:collapse; font-family:'Noto Sans'; color:#102a4c;">
  <tr>

    <!-- LEFT LOGO -->
    <td width="110" align="center"
      style="padding:10px; border-right:1px solid #ccc; font-family:'Noto Sans';">
      <!-- Paste logo here in Outlook if needed -->
    </td>

    <!-- RIGHT CONTENT -->
    <td style="padding:10px 15px; font-family:'Noto Sans';">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">

        <tr>
          <td style="font-size:18px; font-weight:bold; font-family:'Noto Sans';">
            ${data.name}
          </td>
        </tr>

        <tr>
          <td style="font-size:15px; color:#6bbe45; padding-bottom:10px; font-family:'Noto Sans';">
            ${data.title}
          </td>
        </tr>

        <tr>
          <td style="font-weight:bold; font-family:'Noto Sans';">
            RAMP360 Ground Handling Services Private Limited
          </td>
        </tr>

        <tr>
          <td style="padding-top:6px; font-family:'Noto Sans';">
            ☎ ${data.phone}
          </td>
        </tr>

        <tr>
          <td style="padding-top:3px; font-family:'Noto Sans';">
            🌐 www.ramp360.in
          </td>
        </tr>

      </table>
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

      <div className="grid">
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="title" placeholder="Designation" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
        </div>

        <div>
          <button onClick={downloadHTML}>Download Signature (.htm)</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
