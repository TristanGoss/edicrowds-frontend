import Footer from "../components/Footer"; 

export default function How() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">How This Works</h1>
          <p className="prose prose-invert text-gray-300 max-w-3xl">
            Edinburgh Crowds draws upon a range of publicly available and crowd-sourced information describing 
            the pedestrian density in Edinburgh. This information is ingested into a data warehouse.
            We then use a physics-based crowd flow model together with predictive analytics to produce
            nowcasts and forecasts of pedestrian density within non-residential areas of the city.
          </p>

          {/* Sources Section */}
          <h2 className="text-4xl font-bold mt-10 mb-4">Sources</h2>
          <p className="prose prose-invert text-gray-300 max-w-3xl">
            Our data sources are crucial to the accuracy of our predictions. At launch, our sources will be:
          </p>
          <ul className="mt-6 prose prose-invert text-gray-300 max-w-3xl space-y-4 text-left">
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              <a href="https://uktraffic.live/scotland/edinburgh/" className="text-blue-400 hover:underline">Traffic camera feeds from the Edinburgh Ringroad</a>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              <a href="https://www.metoffice.gov.uk/services/data" className="text-blue-400 hover:underline">MetOffice Weather Data</a>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span> 
              <a href="https://edintraveldata.drakewell.com/" className="text-blue-400 hover:underline">The Edintraveldata Public Multinode Map</a>
            </li>
          </ul>

          <p className="prose prose-invert text-gray-300 max-w-3xl mt-6">
            After launch, we plan to integrate additional sources covering events that significantly impact 
            Edinburgh, including the schedules for theatres, concert halls, nightclubs, and stadiums.
            Edinburgh Crowds does not have access to Edinburgh's CCTV network, nor do we have access to 
            phone trajectory data. We believe that it is possible to produce an accurate nowcast without 
            these invasive and difficult-to-access sources.
          </p> 

          {/* Validation and Crowdsourcing Section */}
          <h2 className="text-4xl font-bold mt-10 mb-4">Validation And Crowdsourcing</h2>
          <p className="prose prose-invert text-gray-300 max-w-3xl">
            The predictions made by Edinburgh Crowds will be validated against real-world measurements made 
            using computer vision techniques applied to timestamped and geo-registered photographs of 
            Edinburgh's streets. Initially, these photographs will be taken by the Author. Later on in 
            development, we will explore the possibility of allowing others to provide validation data in the same manner.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}