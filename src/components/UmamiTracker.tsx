import { useEffect } from "react";

export default function UmamiTracker() {
  useEffect(() => {
    const websiteId: string = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    const umamiUrl = "https://cloud.umami.is/script.js";

    // track visitors to the live production build only
    if (!websiteId || window.location.hostname != "www.edinburghcrowds.co.uk") return;

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.dataset.websiteId = websiteId;
    script.src = umamiUrl;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}