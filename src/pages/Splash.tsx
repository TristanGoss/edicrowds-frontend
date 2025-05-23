import logo from "../assets/images/logo.svg";
import Footer from "../components/Footer";
import MailingListButton from "../components/MailingListButton";
import BackgroundImage from "../components/BackgroundImage";
import Navbar from "../components/Navbar";

export default function Splash() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundImage />
      <Navbar />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-white text-center p-8">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-5xl font-bold">Edinburgh Crowds</h1>
        <p className="mt-4 text-lg text-gray-300">Pedestrian density nowcasts for Edinburgh<br/>Launching Summer 2025</p>
      
        <MailingListButton />
      </div>
      <Footer />
    </div>
  );
}
