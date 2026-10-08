import path from "node:path";
import Image from "@11ty/eleventy-img";

// Zet een pad uit de CMS ("/images/uploads/foto.png") om naar het bestand in src/
const toSrc = (p) => path.join("src", p.replace(/^\/+/, ""));

const optimize = (src, widths) =>
  Image(toSrc(src), {
    widths,
    formats: ["webp"],
    outputDir: "_site/img/",
    urlPath: "/img/",
    sharpWebpOptions: { quality: 80 },
  });

const escapeAttr = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export default function (eleventyConfig) {
  // Bestanden die ongewijzigd mee moeten
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/js": "js",
    "src/fonts": "fonts",
    "src/images/static": "images",
    "src/favicon.ico": "favicon.ico",
    "src/_headers": "_headers",
  });

  // Hero: aparte afbeelding voor desktop en mobiel, automatisch omgezet naar WebP
  eleventyConfig.addAsyncShortcode("heroPicture", async (desktop, mobile, alt) => {
    const d = await optimize(desktop, [1000, 1600, "auto"]);
    const dw = d.webp;
    const dLargest = dw[dw.length - 1];
    let mobileSource = "";
    if (mobile) {
      const m = await optimize(mobile, [500, 800, "auto"]);
      const mw = m.webp;
      mobileSource = `<source media="(max-width: 749px)" type="image/webp" srcset="${mw.map((i) => i.srcset).join(", ")}" sizes="100vw" width="${mw[mw.length - 1].width}" height="${mw[mw.length - 1].height}">`;
    }
    return `<picture>${mobileSource}<source type="image/webp" srcset="${dw.map((i) => i.srcset).join(", ")}" sizes="100vw"><img src="${dLargest.url}" alt="${escapeAttr(alt)}" class="hero__image" width="${dLargest.width}" height="${dLargest.height}" fetchpriority="high"></picture>`;
  });

  // Gewone afbeelding (bijv. achtergrond), automatisch verkleind en omgezet naar WebP
  eleventyConfig.addAsyncShortcode("image", async (src, alt = "", sizes = "100vw", loading = "lazy") => {
    const meta = await optimize(src, [800, 1600]);
    return Image.generateHTML(meta, { alt, sizes, loading, decoding: "async" });
  });

  // Tekstvak uit de CMS -> alinea's (lege regel = nieuwe alinea)
  eleventyConfig.addFilter("paragraphs", (text = "") =>
    String(text)
      .trim()
      .split(/\n\s*\n/)
      .map((p) => `<p>${p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")}</p>`)
      .join("\n")
  );

  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
  };
}
