// ---- DATA -------------------------------------------------------------
// Photos go in the "images" folder. Names below must match your files.

// Local photos load instantly. If a local file is missing, the site falls back to the official MIET link.
var EVENT_IMG_BASE = 'https://miet.ac.in/images/newimages/';

var HERO_IMAGES = [
  { local: 'images/kolaahal.webp',  remote: EVENT_IMG_BASE + 'kolaahal.webp' },
  { local: 'images/rangotsav.webp', remote: EVENT_IMG_BASE + 'rangotsav.webp' },
  { local: 'images/diwali.webp',    remote: EVENT_IMG_BASE + 'diwali_mela.webp' }
];

// Notices ticker - taken from the notices listed on miet.ac.in
var NOTICES = [
  { text: 'ICCISCS-2026 (Technical Co-Sponsored by IEEE UP)', url: 'https://miet.ac.in/icciscs-2026/' },
  { text: 'BAISBE-2026', url: 'https://miet.ac.in/media_image/baisbe-2026.pdf' },
  { text: 'M.Tech. & M.Pharma Admission 2026-27', url: 'https://miet.ac.in/media_image/MIET_MTech_MPharm_Admissions_2026_27_HQ.pdf' },
  { text: 'Special Counseling (Spot) UG', url: 'https://miet.ac.in/media_image/SPOT_COUNSELLING_UG_COURSE.pdf' },
  { text: 'Admissions Open 2026', url: 'https://miet.ac.in/online-registration.php' }
];

var WHY = [
  { icon: '\uD83D\uDDC2\uFE0F', title: 'One Directory', text: 'Businesses, events and clubs in a single searchable place.' },
  { icon: '\uD83C\uDFEB', title: 'Real Campus Data', text: 'Club details collected from the official MIET website.' },
  { icon: '\uD83D\uDE80', title: 'Student Entrepreneurs', text: 'Give small student businesses a proper stage.' },
  { icon: '\uD83D\uDD0D', title: 'Instant Search', text: 'Type once and filter services, events and clubs live.' },
  { icon: '\uD83D\uDCF1', title: 'Mobile Friendly', text: 'Built to work on a phone as well as a laptop.' },
  { icon: '\uD83E\uDDD1\u200D\uD83D\uDCBB', title: 'Built by Students', text: 'Made by MIET students, for MIET students.' }
];

var SERVICES = [
  { id: 1, name: "Priya's Tuition Classes", category: "Tuition", desc: "Maths & Physics, 1st & 2nd year B.Tech.", contact: "priya@example.com" },
  { id: 2, name: "HomeBake by Anjali", category: "Food", desc: "Homemade cakes, cookies, tiffin on order.", contact: "9876500000" },
  { id: 3, name: "PrintPoint Hostel Block C", category: "Printing", desc: "Same-day printouts, spiral binding.", contact: "Room 214, Block C" },
  { id: 4, name: "Frame & Focus", category: "Photography", desc: "Event & portrait photography, student rates.", contact: "frame.focus@example.com" },
  { id: 5, name: "SecondHand Shelf", category: "Books", desc: "Buy/sell used engineering textbooks.", contact: "secondhand@example.com" },
  { id: 6, name: "Stitch It Up", category: "Tailoring", desc: "Uniform alterations, quick turnaround.", contact: "Hostel Gate 2" }
];

// Event names are the ones shown on miet.ac.in. Add photos if you have them.
var EVENTS = [
  { id: 1, name: "Kolaahal", emoji: "\uD83C\uDFAD", img: "images/kolaahal.webp", imgBackup: EVENT_IMG_BASE + "kolaahal.webp", venue: "Main Auditorium", desc: "The annual cultural fest of MIET." },
  { id: 2, name: "Dandia Night", emoji: "\uD83E\uDE98", img: "images/dandia.webp", imgBackup: EVENT_IMG_BASE + "event1.webp", venue: "Open Ground", desc: "Garba and Dandia celebration." },
  { id: 3, name: "Diwali Mela", emoji: "\uD83E\uDE94", img: "images/diwali.webp", imgBackup: EVENT_IMG_BASE + "diwali_mela.webp", venue: "Campus Square", desc: "Stalls, food and festivities." },
  { id: 4, name: "Rangotsav", emoji: "\uD83C\uDFA8", img: "images/rangotsav.webp", imgBackup: EVENT_IMG_BASE + "rangotsav.webp", venue: "Main Auditorium", desc: "Colour and culture festival." }
];

// Dates as listed on miet.ac.in (year taken as 2026 from the event names)
var UPCOMING = [
  { start: '2026-08-21', end: '2026-08-23', day: '21-23', mon: 'Aug', name: 'BAISBE-2026', by: 'Department of Biotechnology', url: 'https://miet.ac.in/media_image/baisbe-2026.pdf' },
  { start: '2026-12-04', end: '2026-12-04', day: '4', mon: 'Dec', name: 'ICCISCS-2026', by: 'Department of CSE, IT & Allied Branches', url: 'https://miet.ac.in/icciscs-2026/' }
];

// Real data - MIET Meerut, source: https://miet.ac.in/clubs-societies.php
var CLUBS = [
  { name: "ABHIVYAKTI", convener: "Snowey (EE IV Yr), Vanshika (ME IV Yr)", faculty: "Ms Preeti (EE), Ms Khushboo (ME)" },
  { name: "SWARANG", convener: "Sarthak (CS-IoT IV Yr), Mayank Singh (CSE IV Yr)", faculty: "Mr Amit Saini (ECE), Dr. Nitin Verma (BT)" },
  { name: "SANSKRITI", convener: "Mayank Singh (CSE IV Yr), Ashutosh (CSE IV Yr)", faculty: "Ms. Nitika Vats (BT), Dr. Nikesh (CH)" },
  { name: "AHIMSA", convener: "Vishal Yadav (B.Ph. IV Yr), Ishi Goyal (CSE AIML IV Yr)", faculty: "Dr. Madhur Dubey (ME), Mr. Rahul Shivhare (IT)" },
  { name: "ODYSSEY", convener: "Shivam Jain (ECE IV Yr), Yash Jain (BT IV Yr)", faculty: "Mr. Meharban Ali (CSE), Mr. Honey Tyagi (AS)" },
  { name: "PARIVARTAN", convener: "Pradeep (IT IV Yr)", faculty: "Dr. Swapan Suman (ME)" },
  { name: "LAND OF ARTS", convener: "Sukirti (CSE IV Yr), Vineet (IT III Yr)", faculty: "Dr. Avinash (BT), Ms. Priyanka Sharma (MBA)" },
  { name: "Standard Club", convener: "Prayshi Agarwal (CSE III Yr)", faculty: "Ms Khushboo (ME)" },
  { name: "Electoral Club", convener: "Pankaj Singh (ECE IV Yr)", faculty: "Mr. Suraj Sharma (ECE)" }
];