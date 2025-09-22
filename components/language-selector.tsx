'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇹🇳" },
]

export function LanguageSelector() {
   useEffect(() => {
    // Load Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, // hide default banner
        },
        'google_translate_element'
      );
    };

    // Hide Google banner if it appears
    const hideBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame.skiptranslate');
      if (banner) (banner as HTMLElement).style.display = 'none';
      document.body.style.top = '0px';
    };
    const interval = setInterval(hideBanner, 500);
    return () => clearInterval(interval);
  }, []);

  // Trigger translation when dropdown changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    const iframe = document.querySelector('iframe.goog-te-menu-frame');
    if (!iframe) return;

    try {
      const innerDoc = (iframe as HTMLIFrameElement).contentDocument || (iframe as HTMLIFrameElement).contentWindow?.document;
      if (!innerDoc) return;

      const langLink = innerDoc.querySelector(`a[data-lang="${lang}"]`) as HTMLElement;
      if (langLink) langLink.click();
    } catch (err) {
      console.error('Google Translate iframe not ready', err);
    }
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <select onChange={handleChange} defaultValue="en">
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
      {/* Invisible container required by Google Translate */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </div>
  );
}
