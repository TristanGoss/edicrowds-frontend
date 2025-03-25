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
          <ul className="bullet-list">
            <li className="bullet-item">
              <span className="bullet-icon">•</span> 
              <span>
                We will never publish data covering primarily residential areas of the city, although we will
                model behaviour within these regions to enhance our predictions outside of them.
              </span>
            </li>
            <li className="bullet-item">
              <span className="bullet-icon">•</span> 
              <span>We will never store data that can be attributed to individuals (Personally Identifiable Information, PII),
                except in the form of user account details.
              </span>
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
          </ul>
          <br/>
          <p className="text-block">
            We use{' '}<a href="https://umami.is" className="no-wrap-link">Umami Cloud</a>,
            a privacy-focused analytics platform hosted in the European Union,
            to collect basic usage statistics about how visitors interact with this site.
            This data helps us understand aggregate patterns like page views, device types, and referrer websites,
            so we can improve the service.
          </p>
          <p className="text-block">
            Umami does not use cookies, does not track individual users across sites,
            and does not collect PII such as IP addresses or browser fingerprints.
            All analytics data is anonymised and processed in accordance with both the EU General Data Protection Regulation (GDPR),
            UK General Data Protection Regulation (UK-GDPR) and all other laws applicable within the UK.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}