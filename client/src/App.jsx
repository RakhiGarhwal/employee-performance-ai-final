import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  const [aiResult, setAiResult] = useState("");

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/api/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addEmployee = async () => {
    await axios.post("http://localhost:5000/api/employees", {
      ...formData,
      skills: formData.skills.split(","),
    });

    fetchEmployees();

    setFormData({
      name: "",
      email: "",
      department: "",
      skills: "",
      performanceScore: "",
      experience: "",
    });
  };

  const generateAI = async () => {
    const topEmployee = [...employees].sort(
      (a, b) => b.performanceScore - a.performanceScore
    )[0];

    setAiResult(
      `${topEmployee.name} is recommended for promotion based on excellent performance and experience.`
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "45px",
        }}
      >
        Employee Performance AI System
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="performanceScore"
          placeholder="Performance Score"
          value={formData.performanceScore}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={addEmployee} style={buttonStyle}>
          Add Employee
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={generateAI} style={buttonStyle}>
          Generate AI Recommendation
        </button>
      </div>

      {aiResult && (
        <div
          style={{
            maxWidth: "900px",
            margin: "20px auto",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>AI Recommendation</h2>
          <p>{aiResult}</p>
        </div>
      )}

      <div
        style={{
          maxWidth: "900px",
          margin: "20px auto",
        }}
      >
        <h2>Employees</h2>

        {employees.map((emp) => (
          <div
            key={emp._id}
            style={{
              background: "#1e293b",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{emp.name}</h3>
            <p>{emp.email}</p>
            <p>{emp.department}</p>
            <p>Skills: {emp.skills.join(", ")}</p>
            <p>Performance Score: {emp.performanceScore}</p>
            <p>Experience: {emp.experience} years</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "none",
};

const buttonStyle = {
  padding: "12px 20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default App;