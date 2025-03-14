import Footer from "../components/Footer"; // Import Footer

export default function How() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">How this works</h1>
          <p className="text-lg text-gray-300">
            Edinburgh Crowds draws upon a range of publically available and crowd-sourced information describing the pedestrial density in Edinburgh.
            This information is ingested into a data warehouse and used to produce hourly nowcasts and forecasts of pedestrian density within non-residential areas of the city.
            We use physics-based crowd flow models together with predictive analytics to integrate information from our sources.
          </p>
          <h1 className="text-4xl font-bold mb-4">Sources</h1>
          <p className="text-lg text-gray-300">
            At launch, our sources will be:
            <ul>
              <li><a href="https://uktraffic.live/scotland/edinburgh/">Traffic camera feeds from the Edinburgh Ringroad</a></li>
              <li><a href="https://www.metoffice.gov.uk/services/data">MetOffice Weather data</a></li>
              <li><a href="https://edintraveldata.drakewell.com/">The Edintraveldata public Multinode map</a></li>
            </ul>
          </p>
          <p className="text-lg text-gray-300">
            After launch, we plan to integrate additional sources covering events that significantly impact Edinburgh, including the schedules for Theatres, Concert Halls, Nightclubs and Stadiums.
            Edinburgh Crowds does not have access to Edinburgh's CCTV network, nor do we have access to phone trajectory data. We believe that it is possible to produce an accurate nowcast without these invasive and difficult-to-access sources.
          </p> 
          <h1 className="text-4xl font-bold mb-4">Validation and Crowdsourcing</h1>
          <p className="text-lg text-gray-300">
            The predictions made by Edinburgh Crowds will be validated against real-world measurements made using computer vision techniques applied to timestamped and georegistered photographs of Edinburgh's streets.
            Initially, these photographs will be taken by the Author.
            Later on in development, we will explore the possibility of allowing others to provide validation data in the same manner.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}