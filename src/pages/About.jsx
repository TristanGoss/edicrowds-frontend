import Footer from "../components/Footer"; 

export default function About() {
  return (
    <div className="page-container">
      {/* Content */}
      <div className="content-box">
        <div className="max-w-3xl">
          <h1 className="page-title">About Edinburgh Crowds</h1>
          <p className="text-block">
            Edinburgh Crowds is a solo project by a full-stack sensor data processing specialist. It is intended to act as a personal portfolio entry and a minor income source. 
            The Author's identity will be revealed when the project launches in Summer 2025.
          </p>
          <p className="text-block mt-6">
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