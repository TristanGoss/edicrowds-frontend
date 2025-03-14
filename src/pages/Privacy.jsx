import Footer from "../components/Footer"; 

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="prose prose-invert text-gray-300 max-w-3xl">
            In order to protect the privacy of Edinburgh's residents and visitors, <br/>Edinburgh Crowds commits to the following:
          </p>

          {/* Bullet List */}
          <ul className="mt-6 prose prose-invert text-gray-300 max-w-3xl space-y-4 text-left">
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              We will never publish or release crowd data covering residential areas of the city.
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              We will never handle data that can be attributed to individuals (Personally Identifiable Information, PII), except in the form of user account details.
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              We will never publish data at a finer spatial resolution than per-postcode.
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              We will never publish data at a finer temporal resolution than per-15-minutes.
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              Visitors to our site will never be asked to consent to cookies unless they create an account.
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              We will track our website traffic in a manner that is compliant with UK and EU privacy law.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}