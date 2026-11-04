import { Suspense } from "react";
import CollectionClientView from "@/components/collections/CollectionClientView";
import { CATEGORIES } from "@/data/products";

// Canonical category slug mapping for common aliases like trendia's URLs
const SLUG_ALIASES = {
  "anarkali-kurtas-and-sets": "anarkali-sets",
  "women-kurta-sets": "kurta-sets",
  "kurta-sets-online": "kurta-sets",
  "kurtas": "kurta-sets",
  "anarkali": "anarkali-sets",
  "anarkalis": "anarkali-sets",
  "pakistani": "pakistani-suits",
  "pakistani-suit": "pakistani-suits",
  "tunics": "tunics-tops",
  "tops": "tunics-tops",
  "tunic": "tunics-tops",
  "dresses": "gowns",
  "gown": "gowns",
  "wedding-lehenga": "lehengas",
  "wedding-lehengas": "lehengas",
  "bridal-lehengas": "lehengas",
  "bridal-wear": "lehengas",
  "silk-sarees": "sarees",
  "banarasi-sarees": "sarees",
  "banarasi-silk": "sarees",
  "chanderi-sarees": "sarees",
  "chanderi": "sarees",
  "kanjivaram": "sarees",
  "kanjivaram-silks": "sarees",
  "sharara-sets": "kurta-sets",
  "party-wear-dresses": "gowns",
  "dupattas": "kurta-sets",
  "bridal-trousseau": "lehengas",
  "festive-gowns": "gowns",
  "handloom-chanderi": "sarees",
  "mens-wear": "all",
  "kids-wear": "all",
};

export function generateStaticParams() {
  const baseParams = CATEGORIES.map((c) => ({ category: c.slug }));
  const aliasParams = Object.keys(SLUG_ALIASES).map((alias) => ({
    category: alias,
  }));
  return [...baseParams, ...aliasParams];
}

export async function generateMetadata({ params }) {
  const { category: rawCategory } = await params;
  const category = SLUG_ALIASES[rawCategory] || rawCategory;
  const cat = CATEGORIES.find(
    (c) => c.slug === category || c.id === category
  );

  const title = cat
    ? `${cat.title || cat.name} | Chaman Vastra Bhandar Pipariya`
    : "Ethnic Wear Collection | Chaman Vastra Bhandar";

  const description =
    cat?.description ||
    "Explore pure silk sarees, bridal lehengas, festive anarkalis and handlooms direct from Pipariya.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: cat?.bannerImage ? [cat.bannerImage] : [],
    },
  };
}

async function CategoryContent({ params }) {
  const { category: rawCategory } = await params;
  const category = SLUG_ALIASES[rawCategory] || rawCategory;
  return <CollectionClientView initialCategorySlug={category} />;
}

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-[#A34850] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
