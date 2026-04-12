export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
