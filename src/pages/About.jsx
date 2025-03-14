import Footer from "../components/Footer"; // Import Footer

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">About the Author</h1>
          <p className="text-lg text-gray-300">
            Edinburgh Crowds is a solo project intended to act as a portfolio item and a minor income source. The Author's identity will be revealed when the project launches in April 2025.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}