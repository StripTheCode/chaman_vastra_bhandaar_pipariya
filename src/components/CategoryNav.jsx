"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight, ChevronRight, ChevronDown, MapPin } from "lucide-react";

// Curated Ethnic Luxury Categories (Men's, Kids, Jewellery excluded per exact instructions)
const NAV_ITEMS = [
  {
    id: "all",
    label: "All Collections",
    href: "/collections/all",
    hasChevron: true,
    dropdown: {
      columns: [
        {
          title: "All Women's Categories",
          links: [
            {
              name: "Kurta Sets (Straight, Palazzo & Sharara)",
              href: "/collections/kurta-sets",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Designer Kurta Sets",
              hoverSubtitle: "Pure silk & georgette ensembles with tissue dupattas",
              hoverBadge: "6,634+ Styles",
            },
            {
              name: "Kurtas & Kurtis (Daily & Festive)",
              href: "/collections/kurtas-kurtis",
              hoverImage: "/images/banner-editorial.jpg",
              hoverTitle: "Casual & Festive Kurtis",
              hoverSubtitle: "Everyday chic to celebration silks and tunics",
              hoverBadge: "1,840+ Styles",
            },
            {
              name: "Pakistani Suits (Lawn & Organza)",
              href: "/collections/pakistani-suits",
              hoverImage: "/images/promo-bridal.jpg",
              hoverTitle: "Pakistani Designer Suits",
              hoverSubtitle: "Heavy lace embellishments and statement flared silhouettes",
              hoverBadge: "680+ Styles",
            },
            {
              name: "Anarkali Sets (Flared Kalidars)",
              href: "/collections/anarkali-sets",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Royal Flared Anarkalis",
              hoverSubtitle: "Grand flared silhouettes with hand-embroidered borders",
              hoverBadge: "928+ Styles",
            },
            {
              name: "Tunics & Tops (Contemporary Cuts)",
              href: "/collections/tunics-tops",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Ethnic Tunics & Short Tops",
              hoverSubtitle: "Modern silhouettes infused with traditional mirror work",
              hoverBadge: "340+ Styles",
            },
            {
              name: "Gowns (Indo-Western & Reception)",
              href: "/collections/gowns",
              hoverImage: "/images/saree-crimson.jpg",
              hoverTitle: "Reception Silk Gowns",
              hoverSubtitle: "Statuesque gowns with cape and pre-draped overlays",
              hoverBadge: "512+ Styles",
            },
            {
              name: "Lehengas (Bridal & Sangeet)",
              href: "/collections/lehengas",
              hoverImage: "/images/lehenga-sage.jpg",
              hoverTitle: "Bridal Zardozi Kalidars",
              hoverSubtitle: "Handcrafted bridal trousseau with heirloom dabka & zari",
              hoverBadge: "1,150+ Styles",
            },
            {
              name: "Sarees (Pure Banarasi & Handloom)",
              href: "/collections/sarees",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Pure Banarasi Silk Sarees",
              hoverSubtitle: "Woven by generational master weavers in Varanasi & Pipariya",
              hoverBadge: "3,420+ Styles",
            },
          ],
        },
        {
          title: "Curated Edits",
          links: [
            {
              name: "Handcrafted Bridal Trousseau",
              href: "/collections/lehengas",
              hoverImage: "/images/promo-bridal.jpg",
              hoverTitle: "Bridal Trousseau Edit",
              hoverSubtitle: "Complete wedding wardrobe for the discerning Indian bride",
              hoverBadge: "Bridal Edit",
            },
            {
              name: "Certified Handloom Weaves",
              href: "/collections/chanderi",
              hoverImage: "/images/promo-handloom.jpg",
              hoverTitle: "100% Certified Handloom",
              hoverSubtitle: "Direct from loom to wardrobe with authenticity certificates",
              hoverBadge: "Handloom Mark",
            },
            {
              name: "New Arrivals 2026",
              href: "/collections/all",
              hoverImage: "/images/banner-editorial.jpg",
              hoverTitle: "Spring-Summer 2026",
              hoverSubtitle: "Fresh seasonal palettes featuring pastel golds and sage greens",
              hoverBadge: "Fresh Off Loom",
            },
            {
              name: "Ready to Ship in 24 Hours",
              href: "/collections/all",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Express Dispatch",
              hoverSubtitle: "Pre-stitched and ready sarees dispatched within 24 hours",
              hoverBadge: "Express Ship",
            },
          ],
        },
      ],
      defaultCard: {
        title: "Pipariya Heritage Showcase",
        subtitle: "Handcrafted weaves curated directly from master artisans since 1985",
        image: "/images/banner-editorial.jpg",
        href: "/collections/all",
        badge: "Exclusive CVB",
      },
    },
  },
  {
    id: "sarees",
    label: "Sarees",
    hasChevron: true,
    href: "/collections/sarees",
    dropdown: {
      columns: [
        {
          title: "Curated Weaves",
          links: [
            {
              name: "Pure Katan Banarasi Silk",
              href: "/collections/sarees",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Pure Katan Banarasi Silk",
              hoverSubtitle: "High-twist mulberry silk with pure gold & silver zari jaal",
              hoverBadge: "Pure Katan",
            },
            {
              name: "Antique Gold Zari Kadwa",
              href: "/collections/sarees",
              hoverImage: "/images/saree-crimson.jpg",
              hoverTitle: "Antique Gold Kadwa Zari",
              hoverSubtitle: "Heirloom discontinuous weft weaving with raised gold motifs",
              hoverBadge: "Heirloom Kadwa",
            },
            {
              name: "Lightweight Organza & Tissue",
              href: "/collections/sarees",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Organza & Tissue Silks",
              hoverSubtitle: "Ethereal translucent drapes with intricate scalloped pallus",
              hoverBadge: "Featherlight",
            },
            {
              name: "Banarasi Georgette & Khaddi",
              href: "/collections/sarees",
              hoverImage: "/images/saree-crimson.jpg",
              hoverTitle: "Khaddi Georgette Silks",
              hoverSubtitle: "Hand-dyed fluid crepe georgette with zari booti accents",
              hoverBadge: "Modern Royalty",
            },
            {
              name: "Meenakari Floral Jaal",
              href: "/collections/sarees",
              hoverImage: "/images/banner-editorial.jpg",
              hoverTitle: "Meenakari Floral Jaal",
              hoverSubtitle: "Multi-colored resham silk threads woven seamlessly into zari",
              hoverBadge: "Artisan Grandeur",
            },
          ],
        },
        {
          title: "Shop By Occasion",
          links: [
            {
              name: "Dulhan Bridal Red Sarees",
              href: "/collections/sarees",
              hoverImage: "/images/saree-crimson.jpg",
              hoverTitle: "Dulhan Crimson Bridal Saree",
              hoverSubtitle: "Traditional shubh vivah vermillion red with Shikargah borders",
              hoverBadge: "Dulhan Special",
            },
            {
              name: "Wedding Reception Silks",
              href: "/collections/sarees",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Champagne Gold Reception Silk",
              hoverSubtitle: "Subtle royal sheen crafted for high-glamour evening receptions",
              hoverBadge: "Reception Glow",
            },
            {
              name: "Festive Puja & Diwali Sarees",
              href: "/collections/sarees",
              hoverImage: "/images/promo-handloom.jpg",
              hoverTitle: "Auspicious Festive Silks",
              hoverSubtitle: "Rich auspicious hues for family festivities and rituals",
              hoverBadge: "Festive Pick",
            },
            {
              name: "Cocktail Champagne Pastels",
              href: "/collections/sarees",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Pastel Champagne Silk",
              hoverSubtitle: "Contemporary muted tones with antique platinum finish",
              hoverBadge: "Pastel Elegance",
            },
          ],
        },
      ],
      defaultCard: {
        title: "Royal Crimson Katan Saree",
        subtitle: "Heirloom Kadwa weave with pure gold zari pallu and meena bootis",
        image: "/images/saree-crimson.jpg",
        href: "/collections/sarees",
        badge: "Dulhan Special",
      },
    },
  },
  {
    id: "lehengas",
    label: "Lehengas",
    hasChevron: true,
    href: "/collections/lehengas",
    dropdown: {
      columns: [
        {
          title: "Bridal Silhouettes",
          links: [
            {
              name: "Handcrafted Zardozi Kalidars",
              href: "/collections/lehengas",
              hoverImage: "/images/lehenga-sage.jpg",
              hoverTitle: "Handcrafted Zardozi Kalidar",
              hoverSubtitle: "32-panel architectural flare adorned with metallic bullion",
              hoverBadge: "Zardozi Craft",
            },
            {
              name: "Royal Velvet Wedding Lehengas",
              href: "/collections/lehengas",
              hoverImage: "/images/promo-bridal.jpg",
              hoverTitle: "Royal Velvet Wedding Lehenga",
              hoverSubtitle: "Deep imperial velvet embellished with dabka & antique crystals",
              hoverBadge: "Winter Bride",
            },
            {
              name: "Pastel Blossom & Sage Greens",
              href: "/collections/lehengas",
              hoverImage: "/images/lehenga-sage.jpg",
              hoverTitle: "Sage Green Blossom Lehenga",
              hoverSubtitle: "Refreshing day-wedding aesthetic with multi-hued threadwork",
              hoverBadge: "Day Ceremony",
            },
            {
              name: "Micro-Pearl & Sequin Embroidery",
              href: "/collections/lehengas",
              hoverImage: "/images/lehenga-rose.jpg",
              hoverTitle: "Rose Gold Micro-Pearl Lehenga",
              hoverSubtitle: "Ethereal shimmer designed for Sangeet & Cocktail nights",
              hoverBadge: "Sangeet Glam",
            },
          ],
        },
        {
          title: "Wedding Edits",
          links: [
            {
              name: "Pheras & Main Ceremony",
              href: "/collections/lehengas",
              hoverImage: "/images/promo-bridal.jpg",
              hoverTitle: "Main Ceremony Phera Couture",
              hoverSubtitle: "Timeless traditional silhouettes for the sacred vows",
              hoverBadge: "Phera Ready",
            },
            {
              name: "Sangeet & Cocktail Couture",
              href: "/collections/lehengas",
              hoverImage: "/images/lehenga-rose.jpg",
              hoverTitle: "Sangeet Motion Lehengas",
              hoverSubtitle: "Lightweight inner cancan allowing effortless dance movements",
              hoverBadge: "Dance Flare",
            },
            {
              name: "Mehendi & Haldi Pastels",
              href: "/collections/lehengas",
              hoverImage: "/images/lehenga-sage.jpg",
              hoverTitle: "Mehendi Botanical Lehengas",
              hoverSubtitle: "Playful organic motifs with mirror work and gota borders",
              hoverBadge: "Haldi Special",
            },
            {
              name: "Custom Blouse Stitching",
              href: "/collections/lehengas",
              hoverImage: "/images/banner-editorial.jpg",
              hoverTitle: "Bespoke Master Tailoring",
              hoverSubtitle: "Personalized necklines, sleeve cuts, and matching latkans",
              hoverBadge: "Custom Stitch",
            },
          ],
        },
      ],
      defaultCard: {
        title: "Sage & Emerald Bridal Lehenga",
        subtitle: "Intricate antique zari, resham threadwork, and semi-precious stones",
        image: "/images/lehenga-sage.jpg",
        href: "/collections/lehengas",
        badge: "Bespoke Bridal",
      },
    },
  },
  {
    id: "kurta-sets",
    label: "Kurta Sets",
    hasChevron: true,
    href: "/collections/kurta-sets",
    dropdown: {
      columns: [
        {
          title: "Trending Silhouettes",
          links: [
            {
              name: "Grand Flared Anarkali Sets",
              href: "/collections/kurtas",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Grand Flared Anarkali Set",
              hoverSubtitle: "5-meter sweeping kali flare with pure organza zari dupatta",
              hoverBadge: "Grand Anarkali",
            },
            {
              name: "Sharara & Gharara Ensembles",
              href: "/collections/kurtas",
              hoverImage: "/images/banner-editorial.jpg",
              hoverTitle: "Nawabi Sharara Ensembles",
              hoverSubtitle: "Dramatic flounce trousers with heavy gota patti embellishment",
              hoverBadge: "Nawabi Cut",
            },
            {
              name: "Straight Cut Pure Silk Suits",
              href: "/collections/kurtas",
              hoverImage: "/images/promo-handloom.jpg",
              hoverTitle: "Straight Cut Pure Silk Suit",
              hoverSubtitle: "Tailored cigarette pant suits with hand-embroidered neckline",
              hoverBadge: "Pure Silk",
            },
            {
              name: "Festive Palazzo Suit Sets",
              href: "/collections/kurtas",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Breezy Palazzo Ensembles",
              hoverSubtitle: "Comfortable silhouettes paired with statement festive dupattas",
              hoverBadge: "Festive Pick",
            },
          ],
        },
        {
          title: "Fabrics & Details",
          links: [
            {
              name: "Pure Chanderi Silk Suits",
              href: "/collections/kurtas",
              hoverImage: "/images/promo-handloom.jpg",
              hoverTitle: "Handloom Chanderi Suits",
              hoverSubtitle: "Lightweight breathability with shimmering gold zari borders",
              hoverBadge: "Chanderi Handloom",
            },
            {
              name: "Georgette with Gota Patti",
              href: "/collections/kurtas",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Jaipuri Gota Patti Sets",
              hoverSubtitle: "Traditional ribbon work on fluid royal georgette base",
              hoverBadge: "Gota Patti",
            },
            {
              name: "Zari Sequins & Threadwork",
              href: "/collections/kurtas",
              hoverImage: "/images/banner-editorial.jpg",
              hoverTitle: "Embroidered Festive Suits",
              hoverSubtitle: "Subtle glimmer for evening get-togethers and celebrations",
              hoverBadge: "Evening Wear",
            },
            {
              name: "Under ₹6,999 Festive Sets",
              href: "/collections/kurtas",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Value Festive Collections",
              hoverSubtitle: "Luxury ethnic styling priced attractively under ₹6,999",
              hoverBadge: "Best Value",
            },
          ],
        },
      ],
      defaultCard: {
        title: "Terracotta Handloom Anarkali",
        subtitle: "Complete ensemble includes handcrafted Banarasi silk woven dupatta",
        image: "/images/anarkali-rust.jpg",
        href: "/collections/kurtas",
        badge: "Bestseller",
      },
    },
  },
  {
    id: "gowns",
    label: "Gowns",
    hasChevron: true,
    href: "/collections/gowns",
    dropdown: {
      columns: [
        {
          title: "Modern Ethnic",
          links: [
            {
              name: "Floor Length Reception Gowns",
              href: "/collections/dresses",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Floor Length Reception Gowns",
              hoverSubtitle: "Statuesque drapes with hand-cut cutdana and micro-beading",
              hoverBadge: "Reception Gala",
            },
            {
              name: "Pre-Draped Ready-To-Wear Sarees",
              href: "/collections/dresses",
              hoverImage: "/images/saree-crimson.jpg",
              hoverTitle: "1-Minute Pre-Draped Sarees",
              hoverSubtitle: "Step in, zip up, and drape in 60 seconds with perfect pleats",
              hoverBadge: "Instant Drape",
            },
            {
              name: "Festive Embroidered Cape Sets",
              href: "/collections/dresses",
              hoverImage: "/images/lehenga-rose.jpg",
              hoverTitle: "Embroidered Cape & Bustier",
              hoverSubtitle: "Chic modern capes floating over wide-leg trousers",
              hoverBadge: "Modern Glam",
            },
            {
              name: "Jumpsuits & Peplum Sets",
              href: "/collections/dresses",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Festive Ethnic Jumpsuits",
              hoverSubtitle: "Contemporary flair infused with traditional zari and mirror work",
              hoverBadge: "Cocktail Style",
            },
          ],
        },
      ],
      defaultCard: {
        title: "Champagne Drape Gown",
        subtitle: "Fluid silhouette with hand-embellished details and structured corsetry",
        image: "/images/saree-champagne.jpg",
        href: "/collections/dresses",
        badge: "Modern Glam",
      },
    },
  },
  {
    id: "pakistani-suits",
    label: "Pakistani Suits",
    hasChevron: true,
    href: "/collections/pakistani-suits",
    dropdown: {
      columns: [
        {
          title: "Pakistani Designer Silhouettes",
          links: [
            {
              name: "Luxury Embroidered Lawn Suits",
              href: "/collections/pakistani-suits",
              hoverImage: "/images/promo-bridal.jpg",
              hoverTitle: "Embroidered Lawn Suits",
              hoverSubtitle: "Intricate cutwork lace and digital printed pure lawn silks",
              hoverBadge: "Pakistani Edit",
            },
            {
              name: "Heavy Velvet Pakistani Ensembles",
              href: "/collections/pakistani-suits",
              hoverImage: "/images/saree-crimson.jpg",
              hoverTitle: "Royal Velvet Pakistani Suits",
              hoverSubtitle: "Rich winter velvet adorned with zardozi and antique tilla",
              hoverBadge: "Winter Royal",
            },
            {
              name: "Organza Dupatta Sharara Sets",
              href: "/collections/pakistani-suits",
              hoverImage: "/images/lehenga-sage.jpg",
              hoverTitle: "Pakistani Sharara Ensembles",
              hoverSubtitle: "Multi-tiered flared shararas with scalloped organza dupattas",
              hoverBadge: "Statement Style",
            },
            {
              name: "Straight Cigarette Trousers",
              href: "/collections/pakistani-suits",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Straight Cut Long Kurta Sets",
              hoverSubtitle: "Ankle-length statement kurtas with lace-trimmed trousers",
              hoverBadge: "Trending Now",
            },
          ],
        },
        {
          title: "Occasions & Edits",
          links: [
            {
              name: "Wedding Guest Pakistani Suits",
              href: "/collections/pakistani-suits",
              hoverImage: "/images/promo-handloom.jpg",
              hoverTitle: "Wedding Guest Luxe",
              hoverSubtitle: "Subtle glam with pastel palettes and delicate threadwork",
              hoverBadge: "Wedding Edit",
            },
            {
              name: "Festive Eid & Diwali Specials",
              href: "/collections/pakistani-suits",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "Festive Grandeur",
              hoverSubtitle: "High-voltage festive elegance with pure zari booti finish",
              hoverBadge: "Festive Pick",
            },
            {
              name: "Ready to Ship in 24 Hours",
              href: "/collections/pakistani-suits",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Express Dispatch",
              hoverSubtitle: "Fully stitched ready-to-wear sets dispatched in 24 hours",
              hoverBadge: "Express Ship",
            },
          ],
        },
      ],
      defaultCard: {
        title: "Pakistani Designer Showcase",
        subtitle: "Lace-trimmed silhouettes and delicate organza dupattas",
        image: "/images/promo-bridal.jpg",
        href: "/collections/pakistani-suits",
        badge: "Pakistani Edit",
      },
    },
  },
  {
    id: "anarkali-sets",
    label: "Anarkali Sets",
    hasChevron: true,
    href: "/collections/anarkali-sets",
    dropdown: {
      columns: [
        {
          title: "Flared Kalidar Silhouettes",
          links: [
            {
              name: "Grand 32-Kali Silk Anarkalis",
              href: "/collections/anarkali-sets",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "32-Kali Pure Silk Anarkali",
              hoverSubtitle: "Massive sweeping flare with pure Banarasi zari border",
              hoverBadge: "Grand Flare",
            },
            {
              name: "Georgette Floral Printed Anarkalis",
              href: "/collections/anarkali-sets",
              hoverImage: "/images/banner-editorial.jpg",
              hoverTitle: "Floral Georgette Anarkali",
              hoverSubtitle: "Featherlight twirl-ready georgette with gota patti accents",
              hoverBadge: "Bestseller",
            },
            {
              name: "Floor-Length Bridal Anarkali Gowns",
              href: "/collections/anarkali-sets",
              hoverImage: "/images/saree-crimson.jpg",
              hoverTitle: "Bridal Red Anarkali Set",
              hoverSubtitle: "Royal crimson silk embellished with zardozi and dabka",
              hoverBadge: "Bridal Edit",
            },
            {
              name: "Angrakha Style Anarkali Sets",
              href: "/collections/anarkali-sets",
              hoverImage: "/images/lehenga-rose.jpg",
              hoverTitle: "Royal Angrakha Kalidar",
              hoverSubtitle: "Cross-over regal neckline with handmade latkan ties",
              hoverBadge: "Heritage Cut",
            },
          ],
        },
        {
          title: "Festive Fabrics",
          links: [
            {
              name: "Pure Chanderi Handloom Anarkalis",
              href: "/collections/anarkali-sets",
              hoverImage: "/images/promo-handloom.jpg",
              hoverTitle: "Handloom Chanderi Anarkali",
              hoverSubtitle: "Lightweight shimmering fabric direct from Madhya Pradesh looms",
              hoverBadge: "Chanderi Handloom",
            },
            {
              name: "Vichitra Silk Heavy Embroidery",
              href: "/collections/anarkali-sets",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Vichitra Silk Party Set",
              hoverSubtitle: "Intricate resham thread embroidery with tissue dupatta",
              hoverBadge: "Party Wear",
            },
          ],
        },
      ],
      defaultCard: {
        title: "Royal Anarkali Collection",
        subtitle: "Graceful flared kalidars tailored for royal family celebrations",
        image: "/images/anarkali-rust.jpg",
        href: "/collections/anarkali-sets",
        badge: "Royal Kalidar",
      },
    },
  },
  {
    id: "sale",
    label: "Festive Sale",
    href: "/collections/all",
    isSale: true,
    dropdown: {
      columns: [
        {
          title: "Exclusive Offers",
          links: [
            {
              name: "Flat 30% Off Bridal Lehengas",
              href: "/collections/lehengas",
              hoverImage: "/images/promo-bridal.jpg",
              hoverTitle: "Flat 30% Off Bridal Lehengas",
              hoverSubtitle: "Save up to ₹18,000 on handcrafted wedding couture",
              hoverBadge: "Flat 30% Off",
            },
            {
              name: "Up to 35% Off Pure Silk Sarees",
              href: "/collections/sarees",
              hoverImage: "/images/saree-crimson.jpg",
              hoverTitle: "Up to 35% Off Banarasi Silks",
              hoverSubtitle: "Authentic Katan & Chanderi weaves at celebration prices",
              hoverBadge: "Up to 35% Off",
            },
            {
              name: "Deals Under ₹4,999",
              href: "/collections/all",
              hoverImage: "/images/anarkali-rust.jpg",
              hoverTitle: "Celebration Sets Under ₹4,999",
              hoverSubtitle: "Grand ethnic styling at wholesale Pipariya rates",
              hoverBadge: "Under ₹4,999",
            },
            {
              name: "Ready to Ship in 24 Hours",
              href: "/collections/all",
              hoverImage: "/images/saree-champagne.jpg",
              hoverTitle: "24-Hour Express Dispatch",
              hoverSubtitle: "Last-minute festive needs delivered right to your door",
              hoverBadge: "Express Ship",
            },
          ],
        },
      ],
      defaultCard: {
        title: "Festive Dhamaka Offer",
        subtitle: "Use coupon CHAMAN10 at checkout for extra 10% discount",
        image: "/images/promo-bridal.jpg",
        href: "/collections/all",
        badge: "Limited Time",
      },
    },
  },
  {
    id: "store",
    label: "Pipariya Store",
    href: "#store",
    isStore: true,
  },
];

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null); // Real-time hover swap state!
  const hoverTimeoutRef = useRef(null);

  // Active category determination
  const currentActiveId =
    activeCategory ||
    (pathname === "/"
      ? "all"
      : NAV_ITEMS.find((item) => pathname.includes(item.id))?.id || "all");

  const handleMouseEnter = (id) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (hoveredId !== id) {
      setHoveredId(id);
      setActiveSubItem(null); // Reset sub-hover when switching category tabs
    }
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredId(null);
      setActiveSubItem(null);
    }, 200);
  };

  const activeItem = NAV_ITEMS.find((item) => item.id === hoveredId);

  // Dynamic preview card: uses hovered subcategory data if available, else defaults to category card
  const displayCard = activeItem?.dropdown?.defaultCard
    ? {
        title: activeSubItem?.hoverTitle || activeItem.dropdown.defaultCard.title,
        subtitle: activeSubItem?.hoverSubtitle || activeItem.dropdown.defaultCard.subtitle,
        image: activeSubItem?.hoverImage || activeItem.dropdown.defaultCard.image,
        badge: activeSubItem?.hoverBadge || activeItem.dropdown.defaultCard.badge,
        href: activeSubItem?.href || activeItem.dropdown.defaultCard.href,
      }
    : null;

  return (
    <nav
      className="relative z-30 bg-white border-b border-[#EAE3D9]/70 hidden lg:block transition-all w-full"
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar: Perfectly Centered, Clean Spacing, ZERO Scrollbars */}
        <div className="flex items-center justify-center gap-6 xl:gap-8 h-14 overflow-visible">
          {NAV_ITEMS.map((item) => {
            const isActive = currentActiveId === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                className="relative py-4"
                onMouseEnter={() => handleMouseEnter(item.id)}
              >
                <Link
                  href={item.href}
                  onClick={() => onSelectCategory && onSelectCategory(item.id)}
                  className={`relative flex items-center gap-1.5 transition-colors duration-200 cursor-pointer text-[14px] xl:text-[14.5px] tracking-normal font-medium select-none ${
                    item.isSale
                      ? "text-[#C2414C] hover:text-[#9E2A34] font-semibold"
                      : item.isStore
                      ? "text-[#333333] hover:text-[#A34850] font-medium"
                      : isActive
                      ? "text-[#111111] font-semibold"
                      : "text-[#333333] hover:text-[#A34850]"
                  }`}
                >
                  {/* Subtle Flame dot for Sale */}
                  {item.isSale && (
                    <Flame className="w-3.5 h-3.5 fill-current text-[#C2414C] -mt-0.5" />
                  )}

                  {/* Store Pin Icon */}
                  {item.isStore && (
                    <MapPin className="w-3.5 h-3.5 text-[#A34850]" />
                  )}

                  <span>{item.label}</span>

                  {/* Dropdown Chevron Arrow matching Trendia */}
                  {item.hasChevron && (
                    <ChevronDown className="w-3 h-3 text-[#777777] group-hover:text-[#111111] transition-transform duration-200" />
                  )}

                  {/* Elegant Underline Indicator on Hover / Active */}
                  {(isActive || isHovered) && !item.isStore && (
                    <motion.div
                      layoutId="navActiveLine"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className={`absolute -bottom-3.5 left-0 right-0 h-[2px] rounded-full ${
                        item.isSale ? "bg-[#C2414C]" : "bg-[#111111]"
                      }`}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🌟 TRENDIA-STYLE REAL-TIME HOVER IMAGE & TITLE SWAPPING MEGA MENU */}
      <AnimatePresence>
        {hoveredId && activeItem?.dropdown && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-50 bg-white/98 backdrop-blur-md border-b border-[#EAE2D7] shadow-xl"
            onMouseEnter={() => handleMouseEnter(hoveredId)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-6xl mx-auto px-8 py-7">
              <div className="grid grid-cols-12 gap-8 items-start">
                
                {/* Left Columns: Interactive Subcategories */}
                <div
                  className={`grid gap-8 ${
                    activeItem.dropdown.columns.length > 1
                      ? "col-span-8 grid-cols-2"
                      : "col-span-7 grid-cols-1"
                  }`}
                >
                  {activeItem.dropdown.columns.map((col, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-[#F0EBE1]">
                        <span className="text-[12px] font-bold uppercase tracking-wider text-[#8C6510]">
                          {col.title}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#B68D40]" />
                      </div>

                      <ul className="space-y-1.5">
                        {col.links.map((link, lIdx) => {
                          const isLinkHovered = activeSubItem?.name === link.name;
                          return (
                            <li key={lIdx}>
                              <Link
                                href={link.href}
                                onMouseEnter={() => setActiveSubItem(link)}
                                onClick={() => {
                                  setHoveredId(null);
                                  setActiveSubItem(null);
                                  if (onSelectCategory) onSelectCategory(activeItem.id);
                                }}
                                className={`group flex items-center justify-between text-[13.5px] py-1.5 px-2.5 rounded-lg transition-all duration-150 cursor-pointer ${
                                  isLinkHovered
                                    ? "bg-[#FAF5EE] text-[#A34850] font-semibold"
                                    : "text-[#4A453E] hover:text-[#A34850]"
                                }`}
                              >
                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                  {link.name}
                                </span>
                                <ChevronRight
                                  className={`w-3.5 h-3.5 transition-all duration-200 ${
                                    isLinkHovered
                                      ? "opacity-100 translate-x-0.5 text-[#A34850]"
                                      : "opacity-0 group-hover:opacity-100 text-[#8C8273]"
                                  }`}
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Right Column: Trendia-Style Live Image & Title Swapping Showcase Card */}
                {displayCard && (
                  <div className="col-span-4 pl-6 border-l border-[#F0EBE1]">
                    <Link
                      href={displayCard.href}
                      onClick={() => {
                        setHoveredId(null);
                        setActiveSubItem(null);
                        if (onSelectCategory) onSelectCategory(activeItem.id);
                      }}
                      className="group block relative rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#EAE2D7] shadow-xs hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image Container with Crossfade */}
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F5EFE6]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={displayCard.image + displayCard.title}
                            initial={{ opacity: 0.35, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.35 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={displayCard.image}
                              alt={displayCard.title}
                              fill
                              sizes="360px"
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          </motion.div>
                        </AnimatePresence>

                        {/* Top Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[9.5px] font-bold text-[#A34850] uppercase tracking-wider shadow-xs">
                            {displayCard.badge}
                          </span>
                        </div>

                        {/* Title & Subtitle Overlay */}
                        <div className="absolute inset-x-3.5 bottom-3 text-white z-10">
                          <h4 className="font-serif text-sm font-bold leading-tight mb-1 group-hover:text-[#F4D3D6] transition-colors">
                            {displayCard.title}
                          </h4>
                          <p className="text-[11px] text-[#EBE3DA] line-clamp-2 leading-relaxed">
                            {displayCard.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Card Action Link */}
                      <div className="py-2.5 px-3.5 bg-white flex items-center justify-between text-[11.5px] font-semibold text-[#A34850] group-hover:bg-[#FAF5EE] transition-colors border-t border-[#F0EBE1]">
                        <span>View Handcrafted Collection</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
