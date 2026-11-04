"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Hand,
  Compass,
} from "lucide-react";

export default function InteractiveProductViewer({ product }) {
  // Angle / 360° rotation states
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360 degrees
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Zoom & Pan states
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);

  const containerRef = useRef(null);

  // Compile available images (primary image, hover image, additional angles)
  const images = [];
  if (product?.image) images.push(product.image);
  if (product?.hoverImage && product.hoverImage !== product.image) images.push(product.hoverImage);
  if (Array.isArray(product?.images)) {
    product.images.forEach((img) => {
      if (!images.includes(img)) images.push(img);
    });
  }
  if (images.length === 0) images.push("/images/saree-champagne.jpg");

  // Auto-spin timer
  useEffect(() => {
    let interval = null;
    if (isAutoSpinning) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 3) % 360);
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoSpinning]);

  // Sync angle to image view
  useEffect(() => {
    if (images.length > 1) {
      // Map 0-360 degrees across the available images
      const slice = 360 / images.length;
      const idx = Math.floor(rotationAngle / slice) % images.length;
      setActiveImageIndex(idx);
    }
  }, [rotationAngle, images.length]);

  // Hide hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Mouse Wheel Zoom Handler
  const handleWheel = (e) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const delta = e.deltaY < 0 ? 0.25 : -0.25;
    setZoomScale((prev) => {
      const nextScale = Math.min(Math.max(1, prev + delta), 3.5);

      if (nextScale === 1) {
        setPanPosition({ x: 0, y: 0 });
      } else {
        // Pan slightly towards mouse cursor
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        setPanPosition({
          x: -(mouseX * (nextScale - 1) * 0.4),
          y: -(mouseY * (nextScale - 1) * 0.4),
        });
      }
      return nextScale;
    });

    // Also adjust rotation slightly on shift + wheel or sideways wheel
    if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      setRotationAngle((prev) => (prev + (e.deltaX > 0 ? 10 : -10) + 360) % 360);
    }
  };

  // Mouse Drag / Touch Swipe for 360° Rotation or Pan
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (zoomScale > 1.05) {
      // When zoomed in: drag pans the zoomed image
      setPanPosition((prev) => ({
        x: prev.x + deltaX * 0.7,
        y: prev.y + deltaY * 0.7,
      }));
    } else {
      // When normal view: horizontal drag rotates 360°
      const angleChange = deltaX * 0.8;
      setRotationAngle((prev) => (prev + angleChange + 360) % 360);
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetViewer = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
    setRotationAngle(0);
    setIsAutoSpinning(false);
  };

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-full min-h-[440px] sm:min-h-[520px] bg-gradient-to-b from-[#F5EFE6] via-[#FAF6F0] to-[#EFE8DD] overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center rounded-2xl"
    >
      {/* 360° Mannequin Grid Light Ring Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div
          className="w-[380px] h-[380px] rounded-full border border-dashed border-[#C59B27] transition-transform duration-100"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#C59B27]/40" />
      </div>

      {/* Main Interactive Garment Viewport */}
      <motion.div
        animate={{
          scale: zoomScale,
          x: panPosition.x,
          y: panPosition.y,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div
          className="relative w-full h-full aspect-[3/4] max-h-[520px] transition-transform duration-75"
          style={{
            // Subtle 3D perspective skew based on 360 rotation angle
            transform: `perspective(1000px) rotateY(${Math.sin((rotationAngle * Math.PI) / 180) * 12}deg)`,
          }}
        >
          <Image
            src={currentImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-contain object-center drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Top Floating Badge & Angle Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-[#19181B]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5 shadow-md">
          <RotateCcw className="w-3 h-3 text-[#E6C665]" />
          <span>360° Studio View</span>
        </span>

        <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#19181B] text-[10px] font-mono font-bold tracking-tight shadow-sm border border-[#EADBCA]">
          {Math.round(rotationAngle)}°
        </span>

        {zoomScale > 1 && (
          <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-sm animate-pulse">
            {zoomScale.toFixed(1)}x Zoom
          </span>
        )}
      </div>

      {/* Controls Floating Toolbar (Right Side) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
        {/* Zoom In */}
        <button
          type="button"
          onClick={() => setZoomScale((s) => Math.min(3.5, s + 0.5))}
          className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#19181B] flex items-center justify-center shadow-md border border-[#EADBCA] hover:border-[#C59B27] transition-all cursor-pointer"
          title="Zoom In (or Scroll Wheel Up)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          type="button"
          onClick={() => {
            setZoomScale((s) => {
              const next = Math.max(1, s - 0.5);
              if (next === 1) setPanPosition({ x: 0, y: 0 });
              return next;
            });
          }}
          className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#19181B] flex items-center justify-center shadow-md border border-[#EADBCA] hover:border-[#C59B27] transition-all cursor-pointer"
          title="Zoom Out (or Scroll Wheel Down)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* 360 Auto-Spin Toggle */}
        <button
          type="button"
          onClick={() => setIsAutoSpinning(!isAutoSpinning)}
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md border transition-all cursor-pointer ${
            isAutoSpinning
              ? "bg-[#C59B27] text-white border-[#C59B27]"
              : "bg-white/95 hover:bg-white text-[#19181B] border-[#EADBCA] hover:border-[#C59B27]"
          }`}
          title="Toggle 360° Auto Rotation"
        >
          <RotateCcw className={`w-4 h-4 ${isAutoSpinning ? "animate-spin" : ""}`} />
        </button>

        {/* Reset Zoom & Position */}
        {(zoomScale > 1 || rotationAngle !== 0) && (
          <button
            type="button"
            onClick={resetViewer}
            className="w-9 h-9 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 flex items-center justify-center shadow-md border border-amber-300 transition-all cursor-pointer"
            title="Reset to Normal View"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Angle Slider Bar at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#EADBCA] shadow-md pointer-events-auto">
        <Compass className="w-4 h-4 text-[#C59B27] shrink-0" />
        <input
          type="range"
          min="0"
          max="360"
          value={Math.round(rotationAngle)}
          onChange={(e) => setRotationAngle(Number(e.target.value))}
          className="flex-1 h-1.5 bg-[#EFE9DF] rounded-lg appearance-none cursor-ew-resize accent-[#C59B27]"
          title="Slide to rotate 360°"
        />
        <span className="font-mono text-[11px] font-bold text-[#19181B] shrink-0 w-8 text-right">
          {Math.round(rotationAngle)}°
        </span>
      </div>

      {/* Interactive Drag / Scroll Hint Toast (Dismisses after interaction) */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-16 bg-[#19181B]/90 text-white px-3.5 py-1.5 rounded-full text-[11px] font-medium shadow-lg backdrop-blur-xs flex items-center gap-2 pointer-events-none"
          >
            <Hand className="w-3.5 h-3.5 text-[#E6C665] animate-pulse" />
            <span>Drag mouse to rotate 360° • Scroll wheel to zoom</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

