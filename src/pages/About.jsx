import Footer from "../components/Footer"; 

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">About Edinburgh Crowds</h1>
          <p className="prose prose-invert text-gray-300 max-w-3xl">
            Edinburgh Crowds is a solo project intended to act as a portfolio item and a minor income source. 
            The Author's identity will be revealed when the project launches in April 2025.
          </p>
          <p className="prose prose-invert text-gray-300 max-w-3xl mt-6">
            The project will be partially open source, with all open-source components released under the 
            <span className="font-semibold text-white"> GPLv3 license</span>.
            The data warehouse, nowcasting algorithm and some input processors will be closed source.
          </p>          
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}