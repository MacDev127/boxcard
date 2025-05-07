import React from 'react';
import './ContactForm.css';
import Swal from 'sweetalert2';

const ContactForm = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    formData.append('access_key', '1f84f63a-9310-4e13-883a-d8d209ce552e');

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: 'Success',
        text: 'Message Sent',
        icon: 'success',
      });
      form.reset();
    }
  };
  return (
    <div className="contact">
      <form className="contact_form" onSubmit={onSubmit}>
        <h2>Contact Us</h2>
        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            className="field"
            placeholder="Enter your name.. "
            required
            name="name"
          />
        </div>
        <div className="input-box">
          <label>Email</label>
          <input
            type="email"
            className="field"
            placeholder="Enter your email.."
            required
            name="email"
          />
        </div>

        <div className="input-box">
          <label>Your Message</label>
          <textarea
            className="field message"
            placeholder="Enter your message.."
            required
            name="message"
          />
        </div>
        <button className="contact_button" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
