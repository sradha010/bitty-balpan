import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  ArrowRight,Music,
  Palette,
  Brain,
  Users,
  Sparkles,
  Smile,Heart,
  Shield, Clock,
  Phone,Mail, CheckCircle2,Star,BookOpen,Pencil,Layers,Blocks,
} from "lucide-react";
import preNurseryImg from "@/assets/baby pre-school.png";
import nurseryImg from "@/assets/pre-school.png";
import prepImg from "@/assets/slide4.png";
import daycareImg from "@/assets/day_care.png";

export const Route = createFileRoute("/preschool")({
  head: () => ({
    meta: [
      { title: "Preschool Programs — Bitty Balpan" },
      {
        name: "description",
        content:
          "Six carefully crafted programs for ages 1.5 to 9 — Baby Pre-Nursery, Pre-Nursery, Nursery, Prep and full Day Care. Activity-based, sensorial, joyful.",
      },
    ],
  }),
  component: PreschoolPage,
});

/* ─── Shared animation ───────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as const },
};
const stagger = (i: number) => ({
  ...fadeUp,
  transition: { delay: i * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] as const },
});

/* ─── Shared Eyebrow ─────────────────────────────────────────── */
function Eyebrow({
  children,
  color = "coral",
}: {
  children: React.ReactNode;
  color?: "coral" | "sky" | "mint" | "sun" | "violet";
}) {
  const map: Record<string, string> = {
    coral: "border-coral/30 bg-coral/8 text-coral",
    sky: "border-sky/30 bg-sky/8 text-sky",
    mint: "border-mint/30 bg-mint/10 text-emerald-600",
    sun: "border-sun/30 bg-sun/10 text-amber-600",
    violet: "border-violet-300/40 bg-violet-50 text-violet-600",
  };
  const dot: Record<string, string> = {
    coral: "bg-coral",
    sky: "bg-sky",
    mint: "bg-emerald-500",
    sun: "bg-amber-400",
    violet: "bg-violet-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-[0.18em] mb-4 ${map[color]}`}
    >
      <span className={`size-1.5 rounded-full ${dot[color]} animate-pulse`} />
      {children}
    </span>
  );
}

/* ─── Parallax Image ─────────────────────────────────────────── */
function ParallaxImage({
  src,
  alt,
  badge,
  badgeBg,
}: {
  src: string;
  alt: string;
  badge: string;
  badgeBg: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className="w-full h-[115%] object-cover object-center"
      />
      <div
        className={`absolute top-5 left-5 px-4 py-1.5 rounded-full ${badgeBg} text-white text-xs font-bold uppercase tracking-widest shadow`}
      >
        {badge}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 0 — HERO
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const programs = [
    { label: "Baby Pre-Nursery", age: "1.5–2.5 yrs", color: "bg-sky/15 text-sky border-sky/20", hash: "baby-pre-nursery" },
    { label: "Pre-Nursery", age: "2.5–3.5 yrs", color: "bg-coral/10 text-coral border-coral/20", hash: "pre-nursery" },
    { label: "Nursery", age: "3.5–4.5 yrs", color: "bg-emerald-50 text-emerald-700 border-emerald-200", hash: "nursery" },
    { label: "Preparatory", age: "4.5–5.5 yrs", color: "bg-violet-50 text-violet-700 border-violet-200", hash: "preparatory" },
    { label: "Day Care", age: "1.5–9 yrs", color: "bg-amber-50 text-amber-700 border-amber-200", hash: "day-care" },
  ];

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-gradient-to-b from-sky/15 via-coral/5 to-transparent rounded-b-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        <Eyebrow color="coral">Our Programs</Eyebrow>
        <h1 className="heading-xl text-primary mt-4 max-w-4xl mx-auto">
          Every age, a perfectly{" "}
          <span className="text-coral italic">crafted journey.</span>
        </h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          From a toddler's first steps into learning to a child fully ready for formal school — BITTY
          Balpan's six programs grow alongside every stage of your child's development.
        </p>
      </motion.div>

      {/* Program pill nav */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-10 flex flex-wrap gap-3 justify-center"
      >
        {programs.map((p) => (
          <a
            key={p.label}
            href={`#${p.hash}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md ${p.color}`}
          >
            {p.label}
            <span className="text-xs opacity-60 font-mono">{p.age}</span>
          </a>
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — PRESCHOOL OVERVIEW
   ═══════════════════════════════════════════════════════════════ */
const pillars = [
  { icon: Smile, t: "Storytelling", d: "Bringing books to life with voice, props and expressive play." },
  { icon: Sparkles, t: "Sensory Learning", d: "Texture trays, sound walls and richly designed concept rooms." },
  { icon: Palette, t: "Art & Craft", d: "Daily ateliers led by dedicated creative educators." },
  { icon: Music, t: "Rhythm & Music", d: "Joyful daily song, rhythm exercises and instrument exposure." },
  { icon: Users, t: "Social Development", d: "Conflict resolution, group play and confidence building." },
  { icon: Brain, t: "Cognitive Growth", d: "Puzzles, patterns and structured problem-solving rituals." },
];

function OverviewSection() {
  return (
    <section className="py-28 px-6 bg-surface" id="overview">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Eyebrow color="sky">Preschool Overview</Eyebrow>
          <h2 className="heading-lg text-primary mt-2 max-w-3xl mx-auto">
            Where every child finds their own way to{" "}
            <span className="text-coral italic">learn and flourish.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
            BITTY Balpan's preschool curriculum spans Baby Pre-Nursery through Preparatory — four
            progressive levels designed for ages 1.5 to 5.5 years, anchored in activity-based, child-led
            learning that respects every child's unique pace and potential.
          </p>
        </motion.div>

        {/* Six Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              {...stagger(i)}
              className="group p-7 rounded-3xl border border-border/60 bg-white hover:border-coral/30 hover:-translate-y-1 hover:shadow-lg transition duration-400"
            >
              <div className="size-13 rounded-2xl bg-coral/10 grid place-items-center text-coral mb-5 group-hover:bg-coral/15 group-hover:scale-110 transition-all">
                <p.icon className="size-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-primary mb-2">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   REUSABLE PROGRAM SECTION
   ═══════════════════════════════════════════════════════════════ */
function ProgramSection({
  id,
  eyebrow,
  eyebrowColor,
  level,
  name,
  age,
  tagline,
  description,
  highlights,
  img,
  imgBadgeBg,
  accentClass,
  flip = false,
  bg = false,
}: {
  id: string;
  eyebrow: string;
  eyebrowColor: "coral" | "sky" | "mint" | "sun" | "violet";
  level: string;
  name: string;
  age: string;
  tagline: string;
  description: React.ReactNode;
  highlights: string[];
  img: string;
  imgBadgeBg: string;
  accentClass: string;
  flip?: boolean;
  bg?: boolean;
}) {
  return (
    /*
     * FIX (Bug 2): Each program section has its id set here.
     * scroll-mt-20 ensures the section scrolls into view below the sticky
     * navbar when navigated via hash (e.g. /preschool#baby-pre-nursery).
     * The IDs match exactly what the home curriculum buttons link to:
     *   baby-pre-nursery, pre-nursery, nursery, preparatory, day-care
     */
    <section
      id={id}
      className={`py-24 px-6 scroll-mt-20 ${bg ? "bg-surface" : ""}`}
    >
      <div
        className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <motion.div {...stagger(0)}>
          <ParallaxImage src={img} alt={name} badge={age} badgeBg={imgBadgeBg} />
        </motion.div>

        {/* Content */}
        <div>
          <motion.div {...stagger(0)}>
            <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
              {level}
            </div>
            <h2 className="heading-lg text-primary mb-3">{name}</h2>
            <p className={`font-display text-xl italic mb-6 ${accentClass}`}>{tagline}</p>
          </motion.div>

          <motion.div
            {...stagger(1)}
            className="text-muted-foreground text-base leading-relaxed space-y-3 mb-8"
          >
            {description}
          </motion.div>

          {/* Highlights */}
          <motion.div {...stagger(2)}>
            <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground mb-4">
              What your child experiences
            </p>
            <ul className="space-y-2.5">
              {highlights.map((h, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2 className={`size-4 mt-0.5 shrink-0 ${accentClass}`} />
                  <span className="text-sm text-foreground/80">{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...stagger(3)} className="mt-8">
            <Link to="/admission" className="btn-primary inline-flex items-center gap-2">
              Enquire about {name} <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — BABY PRE-NURSERY
   id="baby-pre-nursery" ← linked from home curriculum buttons
   ═══════════════════════════════════════════════════════════════ */
function BabyPreNurserySection() {
  return (
    <ProgramSection
      id="baby-pre-nursery"
      eyebrow="Baby Pre-Nursery"
      eyebrowColor="sky"
      level="Level 01 · Age 1.5 – 2.5 yrs"
      name="Baby Pre-Nursery"
      age="1.5 – 2.5 yrs"
      tagline="Tiny hands, enormous discoveries."
      img={preNurseryImg}
      imgBadgeBg="bg-sky-500"
      accentClass="text-sky-500"
      bg={false}
      flip={false}
      description={
        <>
          <p>
            Our Playgroup program is dedicatedly based upon nurturing a child's foundational learning
            needs. A toddler is constantly learning how to do new things — and at BITTY Balpan, the
            Playgroup curriculum makes children independent through{" "}
            <strong className="text-primary font-semibold">'hands on' learning.</strong>
          </p>
          <p>
            Children are encouraged to explore their immediate environment and get to know themselves
            better. They have a free hand at the different learning stations in a secure classroom
            environment.
          </p>
          <p>
            Group play provides rich opportunities for developing social skills and building early
            confidence — the very foundation everything else is built upon.
          </p>
        </>
      }
      highlights={[
        "Sensory play stations designed for curious toddlers",
        "Music & rhythm bonding sessions",
        "Motor-skill obstacle and exploration paths",
        "Gentle, research-backed separation routines",
        "Free exploration at structured learning stations",
        "Group play for early social skill development",
      ]}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — PRE-NURSERY
   id="pre-nursery"
   ═══════════════════════════════════════════════════════════════ */
function PreNurserySection() {
  return (
    <ProgramSection
      id="pre-nursery"
      eyebrow="Pre-Nursery"
      eyebrowColor="coral"
      level="Level 02 · Age 2.5 – 3.5 yrs"
      name="Pre-Nursery"
      age="2.5 – 3.5 yrs"
      tagline="Where vocabulary blooms."
      img={nurseryImg}
      imgBadgeBg="bg-coral"
      accentClass="text-coral"
      bg={true}
      flip={true}
      description={
        <>
          <p>
            Our Pre-Nursery curriculum sets the pace for active learning through various fun-filled
            activities — including art and craft, concept rooms and structured play that reinforces fine
            social skills.
          </p>
          <p>
            Children are introduced to a large number of shapes, colors, letters and numbers, and are
            also exposed to a higher level of rhymes, rhythm and storytelling. They enjoy a growing sense
            of independence through self-help tasks.
          </p>
          <p>
            Activity-based learning ensures a happy bunch of children who look forward to every new
            day at school — freely exploring, discovering and experiencing a wide range of sensory,
            creative and physical experiences.
          </p>
        </>
      }
      highlights={[
        "Wonderful concept rooms for immersive learning",
        "Introduction to shapes, colours, letters & numbers",
        "Rhymes, rhythm and rich storytelling",
        "Art and craft led by creative educators",
        "Self-help tasks building independence",
        "Sensory, creative and physical exploration daily",
      ]}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — NURSERY
   id="nursery"
   ═══════════════════════════════════════════════════════════════ */
function NurserySection() {
  return (
    <ProgramSection
      id="nursery"
      eyebrow="Nursery"
      eyebrowColor="mint"
      level="Level 03 · Age 3.5 – 4.5 yrs"
      name="Nursery"
      age="3.5 – 4.5 yrs"
      tagline="Confident, curious and beginning to shine."
      img={prepImg}
      imgBadgeBg="bg-emerald-500"
      accentClass="text-emerald-600"
      bg={false}
      flip={false}
      description={
        <>
          <p>
            At Nursery level, we encourage children to look for peer relationships — to play
            cooperatively, share, contribute, and interact with others in a group. Our curriculum
            weaves together a vast array of lessons through companionship and recreational activities.
          </p>
          <p>
            Children are learning to read, write and converse in English, move beyond basic shapes and
            colours, and become agile and sporty. They are creative in thinking and speaking — and can
            make up stories in a jiffy.
          </p>
          <p>
            The syllabus is carefully composed to stimulate and satisfy the child's natural curiosity
            at every step.
          </p>
        </>
      }
      highlights={[
        "Reading, writing and conversing in English",
        "Cooperative group play and peer collaboration",
        "Creative thinking, speaking and storytelling",
        "Agility, sports and physical development",
        "Expanded numeracy and spatial reasoning",
        "Curriculum tuned to stimulate natural curiosity",
      ]}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — PREPARATORY
   id="preparatory"
   ═══════════════════════════════════════════════════════════════ */
function PrepSection() {
  return (
    <ProgramSection
      id="preparatory"
      eyebrow="Preparatory"
      eyebrowColor="violet"
      level="Level 04 · Age 4.5 – 5.5 yrs"
      name="Preparatory"
      age="4.5 – 5.5 yrs"
      tagline="Ready for the world beyond."
      img={preNurseryImg}
      imgBadgeBg="bg-violet-500"
      accentClass="text-violet-600"
      bg={true}
      flip={true}
      description={
        <>
          <p>
            The highly motivated children of Prep at BITTY Balpan are well-equipped to face the
            challenges of formal schooling. They are confident individuals — good at communicating
            thoughts and ideas, and willing, eager learners.
          </p>
          <p>
            Teachers encourage readiness to learn and question; utilization of children's developing
            sense of responsibility; and their natural interest in play, construction and simple games.
          </p>
          <p>
            Memory development, visual discrimination, safety rules and a strong sense of security are
            key focus areas. The pre-school journey ends here — and children are fully ready for the
            rigours of formal schooling.
          </p>
        </>
      }
      highlights={[
        "Confident communication of thoughts and ideas",
        "Kindergarten readiness across all learning domains",
        "Memory development and visual discrimination",
        "Safety rules and strong sense of personal security",
        "Play, construction and structured game-based learning",
        "Public speaking and independent expression",
      ]}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — DAY CARE SERVICES
   id="day-care" ← linked from home curriculum buttons
   ═══════════════════════════════════════════════════════════════ */
const daycareFeatures = [
  { icon: Shield, label: "Safe & Nurturing Space", desc: "A healthy, supervised environment designed to feel like a second home." },
  { icon: Heart, label: "Emotional Wellbeing", desc: "Dedicated attention to the physical and emotional needs of every child." },
  { icon: Sparkles, label: "Rich Extracurriculars", desc: "Activities that touch every dimension of a child's development." },
  { icon: Clock, label: "Flexible Hours", desc: "Full-day care designed around working parents' schedules." },
  { icon: BookOpen, label: "Guided Learning", desc: "Structured learning activities and free play in a balanced mix." },
  { icon: Users, label: "After-School Care", desc: "Extended care available for school-going children up to age 9." },
];

function DaycareSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    /*
     * FIX (Bug 2): id="day-care" matches the hash in curriculum button links
     * (/preschool#day-care). scroll-mt-20 offsets for the sticky navbar.
     */
    <section id="day-care" className="py-28 px-6 bg-primary text-white overflow-hidden relative scroll-mt-20">
      {/* Decorative blobs */}
      <div className="absolute -top-40 right-0 size-[500px] rounded-full bg-sun/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 size-[400px] rounded-full bg-sky/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-16">
          <Eyebrow color="sun">Day Care Services</Eyebrow>
          <h2 className="heading-lg mt-2 max-w-3xl mx-auto">
            A second home —{" "}
            <span className="text-sun italic">safe, warm and full of joy.</span>
          </h2>
          <p className="mt-5 text-white/65 text-base max-w-xl mx-auto leading-relaxed">
            Full day care for children aged 1.5 to 9 years — designed so parents can return to their
            workplaces without compromising on the quality of care and love their little ones receive.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sun/20 border border-sun/30 text-sun text-sm font-mono">
            Age Group: 1.5 – 9 yrs
          </div>
        </motion.div>

        {/* Split: Image + Content */}
        <div ref={ref} className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start mb-20">
          {/* Image */}
          <motion.div {...stagger(0)} className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <motion.img
              src={daycareImg}
              alt="Day Care at Bitty Balpan"
              loading="lazy"
              style={{ y: imgY }}
              className="w-full h-[115%] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
              <p className="text-white font-display font-bold text-lg mb-1">
                Trusted by working parents.
              </p>
              <p className="text-white/65 text-sm">
                A holistic programme simulating the warmth and security of home.
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div {...stagger(1)} className="lg:pt-4">
            <div className="space-y-4 text-white/75 text-[0.95rem] leading-[1.85] mb-8">
              <p>
                BITTY Balpan provides a full day care programme for children between the age group of{" "}
                <strong className="text-white font-semibold">1.5 to 9 years</strong>. This holistic
                programme is designed to provide a simulation of the home environment to the children.
              </p>
              <p>
                It allows mothers to return to their workplaces without compromising on the quality of
                care and love their little ones get. We strive to ensure a{" "}
                <strong className="text-white font-semibold">safe, healthy and nurturing space</strong>{" "}
                for children to learn and grow.
              </p>
              <p>
                The programme is rich in extracurricular activities and touches all aspects including the
                physical and emotional wellbeing of the child. We understand the specific needs of
                children and accordingly customize the setup and design of the Day Care center.
              </p>
              <p>
                Whether you need full-day care or after-school care for your school-going child,{" "}
                <strong className="text-white font-semibold">BITTY Balpan is the place</strong> for your
                child.
              </p>
            </div>

            {/* Contact callout */}
            <div className="p-6 rounded-2xl bg-white/6 border border-white/15 backdrop-blur">
              <p className="text-white/50 text-xs uppercase tracking-widest font-mono mb-4">Get in Touch</p>
              <div className="space-y-3">
                <a
                  href="mailto:info@bittybalpan.com"
                  className="flex items-center gap-3 text-white/80 hover:text-sun transition text-sm"
                >
                  <Mail className="size-4 text-sun shrink-0" />
                  info@bittybalpan.com
                </a>
                <p className="flex items-center gap-3 text-white/80 text-sm">
                  <Phone className="size-4 text-sun shrink-0" />
                  Contact school office for routes &amp; timings
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {daycareFeatures.map((f, i) => (
            <motion.div
              key={i}
              {...stagger(i)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition duration-300 group"
            >
              <div className="size-12 rounded-xl bg-sun/20 grid place-items-center text-sun mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="size-5" />
              </div>
              <h4 className="font-display font-bold text-base mb-1.5">{f.label}</h4>
              <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp} className="text-center mt-14">
          <Link to="/admission" className="btn-primary bg-sun text-ink hover:bg-sun/90 inline-flex items-center gap-2">
            Enquire about Day Care <ArrowRight className="size-4" />
          </Link>
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
        {...fadeUp}
        className="max-w-4xl mx-auto text-center bg-gradient-to-br from-sun/25 via-coral/10 to-sky/20 rounded-[2.5rem] p-14 md:p-20 border border-sun/25 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_70%)]" />
        <div className="relative">
          <Eyebrow color="coral">Ready to Begin?</Eyebrow>
          <h2 className="heading-lg text-primary mb-5 mt-2">
            Find the right program for{" "}
            <span className="text-coral italic">your little one.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Visit us, meet our educators, and walk through the spaces where your child will
            grow, laugh and discover.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/admission" className="btn-primary inline-flex items-center gap-2">
              Apply Now <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full border border-primary/25 text-primary font-semibold text-sm hover:bg-primary/5 transition"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function PreschoolPage() {
  /*
   * FIX (Bug 2): Hash-based scroll after route navigation.
   *
   * TanStack Router navigates to /preschool then mounts the component.
   * By the time the component mounts, the browser's native hash scroll has
   * already fired against a not-yet-rendered DOM — so the section doesn't
   * exist yet and the scroll silently fails.
   *
   * This useEffect runs after mount and after every hash change. It reads
   * window.location.hash, finds the matching element, and scrolls to it
   * with smooth behavior. The 100ms delay gives framer-motion's initial
   * animations a chance to paint the layout before we scroll.
   */
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <OverviewSection />
      <BabyPreNurserySection />
      <PreNurserySection />
      <NurserySection />
      <PrepSection />
      <DaycareSection />
      <CTABand />
    </>
  );
}