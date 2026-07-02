export const SITE_NAME = "ManoNirmaan";
export const SITE_TAGLINE = "A quiet space for the mind";
export const SITE_LOCALE = "en_IN";

const configuredSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_URL = (configuredSiteUrl ?? "https://manonirmaan.in").replace(/\/$/, "");

export const CONTACT = {
  email: "manonirmaan@gmail.com",
  phone: "+919196421388",
  phoneDisplay: "+91 91964 21388",
  instagram: "https://www.instagram.com/mano_nirmaan",
  instagramHandle: "@mano_nirmaan",
  address: {
    street: "Chiraigaon, Near Block Office",
    locality: "Varanasi",
    region: "Uttar Pradesh",
    postalCode: "221112",
    country: "IN",
  },
} as const;

export const PUBLIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/approach",
  "/team",
  "/contact",
  "/booking",
] as const;

export type PublicPath = (typeof PUBLIC_PATHS)[number];

export function absoluteUrl(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

/** Bump `OG_IMAGE_VERSION` when the share-preview image changes (clears WhatsApp/social cache). */
const OG_IMAGE_VERSION = "2";

export function ogImageUrl(): string {
  return `${SITE_URL}/logo.jpg?v=${OG_IMAGE_VERSION}`;
}

type PageHeadInput = {
  title: string;
  description: string;
  path: PublicPath | string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
};

export function buildPageHead({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noindex = false,
}: PageHeadInput) {
  const url = absoluteUrl(path);
  const image = ogImageUrl();
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large" },
    { name: "author", content: SITE_NAME },
    { name: "theme-color", content: "#1a2b3c" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SITE_LOCALE },
    { property: "og:title", content: resolvedOgTitle },
    { property: "og:description", content: resolvedOgDescription },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "343" },
    { property: "og:image:height", content: "375" },
    { property: "og:image:alt", content: `${SITE_NAME} — Talking helps, listening heals` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: resolvedOgTitle },
    { name: "twitter:description", content: resolvedOgDescription },
    { name: "twitter:image", content: image },
    { name: "geo.region", content: "IN-UP" },
    { name: "geo.placename", content: "Varanasi" },
  ];

  const links = [{ rel: "canonical", href: url }];

  return { meta, links };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    description:
      "Clinical psychology, psychotherapy, counselling, special education and community medicine in Varanasi. Online and in-person mental health support.",
    url: SITE_URL,
    logo: ogImageUrl(),
    image: ogImageUrl(),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    sameAs: [CONTACT.instagram],
    medicalSpecialty: "Psychiatric",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.locality,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
    },
    areaServed: {
      "@type": "City",
      name: "Varanasi",
    },
    availableService: [
      { "@type": "MedicalTherapy", name: "Clinical Psychology" },
      { "@type": "MedicalTherapy", name: "Psychotherapy" },
      { "@type": "MedicalTherapy", name: "Counselling" },
      { "@type": "MedicalTherapy", name: "Psychological Assessment" },
    ],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["en-IN", "hi-IN"],
  };
}

export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Devyani Barodh",
    jobTitle: "RCI Registered Clinical Psychologist",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: [
      "Clinical Psychology",
      "Psychotherapy",
      "Mental Health",
      "Psychological Assessment",
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
