import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "@/i18n";
import { getSupportedLanguage, LANGUAGE_STORAGE_KEY } from "@/i18n";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("root.notFoundTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("root.notFoundBody")}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("root.goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("root.pageDidNotLoad")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("root.loadErrorBody")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("root.tryAgain")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("root.goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ManoNirmaan - A quiet space for the mind" },
      {
        name: "description",
        content:
          "Compassionate mental health, counselling, special education and community medicine support from the ManoNirmaan team. Online and in-person sessions in Varanasi.",
      },
      { name: "author", content: "ManoNirmaan Team" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.jpg",
        type: "image/jpeg",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.jpg",
        type: "image/jpeg",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nDocumentSync />
      <Outlet />
    </QueryClientProvider>
  );
}

function I18nDocumentSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    function syncLanguage(language: string) {
      const supportedLanguage = getSupportedLanguage(language);
      document.documentElement.lang = supportedLanguage;
      document.documentElement.dir = "ltr";
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, supportedLanguage);
    }

    i18n.on("languageChanged", syncLanguage);

    const storedLanguage = getSupportedLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
    if (storedLanguage !== getSupportedLanguage(i18n.language)) {
      void i18n.changeLanguage(storedLanguage);
    } else {
      syncLanguage(i18n.language);
    }

    return () => {
      i18n.off("languageChanged", syncLanguage);
    };
  }, [i18n]);

  return null;
}
