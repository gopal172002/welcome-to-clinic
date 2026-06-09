type SeoJsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function SeoJsonLd({ data }: SeoJsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={`${String(entry["@type"] ?? "schema")}-${String(entry["@id"] ?? index)}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
