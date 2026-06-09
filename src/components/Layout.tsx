import { organizationSchema, webSiteSchema } from "@/lib/seo";
import { SeoJsonLd } from "./SeoJsonLd";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SeoJsonLd data={[organizationSchema(), webSiteSchema()]} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
