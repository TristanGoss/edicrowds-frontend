import Footer from "../components/Footer"; 

export default function How() {
  return (
    <div className="page-container">
      <div className="content-box">
        <div className="max-w-3xl">
          <h1 className="page-title">How This Works</h1>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}