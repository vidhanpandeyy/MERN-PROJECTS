import React from 'react';
import './faq.css'; // Import your CSS file

const FAQ = () => {
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <h3>Common questions</h3>
      <h3>Here are some of the most common questions about AyurKritima:</h3>

      <ul className="faq-list">
        <li>
          <h4>What is AyurKritima?</h4>
          <p>Ayurkritima is a digital health platform that provides Ayurvedic healthcare solutions for individuals.</p>
        </li>
        <li>
          <h4>How does AyurKritima work?</h4>
          <p>Ayurkritima uses trained AI algorithms and data analytics to analyze individual health data and provide Ayurvedic recommendations for improving health and well-being.</p>
        </li>
        <li>
          <h4>Is AyurKritima suitable for everyone?</h4>
          <p>Ayurkritima is suitable for individuals of all ages who are looking to improve their health and well-being with Ayurvedic remedies. However, it is always recommended to consult with a healthcare professional before making any significant changes to your lifestyle or healthcare routine.</p>
        </li>
        <li>
          <h4>What kind of services does AyurKritima offer?</h4>
          <p>AyurKritima offers a range of services including prescriptions of Ayurvedic remedies based on input symptoms, and access to a network of healthcare professionals.</p>
        </li>
        <li>
          <h4>Is my personal information safe with AyurKritima?</h4>
          <p>Ayurkritima takes the privacy and security of your personal information very seriously. We use security measures to protect your data and adhere to strict privacy policies to ensure that your information is kept confidential.</p>
        </li>
      </ul>
    </section>
  );
};

export default FAQ;
