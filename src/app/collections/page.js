import CollectionClientView from "@/components/collections/CollectionClientView";

export const metadata = {
  title: "All Collections | Pure Silk Sarees, Bridal Lehengas & Ethnic Wear",
  description:
    "Explore all handcrafted Banarasi silk sarees, bridal lehengas, suits, gowns, and M.P. Chanderi handlooms from Chaman Vastra Bhandar Pipariya.",
};

export default function CollectionsPage() {
  return <CollectionClientView initialCategorySlug="all" />;
}

