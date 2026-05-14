import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ShieldCheck, Sparkles, HeartHandshake, Cpu, Star, ArrowRight,
  Play, Quote, Leaf, Camera, Heart, BookOpen, Users, Shield,
} from "lucide-react";
import heroImg from "@/assets/facilities.png";
import preNurseryImg from "@/assets/baby pre-school.png";
import nurseryImg from "@/assets/pre-school.png";
import prepImg from "@/assets/slide3.png";
import daycareImg from "@/assets/day_care.png";
import parentChildImg from "@/assets/parent-child2.png";
import campusImg from "@/assets/school_img.png";
import slide1 from "@/assets/slide1.png";
import slide2 from "@/assets/slide2.png";
import slide3 from "@/assets/slide3.png";
import slide4 from "@/assets/slide4.png";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bitty Balpan Play School — Where Little Dreams Begin" },
      { name: "description", content: "Premium preschool for ages 1.5–5+. Smart classrooms, certified Montessori methods, safe campus, and joyful day care." },
      { property: "og:title", content: "Bitty Balpan — Where Little Dreams Begin" },
      { property: "og:description", content: "Premium preschool experience for the next generation of curious minds." },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const },
};

const SLIDES = [slide1, slide2, slide3, slide4];

function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StepsInsideBalpan />
      <Programs />
      <AboutSplit />
      <WhyParents />
      <VideoExperience />
      <Testimonials />
      <GalleryPreview />
      <CTA />
    </>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-center justify-center">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={current}
            src={SLIDES[current]}
            alt="Bitty Balpan campus life"
            width={1920}
            height={1280}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-warm" />
      </motion.div>

      {/* Floating shapes */}
      <div className="absolute top-32 left-10 size-16 rounded-full bg-sun/70 blur-sm animate-float" />
      <div className="absolute top-1/3 right-16 size-24 rounded-full bg-coral/60 blur-md animate-float" style={{ animationDelay: "-2s" }} />
      <div className="absolute bottom-40 left-1/4 size-12 rounded-full bg-mint/70 blur-sm animate-float" style={{ animationDelay: "-4s" }} />

      <motion.div style={{ opacity }} className="relative z-10 text-center max-w-5xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-white/90 mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
        >
          ★ Est. 2012 · Premier Early Education
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          className="heading-xl text-white mb-6 text-balance"
        >
          Where Little Dreams{" "}
          <span className="text-sun italic underline decoration-sky decoration-[6px] underline-offset-[12px]">
            Begin.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 text-pretty"
        >
          A nurturing world where curiosity leads, friendships bloom and every child's
          potential is celebrated through joyful, science-backed play.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/preschool" className="btn-primary bg-white !text-primary hover:!bg-sun">
            Explore Programs <ArrowRight className="size-4" />
          </Link>
          <Link to="/admission" className="btn-ghost !text-white !bg-white/10 !border-white/30 hover:!bg-white/20 hover:!text-white">
            <Play className="size-4 fill-current" /> Take a Virtual Tour
          </Link>
        </motion.div>
      </motion.div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full border-none outline-none cursor-pointer transition-all duration-300 ${
              i === current ? "bg-white scale-125" : "bg-white/45"
            } size-2`}
          />
        ))}
      </div>
    </section>
  );
}

/* -------------------- TRUST BAR -------------------- */
function TrustBar() {
  const items = [
    { icon: Cpu, label: "Smart Classrooms", color: "text-sky", bg: "bg-sky/15" },
    { icon: ShieldCheck, label: "Safe Campus", color: "text-mint", bg: "bg-mint/15" },
    { icon: Sparkles, label: "Activity Based Learning", color: "text-sun", bg: "bg-sun/15" },
    { icon: HeartHandshake, label: "Premium Day Care", color: "text-coral", bg: "bg-coral/15" },
  ];
  return (
    <section className="relative -mt-20 z-20 px-4 md:px-6 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto glass rounded-3xl p-3 grid grid-cols-2 md:grid-cols-4 gap-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)]"
      >
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white transition group cursor-default"
          >
            <div className={`size-12 rounded-2xl ${it.bg} ${it.color} grid place-items-center group-hover:scale-110 transition-transform`}>
              <it.icon className="size-5" />
            </div>
            <span className="text-sm font-semibold font-display text-foreground">{it.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* -------------------- STEPS INSIDE BITTY BALPAN -------------------- */
const STEPS = [
  {
    n: "01", icon: Heart,
    title: "A Nurturing Community",
    text: "BITTY BALPAN is a dynamic, vibrant learning community that embraces a diversity of cultural and social backgrounds with warmth and acceptance.",
    color: "text-coral", bg: "bg-coral/10", border: "border-coral/20",
  },
  {
    n: "02", icon: Sparkles,
    title: "Joyful Discovery",
    text: "We spark innate curiosity through activity-based, science-backed play that makes every school day an adventure worth looking forward to.",
    color: "text-sun", bg: "bg-sun/10", border: "border-sun/20",
  },
  {
    n: "03", icon: BookOpen,
    title: "Strong Foundations",
    text: "Our mission fosters strong skills and an everlasting passion for learning — so each child fully realises their unique innate talent.",
    color: "text-mint", bg: "bg-mint/10", border: "border-mint/20",
  },
  {
    n: "04", icon: Users,
    title: "Proud Partnership",
    text: "Parents are partners, not spectators. We cultivate an open community where every family feels genuinely seen and deeply valued.",
    color: "text-sky", bg: "bg-sky/10", border: "border-sky/20",
  },
  {
    n: "05", icon: Star,
    title: "Limitless Potential",
    text: "We nurture the whole child — mind, body and heart — equipping them to sail confidently through every stage of life's remarkable journey.",
    color: "text-primary", bg: "bg-primary/5", border: "border-primary/15",
  },
  {
    n: "06", icon: Shield,
    title: "Safe & Caring Campus",
    text: "360° monitored, eco-certified and staffed by educators trained in emotional intelligence — because peace of mind is non-negotiable.",
    color: "text-sky", bg: "bg-sky/10", border: "border-sky/20",
  },
];

function StepsInsideBalpan() {
  return (
    <section className="py-24 md:py-32 px-6 bg-warm">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Philosophy"
          title={<>Steps inside <span className="text-coral italic">Bitty Balpan</span></>}
          description="BITTY BALPAN is a dynamic, nurturing and vibrant learning community that encompasses a diversity of cultural and social backgrounds. It embraces a strong sense of community, is positive and is an exciting place to be a part of."
        />

        {/* Mission banner */}
        <motion.div
          {...fadeUp}
          className="relative rounded-3xl bg-primary text-white overflow-hidden px-8 md:px-14 py-10 mb-16 text-center"
        >
          <div className="absolute -top-20 left-1/3 size-64 rounded-full bg-sky/20 blur-[80px] animate-blob" />
          <div className="absolute -bottom-20 right-0 size-52 rounded-full bg-coral/20 blur-[60px] animate-blob" style={{ animationDelay: "-5s" }} />
          <p className="eyebrow !text-sky/70 relative mb-3">Our Mission</p>
          <p className="relative text-white/85 text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-pretty">
            "To create an institution which fosters{" "}
            <span className="text-sun font-semibold">strong skills and everlasting passion for learning</span>{" "}
            so that the child realises his innate talent to full potential — to sail smoothly through the tumultuous sea of life."
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className={`group relative p-7 rounded-3xl bg-white border ${s.border} hover:border-primary/25 hover:-translate-y-1 transition-all overflow-hidden`}
            >
              <div className="absolute top-3 right-5 font-display font-extrabold text-[6rem] leading-none text-primary/[0.04] group-hover:text-primary/[0.07] transition select-none pointer-events-none">
                {s.n}
              </div>
              <div className={`size-12 rounded-2xl ${s.bg} ${s.color} grid place-items-center mb-5 group-hover:scale-110 transition-transform`}>
                <s.icon className="size-5" />
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-widest ${s.color} mb-2 block`}>
                Step {s.n}
              </span>
              <h3 className="font-display font-bold text-xl text-primary mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- PROGRAMS BENTO -------------------- */
const PROGRAMS = [
  { name: "Baby Pre-Nursery", age: "1.5 – 2.5 yrs", img: preNurseryImg, accent: "sky", text: "A gentle introduction to social environments through sensory exploration and motor skill play.", hash: "baby-pre-nursery" },
  { name: "Nursery", age: "2.5 – 3.5 yrs", img: nurseryImg, accent: "coral", text: "Daily phonics, story circles and creative bursts to bloom communication.", hash: "nursery" },
  { name: "Preparatory", age: "3.5 – 5 yrs", img: prepImg, accent: "mint", text: "Transitioning curious minds into structured learning and foundational literacy.", hash: "preparatory" },
  { name: "Premium Day Care", age: "All Ages", img: daycareImg, accent: "sun", text: "A home-away-from-home with nutritious meals, safe sleep areas and guided play.", hash: "day-care" },
];

function Programs() {
  return (
    <section className="py-24 md:py-32 px-6 bg-warm">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Curriculum"
          title={<>Learning pathways crafted <span className="text-coral italic">for every stage</span></>}
          description="Tailored developmental programs that respect the individual pace of every child, inspired by international pedagogy."
        />
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[260px]">
          <ProgramCard p={PROGRAMS[0]} className="col-span-12 md:col-span-8 row-span-2" big />
          <ProgramCard p={PROGRAMS[1]} className="col-span-12 md:col-span-4 row-span-2" />
          <ProgramCard p={PROGRAMS[2]} className="col-span-12 md:col-span-4 row-span-2" />
          <ProgramCard p={PROGRAMS[3]} className="col-span-12 md:col-span-8 row-span-2" big />
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  p, className = "", big = false,
}: { p: typeof PROGRAMS[number]; className?: string; big?: boolean }) {
  const accentMap: Record<string, string> = {
    sky: "from-sky/30 text-sky border-sky/30 bg-sky/5",
    coral: "from-coral/30 text-coral border-coral/30 bg-coral/5",
    mint: "from-mint/30 text-mint border-mint/30 bg-mint/5",
    sun: "from-sun/40 text-foreground border-sun/30 bg-sun/10",
  };
  return (
    <motion.article {...fadeUp} className={`group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border ${accentMap[p.accent]} ${className}`}>
      <img
        src={p.img}
        alt={p.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20 text-white">
        <span className="inline-block self-start px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-white/20">
          {p.age}
        </span>
        <h3 className={`font-display font-extrabold ${big ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} mb-2`}>
          {p.name}
        </h3>
        <p className="text-white/85 text-sm max-w-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          {p.text}
        </p>
      </div>
      <a
        href={`/preschool#${p.hash}`}
        className="absolute top-5 right-5 size-10 rounded-full bg-white/90 backdrop-blur-md grid place-items-center text-primary group-hover:scale-110 group-hover:bg-sun transition z-20"
        aria-label={`View ${p.name} program`}
      >
        <ArrowRight className="size-4" />
      </a>
    </motion.article>
  );
}

/* -------------------- ABOUT SPLIT -------------------- */
function AboutSplit() {
  const stats = [
    { v: "12+", l: "Years Of Joy" },
    { v: "1.2k", l: "Happy Alumni" },
    { v: "98%", l: "Parent Trust" },
    { v: "24", l: "Centers" },
  ];
  return (
    <section className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
      <div className="absolute -top-32 left-1/3 size-[500px] rounded-full bg-sky/20 blur-[140px] animate-blob" />
      <div className="absolute -bottom-32 right-0 size-[400px] rounded-full bg-coral/20 blur-[120px] animate-blob" style={{ animationDelay: "-7s" }} />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp} className="relative">
          <div className="absolute -top-8 -left-8 size-72 bg-sky/20 rounded-full blur-3xl" />
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-glow">
            <img src={parentChildImg} alt="Parent and child sharing a happy moment" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-8 -right-4 md:-right-12 bg-white text-foreground p-6 rounded-3xl shadow-2xl max-w-xs"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-sun text-sun" />
              ))}
            </div>
            <p className="text-sm font-medium italic leading-relaxed">
              "Balpan transformed how my son interacts with the world. He comes home excited to learn!"
            </p>
            <p className="text-primary/60 text-[10px] font-bold uppercase tracking-widest mt-3">
              — Sarah J., Parent
            </p>
          </motion.div>
        </motion.div>

        <div>
          <motion.span {...fadeUp} className="eyebrow !text-sky/80">Our Philosophy</motion.span>
          <motion.h2 {...fadeUp} transition={{ delay: 0.05 }} className="heading-lg mt-3 mb-6 text-balance">
            More than a school. <br /> <span className="text-sky">A foundation for life.</span>
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-white/75 text-lg leading-relaxed mb-10 text-pretty">
            We blend Montessori principles, modern neuro-science and warm human care to nurture the whole child —
            mind, body and heart.
          </motion.p>
          <div className="grid grid-cols-2 gap-6 mb-10">
            {stats.map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 + i * 0.07 }}>
                <div className="font-display text-4xl md:text-5xl font-extrabold text-sun">{s.v}</div>
                <div className="text-xs uppercase tracking-widest font-mono text-white/60 mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>
          <Link to="/about" className="btn-primary !bg-sun !text-ink hover:!bg-white">
            Our Story <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------- WHY PARENTS LOVE US -------------------- */
function WhyParents() {
  const points = [
    { n: "01", icon: Sparkles, title: "Certified Montessori Methods", text: "Globally recognized neuro-science and child development standards.", color: "text-sky" },
    { n: "02", icon: ShieldCheck, title: "Live 360° Campus Monitoring", text: "Securely access classroom feeds for total peace of mind.", color: "text-mint" },
    { n: "03", icon: Leaf, title: "Sustainable & Toxic-Free", text: "Every toy, paint and surface is certified eco-friendly and 100% safe.", color: "text-coral" },
    { n: "04", icon: HeartHandshake, title: "Warm, Loving Educators", text: "Hand-picked teachers trained in emotional intelligence and care.", color: "text-sun" },
  ];
  return (
    <section className="py-24 md:py-32 px-6 bg-warm">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Why Parents Love Us"
          title={<>The reasons parents <span className="text-coral italic">choose Balpan</span></>}
          description="Four pillars that make every Balpan day safe, joyful and meaningful."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {points.map((p, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group p-8 rounded-3xl bg-white border border-border hover:border-primary/30 hover:-translate-y-1 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 font-display font-extrabold text-[8rem] leading-none text-primary/5 group-hover:text-primary/10 transition">
                {p.n}
              </div>
              <div className={`size-14 rounded-2xl bg-current/10 ${p.color} grid place-items-center mb-5 relative`}>
                <p.icon className="size-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-primary mb-3 relative">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed relative">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- VIDEO EXPERIENCE -------------------- */
function VideoExperience() {
  const cards = [
    { img: heroImg, title: "A Day at Balpan", tag: "Campus Life" },
    { img: nurseryImg, title: "Art & Imagination", tag: "Creative" },
    { img: prepImg, title: "Circle Time", tag: "Social" },
  ];
  return (
    <section className="py-24 md:py-32 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, oklch(0.78 0.13 230 / 0.4), transparent 40%), radial-gradient(circle at 70% 80%, oklch(0.72 0.17 15 / 0.3), transparent 40%)" }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <span className="eyebrow !text-sky/80">Stories in Motion</span>
            <h2 className="heading-lg mt-3 text-balance">Step inside the Balpan world.</h2>
          </div>
          <p className="text-white/60 max-w-md">
            Tap any moment to watch our campus, classrooms and curiosity come alive.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer ${i === 1 ? "md:translate-y-12" : ""}`}
            >
              <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="self-start px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/20">
                  {c.tag}
                </span>
                <div className="flex items-end justify-between">
                  <h3 className="font-display font-bold text-2xl">{c.title}</h3>
                <Link
                  to="/gallery"
                  className="size-14 rounded-full bg-sun text-ink grid place-items-center group-hover:scale-110 transition"
                  aria-label="View gallery"
                >
                  <Play className="size-5 fill-current ml-0.5" />
                </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- TESTIMONIALS -------------------- */
const TESTIMONIALS = [
  { name: "Priya & Rohan", role: "Parents of Aanya, Nursery", text: "The teachers know our daughter's mood the moment she walks in. That kind of care is rare and irreplaceable.", color: "sky" },
  { name: "Marcus L.", role: "Father of Theo, Prep", text: "Theo asks for school on weekends. That sentence alone is worth everything Balpan stands for.", color: "coral" },
  { name: "Anjali K.", role: "Mother of Vir, Pre-Nursery", text: "From music to messy play, every day is intentional. We feel like partners, not customers.", color: "mint" },
];

function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Loved by Families"
          title={<>Words from our <span className="text-primary italic">Balpan parents</span></>}
        />
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative p-8 rounded-3xl bg-white border border-border hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <Quote className={`size-10 mb-5 text-${t.color}`} />
              <blockquote className="text-foreground text-lg leading-relaxed mb-6 text-pretty">
                "{t.text}"
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-border">
                <div className={`size-12 rounded-full bg-${t.color}/20 grid place-items-center font-display font-bold text-${t.color}`}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-display font-bold text-primary">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- GALLERY PREVIEW -------------------- */
function GalleryPreview() {
  const imgs = [heroImg, nurseryImg, prepImg, daycareImg, parentChildImg, campusImg];
  return (
    <section className="py-24 md:py-32 px-6 bg-warm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="eyebrow">Gallery Snapshots</span>
            <h2 className="heading-lg text-primary mt-3">Tiny moments, big memories.</h2>
          </div>
          <Link to="/gallery" className="hidden md:inline-flex items-center gap-2 text-primary font-semibold font-display group">
            See full gallery
            <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
          {imgs.map((img, i) => {
            const spans = ["col-span-6 md:col-span-4 row-span-2", "col-span-6 md:col-span-4", "col-span-6 md:col-span-4 row-span-2", "col-span-6 md:col-span-4", "col-span-6 md:col-span-4", "col-span-12 md:col-span-4 row-span-1"];
            return (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-2xl group ${spans[i]}`}
              >
                <img src={img} alt="Balpan moment" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition flex items-center justify-center">
                  <Camera className="size-7 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- CTA -------------------- */
function CTA() {
  return (
    <section className="px-4 md:px-6 pb-24">
      <div className="relative max-w-7xl mx-auto rounded-[2.5rem] md:rounded-[3rem] bg-primary text-white overflow-hidden p-10 md:p-20 text-center">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-sky/30 blur-[120px] animate-blob" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-coral/30 blur-[120px] animate-blob" style={{ animationDelay: "-5s" }} />
        <motion.div {...fadeUp} className="relative z-10 max-w-3xl mx-auto">
          <span className="eyebrow !text-sky/80">Admissions Open · 2026</span>
          <h2 className="heading-lg text-white mt-4 mb-6 text-balance">
            Ready to spark their <span className="text-sun italic">curiosity</span>?
          </h2>
          <p className="text-white/80 text-lg mb-10 text-pretty">
            Limited seats available across all programs. Schedule a campus tour and meet
            the teachers who'll shape your child's earliest memories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/admission" className="btn-primary !bg-coral !text-white">
              Apply Online <ArrowRight className="size-4" />
            </Link>
            <Link to="/contact" className="btn-ghost !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hover:!text-white">
              Request Prospectus
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}