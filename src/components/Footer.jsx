export default function Footer() {
    return (
      <footer className="bg-black bg-opacity-80 text-gray-300 text-center p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-4">
          <a href="/how" className="hover:text-white">How this works</a>
          <a href="/about" className="hover:text-white">About the author</a>
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          info@edinburghcrowds.co.uk
        </div>
      </footer>
    );
  }