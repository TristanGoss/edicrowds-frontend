import Footer from "../components/Footer"; 
import MapDisplay from "../components/MapDisplay";

export default function Preview() {
  return (
    <div className="page-container h-screen">
    {/* h-screen is essential here so that the map can fill the rest */}
      <div className="flex items-center justify-center px-4 py-4 text-center">
        {/* similarly, we need a variant on content-box here*/}
        <div className="max-w-3xl">
          <h1 className="page-title">Preview</h1>
          <p className="text-block">
            This is an early preview of the Edinburgh Crowds interface. <br /> 
            Please note that none of the data within this preview is accurate!
          </p>
        </div>
      </div>

      {/* The map should take up the full remaining height */}
      <MapDisplay />

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
}