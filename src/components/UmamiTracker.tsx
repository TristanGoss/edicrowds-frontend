import { useEffect } from "react";

export default function UmamiTracker() {
  useEffect(() => {
    // track visitors for production only
    if (import.meta.env.MODE !== "production") return;

    const websiteId: string = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    const umamiUrl = "https://cloud.umami.is/script.js";

    if (!websiteId) return;

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