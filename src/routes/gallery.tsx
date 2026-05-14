import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  Image as ImageIcon,
  Video,
  Newspaper,
  Star,
  ZoomIn,
  ExternalLink,
} from "lucide-react";

/* ─── Assets (using available site images) ────────────────────── */
import campusImg from "@/assets/school_img.png";
import parentChildImg from "@/assets/parent-child2.png";
import nurseryImg from "@/assets/pre-school.png";
import prepImg from "@/assets/slide4.png";
import preNurseryImg from "@/assets/baby pre-school.png";
import daycareImg from "@/assets/day_care.png";

/* ─── Award images ───────────────────────────────────────────── */
import award1 from "@/assets/award1.png";
import award2 from "@/assets/award2.png";
import award3 from "@/assets/award3.png";
import award4 from "@/assets/award4.png";
import award5 from "@/assets/award5.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Bitty Balpan Play School" },
      { name: "description", content: "Photos, videos, media coverage and awards from BITTY BALPAN Play School." },
    ],
  }),
  component: GalleryPage,
});

/* ─── Types ───────────────────────────────────────────────────── */
type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
  span?: "wide" | "tall" | "normal";
  caption?: string;
};

type VideoItem = {
  id: number;
  thumb: string;
  title: string;
  duration: string;
  youtubeId?: string;
  description: string;
};

type MediaItem = {
  id: number;
  src: string;
  outlet: string;
  headline: string;
  date: string;
  type: "print" | "digital" | "tv";
};

type AwardItem = {
  id: number;
  title: string;
  img: string;
  recipient: string;
  presentedBy: string;
  year?: string;
};

/* ─── Data ────────────────────────────────────────────────────── */
const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: campusImg, alt: "Campus Overview", category: "Campus", span: "wide", caption: "Our welcoming campus environment" },
  { id: 2, src: nurseryImg, alt: "Nursery Classroom", category: "Classrooms", span: "tall", caption: "Bright, stimulating nursery spaces" },
  { id: 3, src: prepImg, alt: "Preparatory Class", category: "Classrooms", caption: "Prep level learning in action" },
  { id: 4, src: preNurseryImg, alt: "Pre-Nursery Activity", category: "Activities", caption: "Hands-on pre-nursery activities" },
  { id: 5, src: parentChildImg, alt: "Parent-Child Session", category: "Events", span: "wide", caption: "Parent and child bonding workshops" },
  { id: 6, src: daycareImg, alt: "Day Care", category: "Daycare", caption: "Safe and nurturing daycare spaces" },
  { id: 7, src: campusImg, alt: "Outdoor Play Area", category: "Campus", caption: "Spacious outdoor play zones" },
  { id: 8, src: nurseryImg, alt: "Art & Craft", category: "Activities", span: "tall", caption: "Creative art sessions daily" },
  { id: 9, src: prepImg, alt: "Reading Corner", category: "Classrooms", caption: "Dedicated reading nooks" },
  { id: 10, src: preNurseryImg, alt: "Fancy Dress", category: "Events", span: "wide", caption: "Annual fancy dress competition" },
  { id: 11, src: parentChildImg, alt: "Independence Day", category: "Events", caption: "Independence Day celebration 2020" },
  { id: 12, src: daycareImg, alt: "Music & Rhythm", category: "Activities", caption: "Music and rhythm learning sessions" },
  { id: 13, src: campusImg, alt: "Sports Day", category: "Events", caption: "Annual sports day festivities" },
  { id: 14, src: nurseryImg, alt: "Christmas", category: "Events", span: "wide", caption: "Christmas celebrations at Balpan" },
  { id: 15, src: prepImg, alt: "Garden Walk", category: "Activities", caption: "Garden classroom exploration" },
];

const VIDEO_ITEMS: VideoItem[] = [
  { id: 1, thumb: campusImg, title: "Campus Tour — Bitty Balpan", duration: "3:24", description: "A complete walkthrough of our facilities, classrooms, and play areas." },
  { id: 2, thumb: nurseryImg, title: "A Day in Our Nursery", duration: "5:10", description: "Follow our little ones through a joyful day of learning and play." },
  { id: 3, thumb: prepImg, title: "PRATIBHA — Talent Contest 2023", duration: "12:45", description: "Highlights from our annual talent showcase featuring our youngest stars." },
  { id: 4, thumb: preNurseryImg, title: "Fancy Dress Competition", duration: "7:32", description: "Children dressed as fruits and vegetables — pure joy and creativity." },
  { id: 5, thumb: parentChildImg, title: "Parent Orientation Day", duration: "4:18", description: "Our annual parent orientation introducing the BITTY BALPAN philosophy." },
  { id: 6, thumb: daycareImg, title: "Daycare Program Overview", duration: "6:00", description: "Everything parents need to know about our holistic daycare services." },
];

const MEDIA_ITEMS: MediaItem[] = [
  { id: 1, src: campusImg, outlet: "Times of India", headline: "BITTY BALPAN Sets New Standards in Early Childhood Education", date: "March 2023", type: "print" },
  { id: 2, src: nurseryImg, outlet: "Hindustan Times", headline: "How Technology is Transforming Pre-School Learning", date: "Nov 2022", type: "digital" },
  { id: 3, src: prepImg, outlet: "Doordarshan", headline: "BITT Group's BITTY BALPAN: A Model for Modern Pre-Schools", date: "Jan 2023", type: "tv" },
  { id: 4, src: daycareImg, outlet: "EduStar India", headline: "Top 10 Pre-Schools of India 2022 — BITTY BALPAN Featured", date: "Dec 2022", type: "digital" },
  { id: 5, src: parentChildImg, outlet: "Prabhat Khabar", headline: "बच्चों के सर्वांगीण विकास में अग्रणी बिट्टी बालपन", date: "Feb 2023", type: "print" },
  { id: 6, src: campusImg, outlet: "News18", headline: "Award-Winning Curriculum: Inside BITTY BALPAN's Classroom", date: "Apr 2023", type: "tv" },
];

const AWARDS: AwardItem[] = [
  {
    id: 1,
    title: "Karmyogi Samman",
    img: award1,
    recipient: "Sri Ranjeet Kumar, Chairman — BITT Group of Institutions",
    presentedBy: "Sri Raghubar Das, Hon'ble Chief Minister of Jharkhand",
  },
  {
    id: 2,
    title: "Guru-Siksha Samman",
    img: award2,
    recipient: "Sri Ranjeet Kumar, Chairman — BITT Group of Institutions",
    presentedBy: "Smt. Neera Yadav, Hon'ble Minister, Govt. of Jharkhand",
  },
  {
    id: 3,
    title: "Justice P.N. Bhagwati Appreciation Award",
    img: award3,
    recipient: "Sri Ranjeet Kumar, Chairman — BITT Group of Institutions",
    presentedBy: "Hon'ble Mr. Justice Prakash Tatia, for exemplary contribution towards education",
  },
  {
    id: 4,
    title: "Edupreneur of the Year",
    img: award4,
    recipient: "Shri Ranjeet Kumar, Chairman — BITT Group of Institutions",
    presentedBy: "Dr. Manpreet Singh Manna, Director (AICTE) & Shri JP Yadav, Hon'ble Member of Parliament",
    year: "2017",
  },
  {
    id: 5,
    title: "Indian Achievers Award",
    img: award5,
    recipient: "Sri Ranjeet Kumar, Chairman — BITT Group of Institutions",
    presentedBy: "Shri Ram Das Athawale, Hon'ble Minister, Social Justice & Empowerment",
  },
];

const CATEGORIES = ["All", "Campus", "Classrooms", "Activities", "Events", "Daycare"];

/* ─── Shared components ───────────────────────────────────────── */
type AccentColor = "coral" | "sky" | "sun" | "mint" | "violet";
function Eyebrow({ children, color = "coral" }: { children: React.ReactNode; color?: AccentColor }) {
  const s: Record<AccentColor, string> = {
    coral: "border-coral/30 bg-coral/8 text-coral",
    sky: "border-sky/30 bg-sky/8 text-sky",
    sun: "border-amber-300/40 bg-amber-50 text-amber-600",
    mint: "border-emerald-300/40 bg-emerald-50 text-emerald-600",
    violet: "border-violet-300/40 bg-violet-50 text-violet-600",
  };
  const d: Record<AccentColor, string> = { coral: "bg-coral", sky: "bg-sky", sun: "bg-amber-400", mint: "bg-emerald-500", violet: "bg-violet-500" };
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-[0.18em] mb-4 ${s[color]}`}>
      <span className={`size-1.5 rounded-full animate-pulse ${d[color]}`} />
      {children}
    </span>
  );
}

/* ─── Lightbox ────────────────────────────────────────────────── */
function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[currentIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-5 size-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 grid place-items-center text-white transition"
          onClick={onClose}
        >
          <X className="size-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-xs font-mono">
          {currentIndex + 1} / {items.length}
        </div>

        {/* Prev */}
        <button
          className="absolute left-4 md:left-8 size-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 grid place-items-center text-white transition z-10"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft className="size-6" />
        </button>

        {/* Image */}
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
          {item.caption && (
            <div className="mt-4 px-6 py-2.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm text-center">
              {item.caption}
            </div>
          )}
        </motion.div>

        {/* Next */}
        <button
          className="absolute right-4 md:right-8 size-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 grid place-items-center text-white transition z-10"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Thumbnails strip */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] px-4 py-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={(e) => { e.stopPropagation(); /* handled by parent */ }}
              className={`size-10 rounded-lg overflow-hidden shrink-0 border-2 transition ${i === currentIndex ? "border-white scale-110" : "border-white/20 opacity-50 hover:opacity-80"}`}
            >
              <img src={it.src} alt={it.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Video Popup ─────────────────────────────────────────────── */
function VideoPopup({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          className="absolute top-5 right-5 size-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 grid place-items-center text-white transition"
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="w-full max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Simulated video player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            <img src={video.thumb} alt={video.title} className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="size-20 rounded-full bg-white/20 border-2 border-white/40 grid place-items-center backdrop-blur-sm">
                <Play className="size-8 text-white fill-white ml-1" />
              </div>
              <p className="text-white/60 text-sm font-mono">Connect YouTube to enable video playback</p>
            </div>
          </div>
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-white text-xl">{video.title}</h3>
              <p className="text-white/55 text-sm mt-1">{video.description}</p>
            </div>
            <span className="shrink-0 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs font-mono">{video.duration}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const tabs = [
    { label: "Image Gallery", icon: ImageIcon, href: "#images" },
    { label: "Video Gallery", icon: Video, href: "#videos" },
    { label: "Media Coverage", icon: Newspaper, href: "#media" },
    { label: "Awards", icon: Award, href: "#awards" },
  ];
  return (
    <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-b from-sky/12 via-mint/6 to-transparent rounded-b-full blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}>
        <Eyebrow color="sky">Gallery</Eyebrow>
        <h1 className="heading-xl text-primary mt-4 max-w-3xl mx-auto">
          Moments that tell{" "}
          <span className="text-coral italic">our story.</span>
        </h1>
        <p className="mt-5 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
          A window into the joyful, curious world of BITTY BALPAN — captured in photos, videos,
          media features and the recognition we've earned.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-10 flex flex-wrap gap-3 justify-center"
      >
        {tabs.map((t) => (
          <a
            key={t.label}
            href={t.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-white/80 backdrop-blur text-sm font-medium text-foreground/70 hover:border-sky/40 hover:text-sky hover:bg-sky/5 transition"
          >
            <t.icon className="size-3.5" />
            {t.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — IMAGE GALLERY
   ═══════════════════════════════════════════════════════════════ */
function ImageGallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length)), [filtered.length]);
  const goNext = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length)), [filtered.length]);

  const spanClass = (span?: string) => {
    if (span === "wide") return "col-span-2";
    if (span === "tall") return "row-span-2";
    return "";
  };

  return (
    <section id="images" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <Eyebrow color="coral">Image Gallery</Eyebrow>
            <h2 className="heading-lg text-primary mt-1">
              Memories from our{" "}
              <span className="text-coral italic">campus & classrooms.</span>
            </h2>
          </div>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-border text-foreground/60 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${spanClass(item.span)}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition">
                  {item.category}
                </div>
                {/* Hover overlay */}
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4"
                    >
                      <p className="text-white text-sm font-medium leading-tight">{item.caption}</p>
                      <div className="mt-2 size-8 rounded-full bg-white/20 border border-white/30 grid place-items-center">
                        <ZoomIn className="size-3.5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Count */}
        <p className="text-center text-xs font-mono text-muted-foreground mt-6 uppercase tracking-widest">
          {filtered.length} of {GALLERY_ITEMS.length} images — {activeCategory}
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — VIDEO GALLERY
   ═══════════════════════════════════════════════════════════════ */
function VideoGallerySection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className="py-24 px-6 bg-surface scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <Eyebrow color="sky">Video Gallery</Eyebrow>
          <h2 className="heading-lg text-primary mt-1">
            Watch our world{" "}
            <span className="text-sky italic">come alive.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-lg mx-auto">
            From campus tours to celebration highlights — experience BITTY BALPAN through video.
          </p>
        </motion.div>

        {/* Featured video (first) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video rounded-[2rem] overflow-hidden mb-8 cursor-pointer group"
          onClick={() => setActiveVideo(VIDEO_ITEMS[0])}
        >
          <img src={VIDEO_ITEMS[0].thumb} alt={VIDEO_ITEMS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-20 rounded-full bg-white/20 border-2 border-white/40 grid place-items-center backdrop-blur-sm group-hover:scale-110 transition duration-300">
              <Play className="size-8 text-white fill-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-white/60 text-xs font-mono uppercase tracking-widest">Featured</span>
            <h3 className="font-display font-bold text-2xl text-white mt-1">{VIDEO_ITEMS[0].title}</h3>
            <p className="text-white/65 text-sm mt-1">{VIDEO_ITEMS[0].description}</p>
          </div>
          <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-mono border border-white/20">
            {VIDEO_ITEMS[0].duration}
          </div>
        </motion.div>

        {/* Video grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VIDEO_ITEMS.slice(1).map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-border/60 bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300"
              onClick={() => setActiveVideo(video)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={video.thumb} alt={video.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-12 rounded-full bg-white/25 border border-white/40 grid place-items-center group-hover:scale-110 transition">
                    <Play className="size-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-white text-[10px] font-mono">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-display font-bold text-primary text-sm leading-tight mb-1">{video.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {activeVideo && <VideoPopup video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — MEDIA GALLERY
   ═══════════════════════════════════════════════════════════════ */
const mediaTypeColors: Record<string, string> = {
  print: "bg-amber-100 text-amber-700 border-amber-200",
  digital: "bg-sky/10 text-sky border-sky/20",
  tv: "bg-violet-100 text-violet-700 border-violet-200",
};

function MediaGallerySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="media" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <Eyebrow color="mint">Media Coverage</Eyebrow>
          <h2 className="heading-lg text-primary mt-1">
            As seen in the{" "}
            <span className="text-emerald-600 italic">press & media.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-lg mx-auto">
            BITTY BALPAN's story has been covered by leading print, digital and broadcast outlets
            across India.
          </p>
        </motion.div>

        {/* Media type legend */}
        <div className="flex gap-3 justify-center mb-10">
          {[
            { type: "print", label: "Print Media" },
            { type: "digital", label: "Digital" },
            { type: "tv", label: "TV / Broadcast" },
          ].map((t) => (
            <span key={t.type} className={`px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider ${mediaTypeColors[t.type]}`}>
              {t.label}
            </span>
          ))}
        </div>

        {/* Masonry-style media grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEDIA_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group relative rounded-2xl overflow-hidden border border-border/60 bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.outlet}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider ${mediaTypeColors[item.type]}`}>
                  {item.type}
                </div>
                {/* Hover: external link icon */}
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-3 right-3 size-8 rounded-full bg-white/20 border border-white/30 grid place-items-center"
                    >
                      <ExternalLink className="size-3.5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-primary text-sm">{item.outlet}</span>
                  <span className="text-[11px] font-mono text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-medium">{item.headline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — AWARDS & RECOGNITIONS
   ═══════════════════════════════════════════════════════════════ */
function AwardsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="awards" className="py-24 px-6 bg-primary text-white overflow-hidden relative scroll-mt-20">
      <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-sun/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 size-[400px] rounded-full bg-coral/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-xs font-mono uppercase tracking-[0.18em] mb-4">
            <span className="size-1.5 rounded-full bg-sun animate-pulse" />
            Awards & Recognitions
          </span>
          <h2 className="heading-lg mt-2 max-w-3xl mx-auto">
            Excellence recognized by{" "}
            <span className="text-sun italic">industry leaders.</span>
          </h2>
          <p className="mt-5 text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
            Over the years, BITTY BALPAN has been honored by national education bodies, industry
            organizations and community institutions.
          </p>
        </motion.div>

        {/* Awards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              onMouseEnter={() => setHoveredId(award.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 hover:-translate-y-1 transition duration-300 cursor-default bg-white/5 backdrop-blur-sm"
            >
              {/* Award photo — full bleed, fixed height */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={award.img}
                  alt={award.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                />
                {/* Subtle dark scrim so text below reads cleanly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Year badge — only if present */}
                {award.year && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-[10px] font-mono font-bold tracking-widest">
                    {award.year}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 border-t border-white/8">
                <h3 className="font-display font-bold text-white text-base leading-snug mb-3">
                  {award.title}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed mb-2">
                  <span className="text-white/40 uppercase tracking-wider font-mono text-[10px]">Recipient · </span>
                  {award.recipient}
                </p>
                <p className="text-white/55 text-xs leading-relaxed">
                  <span className="text-white/40 uppercase tracking-wider font-mono text-[10px]">Presented by · </span>
                  {award.presentedBy}
                </p>
              </div>

              {/* Hover shimmer */}
              <AnimatePresence>
                {hoveredId === award.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-white/6 to-transparent pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Trophy shelf — decorative row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] border border-white/10 bg-white/5 p-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,200,0,0.08),transparent_70%)]" />
          <div className="relative flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            {/* Thumbnail strip of award photos */}
            <div className="flex gap-2 shrink-0">
              {AWARDS.map((a) => (
                <div key={a.id} className="size-12 rounded-xl overflow-hidden border border-white/20">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                5 prestigious recognitions and counting.
              </h3>
              <p className="text-white/55 text-sm max-w-xl">
                Awarded by Chief Ministers, Justices, and national ministers — every honour
                reflects the trust placed in BITTY BALPAN and the BITT Group's 25-year legacy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA BAND
   ═══════════════════════════════════════════════════════════════ */
function CTABand() {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center bg-gradient-to-br from-sun/25 via-coral/10 to-sky/20 rounded-[2.5rem] p-14 md:p-20 border border-sun/25 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_70%)]" />
        <div className="relative">
          <Eyebrow color="coral">Visit Us</Eyebrow>
          <h2 className="heading-lg text-primary mb-5 mt-2">
            Come see the magic{" "}
            <span className="text-coral italic">in person.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            No photo or video does it full justice. Walk through our campus, meet our teachers, and
            feel the BITTY BALPAN warmth firsthand.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Schedule a Visit <Star className="size-4" />
            </a>
            <a
              href="/about"
              className="px-6 py-3 rounded-full border border-primary/25 text-primary font-semibold text-sm hover:bg-primary/5 transition"
            >
              Learn About Us
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE
   ═══════════════════════════════════════════════════════════════ */
function GalleryPage() {
  return (
    <>
      <HeroSection />
      <ImageGallerySection />
      <VideoGallerySection />
      <MediaGallerySection />
      <AwardsSection />
      <CTABand />
    </>
  );
}