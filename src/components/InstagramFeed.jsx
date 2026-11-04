"use client";

import Image from "next/image";
import InstagramIcon from "@/components/InstagramIcon";
import { Eye, ArrowUpRight } from "lucide-react";

const POSTS = [
  { id: 1, image: "/images/anarkali-rust.jpg", tag: "Festive Anarkalis" },
  { id: 2, image: "/images/saree-champagne.jpg", tag: "Banarasi Pure Katan" },
  { id: 3, image: "/images/lehenga-sage.jpg", tag: "Bridal Zardozi" },
  { id: 4, image: "/images/saree-crimson.jpg", tag: "Royal Dulhan Saree" },
  { id: 5, image: "/images/lehenga-rose.jpg", tag: "Pastel Wedding Edit" },
  { id: 6, image: "/images/banner-editorial.jpg", tag: "Runway Ensembles" },
];

export default function InstagramFeed() {
  return (
    <section className="py-14 bg-[#FAF8F5] border-b border-[#EBE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11.5px] uppercase tracking-[0.24em] font-bold text-[#A34850] block mb-1">
              Social Community
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#19181B]">
              Follow @chaman_saree_pipariya
            </h2>
            <p className="text-[13px] sm:text-[13.5px] text-[#786F63] mt-0.5 font-normal">
              Tag #ChamanCouture to be featured on our official channel
            </p>
          </div>

          <a
            href="https://www.instagram.com/chaman_saree_pipariya/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-[13px] font-semibold uppercase tracking-wider transition-all self-start sm:self-auto shadow-xs"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Follow On Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6-Card Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/chaman_saree_pipariya/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F4EFEA] border border-[#EBE3DA] shadow-2xs block"
            >
              <Image
                src={post.image}
                alt={post.tag}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <InstagramIcon className="w-6 h-6 mb-2 text-[#E6C665]" />
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  {post.tag}
                </span>
                <span className="text-[9px] text-[#D8CFBF] mt-1 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  View Reel / Post
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
