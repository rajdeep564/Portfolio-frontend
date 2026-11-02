import { DATA } from "@/data/resume";

const [city, region] = DATA.location.split(", ");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${DATA.url}/#website`,
      url: DATA.url,
      name: DATA.name,
      description: DATA.seo.description,
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${DATA.url}/#profile`,
      url: DATA.url,
      name: DATA.seo.title,
      isPartOf: { "@id": `${DATA.url}/#website` },
      mainEntity: { "@id": `${DATA.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${DATA.url}/#person`,
      name: DATA.name,
      alternateName: DATA.seo.alternateNames,
      url: DATA.url,
      image: `${DATA.url}${DATA.avatarUrl}`,
      jobTitle: DATA.role,
      description: DATA.seo.description,
      worksFor: { "@type": "Organization", name: DATA.work[0].company },
      alumniOf: DATA.education.map((education) => ({
        "@type": "CollegeOrUniversity",
        name: education.school,
        url: education.href,
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: region,
        addressCountry: "IN",
      },
      knowsAbout: DATA.seo.expertise,
      sameAs: Object.values(DATA.contact.social)
        .map((social) => social.url)
        .filter((url) => url.startsWith("http")),
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
