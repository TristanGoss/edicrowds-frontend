import Footer from "../components/Footer"; 
import Navbar from "../components/Navbar";
import MapDisplay from "../components/MapDisplay";

export default function Preview() {
  return (
    <div className="page-container h-screen">
    {/* h-screen is essential here so that the map can fill the rest */}
    <Navbar />
      <div className="flex items-center justify-center px-4 py-4 text-center">
        {/* similarly, we need a variant on content-box here*/}
        <div className="max-w-3xl">
          <h1 className="page-title">Preview</h1>
          <p className="text-block">
            This is an early preview of the Edinburgh Crowds interface,
            containing a live nowcast generated from an old model iteration.
            As we have very few users, nowcasts are currently generated on demand.
            That means if you're the first person to access the page in a while, it
            can take a few tens of seconds to load.
          </p>
        </div>
      </div>
      {/* The map should take up the full remaining height */}
      <MapDisplay />
      <Footer />
    </div>
  );
}