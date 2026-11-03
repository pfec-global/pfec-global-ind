// Every country with its offices. To add a country, add one more entry here:
// a tab, its flag and its office cards appear on their own.
// flag is a round picture in public/images/flags. buttonText (optional) replaces "Schedule a Virtual Meeting".
// map: true adds a "Get Location on Google Map" link to the office address.
// The same list gives the flag row in the footer, in this order.
export const officeCountries = [
  {
    id: "india",
    name: "India",
    flag: "/images/flags/india.svg",
    offices: [
      {
        city: "Kolkata",
        address:
          "Landmark Building (Opp. of Minto Park Bus Stand), 9th Floor, 228A, A.J.C Bose Road, Kolkata - 700020",
        phone: "+91 98 3693 4948",
      },
      {
        city: "Ahmedabad",
        address:
          "Unit No. 102, First Floor, Mahalaxya Building, Chimanlal Girdharlal Rd, Ahmedabad, Gujarat 380009",
        phone: "+91 79 4090 3800",
      },
    ],
  },
  {
    id: "australia",
    name: "Australia",
    flag: "/images/flags/australia.png",
    buttonText: "Book an Appointment",
    offices: [
      {
        city: "Sydney",
        address:
          "Suite 402, Level 4/447 Kent St, Sydney NSW 2000, Australia",
        phone: "+61 2 8378 4282",
        map: true,
      },
      {
        city: "Melbourne",
        address:
          "11/50 Queen St, Melbourne VIC 3000, Australia",
        phone: "+61 3 9620 1773",
        map: true,
      },
      {
        city: "Adelaide",
        address:
          "Level M/90 King William St, Adelaide SA 5000, Australia",
        phone: "+61 8 7099 2258",
        map: true,
      },
      {
        city: "Perth",
        address:
          "Suite A, Level 8th/16 St Georges Terrace, Perth WA 6000, Australia",
        phone: "+61 8 6266 8335",
      },
      {
        city: "Brisbane",
        address:
          "Level 18/324 Queen St, Brisbane City QLD 4000, Australia",
        phone: "+61 7 3102 1707",
        map: true,
      },
      {
        city: "Lakemba",
        address:
          "13/61-67 Haldon St, Lakemba NSW 2195, Australia",
        phone: "+61 2 8378 4282",
        map: true,
      },
    ],
  },
  {
    id: "bangladesh",
    name: "Bangladesh",
    flag: "/images/flags/bangladesh.svg",
    offices: [
      {
        city: "Dhanmondi",
        address:
          "SIMA Blossom (5th Floor) Plot 390 (Old), 03 (New), Road-27 (Old) 16, New, Dhaka 1209, Bangladesh",
        phone: "+880 9609 80 03 00",
      },
      {
        city: "Banani",
        address:
          "RSR Tower (7th Floor), House no. 50, Block C, Rd No. 11, Banani, Dhaka 1213",
        phone: "+880 9609 80 07 00",
      },
      {
        city: "Chattogram",
        address:
          "5th floor, Equity Centrum, O R Nizam Road, GEC Circle, Chattogram",
        phone: "+880 9609 80 04 00",
      },
      {
        city: "Uttara",
        address:
          "Level 8, RM Plaza, 20 Sonargaon Jonopath Road, Sector 11, Dhaka 1230",
        phone: "+880 9609 80 05 00",
      },
    ],
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    flag: "/images/flags/sri-lanka.svg",
    offices: [
      {
        city: "Colombo",
        address:
          "PFEC Global, 2nd Floor, 72C Bauddhaloka Mawatha, Colombo 04 (Irish Consulate Building)",
        phone: "+94 77 734 3234",
      },
    ],
  },
];
