export const SEOSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sreeram Venugopal",
    "url": "https://sreeramvenugopal.com",
    "jobTitle": "Student Founder & EdTech Builder",
    "knowsAbout": [
      "Physics Education",
      "Interactive Simulations",
      "Product Design",
      "Computer Science"
    ],
    "founderOf": {
      "@type": "Organization",
      "name": "SciPhyLabs"
    },
    "sameAs": [
      "https://www.linkedin.com/in/sreeram-venugopal-701531376/",
      "https://medium.com/@sreeram23db",
      "https://www.youtube.com/channel/UCMww2T1ZzUvdUMowVRyANGA",
      "https://www.instagram.com/venuuu7_",
      "https://sciphylabs.vercel.app"
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};
