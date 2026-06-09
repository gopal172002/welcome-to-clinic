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
import { buildPageHead, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";
import favicon from "@/assets/logo.jpg?url";
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

const defaultHead = buildPageHead({
  title: `${SITE_NAME} | Clinical Psychology & Mental Health Care in Varanasi`,
  description:
    "ManoNirmaan offers RCI-registered clinical psychology, psychotherapy and counselling in Varanasi. Online and in-person sessions for anxiety, depression, trauma and more.",
  path: "/",
  ogTitle: `${SITE_NAME} — ${SITE_TAGLINE}`,
  ogDescription:
    "Compassionate mental health care in Varanasi. Clinical psychology, counselling, special education and community medicine.",
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...defaultHead.meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: favicon, type: "image/jpeg", sizes: "any" },
      { rel: "shortcut icon", href: favicon, type: "image/jpeg" },
      { rel: "apple-touch-icon", href: favicon, type: "image/jpeg" },
      ...defaultHead.links,
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
        <link rel="icon" href={favicon} type="image/jpeg" sizes="any" />
        <link rel="shortcut icon" href={favicon} type="image/jpeg" />
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
