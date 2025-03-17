import Footer from "../components/Footer"; 
import MapDisplay from "../components/MapDisplay";

export default function Preview() {
  return (
    <div className="page-container">
      <div className="content-box">
        <div className="max-w-3xl">
          <h1 className="page-title">Preview</h1>
          <p className="text-block">
            This is an early preview of the Edinburgh Crowds interface. <br/> Please Note that none of the data within this preview is accurate!
          </p>
        </div>
      </div>
      <MapDisplay />
      <Footer />
    </div>
  );
}