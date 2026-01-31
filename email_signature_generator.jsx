const { useState } = React;

function App() {
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: "",
    email: ""
  });

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
      <!-- Paste logo here in Outlook -->
    </td>

    <!-- RIGHT CONTENT -->
    <td style="padding:10px 15px; font-family:'Noto Sans';">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">

        <tr>
          <td style="font-size:18px; font-weight:bold;">${data.name}</td>
        </tr>

        <tr>
          <td style="font-size:15px; color:#6bbe45; padding-bottom:10px;">
            ${data.title}
          </td>
        </tr>

        <tr>
          <td style="font-weight:bold;">
            RAMP360 Ground Handling Services Private Limited
          </td>
        </tr>

        <!-- PHONE -->
        <tr>
          <td style="padding-top:6px;">
            ☎ ${data.phone}
          </td>
        </tr>

        <!-- EMAIL -->
        <tr>
          <td style="padding-top:3px;">
            ✉ ${data.email}
          </td>
        </tr>

        <!-- WEBSITE -->
        <tr>
          <td style="padding-top:3px;">
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
          <input name="email" placeholder="Email" onChange={handleChange} />
        </div>

        <div>
          <button onClick={downloadHTML}>
            Download Signature (.htm)
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
