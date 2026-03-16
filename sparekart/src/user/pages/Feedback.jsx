import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../css/Feedback.css";
import { useState } from "react";

function Feedback(){

  const [form,setForm] = useState({
    name:"",
    email:"",
    message:""
  });

  const [error,setError] = useState("");

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!form.name || !form.email || !form.message){
      setError("All fields are required");
      return;
    }

    setError("");
    alert("Feedback submitted successfully");
    setForm({name:"",email:"",message:""});
  };

  return(
    <>
      <Navbar/>

      <div className="feedback-page">

        <form className="feedback-card" onSubmit={handleSubmit}>

          <div className="feedback-icon">💬</div>

          <h2>We Value Your Feedback</h2>
          <p className="sub">Help us improve our service</p>

          {error && <p className="error">{error}</p>}

          <div className="field">
            <label>Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Share your thoughts..."
              rows="4"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button className="submit-btn">Submit Feedback</button>

        </form>

      </div>

      <Footer/>
    </>
  );
}

export default Feedback;
