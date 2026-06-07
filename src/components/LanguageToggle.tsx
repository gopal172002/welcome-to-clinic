import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import { getSupportedLanguage, languageOptions } from "@/i18n";

export function LanguageToggle({ onChange }: { onChange?: () => void }) {
  const { i18n, t } = useTranslation();
  const activeLanguage = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language);

  function changeLanguage(language: "en" | "hi") {
    if (language !== activeLanguage) {
      void i18n.changeLanguage(language);
    }
    onChange?.();
  }

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border bg-background/80 p-1"
      aria-label={t("language.label")}
    >
      <Languages size={15} className="mx-1 text-[color:var(--color-clay)]" aria-hidden="true" />
      {languageOptions.map((language) => {
        const isActive = activeLanguage === language.code;
        return (
          <button
            key={language.code}
            type="button"
            aria-pressed={isActive}
            title={t(language.labelKey)}
            onClick={() => changeLanguage(language.code)}
            className={`min-w-9 rounded-full px-2.5 py-1 text-[0.68rem] font-medium transition-colors ${
              isActive
                ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)]"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {t(language.shortLabelKey)}
          </button>
        );
      })}
    </div>
  );
}
