// src/site-identity/index.ts
import { SITE_ASSETS } from './assets';

export interface SiteIdentity {
  name: string;
  shortName: string;
  description: string;
  tagline?: string;
  domain: string;
  brand: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  contact: {
    phone: {
      display: string;
      raw: string;
      additional?: string[];
    };
    email: {
      support: string;
      admissions: string;
      general?: string;
    };
    address: {
      office: string;
      city: string;
      country: string;
      mapLink?: string;
    };
    socials: {
      whatsapp: string;
      instagram: string;
      linkedin: string;
      facebook?: string;
      twitter?: string;
    };
  };
  assets: {
    logo: {
      main: string;
      favicon: string;
      appleTouchIcon: string;
    };
    icons: {
      icon192: string;
      icon512: string;
    };
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    ogImage?: string;
  };
  business: {
    established: number;
    type: string;
    services: string[];
  };
}

export const SITE_IDENTITY: SiteIdentity = {
  name: "Admission Campus",
  shortName: "Admission Campus",
  description: "Comprehensive admission guidance for Indian universities and colleges",
  tagline: "Your Gateway to Top Indian Universities",
  domain: "admissioncampus.com",
  brand: {
    primaryColor: "#ea580c", // Orange color from manifest
    secondaryColor: "#ffffff",
    accentColor: "#1f2937", // Dark gray for contrast
  },
  contact: {
    phone: {
      display: "+91-9999616911",
      raw: "+919999616911",
      additional: ["+91-9999616911", "+91-9999616911"]
    },
    email: {
      support: "Info@admissioncampus.in",
      admissions: "Contact@admissioncampus.in",
      general: "Info@admissioncampus.in",
    },
    address: {
      office: "24th Floor, Admission campus, Silver Wing, Wave One, Office No, 20/21, Sector 18, Noida",
      city: "Noida",
      country: "Uttar Pradesh",
      mapLink: "https://goo.gl/maps/example",
    },
    socials: {
      whatsapp: "https://wa.me/9999616911",
      instagram: "https://instagram.com/admissioncampus",
      linkedin: "https://linkedin.com/company/admissioncampus",
    },
  },
  assets: SITE_ASSETS,
  meta: {
    title: "Admission Campus - Your Gateway to Top Indian Universities",
    description: "Comprehensive admission guidance for Indian universities and colleges. Expert counseling, entrance exam preparation, and career guidance for Indian students.",
    keywords: [
      "admission guidance",
      "Indian universities",
      "college admissions",
      "entrance exams",
      "JEE preparation",
      "NEET guidance",
      "IIT admissions",
      "medical colleges",
      "engineering colleges",
      "career counseling",
      "admission campus"
    ],
    author: "Admission Campus",
    ogImage: "/logo.png",
  },
  business: {
    established: 2020,
    type: "Education Services",
    services: [
      "College Guidance",
      "University Admissions",
      "Entrance Exam Preparation",
      "Career Counseling",
      "Indian Education Support",
      "Admission Consulting"
    ],
  },
};

// Export individual sections for convenience
export const { name, contact, brand, assets, meta } = SITE_IDENTITY;

// Helper functions
export const getFullAddress = () =>
  `${SITE_IDENTITY.contact.address.office}, ${SITE_IDENTITY.contact.address.city}, ${SITE_IDENTITY.contact.address.country}`;

export const getMetaTags = () => ({
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords.join(", "),
  author: meta.author,
  "og:title": meta.title,
  "og:description": meta.description,
  "og:image": meta.ogImage,
  "og:type": "website",
});

export const getManifestData = () => ({
  name: SITE_IDENTITY.name,
  short_name: SITE_IDENTITY.shortName,
  description: SITE_IDENTITY.description,
  start_url: "/",
  display: "standalone",
  background_color: SITE_IDENTITY.brand.secondaryColor,
  theme_color: SITE_IDENTITY.brand.primaryColor,
  icons: [
    {
      src: SITE_IDENTITY.assets.icons.icon192,
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: SITE_IDENTITY.assets.icons.icon512,
      sizes: "512x512",
      type: "image/png",
    },
  ],
});
