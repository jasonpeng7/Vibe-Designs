import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  children?: React.ReactNode;
}

const SEO = ({
  title,
  description,
  keywords = "creative web agency, digital marketing, website marketing, vibe design, web design, vibe creative agency, website builder, web development, small business websites, seo",
  ogTitle,
  ogDescription,
  ogImage = "/vibe.png",
  ogUrl = "https://www.vbedigital.com",
  children,
}: SEOProps) => {
  const fullTitle = `${title}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vibe Creative",
    url: ogUrl,
    logo: `${ogUrl}${ogImage}`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "vbewebdesign@gmail.com",
      contactType: "Customer Service",
    },
    description:
      "ViBE Design is a creative web design agency specializing in building high-performance websites for small businesses that generate leads and drive growth. We focus on SEO optimization and conversion rate optimization to turn your website into an investment",
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {children}
    </Helmet>
  );
};

export default SEO;
