import React from 'react';
import '../styles/Contact.css'; // We will create this CSS file later

function Contact() {
    return (
        <div className="contact-container">
            <h1 className="contact-heading">Contact Us</h1>
            <p className="contact-text">
                Have questions or need support? Feel free to reach out to us through the form below.
            </p>
            <form className="contact-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your Name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your Email" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" placeholder="Your Message" required />

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;
