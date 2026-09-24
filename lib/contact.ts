export const CONTACT = {
  houseName: "IL BIONDO",
  atelierName: "IL BIONDO JORDAN",
  addressLine1: "Um Uthainah",
  addressLine2: "Amman, Jordan",
  hours: [
    { days: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
    { days: "Saturday", time: "10:00 AM – 6:00 PM" },
    { days: "Sunday", time: "By Appointment" },
  ],
  // Replace these with live atelier details before launch.
  phone: "",
  whatsapp: "",
  email: "",
  mapsUrl: "",
  instagramUrl: "https://www.instagram.com/",
  facebookUrl: "https://www.facebook.com/",
} as const;

export const APPOINTMENT_SERVICES = [
  "Made to Measure",
  "Bespoke",
  "Wedding Consultation",
  "Styling Consultation",
  "Fitting",
  "Other",
] as const;

export const APPOINTMENT_TIMES = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
] as const;
