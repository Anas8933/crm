import React, { useState } from "react";
import axios from "axios";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    title: "",
    email: "",
    phoneNumber: "",
    countryCode: "+91",
  });

  const [shareLinks, setShareLinks] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 // Frontend code to submit the lead and generate share links
const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/formLead/submit", formData);
      const leadId = response.data.lead._id;
  
      if (leadId) {
        // After submitting the lead, call the endpoint to generate share links
        const shareLinkResponse = await axios.get(`http://localhost:5000/api/formLead/${leadId}/share/generate-share-link`);
        setShareLinks(shareLinkResponse.data);
        setSubmitted(true);
      } else {
        console.error("Lead ID is missing from the response.");
      }
    } catch (error) {
      console.error("Error submitting the lead or generating share links:", error.message);
    }
  };
  
  return (
    <div>
      <h1>Lead Form</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={handleChange}
            value={formData.company}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={formData.title}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phoneNumber}
            required
          />
          <input
            type="text"
            name="countryCode"
            placeholder="Country Code"
            onChange={handleChange}
            value={formData.countryCode}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Share This Form</h2>
          <p><a href={shareLinks.formLink} target="_blank" rel="noopener noreferrer">Open Form</a></p>
          <p><a href={shareLinks.twitterLink} target="_blank" rel="noopener noreferrer">Share on Twitter</a></p>
          <p><a href={shareLinks.facebookLink} target="_blank" rel="noopener noreferrer">Share on Facebook</a></p>
          <p><a href={shareLinks.linkedinLink} target="_blank" rel="noopener noreferrer">Share on LinkedIn</a></p>
          <p><a href={shareLinks.whatsappLink} target="_blank" rel="noopener noreferrer">Share on WhatsApp</a></p>
          <p><a href={shareLinks.mailLink} target="_blank" rel="noopener noreferrer">Share via Email</a></p>
          <p>
            Embed Form: 
            <textarea value={shareLinks.embedLink} readOnly rows="3" cols="50"></textarea>
          </p>
        </div>
      )}
    </div>
  );
};

export default LeadForm;
