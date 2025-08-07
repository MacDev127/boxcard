import Navbar from '@/components/Navbar/Navbar';
import ContactForm from '@/components/ContactForm/ContactForm';
import Footer from '@/components/Footer/Footer';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <>
      <div className="contact-page">
        <Navbar />
        <div className="contact-page__wrapper">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
