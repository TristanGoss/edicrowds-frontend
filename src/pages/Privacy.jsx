import Footer from "../components/Footer"; 
import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-box">
        <div className="max-w-3xl">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="text-block">
            When attempting to nowcast pedestrian density, privacy and transparency are crucial.
            In order to protect the privacy of Edinburgh's residents and visitors, Edinburgh Crowds commits to the following:
          </p>
          <br/>
          <ul className="bullet-list">
            <li className="bullet-item">
              <span className="bullet-icon">•</span> 
              <span>We will never publish data covering primarily residential areas of the city.</span>
            </li>
            <li className="bullet-item">
              <span className="bullet-icon">•</span> 
              <span>We will never store data that can be attributed to individuals (Personally Identifiable Information, PII), except in the form of user account details.</span>
            </li>
            <li className="bullet-item">
              <span className="bullet-icon">•</span> 
              <span>We will never publish data at a finer spatial resolution than per-census-output-area.</span>
            </li>
            <li className="bullet-item">
              <span className="bullet-icon">•</span> 
              <span>We will never publish data at a finer temporal resolution than per-15-minutes.</span>
            </li>
            <li className="bullet-item">
              <span className="bullet-icon">•</span> 
              <span>Visitors to our site will never be asked to consent to cookies unless they create an account.</span>
            </li>
            <li className="bullet-item">
              <span className="bullet-icon">•</span> 
              <span>We will track our website traffic in a manner that is compliant with UK and EU privacy law.</span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}