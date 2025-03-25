import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MailingListButton from "../components/MailingListButton";

export default function Contact() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-box">
        <div className="max-w-3xl">
          <h1 className="page-title">Contact Details</h1>
          <p className="text-block">
            To get in contact with the Edinburgh Crowds product, please email
            {' '}<a href="mailto:info@edinburghcrowds.co.uk" className="no-wrap-link">info@edinburghcrowds.co.uk</a>.
          </p>
          <p>
            To stay updated with recent developments, including the all-important launch announcement, please join our mailing list:
          </p>
          <MailingListButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}