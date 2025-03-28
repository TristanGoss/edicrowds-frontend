export default function MailingListButton() {
    const mailingListGoogleFormUrl = "https://forms.gle/VwFTQffoqqRpnT8R8";
  
    return (
      <div className="flex justify-center mt-4">
        <a
          href={mailingListGoogleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-button px-6 py-3 rounded-lg text-lg"
        >
          Join the Mailing List
        </a>
      </div>
    );
  }
  