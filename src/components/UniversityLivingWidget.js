"use client";

import { useEffect, useRef } from "react";

// University Living's property search, embedded on the /university-living/ page.
// Their script finds the #root-ul box when it runs, reads the data-* settings on it and draws its own search app
// inside. So the script is added every time this component appears - also after moving here from another page
// of the site, when the browser does not load a new page - and removed again when the visitor leaves.
// The widget's own styles that need changing for this site are in globals.css (#root-ul).
const WIDGET_SCRIPT = "https://d3hk5c2fo9op52.cloudfront.net/widget.js";

export default function UniversityLivingWidget({
  widgetId = "65afa1010999707bae52f1d4",
  city = "london", // the city its search starts with
  primaryColor = "#111",
  fontColor = "#333",
  iconColor = "#111",
}) {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
      // Clears what the widget drew, so coming back to the page starts it fresh
      if (box) box.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      id="root-ul"
      data-widgetid={widgetId}
      data-city={city}
      data-primarycolor={primaryColor}
      data-fontcolor={fontColor}
      data-iconcolor={iconColor}
      // While the script loads: keeps room for the widget so the footer does not jump up and down
      className="min-h-[70vh]"
    />
  );
}
