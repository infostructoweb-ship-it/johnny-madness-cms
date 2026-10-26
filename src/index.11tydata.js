// SEO en structured data (JSON-LD) voor de homepage.
// Alle gegevens komen uit src/_data/site.json en home.json (aan te passen in de CMS).

const clean = (obj) => JSON.parse(JSON.stringify(obj, (k, v) => (v === "" || v === null || (Array.isArray(v) && v.length === 0) ? undefined : v)));

export default {
  eleventyComputed: {
    seo: (data) => data.home.seo || {},
    jsonld: (data) => {
      const site = data.site;
      const home = data.home;
      const url = site.url ? site.url + "/" : undefined;
      const sameAs = [site.instagram_url, site.youtube_url, site.facebook_url].filter(Boolean);

      const graph = [
        {
          "@type": "WebSite",
          "@id": url ? url + "#website" : undefined,
          url,
          name: site.name,
          inLanguage: "nl-NL",
        },
        {
          "@type": "PerformingGroup",
          "@id": url ? url + "#act" : undefined,
          name: site.name,
          url,
          description: home.seo && home.seo.description,
          image: site.url ? site.url + "/images/og-image.jpg" : undefined,
          logo: site.url ? site.url + "/images/logo.webp" : undefined,
          genre: "Live muziek, piano-entertainment",
          areaServed: site.area_served || undefined,
          member: (site.members || []).filter((m) => m && m.name).map((m) => ({
            "@type": "Person",
            name: m.name,
            jobTitle: m.role || undefined,
          })),
          sameAs,
          potentialAction: site.booking_url
            ? { "@type": "ReserveAction", target: site.booking_url, name: "Boek de show" }
            : undefined,
        },
      ];

      const json = JSON.stringify(clean({ "@context": "https://schema.org", "@graph": graph }));
      return json.replace(/</g, "\\u003c");
    },
  },
};
