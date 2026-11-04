'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

const reelsData = [
  {
    id: 'reel-1',
    title: 'Banarasi Katan Silk in Royal Magenta',
    price: 8499,
    originalPrice: 13999,
    tag: 'Trending Reel',
    views: '14.2K',
    thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-woman-dressed-in-traditional-costume-dancing-40542-large.mp4',
    productName: 'Varanasi Weave Pure Katan Silk',
    rating: 4.9,
  },
  {
    id: 'reel-2',
    title: 'Crimson Bridal Velvet Heavy Zardozi',
    price: 38999,
    originalPrice: 54999,
    tag: 'Bridal Pick',
    views: '28.9K',
    thumbnail: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-indian-bride-dressed-in-red-lehenga-40544-large.mp4',
    productName: 'Maharani Handcrafted Bridal Lehenga',
    rating: 5.0,
  },
  {
    id: 'reel-3',
    title: 'Kanjivaram Korvai Silk with Pure Zari',
    price: 18499,
    originalPrice: 24999,
    tag: 'Heritage',
    views: '9.8K',
    thumbnail: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-traditional-indian-sari-posing-40540-large.mp4',
    productName: 'Kanchipuram Temple Border Silk',
    rating: 4.8,
  },
  {
    id: 'reel-4',
    title: 'Ivory Chanderi Anarkali & Mukaish Dupatta',
    price: 6499,
    originalPrice: 9999,
    tag: 'Festive Wear',
    views: '19.4K',
    thumbnail: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-smiling-woman-in-traditional-indian-attire-40546-large.mp4',
    productName: 'Royal Chanderi Angrakha Suit Set',
    rating: 4.9,
  },
  {
    id: 'reel-5',
    title: 'Mustard Georgette Gharara Festive Set',
    price: 5299,
    originalPrice: 7999,
    tag: 'Haldi Special',
    views: '11.5K',
    thumbnail: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-indian-woman-dressed-in-traditional-costume-dancing-40542-large.mp4',
    productName: ' Lucknowi Chikankari Gharara Set',
    rating: 4.7,
  },
];

export default function ShoppableVideoReels({ onSelectProduct, onAddToCart }) {
  const [activeReel, setActiveReel] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const openReelModal = (reel) => {
    setActiveReel(reel);
    setIsPlaying(true);
  };

  const closeReelModal = () => {
    setActiveReel(null);
    setIsPlaying(false);
  };

  return (
    <section className="py-10 bg-[#faf8f5] border-y border-[#ede5d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#b45309] animate-pulse"></span>
              <span className="text-[11.5px] uppercase tracking-[0.2em] font-semibold text-[#8a5b28]">
                Watch & Shop Live
              </span>
            </div>
            <h2 className="text-2xl sm:text-[32px] text-[#1a120b] font-bold tracking-tight">
              Drapes in Motion <span className="italic font-light text-[#8a5b28]">— Watch & Buy</span>
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#735745] mt-1 font-normal">
              Real 360-degree drape showcases directly from our Pipariya bridal salon.
            </p>
          </div>

          <a
            href="https://www.instagram.com/chaman_saree_pipariya/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-medium text-[#8a5b28] hover:text-[#b45309] transition-colors border-b border-[#8a5b28]/40 pb-0.5 self-start sm:self-auto"
          >
            <span>Follow @chaman_saree_pipariya</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Reels Horizontal Scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {reelsData.map((reel) => (
            <div
              key={reel.id}
              onClick={() => openReelModal(reel)}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-[#1a120b]"
            >
              {/* Thumbnail Image */}
              <Image
                src={reel.thumbnail}
                alt={reel.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/90 transition-opacity"></div>

              {/* Top Tag & Views */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white">
                <span className="bg-[#b45309]/90 backdrop-blur-sm px-2 py-0.5 rounded-full font-medium text-[10px] tracking-wide uppercase">
                  {reel.tag}
                </span>
                <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-[10px]">
                  <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {reel.views}
                </span>
              </div>

              {/* Center Play Button on Hover */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#b45309] group-hover:border-[#b45309] transition-all duration-300 shadow-lg">
                  <svg className="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom Shoppable Card Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-lg p-2.5 shadow-md">
                <div className="text-[12px] sm:text-[12.5px] font-semibold text-[#1a120b] truncate leading-tight">
                  {reel.productName}
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-[13px] sm:text-[13.5px] font-bold text-[#b45309]">
                    ₹{reel.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-gray-400 line-through">
                    ₹{reel.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between pt-1 border-t border-gray-100 text-[10.5px]">
                  <span className="text-[#8a5b28] font-semibold">Tap to Watch & Shop</span>
                  <svg className="w-3.5 h-3.5 text-[#8a5b28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {activeReel && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeReelModal}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Element */}
            <video
              ref={videoRef}
              src={activeReel.videoUrl}
              poster={activeReel.thumbnail}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
            />

            {/* Sound Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors text-xs"
            >
              {isMuted ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>

            {/* Bottom Overlay Shoppable Info */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 z-10 text-white">
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-amber-300 mb-1">
                {activeReel.tag} • Chaman Studio Reel
              </span>
              <h3 className="font-serif text-base font-semibold leading-snug">{activeReel.title}</h3>
              <p className="text-xs text-amber-100/90 font-medium mt-0.5">{activeReel.productName}</p>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/20">
                <div>
                  <div className="text-[10px] text-gray-300 uppercase">Special Price</div>
                  <div className="text-lg font-bold text-amber-300">
                    ₹{activeReel.price.toLocaleString('en-IN')}
                    <span className="text-xs text-gray-400 line-through ml-1.5 font-normal">
                      ₹{activeReel.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onAddToCart) {
                        onAddToCart({
                          id: activeReel.id,
                          name: activeReel.productName,
                          price: activeReel.price,
                          originalPrice: activeReel.originalPrice,
                          image: activeReel.thumbnail,
                          category: 'Reels Collection',
                        });
                      }
                      closeReelModal();
                    }}
                    className="px-3.5 py-2 rounded-lg bg-[#b45309] hover:bg-[#8a5b28] text-white font-semibold text-xs transition-colors shadow-lg"
                  >
                    Add to Bag
                  </button>
                  <a
                    href={`https://wa.me/919425000000?text=${encodeURIComponent(`Namaste Chaman Vastra Bhandar, I am watching reel for "${activeReel.productName}" (₹${activeReel.price}). Please show video call demo.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                    title="Video Call & WhatsApp Inquiry"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
