import Footer from "../components/Footer"; 
import Navbar from "../components/Navbar";

export default function How() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-box">
        <div className="max-w-3xl">
          <h1 className="page-title">How It Works</h1>
          <p className="text-block">
            Edinburgh Crowds draws upon a range of publicly available and crowdsourced information influencing 
            pedestrian density in Edinburgh. This information is periodically ingested into a data warehouse.
            A physics-based crowd flow model is used together with predictive analytics to produce
            nowcasts and forecasts of pedestrian density within non-residential areas of the city.
          </p>

          <h2 className="section-title">Sources</h2>
          <p className="text-block">
            Our data sources are crucial to the accuracy of our predictions. At launch, our sources will be
            {' '}<a href="https://uktraffic.live/scotland/edinburgh/" className="no-wrap-link">Traffic camera feeds from the Edinburgh Ringroad</a>, 
            {' '}<a href="https://www.metoffice.gov.uk/services/data" className="no-wrap-link">MetOffice Weather Data</a>,
            {' '}<a href="https://edintraveldata.drakewell.com/" className="no-wrap-link">The Edintraveldata Public Multinode Map</a> and
            {' '}<a href="https://allevents.in/edinburgh/murrayfield%20stadium" className="no-wrap-link">The Murrayfield Stadium Events Schedule</a>.
          </p>
          <p className="text-block">
            After launch, we plan to integrate additional sources covering events that significantly impact 
            Edinburgh, including the schedules for theatres, concert halls, nightclubs, and other stadiums.
          </p>
          <p className="text-block">
            Edinburgh Crowds does not have access to Edinburgh's CCTV network or to large scale 
            phone trajectory data. We believe that it is possible to produce an accurate nowcast without 
            these invasive and difficult-to-access sources.
          </p>

          <h2 className="section-title">Splitting Up The City</h2>
          <p className="text-block">
            There are a great many ways to subdivide the City of Edinburgh. We have opted to use the 2022 National Census Output Areas (OAs).
            These OAs provide a contiguous, non-overlapping subdivision of Edinburgh into areas of roughly equal population.
          </p>
          <p className="text-block">
            Using Census OAs has the downside of presenting us with a fine subdivision over some densely populated areas that we are not
            interested in for privacy reasons, and a coarser subdivision over non-residential areas that we are very much interested in
            (like New Town). To mitigate this, we have ignored OAs larger than 3.5 square kilometers and those roughly outside
            the City of Edinburgh Bypass, resulting in a total of 4,151 OAs considered. We aim to subdivide some particularly interesting
            OAs, but this is not high priority within the project.
          </p>
          <p className="text-block">
            For privacy reasons, we will not publish nowcasts for residential OAs. We define an OA as residential if, according to OpenStreetMap,
            it does not contain any shops, restaurants, nightclubs, bars, pubs, schools, universities, town halls, community centres,
            industrial works, offices, hospitals, railway stations or tourist destinations.
          </p>
          <p className="text-block">
            We further define any residential OAs that are wholly surrounded
            by non-residential OAs as non-residential (these tend to be islands of dense population within the centre of town).
            This results in 2,613 OAs being classed as residential, and the remaining 1,538 OAs within the specified region
            classed as candidate nowcast regions.
          </p>

          <h2 className="section-title">Validation And Crowdsourcing</h2>
          <p className="text-block">
            The predictions made by Edinburgh Crowds will be validated against real-world measurements.
            We'll make these measurements by applying computer vision techniques to timestamped and geo-registered photographs of 
            Edinburgh's streets. For data protection, these photographs will be processed and discarded, never stored.
            Initially, these photographs will be taken by the Author. Later on in 
            development, we will enable others to provide validation data in the same manner.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}