interface SEOProps {
  schema?: any;
}

const SEO = ({ schema }: SEOProps) => {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SEO;