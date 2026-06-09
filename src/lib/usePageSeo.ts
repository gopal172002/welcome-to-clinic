import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { absoluteUrl, ogImageUrl, SITE_NAME } from "@/lib/seo";

type PageSeoKeys = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
};

function setNamedMeta(name: string, content: string) {
  const selector = `meta[name="${name}"]`;
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement("meta");
    node.name = name;
    document.head.appendChild(node);
  }
  node.content = content;
}

function setPropertyMeta(property: string, content: string) {
  const selector = `meta[property="${property}"]`;
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute("property", property);
    document.head.appendChild(node);
  }
  node.content = content;
}

function setCanonical(href: string) {
  const selector = 'link[rel="canonical"]';
  let node = document.head.querySelector<HTMLLinkElement>(selector);
  if (!node) {
    node = document.createElement("link");
    node.rel = "canonical";
    document.head.appendChild(node);
  }
  node.href = href;
}

export function usePageSeo({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noindex = false,
}: PageSeoKeys) {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const resolvedTitle = t(title);
    const resolvedDescription = t(description);
    const resolvedOgTitle = t(ogTitle ?? title);
    const resolvedOgDescription = t(ogDescription ?? description);
    const url = absoluteUrl(path);
    const image = ogImageUrl();

    document.title = resolvedTitle;
    setNamedMeta("description", resolvedDescription);
    setNamedMeta("robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setPropertyMeta("og:site_name", SITE_NAME);
    setPropertyMeta("og:title", resolvedOgTitle);
    setPropertyMeta("og:description", resolvedOgDescription);
    setPropertyMeta("og:url", url);
    setPropertyMeta("og:image", image);
    setNamedMeta("twitter:title", resolvedOgTitle);
    setNamedMeta("twitter:description", resolvedOgDescription);
    setNamedMeta("twitter:image", image);
    setCanonical(url);
  }, [description, i18n.language, noindex, ogDescription, ogTitle, path, t, title]);
}

/** @deprecated Use usePageSeo */
export const useTranslatedHead = usePageSeo;
