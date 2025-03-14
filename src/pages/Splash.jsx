import logo from '../assets/images/logo.svg';
import Footer from '../components/Footer'

export default function Splash() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: "url('/edinburghCrowds.jpg')" }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 -z-10"></div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-white text-center p-8">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-5xl font-bold">Edinburgh Crowds</h1>
        <p className="mt-4 text-lg text-gray-300">Pedestrian density nowcasts for Edinburgh</p>
      </div>

      <Footer />
    </div>
  );
}
