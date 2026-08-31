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
    ta: "தொடர்பு கொள்ள",
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

  // Hero Radar Metrics
  radarTitle: {
    en: "NATIONAL PROCUREMENT RADAR",
    si: "ජාතික ප්‍රසම්පාදන රේඩාර් දත්ත",
    ta: "தேசிய கொள்முதல் கண்காணிப்பு",
  },
  metricPublishedToday: {
    en: "Published Today",
    si: "අද දින පළ වූ",
    ta: "இன்று வெளியானது",
  },
  metricLiveTenders: {
    en: "Active Live Tenders",
    si: "ක්‍රියාකාරී සජීවී ටෙන්ඩර්",
    ta: "நேரடி டெண்டர்கள்",
  },
  metricClosingThisWeek: {
    en: "Closing This Week",
    si: "මේ සතියේ අවසන් වන",
    ta: "இந்த வாரம் முடிவடைகிறது",
  },
  metricTotalArchive: {
    en: "Total Gazette Archive",
    si: "සම්පූර්ණ ලේඛනාගාරය",
    ta: "மொத்த காப்பகம்",
  },

  // Search & Filters
  searchPlaceholder: {
    en: "Search by tender title, procuring entity, reference code, or keywords...",
    si: "ටෙන්ඩර් මාතෘකාව, ආයතනය, අංකය හෝ විස්තරය සොයන්න...",
    ta: "டெண்டர் தலைப்பு, நிறுவனம் அல்லது குறிப்பு எண்ணை தேடுங்கள்...",
  },
  searchBtn: {
    en: "Search",
    si: "සොයන්න",
    ta: "தேடுங்கள்",
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
  spotlightSuppliers: {
    en: "Registration of Suppliers",
    si: "සැපයුම්කරුවන් ලියාපදිංචිය",
    ta: "வழங்குநர்கள் பதிவு",
  },
  publishFreeTitle: {
    en: "Publish Tender Notices Free",
    si: "ඔබේ ටෙන්ඩර් නොමිලේ පළ කරන්න",
    ta: "இலவசமாக டெண்டர் இடுங்கள்",
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

  // Footer
  footerCopyright: {
    en: "© 2017 - 2026 TenderHub Sri Lanka. National Procurement Intelligence Gateway. All rights reserved.",
    si: "© 2017 - 2026 ටෙන්ඩර්හබ් ශ්‍රී ලංකා. ජාතික ප්‍රසම්පාදන බුද්ධි ද්වාරය. සියලු හිමිකම් ඇවිරිණි.",
    ta: "© 2017 - 2026 டெண்டர்ஹப் இலங்கை. தேசிய கொள்முதல் தகவல் தளம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const toast = useToast();

  useEffect(() => {
    // Read persisted language preference from localStorage
    const saved = localStorage.getItem("tenderhub_lang") as Language | null;
    if (saved && ["en", "si", "ta"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("tenderhub_lang", lang);

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
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
