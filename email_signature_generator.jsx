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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Email Signature Generator</h1>

      <textarea ref={taRef} className="absolute -left-[9999px] top-0" readOnly />

      <div className="grid grid-cols-2 gap-6">
        {/* FORM */}
        <div>
          <div className="p-4 space-y-3">
            <input className="border p-2 w-full" name="name" placeholder="Name" onChange={handleChange} />
            <input className="border p-2 w-full" name="title" placeholder="Designation" onChange={handleChange} />
            <input className="border p-2 w-full" name="company" value={data.company} onChange={handleChange} />
            <input className="border p-2 w-full" name="calendar" placeholder="Calendar URL (optional)" onChange={handleChange} />
            <input className="border p-2 w-full" name="phone" placeholder="Phone" onChange={handleChange} />
            <input className="border p-2 w-full" name="email" placeholder="Email" onChange={handleChange} />
            <input className="border p-2 w-full" name="website" placeholder="Website" onChange={handleChange} />
          </div>
        </div>

        {/* PREVIEW */}
        <div>
          <div className="p-4">
            <div
              ref={sigRef}
              id="signature"
              className="flex gap-6 items-center p-4 rounded-xl"
              style={{ fontFamily: "Noto Sans", color: "#102b4e" }}
            >
              <img
                src="https://raw.githubusercontent.com/AkhilMangalan/Image/main/RAMP-360-Logo.png"
                className="w-36"
              />
              <div className="text-sm">
                <p className="font-bold text-lg uppercase">{data.name}</p>
                <p className="font-semibold" style={{ color: "#72bf44" }}>{data.title}</p>
                <p className="font-semibold mt-1">{data.company}</p>
                <p className="mt-1">📞 {data.phone}</p>
                <p>✉ {data.email}</p>
                <p>🌐 {data.website}</p>

                <div className="flex items-center gap-3 mt-2">
                  <a href="https://maps.app.goo.gl/FjvDmwcM9bpUuACD6" target="_blank">📍</a>
                  <a href="https://www.linkedin.com/company/ramp360/" target="_blank">in</a>
                  <a href="https://instagram.com/ramp360.in" target="_blank">📸</a>
                  <a href="https://x.com/ramp360_in" target="_blank">X</a>
                </div>

                {data.calendar && (
                  <a
                    href={data.calendar}
                    className="mt-3 inline-block px-3 py-1 rounded"
                    style={{ background: "#102b4e", color: "#72bf44" }}
                  >
                    Book My Calendar
                  </a>
                )}
              </div>
            </div>

            <button className="mt-4 w-full" onClick={copySignature}>
              Copy Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
