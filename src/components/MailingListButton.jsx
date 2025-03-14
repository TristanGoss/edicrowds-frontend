export default function MailingListButton() {
    const mailingListGoogleFormUrl = "https://forms.gle/VwFTQffoqqRpnT8R8";
  
    return (
      <div className="flex justify-center mt-4">
        <a
          href={mailingListGoogleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition"
        >
          Join the Mailing List
        </a>
      </div>
    );
  }
  