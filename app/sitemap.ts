import type { MetadataRoute } from "next";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/what-we-do", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/order", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/our-story", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `https://cookieandme.nz${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
