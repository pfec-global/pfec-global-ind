// The city branch landing pages (/study-abroad-consultant-in-<city>/), all built from the same sections
// (src/components/branch/BranchPage.js). Everything that differs from one city to the next is here:
// to add a branch, copy an entry, change its details and add a page folder like the existing two.

export const branches = {
  ahmedabad: {
    city: "Ahmedabad",
    region: "Gujarat",
    language: "Gujarati",
    phone: "079 4090 3800",
    phoneHref: "tel:+917940903800",
    email: "ahmedabad@pfecglobal.com",
    // TODO: replace with the Ahmedabad office's WhatsApp link (https://wa.me/<number>)
    whatsappUrl: "#",
    addressLines: [
      "102, Mahalaya Complex, Chimanlal Girdharlal Rd, opp. Hotel President,",
      "Vasant Vihar, Navrangpura, Ahmedabad, Gujarat 380009",
    ],
    // What Google Maps searches for to drop its pin on the office
    mapQuery: "PFEC Global, 102 Mahalaya Complex, Chimanlal Girdharlal Rd, Navrangpura, Ahmedabad, Gujarat 380009",
    about: [
      "Ahmedabad has long been one of India's strongest sources of international students. Families here value global education, and many students already have relatives or friends studying in Canada, the UK, Australia or the USA. At PFEC Ahmedabad, we help you turn that ambition into a clear, realistic plan.",
      "Students from Ahmedabad and across Gujarat often choose courses that connect to the region's growing industries – Business and Management, Computer Science and IT, Data Science, Engineering, Pharmacy and Life Sciences, and Finance, a field gaining attention with the rise of GIFT City.",
      "Your journey starts with a free one-on-one counselling session at our office off C.G. Road. From there, we guide you through university shortlisting, applications, English test preparation, scholarships and visa documentation – then health insurance and accommodation before you fly.",
    ],
    // Office photos in public/images/branch/<galleryFolder>
    galleryFolder: "ahmedbad",
    photos: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    metadata: {
      title: "PFEC Global - Ahmedabad | Best Study Abroad Consultant in Ahmedabad",
      description:
        "Free expert guidance from your first counselling session to your visa – and support after you land. Trusted by 22,000+ students.",
    },
  },

  kolkata: {
    city: "Kolkata",
    region: "West Bengal",
    language: "Bengali",
    // The number and WhatsApp of the Kolkata page on pfecglobal.in
    phone: "+91 79803 55356",
    phoneHref: "tel:+917980355356",
    // TODO: no Kolkata email address is known yet - the email line is hidden until one is set here
    email: null,
    whatsappUrl: "https://wa.me/917980355356",
    addressLines: ["Landmark Building (Opp. of Minto Park Bus Stand), 9th Floor,", "228A, A.J.C Bose Road, Kolkata - 700020"],
    mapQuery: "PFEC Global, Landmark Building, 228A, A.J.C Bose Road, Kolkata 700020",
    about: [
      "Kolkata has long been one of India's strongest sources of international students. Families here value global education, and many students already have relatives or friends studying in Canada, the UK, Australia or the USA. At PFEC Kolkata, we help you turn that ambition into a clear, realistic plan.",
      "Students from Kolkata and across West Bengal often choose courses that connect to the region's growing industries – Business and Management, Computer Science and IT, Data Science, Engineering, Pharmacy and Life Sciences, and Finance.",
      "Your journey starts with a free one-on-one counselling session at our office on A.J.C Bose Road. From there, we guide you through university shortlisting, applications, English test preparation, scholarships and visa documentation – then health insurance and accommodation before you fly.",
    ],
    // TODO: photos of the Kolkata office - the Ahmedabad ones are shown until then
    galleryFolder: "ahmedbad",
    photos: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    metadata: {
      title: "PFEC Global - Kolkata | Best Study Abroad Consultant in Kolkata",
      description:
        "Free expert guidance from your first counselling session to your visa – and support after you land. Trusted by 22,000+ students.",
    },
  },
};
