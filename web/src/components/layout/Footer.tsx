"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-slate-200 mt-12 xs:mt-16 sm:mt-20 lg:mt-24 text-slate-700 overflow-hidden">
      <div className="max-w-[1680px] 2xl:max-w-[1760px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 2xl:px-10 py-8 xs:py-10 sm:py-12 lg:py-16">
        
        {/* Top 5-Column Institutional Section - Responsive 320px -> 1920px+ */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-6 xs:gap-8 sm:gap-10 lg:gap-8 xl:gap-12 pb-8 xs:pb-10 sm:pb-14 border-b border-slate-200">
          
          {/* Column 1: Brand & National Mission (4 Cols) - Full width on xs, 2 cols on tablet */}
          <div className="xs:col-span-2 md:col-span-2 lg:col-span-4 flex flex-col gap-3 xs:gap-4 min-w-0">
            <Link href="/" className="inline-block">
              <span className="font-display font-black text-xl xs:text-2xl tracking-tight text-[#0F172A] block leading-none">
                TENDER<span className="text-[#0055B8]">HUB</span>
              </span>
              <span className="text-[9px] xs:text-[10px] font-bold text-slate-500 tracking-wider uppercase block mt-1 leading-tight">
                {t("brandSubtitle")}
              </span>
            </Link>

            <p className="text-xs xs:text-xs sm:text-sm text-slate-600 leading-relaxed max-w-none xs:max-w-sm">
              {t("footerDesc")}
            </p>

            <div className="pt-1 xs:pt-2 flex flex-col gap-1.5 xs:gap-2 text-[11px] xs:text-xs">
              <div className="flex items-start gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#0055B8] shrink-0 mt-1 xs:mt-1.5" />
                <span className="font-semibold text-[#0F172A] leading-tight">{t("footerBadge1")}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#0055B8] shrink-0 mt-1 xs:mt-1.5" />
                <span className="font-semibold text-[#0F172A] leading-tight">{t("footerBadge2")}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#0055B8] shrink-0 mt-1 xs:mt-1.5" />
                <span className="font-semibold text-[#0F172A] leading-tight">{t("footerBadge3")}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Procurement Directory (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              {t("footerColDirectory")}
            </h4>
            <nav className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
              <Link href="/" className="hover:text-[#0055B8] transition-colors">{t("footerLinkCatalogue")}</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">{t("footerLinkMinistries")}</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">{t("footerLinkProvinces")}</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">{t("footerLinkCorporations")}</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">{t("footerLinkAuctions")}</Link>
              <Link href="/tenders-sri-lanka" className="hover:text-[#0055B8] transition-colors">{t("footerLinkAwards")}</Link>
            </nav>
          </div>

          {/* Column 3: Bidders & Contractors (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              {t("footerColBidders")}
            </h4>
            <nav className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
              <Link href="/subscriber-pricing" className="hover:text-[#0055B8] transition-colors">{t("footerLinkPlans")}</Link>
              <Link href="/subscriber-pricing" className="hover:text-[#0055B8] transition-colors">{t("footerLinkBankClaim")}</Link>
              <Link href="/register" className="hover:text-[#0055B8] transition-colors">{t("footerLinkSupplierReg")}</Link>
              <Link href="/how-it-works" className="hover:text-[#0055B8] transition-colors">{t("footerLinkBiddingGuide")}</Link>
              <Link href="/blog/essential-parts" className="hover:text-[#0055B8] transition-colors">{t("footerLinkKnowledgeHub")}</Link>
            </nav>
          </div>

          {/* Column 4: Procuring Authorities (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              {t("footerColAuthorities")}
            </h4>
            <nav className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
              <Link href="/register" className="hover:text-[#0055B8] transition-colors">{t("footerLinkPublisherWorkspace")}</Link>
              <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors">{t("footerLinkNoticeDesk")}</Link>
              <Link href="/how-it-works" className="hover:text-[#0055B8] transition-colors">{t("footerLinkEvidencePack")}</Link>
              <Link href="/subscriber-pricing" className="hover:text-[#0055B8] transition-colors">{t("footerLinkPartnerApi")}</Link>
            </nav>
          </div>

          {/* Column 5: Central Dispatch & Contact (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              {t("footerColHeadquarters")}
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-600">
              <div>
                <span className="font-bold text-[#0F172A] block">{t("footerCentralDispatch")}</span>
                <span className="font-mono text-slate-800 font-bold block">+94 11 200 8000</span>
              </div>
              <div className="pt-1">
                <span className="font-bold text-[#0F172A] block">{t("footerSupplierSupport")}</span>
                <span className="font-mono text-slate-800 font-bold block">+94 11 200 8001</span>
              </div>
              <div className="pt-1">
                <span className="font-bold text-[#0F172A] block">{t("footerOfficialEmail")}</span>
                <Link href="mailto:tenders@tenderhub.lk" className="text-[#0055B8] font-bold hover:underline">
                  tenders@tenderhub.lk
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Standards & Compliance Strip - Stacks on 320px */}
        <div className="pt-6 xs:pt-8 flex flex-col gap-4 sm:flex-row sm:items-center justify-between text-[11px] xs:text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p className="font-semibold text-slate-700 leading-relaxed text-[11px] xs:text-xs">
              {t("footerCopyright")}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 xs:gap-3 sm:gap-4 text-[11px] xs:text-xs font-semibold text-slate-600">
            <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors py-1 px-1 min-h-[32px] flex items-center">{t("footerPrivacyPolicy")}</Link>
            <span className="hidden xs:inline">&bull;</span>
            <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors py-1 px-1 min-h-[32px] flex items-center">{t("footerTermsService")}</Link>
            <span className="hidden xs:inline">&bull;</span>
            <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors py-1 px-1 min-h-[32px] flex items-center">{t("footerGazetteDisclaimer")}</Link>
            <span className="hidden sm:inline">&bull;</span>
            <Link href="/contact-us" className="hover:text-[#0055B8] transition-colors py-1 px-1 min-h-[32px] flex items-center">{t("footerHelpSupport")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
