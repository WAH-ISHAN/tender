"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toaster";

export type Language = "en" | "si" | "ta";

interface Translations {
  [key: string]: {
    en: string;
    si: string;
    ta: string;
  };
}

export const DICTIONARY: Translations = {
  // Brand & Subtitle
  brandSubtitle: {
    en: "Sri Lanka National Procurement",
    si: "ශ්‍රී ලංකා ජාතික ප්‍රසම්පාදන ද්වාරය",
    ta: "இலங்கை தேசிய கொள்முதல் தளம்",
  },

  // Navbar Links
  navCatalogue: {
    en: "Catalogue",
    si: "ටෙන්ඩර් නාමාවලිය",
    ta: "டெண்டர் பட்டியல்",
  },
  navPlans: {
    en: "Plans & Bank Claim",
    si: "ගාස්තු හා බැංකු තහවුරු",
    ta: "திட்டங்கள் & வங்கி கோரிக்கை",
  },
  navHowItWorks: {
    en: "How It Works",
    si: "ක්‍රියාකාරීත්වය",
    ta: "செயல்படும் முறை",
  },
  navAbout: {
    en: "About",
    si: "අප ගැන",
    ta: "எங்களைப் பற்றி",
  },
  navContact: {
    en: "Contact",
    si: "සම්බන්ධ වන්න",
    ta: "தொடர்பු கொள்ள",
  },
  navBidderLogin: {
    en: "Bidder Login",
    si: "ලියාපදිංචි පිවිසුම",
    ta: "ஏலதாரர் உள்நுழைவு",
  },
  navCompanyWorkspace: {
    en: "Company Workspace",
    si: "ආයතනික ද්වාරය",
    ta: "நிறுவன போர்டல்",
  },
  navWorkspacePortal: {
    en: "Workspace Portal",
    si: "සේවා අවකාශය",
    ta: "பணி போர்டல்",
  },

  // Homepage Hero
  heroSubtitle: {
    en: "SRI LANKA NATIONAL PROCUREMENT GATEWAY",
    si: "ශ්‍රී ලංකා ජාතික ප්‍රසම්පාදන තොරතුරු පද්ධතිය",
    ta: "இலங்கை தேசிய கொள்முதல் தகவல் தளம்",
  },
  heroTitle: {
    en: "TENDERS IN SRI LANKA",
    si: "ශ්‍රී ලංකාවේ සියලුම ටෙන්ඩර් නිවේදන",
    ta: "இலங்கையின் அனைத்து டெண்டர் அறிவிப்புகள்",
  },
  heroDesc: {
    en: "Official government gazettes, ministry RFPs, provincial notices, and corporate tenders published across all 9 provinces in Sri Lanka. Verified daily at 05:00 AM directly from official government sources.",
    si: "දිවයිනේ සියලුම පළාත් 9 ම ආවරණය වන පරිදි රජයේ නිල ගැසට් නිවේදන, අමාත්‍යාංශ, පළාත් සභා හා සංස්ථා ටෙන්ඩර් දිනපතා උදෑසන 05:00 ට සෘජුවම නිල මූලාශ්‍ර මඟින් තහවුරු කර ප්‍රකාශයට පත් කෙරේ.",
    ta: "இலங்கையின் 9 மாகாணங்களையும் உள்ளடக்கிய அரசாங்க வர்த்தமானி மற்றும் பொதுத்துறை கொள்முதல் டெண்டர்கள் தினமும் காலை 05:00 மணிக்கு அதிகாரப்பூர்வமாக சரிபார்க்கப்பட்டு வெளியிடப்படுகின்றன.",
  },

  // Search & Filters Inside Hero
  searchPlaceholder: {
    en: "Type Your Keyword Here",
    si: "ටෙන්ඩර් මාතෘකාව, ආයතනය, අංකය හෝ විස්තරය සොයන්න...",
    ta: "டெண்டர் தலைப்பு, நிறுவனம் அல்லது குறிப்பு எண்ணை தேடுங்கள்...",
  },
  searchBtn: {
    en: "Search",
    si: "සොයන්න",
    ta: "தேடுங்கள்",
  },
  resetBtn: {
    en: "Reset",
    si: "මුල සිට",
    ta: "மீட்டமை",
  },
  categoryLabel: {
    en: "CATEGORY",
    si: "කාණ්ඩය",
    ta: "வகை",
  },
  provinceLabel: {
    en: "PROVINCE",
    si: "පළාත",
    ta: "மாகாணம்",
  },
  valueBandLabel: {
    en: "VALUE BAND",
    si: "ඇස්තමේන්තු වටිනාකම",
    ta: "மதிப்பு வரம்பு",
  },
  deadlineLabel: {
    en: "DEADLINE WINDOW",
    si: "කාලසීමාව",
    ta: "காலக்கெடு",
  },

  // Dropdown Default Options
  allCategoriesOpt: {
    en: "All Categories",
    si: "සියලුම කාණ්ඩ",
    ta: "அனைத்து வகைகள்",
  },
  allProvincesOpt: {
    en: "All Provinces (National)",
    si: "සියලුම පළාත් (ජාතික)",
    ta: "அனைத்து மாகாணங்கள் (தேசிய)",
  },
  allValueBandsOpt: {
    en: "All Value Bands",
    si: "සියලුම වටිනාකම් පරාස",
    ta: "அனைத்து மதிப்பு வரம்புகள்",
  },
  anyClosingDateOpt: {
    en: "Any Closing Date",
    si: "ඕනෑම අවසන් දිනයක්",
    ta: "எந்தவொரு இறுதித் திகதியும்",
  },
  urgent3DaysOpt: {
    en: "Next 3 Days (Urgent)",
    si: "ඉදිරි දින 3 (හදිසි)",
    ta: "அடுத்த 3 நாட்கள் (அவசரம்)",
  },
  next7DaysOpt: {
    en: "Next 7 Days",
    si: "ඉදිරි දින 7",
    ta: "அடுத்த 7 நாட்கள்",
  },
  next30DaysOpt: {
    en: "Next 30 Days",
    si: "ඉදිරි දින 30",
    ta: "அடுத்த 30 நாட்கள்",
  },

  // Provinces
  provWestern: { en: "Western Province", si: "බස්නාහිර පළාත", ta: "மேல் மாகாணம்" },
  provCentral: { en: "Central Province", si: "මධ්‍යම පළාත", ta: "மத்திய மாகாணம்" },
  provSouthern: { en: "Southern Province", si: "දකුණු පළාත", ta: "தென் மாகாணம்" },
  provNorthern: { en: "Northern Province", si: "උතුරු පළාත", ta: "வட மாகாணம்" },
  provEastern: { en: "Eastern Province", si: "නැගෙනහිර පළාත", ta: "கிழக்கு மாகாணம்" },
  provNorthWestern: { en: "North Western Province", si: "වයඹ පළාත", ta: "வடமேல் மாகாணம்" },
  provNorthCentral: { en: "North Central Province", si: "උතුරු මැද පළාත", ta: "வடமத்திய மாகாணம்" },
  provUva: { en: "Uva Province", si: "ඌව පළාත", ta: "ஊவா மாகாணம்" },
  provSabaragamuwa: { en: "Sabaragamuwa Province", si: "සබරගමුව පළාත", ta: "சப்ரகமுவ மாகாணம்" },

  // Value Bands
  bandUnder5M: { en: "Under Rs. 5M (Micro/SME)", si: "රු. මිලියන 5 ට අඩු (ක්ෂුද්‍ර/සුළු)", ta: "ரூ. 5 மில்லியனுக்கு கீழ்" },
  band5M25M: { en: "Rs. 5M – 25M (Standard)", si: "රු. මිලියන 5 – 25 (සම්මත)", ta: "ரூ. 5M – 25M (நிலையானது)" },
  band25M100M: { en: "Rs. 25M – 100M (Corporate)", si: "රු. මිලියන 25 – 100 (ආයතනික)", ta: "ரூ. 25M – 100M (நிறுவன)" },
  band100M500M: { en: "Rs. 100M – 500M (Major Works)", si: "රු. මිලියන 100 – 500 (මහා පරිමාණ)", ta: "ரூ. 100M – 500M (பாரிய திட்டம்)" },
  bandOver500M: { en: "Over Rs. 500M (Mega Projects)", si: "රු. මිලියන 500 ට වැඩි (දැවැන්ත ව්‍යාපෘති)", ta: "ரூ. 500 மில்லியனுக்கு மேல்" },

  // Categories
  catCivil: { en: "Civil Construction & Works", si: "සිවිල් ඉදිකිරීම් හා මාර්ග සංවර්ධන", ta: "கட்டிட நிர்மாணம் மற்றும் பணிகள்" },
  catIT: { en: "Computer, Servers & IT", si: "පරිගණක, සර්වර් හා තොරතුරු තාක්ෂණ", ta: "கணினி, சேவையகங்கள் & IT" },
  catSuppliers: { en: "Registration of Suppliers", si: "සැපයුම්කරුවන් ලියාපදිංචිය", ta: "வழங்குநர்கள் பதிவு" },
  catElectrical: { en: "Electrical & Power Distribution", si: "විදුලි බල සැපයුම් හා බෙදාහැරීම්", ta: "மின்சாரம் மற்றும் மின் விநியோகம்" },
  catTelecom: { en: "Electronic & Telecom Equipment", si: "ඉලෙක්ට්‍රොනික හා විදුලි සංදේශ", ta: "தொலைத்தொடர்பு உபகரணங்கள்" },
  catMedical: { en: "Medical & Pharmaceuticals", si: "වෛද්‍ය, ඖෂධ හා රෝහල් ද්‍රව්‍ය", ta: "மருத்துவம் மற்றும் மருந்துகள்" },
  catJanitorial: { en: "Janitorial & Facilities", si: "පවිත්‍රතා, සනීපාරක්ෂක හා නඩත්තු", ta: "துப்புரவு மற்றும் பராமரிப்பு" },
  catSecurity: { en: "Security & Guarding Services", si: "ආරක්ෂක සේවා හා නිරීක්ෂණ", ta: "பாதுகாப்பு சேவைகள்" },
  catMachinery: { en: "Hardware & Machinery", si: "දැඩි යන්ත්‍රෝපකරණ හා මෙවලම්", ta: "இயந்திரங்கள் மற்றும் வன்பொருள்" },
  catVehicles: { en: "Vehicles & Auto Parts", si: "මෝටර් රථ, වාහන හා අමතර කොටස්", ta: "வாகனங்கள் மற்றும் பாகங்கள்" },
  catPrinting: { en: "Printing, Media & Advertising", si: "මුද්‍රණ, මාධ්‍ය හා ප්‍රචාරණ", ta: "அச்சிடுதல் மற்றும் ஊடகம்" },
  catSolar: { en: "Renewable Energy & Solar", si: "සූර්ය බලශක්ති හා පුනර්ජනනීය", ta: "சூரிய சக்தி & புதுப்பிக்கத்தக்க சக்தி" },
  catUnclassified: { en: "Unclassified", si: "වර්ගීකරණය නොකළ", ta: "வகைப்படுத்தப்படாதது" },
  catAgriculture: { en: "Agriculture", si: "කෘෂිකර්මය", ta: "விவசாயம்" },
  catTransport: { en: "Transport & Rent A Car Services", si: "ප්‍රවාහන සහ මෝටර් රථ කුලී සේවා", ta: "போக்குவரத்து & வாடகை கார் சேவைகள்" },
  catConsultancy: { en: "Consultancy, Audit & Tax Services", si: "උපදේශන, විගණන සහ බදු සේවා", ta: "ஆலோசனை, தணிக்கை & வரி சேவைகள்" },
  catFurniture: { en: "Furniture", si: "ගෘහ භාණ්ඩ", ta: "தளபாடங்கள்" },
  catServices: { en: "Services", si: "සේවා", ta: "சேவைகள்" },
  catLaboratory: { en: "Laboratory & Chemicals", si: "රසායනාගාර සහ රසායනික ද්‍රව්‍ය", ta: "ஆய்வகம் & இரசாயனங்கள்" },
  catBankFinance: { en: "Bank, Finance & Insurance", si: "බැංකු, මූල්‍ය සහ රක්ෂණ", ta: "வங்கி, நிதி & காப்பீடு" },
  catGift: { en: "Gift & Stationery", si: "තෑගි සහ ලිපි ද්‍රව්‍ය", ta: "பரிசு & எழுதுபொருள்" },
  catFashion: { en: "Fashion & Textiles", si: "විලාසිතා සහ රෙදිපිළි", ta: "ஃபேஷன் & ஜவுளி" },
  catFood: { en: "Food & Beverage", si: "ආහාර සහ පාන", ta: "உணவு & பானம்" },
  catCourier: { en: "Courier & Logistics", si: "කුරියර් සහ සැපයුම්", ta: "கூரியர் & தளவாடங்கள்" },
  catPlastic: { en: "Plastic & Rubber", si: "ප්ලාස්ටික් සහ රබර්", ta: "பிளாஸ்டிக் & ரப்பர்" },
  catStationery: { en: "Stationeries", si: "ලිපි ද්‍රව්್ಯ", ta: "எழுதுபொருட்கள்" },
  // Extended Sectors & Locations
  tendersByLocations: { en: "TENDERS BY LOCATIONS", si: "ස්ථාන අනුව ටෙන්ඩර්", ta: "இடம் வாரியாக டெண்டர்கள்" },
  advertisePublish: { en: "Advertise and Publish Tenders", si: "ටෙන්ඩර් ප්‍රචාරණය සහ ප්‍රකාශනය", ta: "டெண்டர்களை விளம்பரப்படுத்தி வெளியிடுங்கள்" },
  connectBuyersSuppliers: { en: "To be Connect with Buyer's & Suppliers", si: "ගැනුම්කරුවන් සහ සැපයුම්කරුවන් සමඟ සම්බන්ධ වන්න", ta: "வாங்குபவர்கள் & சப்ளையர்களுடன் இணையுங்கள்" },
  beInformedNews: { en: "Be informed about the latest news", si: "නවතම පුවත් පිළිබඳව දැනුවත් වන්න", ta: "சமீபத்திய செய்திகளை அறிந்து கொள்ளுங்கள்" },
  publishedTenders: { en: "PUBLISHED TENDERS: 39942", si: "ප්‍රකාශිත ටෙන්ඩර්: 39942", ta: "வெளியிடப்பட்ட டெண்டர்கள்: 39942" },
  typeKeyword: { en: "Type Your Keyword Here", si: "ඔබගේ මූල පදය මෙහි ටයිප් කරන්න", ta: "உங்கள் முக்கிய வார்த்தையை இங்கே தட்டச்சு செய்யவும்" },
  advanceSearch: { en: "ADVANCE SEARCH", si: "උසස් සෙවීම", ta: "மேம்பட்ட தேடல்" },
  uploadFree: { en: "Upload Your Tenders FREE", si: "ඔබගේ ටෙන්ඩර් නොමිලේ උඩුගත කරන්න", ta: "உங்கள் டெண்டர்களை இலவசமாக பதிவேற்றவும்" },
  govTenders: { en: "Government Tenders", si: "රජයේ ටෙන්ඩර්", ta: "அரசு டெண்டர்கள்" },
  privateTenders: { en: "Private Tenders", si: "පෞද්ගලික ටෙන්ඩර්", ta: "தனியார் டெண்டர்கள்" },
  todaysTendersLabel: { en: "Today's Tenders", si: "අද දින ටෙන්ඩර්", ta: "இன்றைய டெண்டர்கள்" },
  liveTendersLabel: { en: "Live Tenders", si: "සජීවී ටෙන්ඩර්", ta: "நேரடி டெண்டர்கள்" },
  closedTendersLabel: { en: "Closed Tenders", si: "අවසන් වූ ටෙන්ඩර්", ta: "மூடப்பட்ட டெண்டர்கள்" },
  allTendersLabel: { en: "All Tenders", si: "සියලුම ටෙන්ඩර්", ta: "அனைத்து டெண்டர்களும்" },
  showingTenders: { en: "Showing", si: "පෙන්වමින්", ta: "காட்டுகிறது" },
  tendersCountLabel: { en: "tenders", si: "ටෙන්ඩර්", ta: "டெண்டர்கள்" },
  cardCategory: { en: "Category:", si: "කාණ්ඩය:", ta: "வகை:" },
  cardSource: { en: "Source:", si: "මූලාශ්‍රය:", ta: "மூலம்:" },
  cardLocation: { en: "Location:", si: "ස්ථානය:", ta: "இடம்:" },
  cardPublishedDate: { en: "Published Date:", si: "ප්‍රකාශන දිනය:", ta: "வெளியிடப்பட்ட தேதி:" },
  cardClosingDate: { en: "Closing Date:", si: "අවසන් දිනය:", ta: "இறுதி தேதி:" },
  cardReferenceNo: { en: "Reference No:", si: "යොමු අංකය:", ta: "குறிப்பு எண்:" },
  cardLiveTender: { en: "Live Tender", si: "සජීවී ටෙන්ඩරය", ta: "நேரடி டெண்டர்" },
  cardTenderClosingIn: { en: "Tender Closing in:", si: "ටෙන්ඩරය අවසන් වීමට:", ta: "டெண்டர் முடிவு:" },
  cardClickToView: { en: "Click to View", si: "බැලීමට ක්ලික් කරන්න", ta: "பார்க்க கிளிக் செய்யவும்" },
  cardLoginToView: { en: "Login to view", si: "බැලීමට පිවිසෙන්න", ta: "பார்க்க உள்நுழையவும்" },
  cardDays: { en: "Day's", si: "දින", ta: "நாட்கள்" },
  // Sectors
  secAll: { en: "All Procurement Sectors", si: "සියලුම ප්‍රසම්පාදන අංශ", ta: "அனைத்து கொள்முதல் துறைகள்" },
  secGov: { en: "Government & Ministries", si: "රජයේ අමාත්‍යාංශ හා දෙපාර්තමේන්තු", ta: "அரச அமைச்சுக்கள் மற்றும் துறைகள்" },
  secSemiGov: { en: "Semi-Gov & State Boards", si: "රාජ්‍ය සංස්ථා හා ව්‍යවස්ථාපිත මණ්ඩල", ta: "அரை-அரசு & கூட்டுத்தாபனங்கள்" },
  secPrivate: { en: "Private Corporates & Commercial", si: "පෞද්ගලික හා වාණිජ සමාගම්", ta: "தனியார் நிறுவனங்கள்" },

  // Status Tabs
  statusLive: {
    en: "Live Tenders",
    si: "සජීවී ටෙන්ඩර්",
    ta: "நேரடி டெண்டர்கள்",
  },
  statusToday: {
    en: "Today's Tenders",
    si: "අද දින පළ වූ",
    ta: "இன்றைய டெண்டர்கள்",
  },
  statusClosing: {
    en: "Closing This Week",
    si: "මේ සතියේ අවසන් වන",
    ta: "விரைவில் முடிபவை",
  },
  statusSuppliers: {
    en: "Supplier Registrations",
    si: "සැපයුම්කරුවන් ලියාපදිංචිය",
    ta: "வழங்குநர் பதிவு",
  },
  statusAll: {
    en: "All Gazette Notices",
    si: "සියලුම ගැසට් නිවේදන",
    ta: "அனைத்து அறிவிப்புகள்",
  },

  // Sidebar Items
  officialGazetteSpecialBadge: {
    en: "OFFICIAL GAZETTE SPECIAL",
    si: "රජයේ නිල ගැසට් විශේෂ",
    ta: "அதிகாரப்பூர்வ வர்த்தமானி சிறப்பு",
  },
  spotlightSuppliers: {
    en: "Registration of Suppliers",
    si: "සැපයුම්කරුවන් ලියාපදිංචිය",
    ta: "வழங்குநர்கள் பதிவு",
  },
  forProcuringBodiesBadge: {
    en: "FOR PROCURING BODIES",
    si: "ප්‍රසම්පාදන ආයතන සඳහා",
    ta: "கொள்முதல் நிறுவனங்களுக்கு",
  },
  publishFreeTitle: {
    en: "Publish Tender Notices Free",
    si: "ඔබේ ටෙන්ඩර් නොමිලේ පළ කරන්න",
    ta: "இலவசமாக டெண்டர் இடுங்கள்",
  },
  publishFreeSubtitle: {
    en: "Connect with 3,200+ verified Sri Lankan suppliers & CIDA contractors.",
    si: "3,200+ ක් වූ ලියාපදිංචි සැපයුම්කරුවන් හා CIDA කොන්ත්‍රාත්කරුවන් වෙත ළඟා වන්න.",
    ta: "3,200+ க்கும் மேற்பட்ட சரிபார்க்கப்பட்ட சப்ளையர்களுடன் இணையுங்கள்.",
  },
  publishFreeBtn: {
    en: "+ Upload Your Tenders FREE",
    si: "+ නොමිලේ ටෙන්ඩර් එක් කරන්න",
    ta: "+ இலவசமாக டெண்டர் பதிவேற்றவும்",
  },
  tendersBySector: {
    en: "TENDERS BY SECTOR",
    si: "අංශ අනුව වර්ගීකරණය",
    ta: "துறை வாரியான டெண்டர்கள்",
  },
  tendersByCategory: {
    en: "TENDERS BY CATEGORY",
    si: "කාණ්ඩ අනුව වර්ගීකරණය",
    ta: "வகை வாரியான டெண்டர்கள்",
  },

  // Results Controls
  resultsHeaderTitle: {
    en: "Tender Notices",
    si: "ටෙන්ඩර් නිවේදන",
    ta: "டெண்டர் அறிவிப்புகள்",
  },
  resultsHeaderSubtitle: {
    en: "Verified procurement publications",
    si: "තහවුරු කරන ලද ප්‍රසම්පාදන ප්‍රකාශන",
    ta: "சரிபார்க்கப்பட்ட கொள்முதல் வெளியீடுகள்",
  },
  cardGridViewBtn: {
    en: "Card Grid",
    si: "කාඩ්පත් දසුන",
    ta: "அட்டை காட்சி",
  },
  denseListViewBtn: {
    en: "Dense List",
    si: "ලැයිස්තු දසුන",
    ta: "பட்டியல் காட்சி",
  },
  sortLabel: {
    en: "Sort:",
    si: "පෙළගැස්ම:",
    ta: "வரிசை:",
  },
  sortClosingSoon: {
    en: "Closing Soon",
    si: "ළඟදීම අවසන් වන",
    ta: "விரைவில் முடிபவை",
  },
  sortRecentlyPublished: {
    en: "Recently Published",
    si: "අලුත්ම නිවේදන",
    ta: "அண்மையில் வெளியானது",
  },
  sortValueHighToLow: {
    en: "Value: High to Low",
    si: "වැඩිම වටිනාකම",
    ta: "அதிக மதிப்பு",
  },
  sortValueLowToHigh: {
    en: "Value: Low to High",
    si: "අඩුම වටිනාකම",
    ta: "குறைந்த மதிப்பு",
  },

  // Card and Table Details
  daysLeftText: {
    en: "d left",
    si: "දින ඉතිරියි",
    ta: "நாட்கள் மீதம்",
  },
  budgetEstimateLabel: {
    en: "Budget Estimate",
    si: "ඇස්තමේන්තු වටිනාකම",
    ta: "மதிப்பீடு",
  },
  viewDetailsBtn: {
    en: "View Details",
    si: "විස්තර බලන්න",
    ta: "விவரங்கள்",
  },
  refLabel: {
    en: "Ref:",
    si: "යොමුව:",
    ta: "குறிப்பு:",
  },

  // Table Columns
  tableEntityCol: {
    en: "Procuring Entity & Ref",
    si: "ප්‍රසම්පාදන ආයතනය හා යොමුව",
    ta: "கொள்முதல் நிறுவனம் & குறிப்பு",
  },
  tableTitleCol: {
    en: "Tender Title",
    si: "ටෙන්ඩර් මාතෘකාව",
    ta: "டெண்டர் தலைப்பு",
  },
  tableCategoryCol: {
    en: "Category",
    si: "කාණ්ඩය",
    ta: "வகை",
  },
  tableClosingCol: {
    en: "Closing Date",
    si: "අවසන් දිනය",
    ta: "இறுதித் திகதி",
  },
  tableValueCol: {
    en: "Value (LKR)",
    si: "වටිනාකම (රු.)",
    ta: "மதிப்பு (LKR)",
  },
  tableActionCol: {
    en: "Action",
    si: "ක්‍රියාමාර්ග",
    ta: "செயல்பாடு",
  },

  // Pagination
  paginationShowing: {
    en: "Showing",
    si: "පෙන්වන්නේ",
    ta: "காட்டப்படுகிறது",
  },
  paginationTo: {
    en: "to",
    si: "සිට",
    ta: "முதல்",
  },
  paginationOf: {
    en: "of",
    si: "දක්වා (සම්පූර්ණ",
    ta: "வரை (மொத்தம்",
  },
  paginationNotices: {
    en: "Notices",
    si: "නිවේදන)",
    ta: "அறிவிப்புகள்)",
  },
  paginationPrev: {
    en: "Prev",
    si: "පෙර",
    ta: "முந்தைய",
  },
  paginationNext: {
    en: "Next",
    si: "ඊළඟ",
    ta: "அடுத்த",
  },
  paginationPerPage: {
    en: "Per Page:",
    si: "පිටුවකට:",
    ta: "பக்கத்திற்கு:",
  },

  // Footer
  footerDesc: {
    en: "Sri Lanka's centralized commercial and state procurement gateway. Aggregating national government gazettes, state ministries, municipal councils, corporate RFPs, and verified supplier registrations daily.",
    si: "ශ්‍රී ලංකාවේ සියලුම රජයේ ගැසට් නිවේදන, අමාත්‍යාංශ, පළාත් පාලන ආයතන, වාණිජ ටෙන්ඩර් සහ තහවුරු කළ සැපයුම්කරුවන්ගේ දත්ත දිනපතා සපයන මධ්‍යම ප්‍රසම්පාදන ද්වාරය.",
    ta: "இலங்கையின் மத்திய வர்த்தக மற்றும் அரச கொள்முதல் தகவல் தளம். அரசாங்க வர்த்தமானிகள், அமைச்சுக்கள் மற்றும் சரிபார்க்கப்பட்ட சப்ளையர் பதிவுகளை தினமும் ஒருங்கிணைக்கிறது.",
  },
  footerBadge1: {
    en: "National Competitive Bidding (NCB/ICB) Gateway",
    si: "ජාතික තරඟකාරී ලංසු තැබීමේ (NCB/ICB) නිල ද්වාරය",
    ta: "தேசிய போட்டி ஏல முறைமை (NCB/ICB)",
  },
  footerBadge2: {
    en: "CIDA & National Procurement Authority Aligned",
    si: "CIDA සහ ජාතික ප්‍රසම්පාදන අධිකාරියේ ප්‍රමිතීන්ට අනුකූලයි",
    ta: "CIDA மற்றும் தேசிய கொள்முதல் அதிகாரசபைக்கு அமைவானது",
  },
  footerBadge3: {
    en: "Verified Daily Procurement Gazette Mirror",
    si: "දිනපතා තහවුරු කළ නිල ගැසට් නිවේදන පද්ධතිය",
    ta: "தினசரி சரிபார்க்கப்பட்ட வர்த்தமானி தகவல் தளம்",
  },
  footerColDirectory: {
    en: "Procurement Directory",
    si: "ප්‍රසම්පාදන නාමාවලිය",
    ta: "கொள்முதல் அடைவு",
  },
  footerColBidders: {
    en: "Bidders & Suppliers",
    si: "ලංසුකරුවන් හා සැපයුම්කරුවන්",
    ta: "ஏலதாரர்கள் & சப்ளையர்கள்",
  },
  footerColAuthorities: {
    en: "Procuring Authorities",
    si: "ප්‍රසම්පාදන ආයතන",
    ta: "கொள்முதல் அதிகாரிகள்",
  },
  footerColHeadquarters: {
    en: "Headquarters Desk",
    si: "ප්‍රධාන මූලස්ථානය",
    ta: "தலைமையக மேசை",
  },
  footerLinkCatalogue: { en: "Live Tenders Catalogue", si: "සජීවී ටෙන්ඩර් නාමාවලිය", ta: "நேரடி டெண்டர்கள்" },
  footerLinkMinistries: { en: "Government Ministries", si: "රජයේ අමාත්‍යාංශ", ta: "அரச அமைச்சுக்கள்" },
  footerLinkProvinces: { en: "Provincial Councils (9)", si: "පළාත් සභා (9)", ta: "மாகாண சபைகள் (9)" },
  footerLinkCorporations: { en: "State Corporations", si: "රාජ්‍ය සංස්ථා", ta: "அரச கூட்டுத்தாபனங்கள்" },
  footerLinkAuctions: { en: "Public & Parate Auctions", si: "ප්‍රසිද්ධ හා පැරටේ වෙන්දේසි", ta: "பொது ஏலங்கள்" },
  footerLinkAwards: { en: "Awards & Standstill Archive", si: "ටෙන්ඩර් ප්‍රදානයන්ගේ ලේඛනාගාරය", ta: "விருதுகள் காப்பகம்" },
  footerLinkPlans: { en: "Commercial Bidder Plans", si: "වාණිජ ලංසු පැකේජ", ta: "வணிக ஏலதாரர் திட்டங்கள்" },
  footerLinkBankClaim: { en: "Bank Transfer Claim", si: "බැංකු ගෙවීම් තහවුරු කිරීම", ta: "வங்கி பரிமாற்ற கோரிக்கை" },
  footerLinkSupplierReg: { en: "Supplier Registration", si: "සැපයුම්කරුවන් ලියාපදිංචිය", ta: "வழங்குநர் பதிவு" },
  footerLinkBiddingGuide: { en: "Bidding Guide & Rules", si: "ලංසු තැබීමේ මාර්ගෝපදේශ", ta: "ஏல வழிகாட்டி & விதிகள்" },
  footerLinkKnowledgeHub: { en: "Procurement Knowledge Hub", si: "ප්‍රසම්පාදන දැනුම් කේන්ද්‍රය", ta: "கொள்முதல் அறிவு மையம்" },
  footerLinkPublisherWorkspace: { en: "Publisher Free Workspace", si: "ප්‍රකාශන නොමිලේ සේවා අවකාශය", ta: "இலவச வெளியீட்டாளர் தளம்" },
  footerLinkNoticeDesk: { en: "Notice Submission Desk", si: "නිවේදන භාරදීමේ අංශය", ta: "அறிவிப்பு சமர்ப்பிக்கும் பிரிவு" },
  footerLinkEvidencePack: { en: "Audit Trail & Evidence Pack", si: "විගණන වාර්තා හා සාක්ෂි", ta: "தணிக்கை தடமறிதல்" },
  footerLinkPartnerApi: { en: "Enterprise Partner API", si: "ආයතනික සහකරු API", ta: "நிறுவன API" },
  footerCentralDispatch: { en: "Central Dispatch", si: "මධ්‍යම විමසීම්", ta: "மத்திய விநியோகம்" },
  footerSupplierSupport: { en: "Supplier Support", si: "සැපයුම්කරු සහාය", ta: "சப்ளையர் ஆதரவு" },
  footerOfficialEmail: { en: "Official Email", si: "නිල විද්‍යුත් තැපෑල", ta: "அதிகாரப்பூர்வ மின்னஞ்சல்" },
  footerPrivacyPolicy: { en: "Privacy Policy", si: "පුද්ගලිකත්ව ප්‍රතිපත්තිය", ta: "தனியுரிமைக் கொள்கை" },
  footerTermsService: { en: "Terms of Service", si: "සේවා කොන්දේසි", ta: "சேவை விதிமுறைகள்" },
  footerGazetteDisclaimer: { en: "Gazette Disclaimer", si: "ගැසට් වගකීම් ප්‍රකාශය", ta: "வர்த்தமானி மறுப்பு" },
  footerHelpSupport: { en: "Help & Support", si: "උපකාර හා සහාය", ta: "உதவி & ஆதரவு" },
  footerCopyright: {
    en: "© 2017 - 2026 TenderHub Sri Lanka. National Procurement Intelligence Gateway. All rights reserved.",
    si: "© 2017 - 2026 ටෙන්ඩර්හබ් ශ්‍රී ලංකා. ජාතික ප්‍රසම්පාදන බුද්ධි ද්වාරය. සියලු හිමිකම් ඇවිරිණි.",
    ta: "© 2017 - 2026 டெண்டர்ஹப் இலங்கை. தேசிய கொள்முதல் தகவல் தளம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },

  // Homepage Additional
  recentSearchTitle: { en: "Recent Search Queries", si: "මෑත සෙවුම් විමසුම්", ta: "சமீபத்திய தேடல் வினவல்கள்" },
  spotlightCount: { en: "3,217", si: "3,217", ta: "3,217" },
  publisherConnectText: { en: "Connect with 3,200+ verified Sri Lankan suppliers & CIDA contractors.", si: "3,200+ කට අධික තහවුරු කළ සැපයුම්කරුවන් හා CIDA කොන්ත්‍රාත්කරුවන් සමඟ සම්බන්ධ වන්න.", ta: "3,200+ க்கும் மேற்பட்ட சரிபார்க்கப்பட்ட சப்ளையர்கள் மற்றும் CIDA ஒப்பந்தக்காரர்களுடன் இணையுங்கள்." },
  twelveCategoriesLabel: { en: "12 Categories", si: "කාණ්ඩ 12", ta: "12 வகைகள்" },
  allCategoriesLabel: { en: "All Categories", si: "සියලුම කාණ්ඩ", ta: "அனைத்து வகைகள்" },
  closingSoonUrgent: { en: "Closing Soon (Urgent)", si: "ළඟදීම අවසන් වන (හදිසි)", ta: "விரைவில் முடிவு (அவசரம்)" },
  newestPublished: { en: "Newest Published", si: "අලුතින්ම ප්‍රකාශිත", ta: "புதிதாக வெளியிடப்பட்டது" },
  highestBudget: { en: "Highest Budget (LKR)", si: "ඉහළම අයවැය (රු.)", ta: "அதிகபட்ச பட்ஜெட் (LKR)" },
  lowestBudget: { en: "Lowest Budget (LKR)", si: "අඩුම අයවැය (රු.)", ta: "குறைந்தபட்ச பட்ஜெட் (LKR)" },
  newestFirst: { en: "Newest First", si: "අලුත්ම පළමුව", ta: "புதியது முதலில்" },
  highestBudgetShort: { en: "Highest Budget", si: "වැඩිම අයවැය", ta: "அதிக பட்ஜெட்" },
  lowestBudgetShort: { en: "Lowest Budget", si: "අඩුම අයවැය", ta: "குறைந்த பட்ஜெட்" },

  // About Us
  aboutTabOverview: { en: "Company Overview", si: "සමාගම් දළ විශ්ලේෂණය", ta: "நிறுவன கண்ணோட்டம்" },
  aboutTabMandate: { en: "Mission & Mandate", si: "මෙහෙවර හා වරම", ta: "நோக்கம் & ஆணை" },
  aboutTabIntegrity: { en: "Data Integrity", si: "දත්ත නිරවද්‍යතාව", ta: "தரவு நேர்மை" },
  aboutTabLeadership: { en: "Leadership", si: "නායකත්වය", ta: "தலைமைத்துவம்" },
  aboutTitleOverview: { en: "ABOUT TENDERHUB", si: "ටෙන්ඩර්හබ් ගැන", ta: "டெண்டர்ஹப் பற்றி" },
  aboutTitleMandate: { en: "MISSION & MANDATE", si: "මෙහෙවර හා වරම", ta: "நோக்கம் & ஆணை" },
  aboutTitleIntegrity: { en: "DATA INTEGRITY & SECURITY", si: "දත්ත නිරවද්‍යතාව හා ආරක්ෂාව", ta: "தரவு நேர்மை & பாதுகாப்பு" },
  aboutTitleLeadership: { en: "EXECUTIVE GOVERNANCE", si: "විධායක පාලනය", ta: "நிர்வாக ஆளுமை" },
  aboutDescOverview: { en: "Sri Lanka's centralized commercial and state procurement gateway. We aggregate, verify, and deliver high-value tender opportunities across all 9 provinces with industrial accuracy.", si: "ශ්‍රී ලංකාවේ මධ්‍යගත වාණිජ හා රාජ්‍ය ප්‍රසම්පාදන ද්වාරය. අපි පළාත් 9 පුරාම ඉහළ වටිනාකම් ටෙන්ඩර් අවස්ථා කාර්මික නිරවද්‍යතාවයෙන් එකතු කර, සත්‍යාපනය කර ලබා දෙන්නෙමු.", ta: "இலங்கையின் மையப்படுத்தப்பட்ட வணிக மற்றும் அரச கொள்முதல் தளம். 9 மாகாணங்களிலும் உயர் மதிப்பு டெண்டர் வாய்ப்புகளை துல்லியத்துடன் வழங்குகிறோம்." },
  aboutDescMandate: { en: "Standardizing public and private sector bidding across Sri Lanka through transparent, real-time national gazette aggregation and verified RFP indexing.", si: "විනිවිදභාවයෙන් යුත්, තත්‍ය කාලීන ජාතික ගැසට් එකතු කිරීම සහ සත්‍යාපිත RFP සුචිගත කිරීම හරහා ශ්‍රී ලංකාව පුරා රාජ්‍ය හා පෞද්ගලික අංශ ලංසු තැබීම ප්‍රමිතිගත කිරීම.", ta: "வெளிப்படையான, நிகழ்நேர தேசிய வர்த்தமானி திரட்டல் மூலம் இலங்கை முழுவதும் பொது மற்றும் தனியார் துறை ஏலத்தை தரப்படுத்துதல்." },
  aboutDescIntegrity: { en: "Every notice undergoes multi-stage verification across Sinhala, Tamil, and English publications with SHA-256 cryptographic document validation.", si: "සෑම නිවේදනයක්ම සිංහල, දෙමළ හා ඉංග්‍රීසි ප්‍රකාශන හරහා බහු-අදියර සත්‍යාපනයකට සහ SHA-256 ගුප්ත ලේඛන වලංගුකරණයට ලක් කෙරේ.", ta: "ஒவ்வொரு அறிவிப்பும் சிங்களம், தமிழ், ஆங்கில வெளியீடுகளில் பல கட்ட சரிபார்ப்பு மற்றும் SHA-256 ஆவண சரிபார்ப்புக்கு உட்படுகிறது." },
  aboutDescLeadership: { en: "Directed by senior procurement intelligence specialists, legal compliance officers, and enterprise software architects based at World Trade Centre, Colombo.", si: "කොළඹ ලෝක වෙළඳ මධ්‍යස්ථානයේ සිටින ජ්‍යෙෂ්ඨ ප්‍රසම්පාදන බුද්ධි විශේෂඥයින්, නීති අනුකූලතා නිලධාරීන් සහ ව්‍යවසාය මෘදුකාංග ගෘහ නිර්මාණ ශිල්පීන් විසින් මෙහෙයවනු ලැබේ.", ta: "கொழும்பு உலக வர்த்தக மையத்தில் உள்ள மூத்த கொள்முதல் நிபுணர்கள் மற்றும் மென்பொருள் கட்டமைப்பாளர்களால் இயக்கப்படுகிறது." },
  aboutMetricPublished: { en: "39,900+", si: "39,900+", ta: "39,900+" },
  aboutMetricPublishedLabel: { en: "Tenders Published", si: "ප්‍රකාශිත ටෙන්ඩර්", ta: "வெளியிடப்பட்ட டெண்டர்கள்" },
  aboutMetricVerified: { en: "100%", si: "100%", ta: "100%" },
  aboutMetricVerifiedLabel: { en: "Verified Gazettes", si: "සත්‍යාපිත ගැසට්", ta: "சரிபார்க்கப்பட்ட வர்த்தமானிகள்" },
  aboutMetricProvinces: { en: "9", si: "9", ta: "9" },
  aboutMetricProvincesLabel: { en: "Provinces Covered", si: "ආවරණය කළ පළාත්", ta: "உள்ளடக்கிய மாகாணங்கள்" },
  aboutMetricSuppliers: { en: "3,200+", si: "3,200+", ta: "3,200+" },
  aboutMetricSuppliersLabel: { en: "Registered Suppliers", si: "ලියාපදිංචි සැපයුම්කරුවන්", ta: "பதிவு செய்த சப்ளையர்கள்" },
  aboutMandateTitle: { en: "Our Institutional Mandate", si: "අපගේ ආයතනික වරම", ta: "எங்கள் நிறுவன ஆணை" },
  aboutMandateP1: { en: "For over a decade, tracking government procurement and corporate invitations required scouring disparate print gazettes, departmental bulletins, and provincial newspapers.", si: "දශකයකට වැඩි කාලයක්, රජයේ ප්‍රසම්පාදන සහ ආයතනික ආරාධනා සොයා ගැනීමට විවිධ මුද්‍රිත ගැසට්, දෙපාර්තමේන්තු නිවේදන සහ පළාත් පුවත්පත් පිරික්සීමට සිදු විය.", ta: "ஒரு தசாப்தத்திற்கும் மேலாக, அரசு கொள்முதல் வாய்ப்புகளை கண்டறிய பல்வேறு அச்சு வர்த்தமானிகளை தேட வேண்டியிருந்தது." },
  aboutMandateP2: { en: "TenderHub standardizes the entire national procurement pipeline into a clean, searchable index. Every notice is cross-checked against official procurement reference numbers before release.", si: "ටෙන්ඩර්හබ් ජාතික ප්‍රසම්පාදන නල මාර්ගය පිරිසිදු, සෙවිය හැකි දර්ශකයක් බවට ප්‍රමිතිගත කරයි. සෑම නිවේදනයක්ම නිල ප්‍රසම්පාදන යොමු අංක සමඟ හරස් පරීක්ෂා කරනු ලැබේ.", ta: "டெண்டர்ஹப் தேசிய கொள்முதல் குழாயை தேடக்கூடிய குறியீடாக தரப்படுத்துகிறது." },
  aboutVerificationTitle: { en: "Verification & Accuracy", si: "සත්‍යාපනය හා නිරවද්‍යතාව", ta: "சரிபார்ப்பு & துல்லியம்" },
  aboutVerificationP1: { en: "Our editorial desk processes gazettes daily across Sinhala, Tamil, and English publications. We extract critical bidding criteria, bid bonds, and submission deadlines so suppliers bid with confidence.", si: "අපගේ කර්තෘ මණ්ඩලය දිනපතා සිංහල, දෙමළ සහ ඉංග්‍රීසි ප්‍රකාශන හරහා ගැසට් සකසයි. සැපයුම්කරුවන්ට විශ්වාසයෙන් ලංසු තැබීමට අවශ්‍ය තීරණාත්මක නිර්ණායක අපි නිස්සාරණය කරමු.", ta: "எங்கள் ஆசிரியர் குழு தினமும் சிங்களம், தமிழ், ஆங்கில வெளியீடுகளில் வர்த்தமானிகளை செயலாக்குகிறது." },
  aboutQuote: { en: "\"Empowering Sri Lankan enterprises with transparent, immediate access to public and private sector projects.\"", si: "\"විනිවිදභාවයෙන් යුත්, ක්ෂණික ප්‍රවේශයක් හරහා ශ්‍රී ලාංකික ව්‍යවසායන් සවිබල ගැන්වීම.\"", ta: "\"வெளிப்படையான, உடனடி அணுகல் மூலம் இலங்கை நிறுவனங்களை வலுப்படுத்துதல்.\"" },
  aboutNationalModernization: { en: "National Procurement Modernization", si: "ජාතික ප්‍රසම්පාදන නවීකරණය", ta: "தேசிய கொள்முதல் நவீனமயமாக்கல்" },
  aboutNationalDesc: { en: "TenderHub acts as the bridge connecting public sector procurement authorities with competitive, qualified domestic and international contractors. Our mandate focuses on three core pillars:", si: "ටෙන්ඩර්හබ් රාජ්‍ය ප්‍රසම්පාදන අධිකාරීන් සහ සුදුසුකම් ලත් දේශීය හා ජාත්‍යන්තර කොන්ත්‍රාත්කරුවන් සම්බන්ධ කරන පාලම ලෙස ක්‍රියා කරයි.", ta: "டெண்டர்ஹப் பொதுத்துறை கொள்முதல் அதிகாரிகளையும் தகுதிவாய்ந்த ஒப்பந்தக்காரர்களையும் இணைக்கும் பாலமாக செயல்படுகிறது." },
  aboutPillar1Title: { en: "1. Full Transparency", si: "1. පූර්ණ විනිවිදභාවය", ta: "1. முழு வெளிப்படைத்தன்மை" },
  aboutPillar1Desc: { en: "Unbiased, direct publication of official state procurement without gatekeeping.", si: "බාධාවකින් තොරව නිල රාජ්‍ය ප්‍රසම්පාදන සෘජු ප්‍රකාශනය.", ta: "தடையற்ற அதிகாரப்பூர்வ அரச கொள்முதல் வெளியீடு." },
  aboutPillar2Title: { en: "2. CIDA Alignment", si: "2. CIDA අනුකූලතාව", ta: "2. CIDA சீரமைப்பு" },
  aboutPillar2Desc: { en: "Standardized classification conforming to CIDA contractor grading and criteria.", si: "CIDA කොන්ත්‍රාත්කරු ශ්‍රේණිගත කිරීම් වලට අනුකූල ප්‍රමිතිගත වර්ගීකරණය.", ta: "CIDA ஒப்பந்தக்காரர் தரத்திற்கு இணங்க தரப்படுத்தப்பட்ட வகைப்பாடு." },
  aboutPillar3Title: { en: "3. Trilingual Reach", si: "3. ත්‍රෛභාෂා ප්‍රවේශය", ta: "3. மும்மொழி அணுகல்" },
  aboutPillar3Desc: { en: "Equal accessibility across Sinhala, Tamil, and English procurement sectors.", si: "සිංහල, දෙමළ හා ඉංග්‍රීසි ප්‍රසම්පාදන අංශ හරහා සමාන ප්‍රවේශය.", ta: "சிங்களம், தமிழ், ஆங்கிலத்தில் சம அணுகல்." },
  aboutIntegrityTitle: { en: "Multi-Stage Gazette Ingestion & Verification", si: "බහු-අදියර ගැසට් ඇතුළත් කිරීම හා සත්‍යාපනය", ta: "பல கட்ட வர்த்தமானி உள்வாங்கல் & சரிபார்ப்பு" },
  aboutIntegrityDesc: { en: "Every tender published on TenderHub undergoes a rigorous 4-step quality assurance workflow to ensure 100% legal reliability:", si: "ටෙන්ඩර්හබ් හි ප්‍රකාශිත සෑම ටෙන්ඩරයක්ම 100% නීතිමය විශ්වසනීයත්වය සහතික කිරීමට දැඩි පියවර 4ක තත්ත්ව සහතික ක්‍රියාවලියකට යටත් වේ:", ta: "டெண்டர்ஹப்பில் வெளியிடப்படும் ஒவ்வொரு டெண்டரும் 100% சட்ட நம்பகத்தன்மையை உறுதி செய்ய 4-படி தர உறுதி செயல்முறைக்கு உட்படுகிறது:" },
  aboutStep1Title: { en: "Original Source Mirroring", si: "මුල් මූලාශ්‍ර පිළිබිඹු කිරීම", ta: "மூல ஆதார பிரதிபலிப்பு" },
  aboutStep1Desc: { en: "Direct capture from Department of Government Printing gazettes, state ministries, and municipal authorities.", si: "රජයේ මුද්‍රණ දෙපාර්තමේන්තුවේ ගැසට්, රාජ්‍ය අමාත්‍යාංශ සහ පළාත් පාලන ආයතන වලින් සෘජු ලබා ගැනීම.", ta: "அரசு அச்சுத் துறை வர்த்தமானிகள், அமைச்சுக்கள் மற்றும் நகராட்சிகளிலிருந்து நேரடி பிடிப்பு." },
  aboutStep2Title: { en: "Reference Number & Budget Validation", si: "යොමු අංක හා අයවැය වලංගුකරණය", ta: "குறிப்பு எண் & பட்ஜெட் சரிபார்ப்பு" },
  aboutStep2Desc: { en: "Procurement officers cross-verify contract codes, bid bond amounts, and submission cutoff hours.", si: "ප්‍රසම්පාදන නිලධාරීන් කොන්ත්‍රාත් කේත, ලංසු ඇප මුදල් සහ ඉදිරිපත් කිරීමේ අවසන් වේලාවන් හරස් සත්‍යාපනය කරයි.", ta: "கொள்முதல் அதிகாரிகள் ஒப்பந்த குறியீடுகள், ஏல பிணை தொகைகளை சரிபார்க்கின்றனர்." },
  aboutStep3Title: { en: "Cryptographic File Integrity", si: "ගුප්ත ලේඛන අඛණ්ඩතාව", ta: "மறைகுறியாக்க கோப்பு ஒருமைப்பாடு" },
  aboutStep3Desc: { en: "Official BOQ, RFP, and bidding documents are stored with SHA-256 checksums to prevent tampering.", si: "නිල BOQ, RFP සහ ලංසු ලේඛන වෙනස් කිරීම වැළැක්වීමට SHA-256 චෙක්සම් සමඟ ගබඩා කෙරේ.", ta: "அதிகாரப்பூர்வ BOQ, RFP ஆவணங்கள் SHA-256 செக்சம்களுடன் சேமிக்கப்படுகின்றன." },
  aboutLeadershipTitle: { en: "Operations & Editorial Directorate", si: "මෙහෙයුම් හා කර්තෘ අධ්‍යක්ෂ මණ්ඩලය", ta: "செயல்பாடு & ஆசிரியர் இயக்குநரகம்" },
  aboutNationalOps: { en: "National Procurement Operations", si: "ජාතික ප්‍රසම්පාදන මෙහෙයුම්", ta: "தேசிய கொள்முதல் செயல்பாடுகள்" },
  aboutCentralDesk: { en: "Central Desk · Colombo 01", si: "මධ්‍යම මේසය · කොළඹ 01", ta: "மத்திய மேசை · கொழும்பு 01" },
  aboutNationalOpsDesc: { en: "Oversees day-to-day data intake, ministry communication, and bidder support across all nine provinces.", si: "පළාත් නවය පුරා දෛනික දත්ත ලබා ගැනීම, අමාත්‍යාංශ සන්නිවේදනය සහ ලංසුකරු සහාය අධීක්ෂණය කරයි.", ta: "9 மாகாணங்களிலும் தினசரி தரவு உள்வாங்கல், அமைச்சு தொடர்பு ஆகியவற்றை மேற்பார்வையிடுகிறது." },
  aboutGazetteDesk: { en: "Gazette Verification Desk", si: "ගැසට් සත්‍යාපන මේසය", ta: "வர்த்தமானி சரிபார்ப்பு மேசை" },
  aboutEditorialCompliance: { en: "Editorial Compliance · Sri Lanka", si: "කර්තෘ අනුකූලතාව · ශ්‍රී ලංකාව", ta: "ஆசிரியர் இணக்கம் · இலங்கை" },
  aboutGazetteDeskDesc: { en: "Specialized trilingual editorial team responsible for extracting technical criteria and legal tender parameters.", si: "තාක්ෂණික නිර්ණායක සහ නීතිමය ටෙන්ඩර් පරාමිතීන් නිස්සාරණය කිරීම සඳහා විශේෂිත ත්‍රෛභාෂා කර්තෘ කණ්ඩායම.", ta: "தொழில்நுட்ப அளவுகோல்கள் மற்றும் சட்ட டெண்டர் அளவுருக்களை பிரித்தெடுக்கும் சிறப்பு மும்மொழி குழு." },
  aboutNeedCoordination: { en: "Need institutional coordination?", si: "ආයතනික සම්බන්ධීකරණයක් අවශ්‍යද?", ta: "நிறுவன ஒருங்கிணைப்பு தேவையா?" },
  aboutContactDirectorate: { en: "Contact Directorate →", si: "අධ්‍යක්ෂ මණ්ඩලය අමතන්න →", ta: "இயக்குநரகத்தை தொடர்பு கொள்ள →" },

  // How It Works
  howTabOverview: { en: "Process Overview", si: "ක්‍රියාවලි දළ විශ්ලේෂණය", ta: "செயல்முறை கண்ணோட்டம்" },
  howTabSourcing: { en: "Daily Sourcing", si: "දෛනික මූලාශ්‍ර", ta: "தினசரி ஆதாரம்" },
  howTabIndexing: { en: "Indexing & Tags", si: "සුචිගත කිරීම හා ටැග්", ta: "குறியீடு & குறிச்சொற்கள்" },
  howTabDocuments: { en: "Bidding Documents", si: "ලංසු ලේඛන", ta: "ஏல ஆவணங்கள்" },
  howTitleOverview: { en: "WHAT WE DO & HOW IT WORKS", si: "අප කරන්නේ කුමක්ද සහ එය ක්‍රියා කරන්නේ කෙසේද", ta: "நாங்கள் என்ன செய்கிறோம் & எப்படி செயல்படுகிறது" },
  howTitleSourcing: { en: "DAILY PROCUREMENT SOURCING", si: "දෛනික ප්‍රසම්පාදන මූලාශ්‍ර", ta: "தினசரி கொள்முதல் ஆதாரம்" },
  howTitleIndexing: { en: "INDEXING & CLASSIFICATION", si: "සුචිගත කිරීම හා වර්ගීකරණය", ta: "குறியீடு & வகைப்பாடு" },
  howTitleDocuments: { en: "OFFICIAL BIDDING VAULT", si: "නිල ලංසු ගබඩාව", ta: "அதிகாரப்பூர்வ ஏல பெட்டகம்" },
  howDescOverview: { en: "A transparent 3-stage intelligence pipeline that gathers procurement notices from across Sri Lanka and transforms them into structured, actionable opportunities.", si: "ශ්‍රී ලංකාව පුරා ප්‍රසම්පාදන නිවේදන එකතු කර ව්‍යුහගත, ක්‍රියාකාරී අවස්ථා බවට පරිවර්තනය කරන විනිවිද පෙනෙන අදියර 3ක බුද්ධි නල මාර්ගයකි.", ta: "இலங்கை முழுவதும் கொள்முதல் அறிவிப்புகளை சேகரித்து கட்டமைக்கப்பட்ட வாய்ப்புகளாக மாற்றும் வெளிப்படையான 3-நிலை குழாய்." },
  howDescSourcing: { en: "Continuous morning ingestion from the Department of Government Printing, 14 national newspapers, provincial councils, and corporate boards.", si: "රජයේ මුද්‍රණ දෙපාර්තමේන්තුව, ජාතික පුවත්පත් 14, පළාත් සභා සහ ආයතනික මණ්ඩල වලින් අඛණ්ඩ උදෑසන ඇතුළත් කිරීම.", ta: "அரசு அச்சுத் துறை, 14 தேசிய செய்தித்தாள்கள், மாகாண சபைகளிலிருந்து தொடர்ச்சியான காலை உள்வாங்கல்." },
  howDescIndexing: { en: "Standardized tagging conforming to CIDA contractor requirements, accurate LKR budget bands, submission cutoff times, and bid security terms.", si: "CIDA කොන්ත්‍රාත්කරු අවශ්‍යතා, නිවැරදි රු. අයවැය පරාස, ඉදිරිපත් කිරීමේ අවසන් වේලාවන් සහ ලංසු සුරක්ෂිතතා කොන්දේසි වලට අනුකූල ප්‍රමිතිගත ටැග් කිරීම.", ta: "CIDA ஒப்பந்தக்காரர் தேவைகள், துல்லியமான LKR பட்ஜெட் வரம்புகளுக்கு இணங்க தரப்படுத்தப்பட்ட குறியிடல்." },
  howDescDocuments: { en: "Direct download repository for authentic procurement documents, verified BOQs, technical drawings, and official gazette addenda.", si: "සත්‍ය ප්‍රසම්පාදන ලේඛන, සත්‍යාපිත BOQ, තාක්ෂණික ඇඳීම් සහ නිල ගැසට් ඇමුණුම් සඳහා සෘජු බාගත ගබඩාව.", ta: "உண்மையான கொள்முதல் ஆவணங்கள், சரிபார்க்கப்பட்ட BOQ களுக்கான நேரடி பதிவிறக்க களஞ்சியம்." },
  howStep1Title: { en: "Multi-Source Aggregation", si: "බහු-මූලාශ්‍ර එකතු කිරීම", ta: "பல ஆதார திரட்டல்" },
  howStep1Desc: { en: "Every morning at 05:00 AM, our pipeline ingests government gazettes, 14 national newspapers, provincial council notices, and private corporate RFP publications.", si: "සෑම උදෑසන 05:00 ට, අපගේ නල මාර්ගය රජයේ ගැසට්, ජාතික පුවත්පත් 14, පළාත් සභා නිවේදන සහ පෞද්ගලික ආයතනික RFP ප්‍රකාශන ඇතුළත් කරයි.", ta: "ஒவ்வொரு காலையும் 05:00 மணிக்கு, எங்கள் குழாய் அரசு வர்த்தமானிகள், 14 செய்தித்தாள்களை உள்வாங்குகிறது." },
  howStage1Label: { en: "Stage 1 — Data Collection", si: "අදියර 1 — දත්ත එකතු කිරීම", ta: "நிலை 1 — தரவு சேகரிப்பு" },
  howStep2Title: { en: "Editorial Classification", si: "කර්තෘ වර්ගීකරණය", ta: "ஆசிரியர் வகைப்பாடு" },
  howStep2Desc: { en: "Every notice is indexed with standard classification codes, budget limits in LKR, submission deadlines, bid bond criteria, and exact department addresses.", si: "සෑම නිවේදනයක්ම සම්මත වර්ගීකරණ කේත, රු. අයවැය සීමාවන්, ඉදිරිපත් කිරීමේ අවසන් දින, ලංසු ඇප නිර්ණායක සහ නිශ්චිත දෙපාර්තමේන්තු ලිපින සමඟ සුචිගත කෙරේ.", ta: "ஒவ்வொரு அறிவிப்பும் நிலையான வகைப்பாடு குறியீடுகள், LKR பட்ஜெட் வரம்புகளுடன் குறியிடப்படுகிறது." },
  howStage2Label: { en: "Stage 2 — Verification", si: "අදියර 2 — සත්‍යාපනය", ta: "நிலை 2 — சரிபார்ப்பு" },
  howStep3Title: { en: "Instant Bidding Alerts", si: "ක්ෂණික ලංසු ඇඟවීම්", ta: "உடனடி ஏல எச்சரிக்கைகள்" },
  howStep3Desc: { en: "Suppliers receive real-time email alerts matching their category and province, with downloadable tender PDFs and complete submission instructions.", si: "සැපයුම්කරුවන්ට ඔවුන්ගේ කාණ්ඩයට සහ පළාතට ගැලපෙන තත්‍ය කාලීන විද්‍යුත් තැපැල් ඇඟවීම්, බාගත හැකි ටෙන්ඩර් PDF සහ සම්පූර්ණ ඉදිරිපත් කිරීමේ උපදෙස් ලැබේ.", ta: "சப்ளையர்கள் தங்கள் வகை மற்றும் மாகாணத்துடன் பொருந்தும் நிகழ்நேர மின்னஞ்சல் எச்சரிக்கைகளைப் பெறுகின்றனர்." },
  howStage3Label: { en: "Stage 3 — Delivery", si: "අදියර 3 — බෙදා හැරීම", ta: "நிலை 3 — விநியோகம்" },
  howSourceLayer1: { en: "Source Layer 01", si: "මූලාශ්‍ර ස්ථරය 01", ta: "ஆதார அடுக்கு 01" },
  howSourceGazetteTitle: { en: "Official Government Gazette Mirror", si: "නිල රජයේ ගැසට් පිළිබිඹුව", ta: "அதிகாரப்பூர்வ அரசு வர்த்தமானி பிரதி" },
  howSourceGazetteDesc: { en: "Direct extraction from the Democratic Socialist Republic of Sri Lanka weekly and extraordinary gazettes, covering all national ministry procurements.", si: "සියලුම ජාතික අමාත්‍යාංශ ප්‍රසම්පාදන ආවරණය කරමින් ශ්‍රී ලංකා සතිපතා සහ අතිවිශේෂ ගැසට් වලින් සෘජු නිස්සාරණය.", ta: "இலங்கை வாராந்திர மற்றும் அசாதாரண வர்த்தமானிகளிலிருந்து நேரடி பிரித்தெடுத்தல்." },
  howSourceLayer2: { en: "Source Layer 02", si: "මූලාශ්‍ර ස්ථරය 02", ta: "ஆதார அடுக்கு 02" },
  howSourceNewspapersTitle: { en: "14 National Daily Newspapers", si: "ජාතික දිනපතා පුවත්පත් 14", ta: "14 தேசிய தினசரி செய்தித்தாள்கள்" },
  howSourceNewspapersDesc: { en: "Complete trilingual coverage across Daily News, Dinamina, Thinakaran, Sunday Observer, Silumina, Sunday Times, Daily FT, and regional publications.", si: "ඩේලි නිව්ස්, දිනමිණ, තිනකරන්, සන්ඩේ ඔබ්සර්වර්, සිළුමිණ ඇතුළු ප්‍රකාශන හරහා සම්පූර්ණ ත්‍රෛභාෂා ආවරණය.", ta: "Daily News, Dinamina, Thinakaran உள்ளிட்ட வெளியீடுகளில் முழு மும்மொழி கவரேஜ்." },
  howSourceLayer3: { en: "Source Layer 03", si: "මූලාශ්‍ර ස්ථරය 03", ta: "ஆதார அடுக்கு 03" },
  howSourceProvincialTitle: { en: "9 Provincial Council Secretariats", si: "පළාත් සභා ලේකම් කාර්යාල 9", ta: "9 மாகாண சபை செயலகங்கள்" },
  howSourceProvincialDesc: { en: "Western, Central, Southern, Northern, Eastern, North Western, North Central, Uva, and Sabaragamuwa provincial tender notices.", si: "බස්නාහිර, මධ්‍යම, දකුණු, උතුරු, නැගෙනහිර, වයඹ, උතුරු මැද, ඌව සහ සබරගමුව පළාත් ටෙන්ඩර් නිවේදන.", ta: "மேல், மத்திய, தென், வட, கிழக்கு, வடமேல், வடமத்திய, ஊவா மற்றும் சப்ரகமுவ மாகாண டெண்டர் அறிவிப்புகள்." },
  howSourceLayer4: { en: "Source Layer 04", si: "මූලාශ්‍ර ස්ථරය 04", ta: "ஆதார அடுக்கு 04" },
  howSourceBanksTitle: { en: "State Banks & Parate Auctions", si: "රාජ්‍ය බැංකු හා පැරටේ වෙන්දේසි", ta: "அரசு வங்கிகள் & பராட்டே ஏலங்கள்" },
  howSourceBanksDesc: { en: "Real estate, machinery, vehicle, and commercial parate execution notices from BOC, People's Bank, and leading financial institutions.", si: "BOC, මහජන බැංකුව සහ ප්‍රමුඛ මූල්‍ය ආයතන වලින් දේපල, යන්ත්‍රෝපකරණ, වාහන වෙන්දේසි නිවේදන.", ta: "BOC, மக்கள் வங்கி மற்றும் முன்னணி நிதி நிறுவனங்களிலிருந்து ரியல் எஸ்டேட் ஏல அறிவிப்புகள்." },
  howTaxonomyTitle: { en: "Standardized Taxonomy & Meta Extraction", si: "ප්‍රමිතිගත වර්ගීකරණය හා මෙටා නිස්සාරණය", ta: "தரப்படுத்தப்பட்ட வகைப்பாடு & மெட்டா பிரித்தெடுத்தல்" },
  howTaxonomyDesc: { en: "Every procurement announcement is structured into standard fields so bidders never miss critical qualifications:", si: "සෑම ප්‍රසම්පාදන නිවේදනයක්ම සම්මත ක්ෂේත්‍ර වලට ව්‍යුහගත කර ඇති බැවින් ලංසුකරුවන්ට තීරණාත්මක සුදුසුකම් මග හැරෙන්නේ නැත:", ta: "ஒவ்வொரு கொள்முதல் அறிவிப்பும் நிலையான புலங்களாக கட்டமைக்கப்பட்டுள்ளது." },
  howCidaReq: { en: "CIDA REQUIREMENTS", si: "CIDA අවශ්‍යතා", ta: "CIDA தேவைகள்" },
  howCidaGrade: { en: "Grading & Speciality C1 to C9", si: "ශ්‍රේණිගත කිරීම C1 සිට C9 දක්වා", ta: "தரம் C1 முதல் C9 வரை" },
  howBidBondLabel: { en: "BID SECURITY BOND", si: "ලංසු සුරක්ෂිතතා ඇපය", ta: "ஏல பாதுகாப்பு பிணை" },
  howBidBondDesc: { en: "Exact LKR Guarantee & Validity", si: "නිශ්චිත රු. ඇපය හා වලංගුතාව", ta: "சரியான LKR உத்தரவாதம் & செல்லுபடியாகும்" },
  howDeadlineLabel: { en: "SUBMISSION DEADLINE", si: "ඉදිරිපත් කිරීමේ අවසන් දිනය", ta: "சமர்ப்பிப்பு காலக்கெடு" },
  howDeadlineDesc: { en: "Countdown, Date & Cutoff Hour", si: "ගණන් කිරීම, දිනය සහ අවසන් වේලාව", ta: "கவுண்டவுன், தேதி & கட்அவுட் நேரம்" },
  howDocFeeLabel: { en: "DOCUMENT FEE", si: "ලේඛන ගාස්තුව", ta: "ஆவண கட்டணம்" },
  howDocFeeDesc: { en: "Non-Refundable Purchase Cost", si: "ආපසු නොගෙවන මිලදී ගැනීමේ පිරිවැය", ta: "திரும்பப்பெற முடியாத கொள்முதல் செலவு" },
  howRepoTitle: { en: "Official Document Repository", si: "නිල ලේඛන ගබඩාව", ta: "அதிகாரப்பூர்வ ஆவண களஞ்சியம்" },
  howRepoDesc: { en: "Directly access authorized PDF tenders, Bills of Quantities (BOQ), and addenda issued by procuring entities:", si: "ප්‍රසම්පාදන ආයතන විසින් නිකුත් කරන ලද බලයලත් PDF ටෙන්ඩර්, BOQ සහ ඇමුණුම් සෘජුවම ප්‍රවේශ වන්න:", ta: "கொள்முதல் நிறுவனங்களால் வழங்கப்பட்ட அங்கீகரிக்கப்பட்ட PDF டெண்டர்களை நேரடியாக அணுகவும்:" },
  howRepoItem1: { en: "1. Clean Unwatermarked Official Notice Files", si: "1. පිරිසිදු නිල නිවේදන ගොනු", ta: "1. சுத்தமான அதிகாரப்பூர்வ அறிவிப்பு கோப்புகள்" },
  howRepoItem1Badge: { en: "PDF 300 DPI", si: "PDF 300 DPI", ta: "PDF 300 DPI" },
  howRepoItem2: { en: "2. Pre-Bid Meeting Schedule & Clarifications", si: "2. පෙර-ලංසු රැස්වීම් කාලසටහන", ta: "2. முன்-ஏல கூட்ட அட்டவணை" },
  howRepoItem2Badge: { en: "Verified Bulletin", si: "සත්‍යාපිත නිවේදනය", ta: "சரிபார்க்கப்பட்ட அறிக்கை" },
  howRepoItem3: { en: "3. Tender Submission Location & Sealed Box Guidelines", si: "3. ටෙන්ඩර් ඉදිරිපත් කිරීමේ ස්ථානය", ta: "3. டெண்டர் சமர்ப்பிப்பு இடம்" },
  howRepoItem3Badge: { en: "Official Protocol", si: "නිල ප්‍රොටෝකෝලය", ta: "அதிகாரப்பூர்வ நெறிமுறை" },
  howCtaTitle: { en: "Ready to explore active tenders?", si: "සක්‍රීය ටෙන්ඩර් ගවේෂණයට සූදානම්ද?", ta: "செயலில் உள்ள டெண்டர்களை ஆராய தயாரா?" },
  howCtaDesc: { en: "Browse 366 live procurement procedures updated today across Sri Lanka.", si: "ශ්‍රී ලංකාව පුරා අද යාවත්කාලීන කළ සජීවී ප්‍රසම්පාදන ක්‍රියා පටිපාටි 366 බලන්න.", ta: "இன்று புதுப்பிக்கப்பட்ட 366 நேரடி கொள்முதல் நடைமுறைகளை உலாவுக." },
  howCtaBtn: { en: "Explore Tenders & Purchases", si: "ටෙන්ඩර් ගවේෂණය කරන්න", ta: "டெண்டர்களை ஆராயுங்கள்" },

  pricingPlanAnnual: { en: "Bidder Business Annual — Rs. 24,000 / 12 Months", si: "ලංසු ව්‍යාපාර වාර්ෂික — රු. 24,000 / මාස 12", ta: "ஏல வணிக ஆண்டு — ரூ. 24,000 / 12 மாதங்கள்" },
  pricingPlanQuarterly: { en: "Bidder Business Quarterly — Rs. 7,500 / 3 Months", si: "ලංසු ව්‍යාපාර ත්‍රෛමාසික — රු. 7,500 / මාස 3", ta: "ஏல வணிக காலாண்டு — ரூ. 7,500 / 3 மாதங்கள்" },
  contactDeptGeneral: { en: "General Inquiries & Information", si: "සාමාන්‍ය විමසීම් සහ තොරතුරු", ta: "பொது விசாரணைகள் & தகவல்" },
  contactDeptPublish: { en: "Publish a Private Tender Notice", si: "පෞද්ගලික ටෙන්ඩර් නිවේදනයක් ප්‍රකාශ කරන්න", ta: "தனியார் டெண்டர் அறிவிப்பை வெளியிடவும்" },
  contactDeptSubscription: { en: "Subscription & Payment Support", si: "දායකත්ව සහ ගෙවීම් සහාය", ta: "சந்தா & கட்டண ஆதரவு" },
  contactDeptExecutive: { en: "Executive & Institutional Affairs", si: "විධායක සහ ආයතනික කටයුතු", ta: "நிர்வாக & நிறுவன விவகாரங்கள்" },
  contactDeptAPI: { en: "API & Bulk Procurement Data", si: "API සහ තොග ප්‍රසම්පාදන දත්ත", ta: "API & மொத்த கொள்முதல் தரவு" },
  // Pricing
  pricingTitle: { en: "TRANSPARENT PLANS FOR BIDDERS & BUYERS", si: "ලංසුකරුවන් සහ ගැනුම්කරුවන් සඳහා විනිවිද පෙනෙන සැලසුම්", ta: "ஏலதாரர்கள் & வாங்குபவர்களுக்கான வெளிப்படையான திட்டங்கள்" },
  pricingSubtitle: { en: "Undercutting outdated incumbent flat fees. No card needed — direct bank transfer with WhatsApp confirmation verified by staff in real time.", si: "යල් පැන ගිය ස්ථාවර ගාස්තු අඩු කිරීම. කාඩ්පතක් අවශ්‍ය නැත — කාර්ය මණ්ඩලය විසින් තත්‍ය කාලීනව සත්‍යාපනය කරන WhatsApp තහවුරුව සමඟ සෘජු බැංකු හුවමාරුව.", ta: "காலாவதியான நிலையான கட்டணங்களை குறைத்தல். அட்டை தேவையில்லை — நேரடி வங்கி பரிமாற்றம்." },
  pricingAnnualBtn: { en: "Annual Plan (Rs. 24,000 / Year)", si: "වාර්ෂික සැලැස්ම (රු. 24,000 / වසර)", ta: "ஆண்டு திட்டம் (ரூ. 24,000 / ஆண்டு)" },
  pricingQuarterlyBtn: { en: "Quarterly Seasonal (Rs. 7,500 / 3 Months)", si: "ත්‍රෛමාසික (රු. 7,500 / මාස 3)", ta: "காலாண்டு (ரூ. 7,500 / 3 மாதங்கள்)" },
  pricingFreeStarter: { en: "Free Starter", si: "නොමිලේ ආරම්භය", ta: "இலவச தொடக்கம்" },
  pricingNewBidder: { en: "New Bidder", si: "නව ලංසුකරු", ta: "புதிய ஏலதாரர்" },
  pricingFreeStarterDesc: { en: "Explore the national catalogue and assess market opportunities.", si: "ජාතික නාමාවලිය ගවේෂණය කර වෙළඳපල අවස්ථා තක්සේරු කරන්න.", ta: "தேசிய பட்டியலை ஆராய்ந்து சந்தை வாய்ப்புகளை மதிப்பிடுங்கள்." },
  pricingFreePrice: { en: "Rs. 0", si: "රු. 0", ta: "ரூ. 0" },
  pricingFeat1: { en: "5 Free full notice views", si: "නොමිලේ සම්පූර්ණ නිවේදන 5", ta: "5 இலவச முழு அறிவிப்பு பார்வைகள்" },
  pricingFeat2: { en: "Browse all 39,942+ archive notices", si: "සියලුම ලේඛනාගාර නිවේදන 39,942+ බලන්න", ta: "அனைத்து 39,942+ காப்பக அறிவிப்புகளையும் உலாவுக" },
  pricingFeat3: { en: "Province, Category & Value band filters", si: "පළාත්, කාණ්ඩ සහ වටිනාකම් පෙරහන්", ta: "மாகாண, வகை & மதிப்பு வடிப்பான்கள்" },
  pricingFeat4: { en: "View auction lots & parate notices", si: "වෙන්දේසි සහ පැරටේ නිවේදන බලන්න", ta: "ஏல பொருட்கள் & பராட்டே அறிவிப்புகளைப் பார்க்கவும்" },
  pricingFeat5: { en: "Direct contact officer numbers", si: "සෘජු සම්බන්ධතා නිලධාරී අංක", ta: "நேரடி தொடர்பு அதிகாரி எண்கள்" },
  pricingFeat6: { en: "SHA-256 downloadable BOQ/PDFs", si: "SHA-256 බාගත හැකි BOQ/PDF", ta: "SHA-256 பதிவிறக்க BOQ/PDF கள்" },
  pricingFeat7: { en: "Electronic bid submission receipt", si: "ඉලෙක්ට්‍රොනික ලංසු ඉදිරිපත් කිරීමේ කුවිතාන්සිය", ta: "மின்னணு ஏல சமர்ப்பிப்பு ரசீது" },
  pricingCreateFreeAccount: { en: "Create Free Account", si: "නොමිලේ ගිණුමක් සාදන්න", ta: "இலவச கணக்கை உருவாக்கவும்" },
  pricingRecommended: { en: "RECOMMENDED FOR CONTRACTORS", si: "කොන්ත්‍රාත්කරුවන් සඳහා නිර්දේශිත", ta: "ஒப்பந்தக்காரர்களுக்கு பரிந்துரைக்கப்படுகிறது" },
  pricingCommercialBidder: { en: "Commercial Bidder", si: "වාණිජ ලංසුකරු", ta: "வணிக ஏலதாரர்" },
  pricingBusinessBidder: { en: "Business Bidder", si: "ව්‍යාපාරික ලංසුකරු", ta: "வணிக ஏலதாரர்" },
  pricingBusinessDesc: { en: "Complete procurement intelligence, full document downloads, and e-submission.", si: "සම්පූර්ණ ප්‍රසම්පාදන බුද්ධිය, සම්පූර්ණ ලේඛන බාගත කිරීම් සහ විද්‍යුත් ඉදිරිපත් කිරීම.", ta: "முழுமையான கொள்முதல் நுண்ணறிவு, முழு ஆவண பதிவிறக்கங்கள்." },
  pricingBilledAnnually: { en: "billed annually (12 months)", si: "වාර්ෂිකව අය කෙරේ (මාස 12)", ta: "ஆண்டுதோறும் பில் (12 மாதங்கள்)" },
  pricingBilledQuarterly: { en: "billed quarterly (3 months)", si: "ත්‍රෛමාසිකව අය කෙරේ (මාස 3)", ta: "காலாண்டு பில் (3 மாதங்கள்)" },
  pricingBusinessFeat1: { en: "Unlimited daily gazette & tender access", si: "අසීමිත දෛනික ගැසට් සහ ටෙන්ඩර් ප්‍රවේශය", ta: "வரம்பற்ற தினசரி வர்த்தமானி & டெண்டர் அணுகல்" },
  pricingBusinessFeat2: { en: "Signed 5-minute SHA-256 document links", si: "අත්සන් කළ SHA-256 ලේඛන සබැඳි", ta: "கையொப்பமிடப்பட்ட SHA-256 ஆவண இணைப்புகள்" },
  pricingBusinessFeat3: { en: "Direct procurement officer contact & phone", si: "සෘජු ප්‍රසම්පාදන නිලධාරී සම්බන්ධතා", ta: "நேரடி கொள்முதல் அதிகாரி தொடர்பு" },
  pricingBusinessFeat4: { en: "Legally binding E-Submission Receipt", si: "නීත්‍යානුකූල විද්‍යුත් ඉදිරිපත් කිරීමේ කුවිතාන්සිය", ta: "சட்டப்பூர்வ மின்-சமர்ப்பிப்பு ரசீது" },
  pricingBusinessFeat5: { en: "Bid Pipeline & Compliance Vault reminders", si: "ලංසු නල මාර්ග සහ අනුකූලතා මතක් කිරීම්", ta: "ஏல குழாய் & இணக்க நினைவூட்டல்கள்" },
  pricingBusinessFeat6: { en: "Real-time keyword & category alert feed", si: "තත්‍ය කාලීන මූල පද ඇඟවීම්", ta: "நிகழ்நேர முக்கிய வார்த்தை எச்சரிக்கை" },
  pricingClaimViaBank: { en: "Claim via Bank Transfer →", si: "බැංකු හුවමාරුව හරහා හිමිකම් කියන්න →", ta: "வங்கி பரிமாற்றம் மூலம் கோருங்கள் →" },
  pricingPublisherWorkspace: { en: "Publisher Workspace", si: "ප්‍රකාශක සේවා අවකාශය", ta: "வெளியீட்டாளர் பணியிடம்" },
  pricingProcuringAuthorities: { en: "Procuring Authorities", si: "ප්‍රසම්පාදන අධිකාරීන්", ta: "கொள்முதல் அதிகாரிகள்" },
  pricingPublisherDesc: { en: "For ministries, state boards, banks, and private corporates.", si: "අමාත්‍යාංශ, රාජ්‍ය මණ්ඩල, බැංකු සහ පෞද්ගලික ආයතන සඳහා.", ta: "அமைச்சுக்கள், அரசு வாரியங்கள், வங்கிகளுக்கு." },
  pricingFreeIndefinitely: { en: "Free indefinitely to build national supply (§ 01)", si: "ජාතික සැපයුම ගොඩනැගීමට නොමිලේ (§ 01)", ta: "தேசிய விநியோகத்தை உருவாக்க இலவசம் (§ 01)" },
  pricingPubFeat1: { en: "7-Stage Procurement Lifecycle management", si: "අදියර 7ක ප්‍රසම්පාදන ජීවන චක්‍ර කළමනාකරණය", ta: "7-நிலை கொள்முதல் வாழ்க்கை சுழற்சி மேலாண்மை" },
  pricingPubFeat2: { en: "Separation of duties threshold approvals", si: "ර duties වෙන් කිරීමේ අනුමත කිරීම්", ta: "கடமைகளை பிரித்தல் ஒப்புதல்கள்" },
  pricingPubFeat3: { en: "Dual-Control sealed opening ceremony", si: "ද්විත්ව පාලන මුද්‍රා විවෘත කිරීම", ta: "இரட்டை கட்டுப்பாடு முத்திரை திறப்பு" },
  pricingPubFeat4: { en: "Conflict-of-interest committee evaluation", si: "ගැටුම් කමිටු ඇගයීම", ta: "நலன் முரண்பாடு குழு மதிப்பீடு" },
  pricingPubFeat5: { en: "Numbered addenda & anonymous Q&A", si: "අංකිත ඇමුණුම් සහ නිර්නාමික ප්‍රශ්න", ta: "எண்ணிடப்பட்ட சேர்க்கைகள் & அநாமதேய கேள்வி பதில்" },
  pricingPubFeat6: { en: "Downloadable timestamped Evidence Pack", si: "බාගත හැකි කාල මුද්‍රා සාක්ෂි පැකේජය", ta: "பதிவிறக்கக்கூடிய நேர முத்திரை சான்று தொகுப்பு" },
  pricingCreateWorkspace: { en: "Create Company Workspace", si: "සමාගම් සේවා අවකාශය සාදන්න", ta: "நிறுவன பணியிடத்தை உருவாக்கவும்" },
  pricingPartnerApi: { en: "Partner API", si: "හවුල්කරු API", ta: "கூட்டாளர் API" },
  pricingLargeIntegrators: { en: "Large Integrators", si: "විශාල ඒකාබද්ධ කරන්නන්", ta: "பெரிய ஒருங்கிணைப்பாளர்கள்" },
  pricingPartnerDesc: { en: "Machine-readable feed with hashed API keys and webhooks.", si: "හැෂ් කළ API යතුරු සහ webhooks සමඟ යන්ත්‍ර-කියවිය හැකි සංග්‍රහය.", ta: "ஹாஷ் செய்யப்பட்ட API விசைகளுடன் இயந்திரம் படிக்கக்கூடிய ஊட்டம்." },
  pricingCustom: { en: "Custom", si: "අභිරුචි", ta: "தனிப்பயன்" },
  pricingPartnerFeat1: { en: "REST Partner API with daily quota", si: "දෛනික කෝටාව සමඟ REST API", ta: "தினசரி ஒதுக்கீட்டுடன் REST API" },
  pricingPartnerFeat2: { en: "Cursor-paged real-time notice polling", si: "තත්‍ය කාලීන නිවේදන සමීක්ෂණය", ta: "நிகழ்நேர அறிவிப்பு வாக்கெடுப்பு" },
  pricingPartnerFeat3: { en: "Webhook notifications with HMAC secrets", si: "HMAC රහස් සමඟ Webhook දැනුම්දීම්", ta: "HMAC ரகசியங்களுடன் Webhook அறிவிப்புகள்" },
  pricingPartnerFeat4: { en: "Dedicated account manager & SLA", si: "කැපවූ ගිණුම් කළමණාකරු සහ SLA", ta: "அர்ப்பணிக்கப்பட்ட கணக்கு மேலாளர் & SLA" },
  pricingPartnerFeat5: { en: "Unlimited seats & audit log export", si: "අසීමිත ආසන සහ විගණන අපනයනය", ta: "வரம்பற்ற இருக்கைகள் & தணிக்கை ஏற்றுமதி" },
  pricingContactSales: { en: "Contact Enterprise Sales", si: "ව්‍යවසාය අලෙවිය අමතන්න", ta: "நிறுவன விற்பனையை தொடர்பு கொள்ளவும்" },
  pricingHowBankWorks: { en: "How Bank Transfer Activation Works (§ 16)", si: "බැංකු හුවමාරු සක්‍රීය කිරීම ක්‍රියා කරන ආකාරය (§ 16)", ta: "வங்கி பரிமாற்ற செயல்பாடு எவ்வாறு செயல்படுகிறது (§ 16)" },
  pricingHowBankDesc: { en: "Following standard Sri Lankan commercial practice, payments settle directly to our corporate bank account. Once you submit the claim below, staff verify statement records and activate your subscription in one audited transaction.", si: "සම්මත ශ්‍රී ලාංකික වාණිජ පිළිවෙතට අනුව, ගෙවීම් සෘජුවම අපගේ ආයතනික බැංකු ගිණුමට බැර වේ. ඔබ පහත හිමිකම් පත්‍රය ඉදිරිපත් කළ පසු, කාර්ය මණ්ඩලය ප්‍රකාශන වාර්තා සත්‍යාපනය කර ඔබගේ දායකත්වය සක්‍රීය කරයි.", ta: "இலங்கை வணிக நடைமுறையைப் பின்பற்றி, பணம் நேரடியாக எங்கள் நிறுவன வங்கி கணக்கில் செலுத்தப்படுகிறது." },
  pricingPrimaryAccount: { en: "PRIMARY BANK ACCOUNT", si: "ප්‍රාථමික බැංකු ගිණුම", ta: "முதன்மை வங்கி கணக்கு" },
  pricingSecondaryAccount: { en: "SECONDARY BANK ACCOUNT", si: "ද්විතීයික බැංකු ගිණුම", ta: "இரண்டாம் நிலை வங்கி கணக்கு" },
  pricingBankName: { en: "Bank Name:", si: "බැංකු නාමය:", ta: "வங்கி பெயர்:" },
  pricingAccountNo: { en: "Account No:", si: "ගිණුම් අංකය:", ta: "கணக்கு எண்:" },
  pricingBranch: { en: "Branch:", si: "ශාඛාව:", ta: "கிளை:" },
  pricingAccountName: { en: "Account Name:", si: "ගිණුම් නාමය:", ta: "கணக்கு பெயர்:" },
  pricingWhatsAppSlip: { en: "WhatsApp slip copy directly to:", si: "WhatsApp ස්ලිප් පිටපත සෘජුවම:", ta: "WhatsApp சீட்டு நகலை நேரடியாக:" },
  pricingSubmitClaimNow: { en: "Submit Transfer Claim Now →", si: "දැන් හුවමාරු හිමිකම් ඉදිරිපත් කරන්න →", ta: "இப்போது பரிமாற்ற கோரிக்கையை சமர்ப்பிக்கவும் →" },
  pricingOfflineSettlement: { en: "OFFLINE SETTLEMENT", si: "නොබැඳි පියවීම", ta: "ஆஃப்லைன் தீர்வு" },
  pricingFileClaim: { en: "FILE SUBSCRIPTION CLAIM (§ 16)", si: "දායකත්ව හිමිකම් ගොනු කරන්න (§ 16)", ta: "சந்தா கோரிக்கையை தாக்கல் செய்யுங்கள் (§ 16)" },
  pricingClaimRegistered: { en: "Claim Registered in Staff Queue", si: "හිමිකම් කාර්ය මණ්ඩල පෝලිමේ ලියාපදිංචි විය", ta: "கோரிக்கை பணியாளர் வரிசையில் பதிவு செய்யப்பட்டது" },
  pricingClaimRegisteredDesc: { en: "Your transaction slip reference has been received. Our verification desk will verify against bank records and activate your subscription within 2 hours.", si: "ඔබගේ ගනුදෙනු ස්ලිප් යොමුව ලැබී ඇත. අපගේ සත්‍යාපන මේසය බැංකු වාර්තා සමඟ සත්‍යාපනය කර පැය 2ක් ඇතුළත ඔබගේ දායකත්වය සක්‍රීය කරනු ඇත.", ta: "உங்கள் பரிவர்த்தனை சீட்டு குறிப்பு பெறப்பட்டது. எங்கள் சரிபார்ப்பு மேசை 2 மணி நேரத்திற்குள் சரிபார்க்கும்." },
  pricingReturnToPlans: { en: "Return to Plans", si: "සැලසුම් වෙත ආපසු", ta: "திட்டங்களுக்கு திரும்பு" },
  pricingSelectedPlan: { en: "Selected Plan", si: "තෝරාගත් සැලැස්ම", ta: "தேர்ந்தெடுக்கப்பட்ட திட்டம்" },
  pricingBankTransferredFrom: { en: "Bank Transferred From", si: "හුවමාරු කළ බැංකුව", ta: "பரிமாற்றம் செய்யப்பட்ட வங்கி" },
  pricingBankPlaceholder: { en: "e.g. Commercial Bank / Sampath / BOC", si: "උදා. වාණිජ බැංකුව / සම්පත් / BOC", ta: "எ.கா. வணிக வங்கி / சம்பத் / BOC" },
  pricingSlipRef: { en: "Slip Reference / Transaction ID", si: "ස්ලිප් යොමුව / ගනුදෙනු හැඳුනුම", ta: "சீட்டு குறிப்பு / பரிவர்த்தனை ஐடி" },
  pricingSlipPlaceholder: { en: "e.g. TXN-8849102 or Bank Slip No", si: "උදා. TXN-8849102 හෝ බැංකු ස්ලිප් අංකය", ta: "எ.கா. TXN-8849102 அல்லது வங்கி சீட்டு எண்" },
  pricingConfirmChannel: { en: "Confirmation Channel", si: "තහවුරු කිරීමේ නාලිකාව", ta: "உறுதிப்படுத்தல் சேனல்" },
  pricingCancel: { en: "Cancel", si: "අවලංගු කරන්න", ta: "ரத்து செய்" },
  pricingSubmitClaim: { en: "Submit Claim →", si: "හිමිකම් ඉදිරිපත් කරන්න →", ta: "கோரிக்கையை சமர்ப்பிக்கவும் →" },

  // Contact
  contactTabContact: { en: "Contact Desk", si: "සම්බන්ධතා මේසය", ta: "தொடர்பு மேசை" },
  contactTabHQ: { en: "Headquarters", si: "මූලස්ථානය", ta: "தலைமையகம்" },
  contactTabSubmissions: { en: "Tender Submissions", si: "ටෙන්ඩර් ඉදිරිපත් කිරීම්", ta: "டெண்டர் சமர்ப்பிப்புகள்" },
  contactTabBilling: { en: "Support & Billing", si: "සහාය හා බිල්පත්", ta: "ஆதரவு & பில்லிங்" },
  contactTitleContact: { en: "CONTACT THE DESK", si: "මේසය අමතන්න", ta: "மேசையை தொடர்பு கொள்ளவும்" },
  contactTitleHQ: { en: "NATIONAL HEADQUARTERS", si: "ජාතික මූලස්ථානය", ta: "தேசிய தலைமையகம்" },
  contactTitleSubmissions: { en: "TENDER SUBMISSIONS", si: "ටෙන්ඩර් ඉදිරිපත් කිරීම්", ta: "டெண்டர் சமர்ப்பிப்புகள்" },
  contactTitleBilling: { en: "SUPPORT & BILLING", si: "සහාය හා බිල්පත්", ta: "ஆதரவு & பில்லிங்" },
  contactDescContact: { en: "Reach our procurement intelligence officers, editorial verification team, or publisher relations desk.", si: "අපගේ ප්‍රසම්පාදන බුද්ධි නිලධාරීන්, කර්තෘ සත්‍යාපන කණ්ඩායම හෝ ප්‍රකාශක සබඳතා මේසය වෙත ළඟා වන්න.", ta: "எங்கள் கொள்முதல் நுண்ணறிவு அதிகாரிகள், ஆசிரியர் குழுவை அணுகவும்." },
  contactDescHQ: { en: "Executive operations, state entity protocol, and institutional oversight at World Trade Centre, Colombo.", si: "කොළඹ ලෝක වෙළඳ මධ්‍යස්ථානයේ විධායක මෙහෙයුම්, රාජ්‍ය ආයතන ප්‍රොටෝකෝලය සහ ආයතනික අධීක්ෂණය.", ta: "கொழும்பு உலக வர்த்தக மையத்தில் நிர்வாக செயல்பாடுகள்." },
  contactDescSubmissions: { en: "Submit government gazettes, corporate procurement notices, expression of interest (EOI), and parate auctions.", si: "රජයේ ගැසට්, ආයතනික ප්‍රසම්පාදන නිවේදන, උනන්දුව ප්‍රකාශ කිරීම් සහ පැරටේ වෙන්දේසි ඉදිරිපත් කරන්න.", ta: "அரசு வர்த்தமானிகள், நிறுவன கொள்முதல் அறிவிப்புகளை சமர்ப்பிக்கவும்." },
  contactDescBilling: { en: "Assistance with offline bank claims, corporate annual subscriptions, invoice receipts, and billing verification.", si: "නොබැඳි බැංකු හිමිකම්, ආයතනික වාර්ෂික දායකත්ව, ඉන්වොයිස් කුවිතාන්සි සහ බිල්පත් සත්‍යාපනය සඳහා සහාය.", ta: "ஆஃப்லைன் வங்கி கோரிக்கைகள், நிறுவன சந்தாக்களுக்கு உதவி." },
  contactFormTitleContact: { en: "Submit an Inquiry", si: "විමසීමක් ඉදිරිපත් කරන්න", ta: "விசாரணையை சமர்ப்பிக்கவும்" },
  contactFormTitleHQ: { en: "Institutional Executive Inquiry", si: "ආයතනික විධායක විමසීම", ta: "நிறுவன நிர்வாக விசாரணை" },
  contactFormTitleSubmissions: { en: "Publish a Notice Inquiry", si: "නිවේදන ප්‍රකාශන විමසීම", ta: "அறிவிப்பு வெளியீட்டு விசாரணை" },
  contactFormTitleBilling: { en: "Billing & Account Verification", si: "බිල්පත් සහ ගිණුම් සත්‍යාපනය", ta: "பில்லிங் & கணக்கு சரிபார்ப்பு" },
  contactInquirySuccess: { en: "Inquiry Received Successfully", si: "විමසීම සාර්ථකව ලැබුණි", ta: "விசாரணை வெற்றிகரமாக பெறப்பட்டது" },
  contactInquirySuccessDesc: { en: "Your transmission has been logged. A designated procurement officer from the", si: "ඔබගේ සම්ප්‍රේෂණය සටහන් කර ඇත. අදාළ ප්‍රසම්පාදන නිලධාරියෙකු", ta: "உங்கள் பரிமாற்றம் பதிவு செய்யப்பட்டது. நியமிக்கப்பட்ட கொள்முதல் அதிகாரி" },
  contactInquiryDeskSuffix: { en: "desk will contact you within 2 business hours.", si: "මේසයෙන් පැය 2ක් ඇතුළත ඔබ අමතනු ඇත.", ta: "மேசை 2 வணிக மணி நேரத்திற்குள் உங்களை தொடர்பு கொள்ளும்." },
  contactSubmitAnother: { en: "Submit Another Inquiry", si: "තවත් විමසීමක් ඉදිරිපත් කරන්න", ta: "மற்றொரு விசாரணையை சமர்ப்பிக்கவும்" },
  contactFullName: { en: "Full Name", si: "සම්පූර්ණ නම", ta: "முழு பெயர்" },
  contactFullNamePlaceholder: { en: "John Silva", si: "ජෝන් සිල්වා", ta: "ஜான் சில்வா" },
  contactCompany: { en: "Company Organization", si: "සමාගම් සංවිධානය", ta: "நிறுவன அமைப்பு" },
  contactCompanyPlaceholder: { en: "Silva Enterprises Ltd", si: "සිල්වා එන්ටර්ප්‍රයිසස්", ta: "சில்வா எண்டர்பிரைசஸ் லிமிடெட்" },
  contactEmail: { en: "Email Address", si: "විද්‍යුත් තැපැල් ලිපිනය", ta: "மின்னஞ்சல் முகவரி" },
  contactEmailPlaceholder: { en: "john@silva.lk", si: "john@silva.lk", ta: "john@silva.lk" },
  contactPhone: { en: "Phone Number", si: "දුරකථන අංකය", ta: "தொலைபேசி எண்" },
  contactPhonePlaceholder: { en: "+94 77 XXX XXXX", si: "+94 77 XXX XXXX", ta: "+94 77 XXX XXXX" },
  contactSubjectDept: { en: "Subject / Department", si: "විෂය / දෙපාර්තමේන්තුව", ta: "பொருள் / துறை" },
  contactYourMessage: { en: "Your Message", si: "ඔබගේ පණිවිඩය", ta: "உங்கள் செய்தி" },
  contactYourMessagePlaceholder: { en: "Describe your request...", si: "ඔබගේ ඉල්ලීම විස්තර කරන්න...", ta: "உங்கள் கோரிக்கையை விவரிக்கவும்..." },
  contactSendMessage: { en: "Send Message", si: "පණිවිඩය යවන්න", ta: "செய்தி அனுப்பவும்" },
  contactCentralOffice: { en: "Central Office", si: "මධ්‍යම කාර්යාලය", ta: "மத்திய அலுவலகம்" },
  contactHeadquartersName: { en: "TenderHub Procurement Headquarters", si: "ටෙන්ඩර්හබ් ප්‍රසම්පාදන මූලස්ථානය", ta: "டெண்டர்ஹப் கொள்முதல் தலைமையகம்" },
  contactHeadquartersAddress: { en: "Level 14, World Trade Centre, Echelon Square, Colombo 01, Sri Lanka.", si: "14 වන මහල, ලෝක වෙළඳ මධ්‍යස්ථානය, කොළඹ 01, ශ්‍රී ලංකාව.", ta: "நிலை 14, உலக வர்த்தக மையம், கொழும்பு 01, இலங்கை." },
  contactTel: { en: "Tel: +94 11 200 8000 / +94 11 200 8001", si: "දුරකථන: +94 11 200 8000 / +94 11 200 8001", ta: "தொலைபேசி: +94 11 200 8000 / +94 11 200 8001" },
  contactEditorialDesk: { en: "Editorial Desk", si: "කර්තෘ මේසය", ta: "ஆசிரியர் மேசை" },
  contactPublishTender: { en: "Publish a Tender or RFP", si: "ටෙන්ඩරයක් හෝ RFP ප්‍රකාශ කරන්න", ta: "டெண்டர் அல்லது RFP வெளியிடவும்" },
  contactPublishDesc: { en: "Need to broadcast an Expression of Interest or Vendor Registration to 3,200+ verified Sri Lankan suppliers?", si: "3,200+ කට අධික තහවුරු කළ ශ්‍රී ලාංකික සැපයුම්කරුවන් වෙත උනන්දුව ප්‍රකාශ කිරීමක් ප්‍රචාරය කිරීමට අවශ්‍යද?", ta: "3,200+ க்கும் மேற்பட்ட சரிபார்க்கப்பட்ட சப்ளையர்களுக்கு ஆர்வ வெளிப்பாட்டை ஒளிபரப்ப வேண்டுமா?" },
  contactSubmitTenderNotice: { en: "Submit Tender Notice", si: "ටෙන්ඩර් නිවේදනය ඉදිරිපත් කරන්න", ta: "டெண்டர் அறிவிப்பை சமர்ப்பிக்கவும்" },
  contactBillingHotline: { en: "Billing Priority Hotline", si: "බිල්පත් ප්‍රමුඛතා දුරකථනය", ta: "பில்லிங் முன்னுரிமை ஹாட்லைன்" },
  contactDirectBankClaim: { en: "Direct Bank Claim Verification", si: "සෘජු බැංකු හිමිකම් සත්‍යාපනය", ta: "நேரடி வங்கி கோரிக்கை சரிபார்ப்பு" },
  contactBillingDesc2: { en: "For faster activation of your Enterprise subscription, attach your bank transfer slip or contact:", si: "ඔබගේ ව්‍යවසාය දායකත්වය වේගයෙන් සක්‍රීය කිරීමට, ඔබගේ බැංකු හුවමාරු ස්ලිප් අමුණන්න හෝ අමතන්න:", ta: "உங்கள் நிறுவன சந்தாவை விரைவாக செயல்படுத்த, உங்கள் வங்கி பரிமாற்ற சீட்டை இணைக்கவும்:" },

  // Tender Detail
  tenderBreadcrumbHome: { en: "Home", si: "මුල් පිටුව", ta: "முகப்பு" },
  tenderBreadcrumbGazettes: { en: "Procurement Gazettes", si: "ප්‍රසම්පාදන ගැසට්", ta: "கொள்முதல் வர்த்தமானிகள்" },
  tenderClosingIn: { en: "Closing in", si: "අවසන් වීමට", ta: "முடிவடைகிறது" },
  tenderDays: { en: "Days", si: "දින", ta: "நாட்கள்" },
  tenderGazettePub: { en: "Gazette Publication:", si: "ගැසට් ප්‍රකාශනය:", ta: "வர்த்தமானி வெளியீடு:" },
  tenderProcureParams: { en: "Procurement Parameters", si: "ප්‍රසම්පාදන පරාමිතීන්", ta: "கொள்முதல் அளவுருக்கள்" },
  tenderEstBudget: { en: "ESTIMATED BUDGET", si: "ඇස්තමේන්තු අයවැය", ta: "மதிப்பிடப்பட்ட பட்ஜெட்" },
  tenderBidBond: { en: "REQUIRED BID SECURITY BOND", si: "අවශ්‍ය ලංසු සුරක්ෂිතතා ඇපය", ta: "தேவையான ஏல பாதுகாப்பு பிணை" },
  tenderValidity: { en: "Validity:", si: "වලංගුතාව:", ta: "செல்லுபடியாகும்:" },
  tenderSubmissionDeadline: { en: "SUBMISSION DEADLINE", si: "ඉදිරිපත් කිරීමේ අවසන් දිනය", ta: "சமர்ப்பிப்பு காலக்கெடு" },
  tenderDaysRemaining: { en: "days remaining", si: "දින ඉතිරිව ඇත", ta: "நாட்கள் மீதம்" },
  tenderSealedOpening: { en: "SEALED BID OPENING", si: "මුද්‍රා තැබූ ලංසු විවෘත කිරීම", ta: "முத்திரையிடப்பட்ட ஏல திறப்பு" },
  tenderDocFee: { en: "DOCUMENT PURCHASE FEE", si: "ලේඛන මිලදී ගැනීමේ ගාස්තුව", ta: "ஆவண கொள்முதல் கட்டணம்" },
  tenderSaveWatchlist: { en: "Save to Watchlist", si: "නිරීක්ෂණ ලැයිස්තුවට සුරකින්න", ta: "கண்காணிப்பு பட்டியலில் சேமிக்கவும்" },
  tenderSavedWatchlist: { en: "Saved to Watchlist", si: "නිරීක්ෂණ ලැයිස්තුවට සුරකින ලදී", ta: "கண்காணிப்பு பட்டியலில் சேமிக்கப்பட்டது" },
  tenderCopyRef: { en: "Copy Reference Code", si: "යොමු කේතය පිටපත් කරන්න", ta: "குறிப்பு குறியீட்டை நகலெடுக்கவும்" },
  tenderRefCopied: { en: "Reference Code Copied", si: "යොමු කේතය පිටපත් කරන ලදී", ta: "குறிப்பு குறியீடு நகலெடுக்கப்பட்டது" },
  tenderProcuringContact: { en: "Procuring Entity Contact", si: "ප්‍රසම්පාදන ආයතන සම්බන්ධතා", ta: "கொள்முதல் நிறுவன தொடர்பு" },
  tenderTelephone: { en: "Telephone:", si: "දුරකථන:", ta: "தொலைபேசி:" },
  tenderOfficialEmail: { en: "Official Email:", si: "නිල විද්‍යුත් තැපෑල:", ta: "அதிகாரப்பூர்வ மின்னஞ்சல்:" },
  tenderTabScope: { en: "Scope of Work & Specifications", si: "කාර්ය පථය හා පිරිවිතර", ta: "பணி நோக்கம் & விவரக்குறிப்புகள்" },
  tenderTabDocs: { en: "Bidding Documents", si: "ලංසු ලේඛන", ta: "ஏல ஆவணங்கள்" },
  tenderTabCida: { en: "CIDA & Eligibility Criteria", si: "CIDA සහ සුදුසුකම් නිර්ණායක", ta: "CIDA & தகுதி அளவுகோல்கள்" },
  tenderTabInquiries: { en: "Submission & Inquiries", si: "ඉදිරිපත් කිරීම හා විමසීම්", ta: "சமர்ப்பிப்பு & விசாரணைகள்" },
  tenderScopeWorkDesc: { en: "1. Scope of Work Description", si: "1. කාර්ය පථ විස්තරය", ta: "1. பணி நோக்க விளக்கம்" },
  tenderKeyTechnical: { en: "2. Key Technical Standards & Deliverables", si: "2. ප්‍රධාන තාක්ෂණික ප්‍රමිතීන්", ta: "2. முக்கிய தொழில்நுட்ப தரநிலைகள்" },
  tenderContractPeriod: { en: "Contract Execution Period", si: "කොන්ත්‍රාත් ක්‍රියාත්මක කිරීමේ කාලය", ta: "ஒப்பந்த செயல்படுத்தல் காலம்" },
  tenderPaymentTerms: { en: "Commercial Payment Terms", si: "වාණිජ ගෙවීම් කොන්දේසි", ta: "வணிக கட்டண விதிமுறைகள்" },
  tenderOfficialFiles: { en: "Official Bidding Dossier Files (SHA-256 Verified)", si: "නිල ලංසු ලේඛන ගොනු (SHA-256 සත්‍යාපිත)", ta: "அதிகாரப்பூர்வ ஏல கோப்புகள் (SHA-256 சரிபார்க்கப்பட்டது)" },
  tenderOfficialMirror: { en: "Official Government Mirror", si: "නිල රජයේ පිළිබිඹුව", ta: "அதிகாரப்பூர்வ அரசு பிரதி" },
  tenderDownloadInitiated: { en: "Download initiated for", si: "බාගත කිරීම ආරම්භ විය", ta: "பதிவிறக்கம் தொடங்கப்பட்டது" },
  tenderDownloadFile: { en: "Download File", si: "ගොනුව බාගන්න", ta: "கோப்பை பதிவிறக்கவும்" },
  tenderCidaGrade: { en: "Contractor CIDA Registration Grade", si: "කොන්ත්‍රාත්කරු CIDA ලියාපදිංචි ශ්‍රේණිය", ta: "ஒப்பந்தக்காரர் CIDA பதிவு தரம்" },
  tenderCidaGradeDesc: { en: "Bidders must submit a certified copy of valid registration for the current financial year.", si: "ලංසුකරුවන් වත්මන් මූල්‍ය වර්ෂය සඳහා වලංගු ලියාපදිංචියේ සහතික කළ පිටපතක් ඉදිරිපත් කළ යුතුය.", ta: "ஏலதாரர்கள் நடப்பு நிதியாண்டிற்கான செல்லுபடியாகும் பதிவின் சான்றளிக்கப்பட்ட நகலை சமர்ப்பிக்க வேண்டும்." },
  tenderBidSecurityReq: { en: "Bid Security Guarantee Requirement", si: "ලංසු සුරක්ෂිතතා ඇප අවශ්‍යතාව", ta: "ஏல பாதுகாப்பு உத்தரவாத தேவை" },
  tenderGuaranteeValidity: { en: "Guarantee validity must extend", si: "ඇපයේ වලංගුතාව දීර්ඝ විය යුතුය", ta: "உத்தரவாத செல்லுபடியாகும் காலம் நீட்டிக்கப்பட வேண்டும்" },
  tenderSubmissionAddress: { en: "Physical Tender Box Submission Address", si: "භෞතික ටෙන්ඩර් පෙට්ටි ඉදිරිපත් කිරීමේ ලිපිනය", ta: "இயற்பியல் டெண்டர் பெட்டி சமர்ப்பிப்பு முகவரி" },
  tenderPreBidMeeting: { en: "Pre-Bid Clarification Conference", si: "පෙර-ලංසු පැහැදිලි කිරීමේ සමුළුව", ta: "முன்-ஏல தெளிவுபடுத்தல் மாநாடு" },

  // Login
  loginTitle: { en: "SUPPLIER PORTAL LOGIN", si: "සැපයුම්කරු ද්වාර පිවිසුම", ta: "சப்ளையர் போர்டல் உள்நுழைவு" },
  loginSubtitle: { en: "Enter your authorized credentials to access live tender gazettes", si: "සජීවී ටෙන්ඩර් ගැසට් වෙත ප්‍රවේශ වීමට ඔබගේ බලයලත් අක්තපත්‍ර ඇතුළත් කරන්න", ta: "நேரடி டெண்டர் வர்த்தமானிகளை அணுக உங்கள் அங்கீகரிக்கப்பட்ட நற்சான்றிதழ்களை உள்ளிடவும்" },
  loginEmailLabel: { en: "Email Address", si: "විද්‍යුත් තැපැල් ලිපිනය", ta: "மின்னஞ்சல் முகவரி" },
  loginEmailPlaceholder: { en: "supplier@company.lk", si: "supplier@company.lk", ta: "supplier@company.lk" },
  loginPasswordLabel: { en: "Password", si: "මුරපදය", ta: "கடவுச்சொல்" },
  loginForgot: { en: "Forgot password?", si: "මුරපදය අමතකද?", ta: "கடவுச்சொல் மறந்துவிட்டதா?" },
  loginSignIn: { en: "Sign In to Portal", si: "ද්වාරයට පිවිසෙන්න", ta: "போர்டலில் உள்நுழையவும்" },
  loginAuthenticating: { en: "Authenticating...", si: "සත්‍යාපනය කරමින්...", ta: "அங்கீகரிக்கிறது..." },
  loginNewContractor: { en: "New contractor or enterprise?", si: "නව කොන්ත්‍රාත්කරු හෝ ව්‍යවසායයක්ද?", ta: "புதிய ஒப்பந்தக்காரர் அல்லது நிறுவனமா?" },
  loginRegisterFree: { en: "Register for Free", si: "නොමිලේ ලියාපදිංචි වන්න", ta: "இலவசமாக பதிவு செய்யுங்கள்" },
  loginResetTitle: { en: "RESET PASSWORD", si: "මුරපදය යළි සකසන්න", ta: "கடவுச்சொல்லை மீட்டமைக்கவும்" },
  loginResetSubtitle: { en: "Enter your registered corporate email to receive a secure recovery link", si: "ආරක්ෂිත ප්‍රතිසාධන සබැඳියක් ලබා ගැනීමට ඔබගේ ලියාපදිංචි ආයතනික විද්‍යුත් තැපෑල ඇතුළත් කරන්න", ta: "பாதுகாப்பான மீட்பு இணைப்பைப் பெற உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சலை உள்ளிடவும்" },
  loginRecoveryDispatched: { en: "Recovery Link Dispatched", si: "ප්‍රතිසාධන සබැඳිය යවන ලදී", ta: "மீட்பு இணைப்பு அனுப்பப்பட்டது" },
  loginRecoveryDesc: { en: "A secure reset link has been dispatched to", si: "ආරක්ෂිත යළි සැකසුම් සබැඳියක් වෙත යවා ඇත", ta: "பாதுகாப்பான மீட்டமைப்பு இணைப்பு அனுப்பப்பட்டது" },
  loginCheckInbox: { en: "Please check your inbox and spam folders.", si: "කරුණාකර ඔබගේ එන ලිපි සහ ස්පෑම් ෆෝල්ඩර පරීක්ෂා කරන්න.", ta: "உங்கள் இன்பாக்ஸ் மற்றும் ஸ்பேம் கோப்புறைகளை சரிபார்க்கவும்." },
  loginReturnSignIn: { en: "Return to Sign In", si: "පිවිසුමට ආපසු", ta: "உள்நுழைவுக்கு திரும்பு" },
  loginCorporateEmail: { en: "Corporate Email Address", si: "ආයතනික විද්‍යුත් තැපැල් ලිපිනය", ta: "நிறுவன மின்னஞ்சல் முகவரி" },
  loginSendRecovery: { en: "Send Recovery Link", si: "ප්‍රතිසාධන සබැඳිය යවන්න", ta: "மீட்பு இணைப்பை அனுப்பவும்" },
  loginBackToSignIn: { en: "← Back to Portal Sign In", si: "← ද්වාර පිවිසුමට ආපසු", ta: "← போர்டல் உள்நுழைவுக்கு திரும்பு" },

  // Register
  registerTitle: { en: "SUPPLIER REGISTRATION", si: "සැපයුම්කරු ලියාපදිංචිය", ta: "சப்ளையர் பதிவு" },
  registerSubtitle: { en: "Register your company to receive daily procurement notifications & tender RFPs", si: "දෛනික ප්‍රසම්පාදන දැනුම්දීම් සහ ටෙන්ඩර් RFP ලබා ගැනීමට ඔබගේ සමාගම ලියාපදිංචි කරන්න", ta: "தினசரி கொள்முதல் அறிவிப்புகளைப் பெற உங்கள் நிறுவனத்தை பதிவு செய்யுங்கள்" },
  registerFirstName: { en: "First Name", si: "මුල් නම", ta: "முதல் பெயர்" },
  registerFirstNamePh: { en: "Kamal", si: "කමල්", ta: "கமல்" },
  registerLastName: { en: "Last Name", si: "අවසන් නම", ta: "கடைசி பெயர்" },
  registerLastNamePh: { en: "Perera", si: "පෙරේරා", ta: "பெரேரா" },
  registerBusinessName: { en: "Registered Business Name", si: "ලියාපදිංචි ව්‍යාපාර නාමය", ta: "பதிவு செய்யப்பட்ட வணிக பெயர்" },
  registerBusinessPh: { en: "Perera Engineering (Pvt) Ltd", si: "පෙරේරා ඉංජිනේරින් (පුද්) සමාගම", ta: "பெரேரா இன்ஜினியரிங் (பிரைவேட்) லிமிடெட்" },
  registerCategoryLabel: { en: "Primary Category of Interest", si: "ප්‍රධාන උනන්දුව දක්වන කාණ්ඩය", ta: "முதன்மை ஆர்வ வகை" },
  registerCorporateEmail: { en: "Corporate Email Address", si: "ආයතනික විද්‍යුත් තැපැල් ලිපිනය", ta: "நிறுவன மின்னஞ்சல் முகவரி" },
  registerCorporateEmailPh: { en: "kamal@perera.lk", si: "kamal@perera.lk", ta: "kamal@perera.lk" },
  registerCreatePassword: { en: "Create Password", si: "මුරපදය සාදන්න", ta: "கடவுச்சொல்லை உருவாக்கவும்" },
  registerComplete: { en: "Complete Free Registration", si: "නොමිලේ ලියාපදිංචිය සම්පූර්ණ කරන්න", ta: "இலவச பதிவை முடிக்கவும்" },
  registerCreating: { en: "Creating Workspace...", si: "සේවා අවකාශය සාදමින්...", ta: "பணியிடத்தை உருவாக்குகிறது..." },
  registerAlreadyHave: { en: "Already have an authorized supplier account?", si: "දැනටමත් බලයලත් සැපයුම්කරු ගිණුමක් තිබේද?", ta: "ஏற்கனவே அங்கீகரிக்கப்பட்ட சப்ளையர் கணக்கு உள்ளதா?" },
  registerSignInHere: { en: "Sign In Here", si: "මෙහි පිවිසෙන්න", ta: "இங்கே உள்நுழையவும்" },

  // Dashboard
  dashVerifiedWorkspace: { en: "CIDA VERIFIED SUPPLIER WORKSPACE", si: "CIDA සත්‍යාපිත සැපයුම්කරු සේවා අවකාශය", ta: "CIDA சரிபார்க்கப்பட்ட சப்ளையர் பணியிடம்" },
  dashBusinessActive: { en: "Business Bidder (Annual Active)", si: "ව්‍යාපාරික ලංසුකරු (වාර්ෂික සක්‍රීය)", ta: "வணிக ஏலதாரர் (ஆண்டு செயலில்)" },
  dashSignOut: { en: "Sign Out", si: "පිටවන්න", ta: "வெளியேறு" },
  dashRegisteredContractor: { en: "REGISTERED CONTRACTOR", si: "ලියාපදිංචි කොන්ත්‍රාත්කරු", ta: "பதிவு செய்யப்பட்ட ஒப்பந்தக்காரர்" },
  dashOfficerInCharge: { en: "Officer in Charge:", si: "භාර නිලධාරී:", ta: "பொறுப்பு அதிகாரி:" },
  dashPrimaryTrade: { en: "Primary Trade:", si: "ප්‍රධාන වෙළඳාම:", ta: "முதன்மை வர்த்தகம்:" },
  dashSearchBids: { en: "Search Bids", si: "ලංසු සොයන්න", ta: "ஏலங்களை தேடு" },
  dashWatchlist: { en: "Watchlist", si: "නිරීක්ෂණ ලැයිස්තුව", ta: "கண்காணிப்பு பட்டியல்" },
  dashMatchingNotices: { en: "MATCHING NOTICES", si: "ගැලපෙන නිවේදන", ta: "பொருந்தும் அறிவிப்புகள்" },
  dashClosingWeek: { en: "CLOSING THIS WEEK", si: "මේ සතියේ අවසන් වන", ta: "இந்த வாரம் முடிவடைகிறது" },
  dashActiveWatchlist: { en: "ACTIVE WATCHLIST", si: "සක්‍රීය නිරීක්ෂණ ලැයිස්තුව", ta: "செயலில் உள்ள கண்காணிப்பு" },
  dashPipelineValue: { en: "PIPELINE VALUE", si: "නල මාර්ග වටිනාකම", ta: "குழாய் மதிப்பு" },
  dashLive: { en: "Live", si: "සජීවී", ta: "நேரடி" },
  dashUrgent: { en: "Urgent", si: "හදිසි", ta: "அவசரம்" },
  dashSaved: { en: "Saved", si: "සුරකින ලදී", ta: "சேமிக்கப்பட்டது" },
  dashInTradeSectors: { en: "In your registered trade sectors", si: "ඔබගේ ලියාපදිංචි වෙළඳ අංශ වල", ta: "உங்கள் பதிவு செய்யப்பட்ட வர்த்தக துறைகளில்" },
  dashDeadline7Days: { en: "Submission deadline within 7 days", si: "දින 7ක් ඇතුළත ඉදිරිපත් කිරීමේ අවසන් දිනය", ta: "7 நாட்களுக்குள் சமர்ப்பிப்பு காலக்கெடு" },
  dashPinnedAlerts: { en: "Pinned for deadline alerts", si: "අවසන් දින ඇඟවීම් සඳහා අමුණා ඇත", ta: "காலக்கெடு எச்சரிக்கைகளுக்காக பொருத்தப்பட்டது" },
  dashAggregateBand: { en: "Aggregate opportunity band", si: "සමස්ත අවස්ථා පරාසය", ta: "மொத்த வாய்ப்பு வரம்பு" },
  dashAuthorizedOfficer: { en: "Authorized Officer", si: "බලයලත් නිලධාරී", ta: "அங்கீகரிக்கப்பட்ட அதிகாரி" },
  dashOverview: { en: "Dashboard Overview", si: "උපකරණ පුවරු දළ විශ්ලේෂණය", ta: "டாஷ்போர்டு கண்ணோட்டம்" },
  dashRelatedLive: { en: "Related Live Tenders", si: "සම්බන්ධ සජීවී ටෙන්ඩර්", ta: "தொடர்புடைய நேரடி டெண்டர்கள்" },
  dashFavourite: { en: "Favourite / Watchlist", si: "ප්‍රියතම / නිරීක්ෂණ ලැයිස්තුව", ta: "பிடித்தவை / கண்காணிப்பு" },
  dashCompanyDetails: { en: "Company & User Details", si: "සමාගම් සහ පරිශීලක විස්තර", ta: "நிறுவனம் & பயனர் விவரங்கள்" },
  dashLogout: { en: "Logout", si: "පිටවීම", ta: "வெளியேறு" },
  dashHelpdesk: { en: "PROCUREMENT HELPDESK", si: "ප්‍රසම්පාදන උපකාරක මේසය", ta: "கொள்முதல் உதவி மேசை" },
  dashCidaSupport: { en: "CIDA & Bidding Support", si: "CIDA සහ ලංසු සහාය", ta: "CIDA & ஏல ஆதரவு" },
  dashNeedGuidance: { en: "Need guidance on bid bonds, eligibility criteria, or parate notices?", si: "ලංසු ඇප, සුදුසුකම් නිර්ණායක හෝ පැරටේ නිවේදන පිළිබඳ මග පෙන්වීමක් අවශ්‍යද?", ta: "ஏல பிணைகள், தகுதி அளவுகோல்கள் குறித்த வழிகாட்டுதல் தேவையா?" },
  dashHotline: { en: "Hotline: +94 11 200 8000", si: "උණුසුම් රේඛාව: +94 11 200 8000", ta: "ஹாட்லைன்: +94 11 200 8000" },
  dashCentralRepo: { en: "CENTRAL REPOSITORY", si: "මධ්‍යම ගබඩාව", ta: "மத்திய களஞ்சியம்" },
  dashNationalFeed: { en: "TenderHub National Procurement Feed", si: "ටෙන්ඩර්හබ් ජාතික ප්‍රසම්පාදන සංග්‍රහය", ta: "டெண்டர்ஹப் தேசிய கொள்முதல் ஊட்டம்" },
  dashSyncDaily: { en: "Sync: 05:00 AM Daily", si: "සමමුහුර්ත: දිනපතා පෙ.ව. 05:00", ta: "ஒத்திசைவு: தினமும் காலை 05:00" },
  dashAllNoticesHarvested: { en: "All notices in your feed are harvested directly from government gazettes, state ministries, municipal councils, and verified corporate boards across Sri Lanka.", si: "ඔබගේ සංග්‍රහයේ ඇති සියලුම නිවේදන ශ්‍රී ලංකාව පුරා රජයේ ගැසට්, රාජ්‍ය අමාත්‍යාංශ, නගර සභා සහ සත්‍යාපිත ආයතනික මණ්ඩල වලින් සෘජුවම ලබා ගනී.", ta: "உங்கள் ஊட்டத்தில் உள்ள அனைத்து அறிவிப்புகளும் அரசு வர்த்தமானிகளிலிருந்து நேரடியாக சேகரிக்கப்படுகின்றன." },
  dashBrowseMatching: { en: "Browse Matching Tenders →", si: "ගැලපෙන ටෙන්ඩර් බලන්න →", ta: "பொருந்தும் டெண்டர்களை உலாவுக →" },
  dashViewWatchlist: { en: "View Watchlist", si: "නිරීක්ෂණ ලැයිස්තුව බලන්න", ta: "கண்காணிப்பு பட்டியலைப் பார்க்கவும்" },
  dashPriorityTenders: { en: "Priority Tenders for Your Contractor Profile", si: "ඔබගේ කොන්ත්‍රාත්කරු පැතිකඩ සඳහා ප්‍රමුඛ ටෙන්ඩර්", ta: "உங்கள் ஒப்பந்தக்காரர் சுயவிவரத்திற்கான முன்னுரிமை டெண்டர்கள்" },
  dashViewAllRelated: { en: "View All Related Bids →", si: "සියලුම සම්බන්ධ ලංසු බලන්න →", ta: "அனைத்து தொடர்புடைய ஏலங்களையும் காண்க →" },
  dashEstBudget: { en: "Est. Budget", si: "ඇස්ත. අයවැය", ta: "மதிப்பிடப்பட்ட பட்ஜெட்" },
  dashSave: { en: "Save", si: "සුරකින්න", ta: "சேமி" },
  dashDossier: { en: "Dossier →", si: "ලේඛනය →", ta: "ஆவணம் →" },
  dashRelatedTitle: { en: "Related Live Procurement Opportunities", si: "සම්බන්ධ සජීවී ප්‍රසම්පාදන අවස්ථා", ta: "தொடர்புடைய நேரடி கொள்முதல் வாய்ப்புகள்" },
  dashRelatedDesc: { en: "Procurement notices matching your CIDA contractor registration categories, provincial operational areas, and business scope.", si: "ඔබගේ CIDA කොන්ත්‍රාත්කරු ලියාපදිංචි කාණ්ඩ, පළාත් මෙහෙයුම් ප්‍රදේශ සහ ව්‍යාපාර විෂය පථයට ගැලපෙන ප්‍රසම්පාදන නිවේදන.", ta: "உங்கள் CIDA ஒப்பந்தக்காரர் பதிவு வகைகளுடன் பொருந்தும் கொள்முதல் அறிவிப்புகள்." },
  dashSearchRelatedPlaceholder: { en: "Search related tenders by title, ref code, or ministry...", si: "මාතෘකාව, යොමු කේතය හෝ අමාත්‍යාංශය අනුව සම්බන්ධ ටෙන්ඩර් සොයන්න...", ta: "தலைப்பு, குறிப்பு குறியீடு அல்லது அமைச்சகத்தால் தேடுங்கள்..." },
  dashAllSectors: { en: "All Sectors", si: "සියලුම අංශ", ta: "அனைத்து துறைகள்" },
  dashCivilWorks: { en: "Civil Works", si: "සිවිල් වැඩ", ta: "சிவில் பணிகள்" },
  dashSolarEnergy: { en: "Solar & Energy", si: "සූර්ය හා බලශක්ති", ta: "சூரிய & ஆற்றல்" },
  dashITServers: { en: "IT & Servers", si: "තොරතුරු තාක්ෂණ හා සර්වර්", ta: "IT & சேவையகங்கள்" },
  dashViewDossier: { en: "View Dossier →", si: "ලේඛනය බලන්න →", ta: "ஆவணத்தைப் பார்க்கவும் →" },
  dashWatchlistTitle: { en: "Your Procurement Watchlist", si: "ඔබගේ ප්‍රසම්පාදන නිරීක්ෂණ ලැයිස්තුව", ta: "உங்கள் கொள்முதல் கண்காணிப்பு பட்டியல்" },
  dashMonitoredTenders: { en: "Monitored tenders with real-time submission countdowns and bid security bond criteria.", si: "තත්‍ය කාලීන ඉදිරිපත් කිරීමේ ගණන් කිරීම් සහ ලංසු සුරක්ෂිතතා නිර්ණායක සමඟ නිරීක්ෂණය කළ ටෙන්ඩර්.", ta: "நிகழ்நேர சமர்ப்பிப்பு கவுண்ட்டவுன்களுடன் கண்காணிக்கப்பட்ட டெண்டர்கள்." },
  dashAddMore: { en: "+ Add More Tenders", si: "+ තවත් ටෙන්ඩර් එක් කරන්න", ta: "+ மேலும் டெண்டர்களைச் சேர்க்கவும்" },
  dashEmptyWatchlist: { en: "Your Watchlist is Currently Empty", si: "ඔබගේ නිරීක්ෂණ ලැයිස්තුව දැනට හිස්ය", ta: "உங்கள் கண்காணிப்பு பட்டியல் தற்போது காலியாக உள்ளது" },
  dashClickSave: { en: "Click the \"Save\" button on any tender to pin it to your workspace for deadline alerts and bidding tracking.", si: "අවසන් දින ඇඟවීම් සඳහා ඕනෑම ටෙන්ඩරයක \"සුරකින්න\" බොත්තම ක්ලික් කරන්න.", ta: "எந்த டெண்டரிலும் \"சேமி\" பொத்தானைக் கிளிக் செய்யவும்." },
  dashBrowseAvailable: { en: "Browse Available Tenders", si: "පවතින ටෙන්ඩර් බලන්න", ta: "கிடைக்கக்கூடிய டெண்டர்களை உலாவுக" },
  dashDeadline: { en: "Deadline:", si: "අවසන් දිනය:", ta: "காலக்கெடு:" },
  dashBidBond: { en: "Bid Bond:", si: "ලංසු ඇපය:", ta: "ஏல பிணை:" },
  dashFee: { en: "Fee:", si: "ගාස්තුව:", ta: "கட்டணம்:" },
  dashRemove: { en: "Remove", si: "ඉවත් කරන්න", ta: "அகற்று" },
  dashFullDossier: { en: "Full Dossier →", si: "සම්පූර්ණ ලේඛනය →", ta: "முழு ஆவணம் →" },
  dashCompanyProfile: { en: "Company Profile & Intelligence Alerts", si: "සමාගම් පැතිකඩ සහ බුද්ධි ඇඟවීම්", ta: "நிறுவன சுயவிவரம் & நுண்ணறிவு எச்சரிக்கைகள்" },
  dashKeepAuthorized: { en: "Keep your authorized company registration, CIDA contractor grading, and automated alert delivery channels up to date.", si: "ඔබගේ බලයලත් සමාගම් ලියාපදිංචිය, CIDA ශ්‍රේණිගත කිරීම සහ ස්වයංක්‍රීය ඇඟවීම් නාලිකා යාවත්කාලීනව තබා ගන්න.", ta: "உங்கள் அங்கீகரிக்கப்பட்ட நிறுவன பதிவை புதுப்பித்த நிலையில் வைத்திருங்கள்." },
  dashRegisteredBusinessName: { en: "Registered Business Name", si: "ලියාපදිංචි ව්‍යාපාර නාමය", ta: "பதிவு செய்யப்பட்ட வணிக பெயர்" },
  dashBRN: { en: "Business Reg Number (BRN) / PV", si: "ව්‍යාපාර ලියාපදිංචි අංකය (BRN) / PV", ta: "வணிக பதிவு எண் (BRN) / PV" },
  dashAuthorizedOfficerLabel: { en: "Authorized Procurement Officer", si: "බලයලත් ප්‍රසම්පාදන නිලධාරී", ta: "அங்கீகரிக்கப்பட்ட கொள்முதல் அதிகாரி" },
  dashCidaGradeLabel: { en: "CIDA Contractor Grading", si: "CIDA කොන්ත්‍රාත්කරු ශ්‍රේණිගත කිරීම", ta: "CIDA ஒப்பந்தக்காரர் தரம்" },
  dashCorporateEmailLabel: { en: "Corporate Email Address", si: "ආයතනික විද්‍යුත් තැපැල් ලිපිනය", ta: "நிறுவன மின்னஞ்சல் முகவரி" },
  dashMobileWhatsApp: { en: "Direct Mobile / WhatsApp Alerts", si: "සෘජු ජංගම / WhatsApp ඇඟවීම්", ta: "நேரடி மொபைல் / WhatsApp எச்சரிக்கைகள்" },
  dashAlertPrefs: { en: "Automated Gazette Alert Preferences", si: "ස්වයංක්‍රීය ගැසට් ඇඟවීම් මනාප", ta: "தானியங்கி வர்த்தமானி எச்சரிக்கை விருப்பங்கள்" },
  dashWhatsAppInstant: { en: "WhatsApp Instant Alerts (05:00 AM)", si: "WhatsApp ක්ෂණික ඇඟවීම් (පෙ.ව. 05:00)", ta: "WhatsApp உடனடி எச்சரிக்கைகள் (காலை 05:00)" },
  dashReceiveImmediate: { en: "Receive immediate PDF notice links on publish.", si: "ප්‍රකාශනයේදී ක්ෂණික PDF නිවේදන සබැඳි ලබා ගන්න.", ta: "வெளியீட்டில் உடனடி PDF அறிவிப்பு இணைப்புகளைப் பெறுங்கள்." },
  dashActive: { en: "Active", si: "සක්‍රීය", ta: "செயலில்" },
  dashDisabled: { en: "Disabled", si: "අක්‍රීය", ta: "முடக்கப்பட்டது" },
  dashSaveChanges: { en: "Save Profile Changes", si: "පැතිකඩ වෙනස්කම් සුරකින්න", ta: "சுயவிவர மாற்றங்களைச் சேமிக்கவும்" },
  dashLastSync: { en: "Last synchronized: Today at 08:30 IST", si: "අවසන් සමමුහුර්ත: අද පෙ.ව. 08:30", ta: "கடைசியாக ஒத்திசைக்கப்பட்டது: இன்று 08:30" },
  dashLoadingWorkspace: { en: "Loading Supplier Workspace...", si: "සැපයුම්කරු සේවා අවකාශය පූරණය වෙමින්...", ta: "சப்ளையர் பணியிடத்தை ஏற்றுகிறது..." },
  dashLoadingWatchlist: { en: "Loading Watchlist...", si: "නිරීක්ෂණ ලැයිස්තුව පූරණය වෙමින්...", ta: "கண்காணிப்பு பட்டியலை ஏற்றுகிறது..." },
  dashLoadingRelated: { en: "Loading Related Tenders...", si: "සම්බන්ධ ටෙන්ඩර් පූරණය වෙමින්...", ta: "தொடர்புடைய டெண்டர்களை ஏற்றுகிறது..." },
  dashLoadingSettings: { en: "Loading Company Settings...", si: "සමාගම් සැකසුම් පූරණය වෙමින්...", ta: "நிறுவன அமைப்புகளை ஏற்றுகிறது..." },
};

interface LanguageContextType {
  language: Language;
  hydrated: boolean;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [hydrated, setHydrated] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Read persisted language preference from localStorage
    const saved = localStorage.getItem("tenderhub_lang") as Language | null;
    if (saved && ["en", "si", "ta"].includes(saved)) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
    // Mark as hydrated — components can now render language-dependent
    // active states without SSR vs client mismatch
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("tenderhub_lang", lang);
    document.documentElement.lang = lang;

    if (lang === "si") {
      toast.success("භාෂාව මාරු විය", "සිංහල මාදිලිය සාර්ථකව සක්‍රීය කෙරිණි.");
    } else if (lang === "ta") {
      toast.success("மொழி மாற்றப்பட்டது", "தமிழ் முறைமை வெற்றிகரமாக இயக்கப்பட்டது.");
    } else {
      toast.info("Language Switched", "Switched to English interface successfully.");
    }
  };

  const t = (key: string): string => {
    if (DICTIONARY[key]) {
      return DICTIONARY[key][language] || DICTIONARY[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, hydrated, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
