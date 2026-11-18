// The offices on the world map (OfficeMap.js, in the "Our Achievements" section).
// (The office addresses of the Contact us page and the footer are a separate list: officeCountries in offices.js.)
//
// To add a country, add one line here - its pin and label appear on the map by themselves:
//   { country: "Nepal", count: 2 },
// The country must be in the `countries` list below (it gives the pin's place and the flag).
// For a country that is not in the list, give its place yourself (look it up on Google Maps):
//   { country: "Fiji", count: 1, lat: -17.7, lng: 178.1, flag: "/images/flags/fiji.png" },
//
// side (optional) is where the label sits next to the pin: "right" (default), "left", "below",
// "left-up" or "left-down". Change it when two labels are too close and cover each other.
export const offices = [
  { country: "India", count: 5, side: "left-up" },
  { country: "Bangladesh", count: 4 },
  { country: "Sri Lanka", count: 1, side: "left-down" },
  { country: "Indonesia", count: 1 },
  { country: "Australia", count: 7, side: "below" },
];

// Where each country is (lat / lng of a point inside it - its capital or middle) and its flag, when there is one
// in public/images/flags. Add a line here to make a new country available.
export const countries = {
  // South Asia
  India: { lat: 22.5, lng: 78.9, flag: "/images/flags/india.svg" },
  Bangladesh: { lat: 23.8, lng: 90.4, flag: "/images/flags/bangladesh.svg" },
  "Sri Lanka": { lat: 7.8, lng: 80.7, flag: "/images/flags/sri-lanka.svg" },
  Nepal: { lat: 28.2, lng: 84.0 },
  Pakistan: { lat: 30.4, lng: 69.3 },
  Bhutan: { lat: 27.5, lng: 90.4 },
  Maldives: { lat: 3.2, lng: 73.2 },
  // South-East and East Asia
  Indonesia: { lat: -6.2, lng: 106.8, flag: "/images/flags/indonesia.svg" },
  Malaysia: { lat: 4.2, lng: 101.9, flag: "/images/flags/malaysia.png" },
  Singapore: { lat: 1.35, lng: 103.8, flag: "/images/flags/singapore.svg" },
  Thailand: { lat: 15.9, lng: 100.9 },
  Vietnam: { lat: 14.1, lng: 108.3 },
  Cambodia: { lat: 12.6, lng: 104.9 },
  Myanmar: { lat: 21.9, lng: 95.9 },
  Philippines: { lat: 12.9, lng: 121.8 },
  China: { lat: 35.9, lng: 104.2 },
  "Hong Kong": { lat: 22.3, lng: 114.2 },
  Japan: { lat: 36.2, lng: 138.3, flag: "/images/flags/japan.svg" },
  "South Korea": { lat: 35.9, lng: 127.8 },
  Mongolia: { lat: 46.9, lng: 103.8 },
  // Oceania
  Australia: { lat: -25.3, lng: 133.8, flag: "/images/flags/australia.png" },
  "New Zealand": { lat: -40.9, lng: 174.9, flag: "/images/flags/new-zealand.png" },
  "Papua New Guinea": { lat: -6.3, lng: 143.9 },
  Fiji: { lat: -17.7, lng: 178.1 },
  // Middle East and Central Asia
  "United Arab Emirates": { lat: 23.4, lng: 53.8, flag: "/images/flags/dubai.png" },
  Dubai: { lat: 25.2, lng: 55.3, flag: "/images/flags/dubai.png" },
  "Saudi Arabia": { lat: 23.9, lng: 45.1 },
  Qatar: { lat: 25.35, lng: 51.2 },
  Oman: { lat: 21.5, lng: 55.9 },
  Kuwait: { lat: 29.3, lng: 47.5 },
  Iran: { lat: 32.4, lng: 53.7 },
  Turkey: { lat: 39.0, lng: 35.2 },
  Uzbekistan: { lat: 41.4, lng: 64.6 },
  Kazakhstan: { lat: 48.0, lng: 66.9 },
  // Africa
  Egypt: { lat: 26.8, lng: 30.8 },
  Nigeria: { lat: 9.1, lng: 8.7 },
  Ghana: { lat: 7.9, lng: -1.0 },
  Kenya: { lat: 0.0, lng: 37.9 },
  Ethiopia: { lat: 9.1, lng: 40.5 },
  Tanzania: { lat: -6.4, lng: 34.9 },
  Zimbabwe: { lat: -19.0, lng: 29.2 },
  "South Africa": { lat: -30.6, lng: 22.9 },
  // Europe
  "United Kingdom": { lat: 52.5, lng: -1.5, flag: "/images/flags/uk.png" },
  UK: { lat: 52.5, lng: -1.5, flag: "/images/flags/uk.png" },
  Ireland: { lat: 53.4, lng: -8.2, flag: "/images/flags/ireland.png" },
  Germany: { lat: 51.2, lng: 10.5, flag: "/images/flags/germany.png" },
  France: { lat: 46.2, lng: 2.2 },
  Netherlands: { lat: 52.1, lng: 5.3 },
  // Americas
  Canada: { lat: 50.0, lng: -100.0, flag: "/images/flags/canada.png" },
  USA: { lat: 39.8, lng: -98.6, flag: "/images/flags/usa.png" },
  "United States": { lat: 39.8, lng: -98.6, flag: "/images/flags/usa.png" },
  Mexico: { lat: 23.6, lng: -102.6 },
  Brazil: { lat: -14.2, lng: -51.9 },
};
