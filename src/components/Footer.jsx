"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Check, MessageCircle, MapPin, Phone, Clock, ShieldCheck } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (phone) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setPhone("");
    }
  };

  return (
    <footer className="bg-[#19181B] text-[#EDE7DE] pt-16 pb-12 border-t border-[#2D2A33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / VIP Club Strip */}
        <div className="pb-12 border-b border-[#2D2A33] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C59B27]">
              Chaman Bridal & Festive Club
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Join Our VIP Bridal Registry on WhatsApp
            </h3>
            <p className="text-[13.5px] text-[#A8A092] mt-1.5 font-normal">
              Receive private bridal saree previews, new arrivals from Varanasi looms, and festive discounts.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full ml-auto">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your WhatsApp number (+91)..."
                className="flex-1 min-w-0 px-4 py-3 bg-[#26242B] border border-[#3E3A46] rounded-full text-[13.5px] text-white placeholder-[#8C8377] focus:outline-none focus:border-[#C59B27]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#A34850] hover:bg-[#8E373F] text-white text-[13px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? "Connected!" : "Join on VIP"}
              </button>
            </form>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#2D2A32] border border-[#C59B27] flex items-center justify-center text-[#E6C665] font-serif font-black text-xs">
                CVB
              </div>
              <span className="font-serif text-2xl font-black tracking-[0.18em] text-white uppercase">
                CHAMAN
              </span>
            </div>
            <span className="text-[11px] tracking-[0.28em] font-semibold text-[#A34850] uppercase block mb-3 font-serif">
              VASTRA BHANDAR • PIPARIYA (EST. 1985)
            </span>
            <p className="text-[13px] text-[#A8A092] leading-relaxed max-w-sm mb-6 font-normal">
              Pipariya&apos;s most cherished saree emporium and bridal studio. Offering authentic 
              handloom Banarasi silks, Kanjivaram treasures, designer bridal lehengas, and festive suits with 
              insured pan-India delivery and live video call consultations.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/chaman_saree_pipariya/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#26242B] hover:bg-[#A34850] text-[#EDE7DE] transition-colors"
                aria-label="Instagram Profile"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918269260928"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#26242B] hover:bg-[#15803D] text-[#EDE7DE] transition-colors"
                aria-label="WhatsApp Concierge"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Saree & Bridal Collections - All 8 Categories */}
          <div>
            <h4 className="text-[14px] sm:text-[14.5px] font-semibold text-white uppercase tracking-wider mb-4">
              Women&apos;s Clothing
            </h4>
            <ul className="space-y-2.5 text-[13px] sm:text-[13.5px] text-[#A8A092]">
              <li><Link href="/collections/kurta-sets" className="hover:text-white transition-colors">Kurta Sets</Link></li>
              <li><Link href="/collections/kurtas-kurtis" className="hover:text-white transition-colors">Kurtas & Kurtis</Link></li>
              <li><Link href="/collections/pakistani-suits" className="hover:text-white transition-colors">Pakistani Suits</Link></li>
              <li><Link href="/collections/anarkali-sets" className="hover:text-white transition-colors">Anarkali Sets</Link></li>
              <li><Link href="/collections/tunics-tops" className="hover:text-white transition-colors">Tunics & Tops</Link></li>
              <li><Link href="/collections/gowns" className="hover:text-white transition-colors">Gowns</Link></li>
              <li><Link href="/collections/lehengas" className="hover:text-white transition-colors">Lehengas</Link></li>
              <li><Link href="/collections/sarees" className="hover:text-white transition-colors">Sarees</Link></li>
            </ul>
          </div>

          {/* Customer Service & Video Shopping */}
          <div>
            <h4 className="text-[14px] sm:text-[14.5px] font-semibold text-white uppercase tracking-wider mb-4">
              Customer Services
            </h4>
            <ul className="space-y-2.5 text-[13px] sm:text-[13.5px] text-[#A8A092]">
              <li><a href="https://wa.me/918269260928" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Book Live Video Saree Preview</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Blouse Tailoring</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Insured Dispatch</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Silk Mark Certification Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bridal Trousseau Consultation</a></li>
              <li><a href="https://wa.me/918269260928" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Order Support</a></li>
            </ul>
          </div>

          {/* Pipariya Showroom Visit */}
          <div>
            <h4 className="text-[14px] sm:text-[14.5px] font-semibold text-white uppercase tracking-wider mb-4">
              Visit Showroom
            </h4>
            <div className="space-y-3 text-[13px] text-[#A8A092]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong className="text-white block font-medium">Chaman Vastra Bhandar</strong>
                  Station Road, Main Market, Pipariya, Madhya Pradesh - 461775
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <span className="text-white">+91 82692 60928 / +91 98930 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <span>Mon – Sun: 10:30 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-[#2D2A33] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#786F63]">
          <p>© 2026 Chaman Vastra Bhandar, Pipariya. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs text-[#A8A092]">
            <span>100% Genuine Silk</span>
            <span>•</span>
            <span>Secure Dispatch</span>
            <span>•</span>
            <span>Handloom Authentic</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
