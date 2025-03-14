import Footer from "../components/Footer"; // Import Footer

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-300">
            In order to protect the privacy of Edinburgh's residents and visitors, Edinburgh Crowds commits to the following:
            <ul>
                <li>We will never publish or release crowd data covering residential areas of the city.</li>
                <li>We will never handle data that can be attributed to individuals (Personally Ientifiable Information, PII), except in the form of user account details.</li>
                <li>We will never publish data at a finer spatial resolution than per-postcode.</li>
                <li>We will never publish data at a finer temporal resolution than hourly.</li>
                <li>Visitors to our site will never be asked to consent to cookies unless they create an account.</li>
                <li>We will track our website traffic in a manner that is compliant with UK and EU privacy law.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}