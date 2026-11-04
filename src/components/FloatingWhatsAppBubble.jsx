"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsAppBubble() {
  return (
    <a
      href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20want%20to%20enquire%20about%20your%20handcrafted%20collections."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
      aria-label="Chat with Stylist on WhatsApp"
      title="Chat with Stylist on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="sr-only">WhatsApp Chat</span>
    </a>
  );
}

