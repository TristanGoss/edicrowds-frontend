import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-box">
        <div className="max-w-3xl">
          <h1 className="page-title">About Edinburgh Crowds</h1>
          <p className="text-block">
            Edinburgh Crowds is a solo project by {' '}<a href="https://www.linkedin.com/in/tristan-goss" className="no-wrap-link">Tristan Goss</a>,
            a software engineer specialising in sensor data processing.
            It is intended to act as a personal portfolio entry and (hopefully) a minor income source.
          </p>
          <p className="text-block">
            The project is partially open source, with all open-source components released under the 
            <span className="font-semibold text-white"> GPLv3 license</span>. The open source components are
            {' '}<a href="https://github.com/TristanGoss/edicrowds-frontend" className="no-wrap-link">edicrowds-frontend</a> and 
            {' '}<a href="https://github.com/TristanGoss/edicrowds-backend" className="no-wrap-link">edicrowds-backend</a>.
            The data warehouse, nowcasting algorithm and possibly some input processors will be closed source.
            The backend repo can still be used without these, but it will return dummy nowcasts.
          </p>
          <h2 className="section-title">Who is this for?</h2>
          <p className="text-block">
            Edinburgh Crowds is primarily for Tourists visiting Edinburgh who would like to avoid the substantial crowds within the city.
            As the service matures, it may pick up other customers in terms of researchers, companies and other third parties who would like access to the data warehouse, but these are not a priority early on.
          </p>
          <h2 className="section-title">Competing services</h2>
          <p className="text-block">
            The main alternative to Edinburgh Crowds is Google Maps. Google Maps offers warnings of when an area is more busy or less busy than usual, and shows patterns of busyness for individual
            addresses and even public transport infrastructure.
          </p>
          <p className="text-block">
            However, Google Maps does not provide absolute measures of crowd density, and relies entirely on mobile phone trajectory
            data rather than incorporating the shedules of Theatres, Stadiums, Concert halls and other events that have a dramatic impact on how crowded certain areas of the city are.
            For these reasons, we believe Edinburgh Crowds can improve upon the service offered by Google.
          </p>
          <h2 className="section-title">Monetisation</h2>
          <p className="text-block">
            We plan to offer nowcasts for free. Customers must purchase forecasts and access to historical data for £2.49 for one week of access.
            We believe this will result in a service that pays for its own hosting, and returns a minor supplimentary income to the author.
            Monetisation is not a priority for the project, so will be added after the service is functional.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}