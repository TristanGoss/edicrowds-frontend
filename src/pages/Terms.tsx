import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function TermsOfService() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-box">
        <div className="max-w-3xl">
          <h1 className="page-title">Terms of Service</h1>
          <p className="text-block">
            Edinburgh Crowds offers nowcasts and forecasts of pedestrian density within central Edinburgh, and services derived from that information.
            This service is designed to provide general insight and is not intended for navigation, safety-critical applications, or emergency use.
          </p>
          <p className="text-block">
            While we strive to provide accurate, up-to-date data with well-characterised uncertainty, Edinburgh Crowds makes no guarantees about the precision
            or reliability of any predictions or live data. Density estimates are generated using models based on public data sources,
            and may not reflect current conditions.
          </p>
          <p className="text-block">
            Edinburgh Crowds shall not be held liable for any direct, indirect, incidental, or consequential damages arising from use of the site
            or reliance on its data, including but not limited to missed appointments, safety incidents, or business losses.
          </p>
          <p className="text-block">
            Users may access and view the site for personal, non-commercial use. Automated scraping, redistribution of data,
            or use in high-risk environments (e.g., crowd control systems, security planning) without prior written consent is prohibited.
            To discuss commercial use of the data, please email info@edinburghcrowds.co.uk.
          </p>
          <p className="text-block">
            All content on this site, including the pedestrian density maps, models, code, and branding, is owned by Edinburgh Crowds
            and may not be copied, modified, or republished without written permission, except for those components included within public
            GitHub repositories, which are released under the GPLv3.
          </p>
          <p className="text-block">
            Users may not attempt to interfere with the normal operation of the site, probe for vulnerabilities,
            or use the site in a way that degrades performance for others.
          </p>
          <p className="text-block">
            These Terms shall be governed by the laws of the United Kingdom of Great Britain and Northern Ireland. Edinburgh Crowds reserves
            the right to modify these Terms at any time. Continued use of the service constitutes acceptance of any updated terms.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}