import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type TranslatedHeadKeys = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
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

export function useTranslatedHead({
  title,
  description,
  ogTitle,
  ogDescription,
}: TranslatedHeadKeys) {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.title = t(title);
    setNamedMeta("description", t(description));

    if (ogTitle) {
      setPropertyMeta("og:title", t(ogTitle));
    }
    if (ogDescription) {
      setPropertyMeta("og:description", t(ogDescription));
    }
  }, [description, i18n.language, ogDescription, ogTitle, t, title]);
}
