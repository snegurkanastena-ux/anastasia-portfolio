import type { MetadataRoute } from "next";

const siteUrl = "https://www.xn----8sb1aregjk5f.xn--p1ai";

const routes = ["", "/portfolio", "/services", "/contacts"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/services" ? 0.9 : 0.8,
  }));
}
