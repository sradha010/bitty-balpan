import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Headphones,
  Megaphone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Users,
  Clock,
  MapPin,
  Banknote,
  BookOpen,
  Paintbrush,
  CalendarDays,
  BarChart3,
  GraduationCap,
  Phone,
  Mail,
  Star,
  Zap,
  Heart,
  Globe,
} from "lucide-react";
import campusImg from "@/assets/slide1.png";
import nurseryImg from "@/assets/slide3.png";

export const Route = createFileRoute("/franchise")({
  head: () => ({
    meta: [
      { title: "Franchise Opportunities — Bitty Balpan" },
      {
        name: "description",
        content:
          "Partner with BITTY BALPAN — 25 years of BITT Group legacy, proven curriculum, end-to-end support and a brand parents trust.",
      },
    ],
  }),
  component: FranchisePage,
});

/* ─── Animation helpers ──────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as const },
};
const stagger = (i: number) => ({
  ...fadeUp,
  transition: { delay: i * 0.09, duration: 0.8, ease: [0.19, 1, 0.22, 1] as const },
});

/* ─── Eyebrow pill ───────────────────────────────────────────── */
type AccentColor = "coral" | "sky" | "sun" | "mint" | "violet" | "white";
function Eyebrow({ children, color = "coral" }: { children: React.ReactNode; color?: AccentColor }) {
  const styles: Record<AccentColor, string> = {
    coral: "border-coral/30 bg-coral/8 text-coral",
    sky: "border-sky/30 bg-sky/8 text-sky",
    sun: "border-amber-300/40 bg-amber-50 text-amber-600",
    mint: "border-emerald-300/40 bg-emerald-50 text-emerald-600",
    violet: "border-violet-300/40 bg-violet-50 text-violet-600",
    white: "border-white/20 bg-white/10 text-white",
  };
  const dots: Record<AccentColor, string> = {
    coral: "bg-coral", sky: "bg-sky", sun: "bg-amber-400",
    mint: "bg-emerald-500", violet: "bg-violet-500", white: "bg-white",
  };
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-[0.18em] mb-4 ${styles[color]}`}>
      <span className={`size-1.5 rounded-full ${dots[color]} animate-pulse`} />
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const anchors = [
    { label: "Advantages", href: "#advantages" },
    { label: "Opportunity", href: "#opportunity" },
    { label: "Model", href: "#model" },
    { label: "Why Us", href: "#why-us" },
    { label: "Requirements", href: "#requirements" },
    { label: "Support", href: "#support" },
    { label: "Terms", href: "#terms" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[560px] bg-gradient-to-b from-coral/15 via-sun/8 to-transparent rounded-b-full blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}>
        <Eyebrow color="coral">Franchise Programme</Eyebrow>
        <h1 className="heading-xl text-primary mt-4 max-w-4xl mx-auto">
          Build a school that{" "}
          <span className="text-coral italic">builds futures.</span>
        </h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Partner with BITTY BALPAN — backed by 25 years of the BITT Group's educational legacy.
          Proven curriculum, end-to-end support, and a brand parents genuinely trust.
        </p>
      </motion.div>

      {/* Quick-nav pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-10 flex flex-wrap gap-2.5 justify-center"
      >
        {anchors.map((a) => (
          <a
            key={a.label}
            href={a.href}
            className="px-4 py-2 rounded-full border border-border bg-white/70 backdrop-blur text-xs font-medium text-foreground/70 hover:border-coral/40 hover:text-coral hover:bg-coral/5 transition"
          >
            {a.label}
          </a>
        ))}
      </motion.div>

      {/* Stats ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { v: "25+", l: "Years of BITT Legacy" },
          { v: "21+", l: "Years in Education" },
          { v: "3 km", l: "Exclusive Territory" },
          { v: "20%", l: "Royalty Only" },
        ].map((s, i) => (
          <motion.div
            key={i}
            {...stagger(i)}
            className="bg-white border border-border rounded-3xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300"
          >
            <div className="font-display text-3xl font-extrabold text-coral">{s.v}</div>
            <div className="text-[11px] uppercase font-mono tracking-widest text-muted-foreground mt-2 leading-tight">{s.l}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — FRANCHISE ADVANTAGE
   ═══════════════════════════════════════════════════════════════ */
const advantages = [
  { icon: ShieldCheck, text: "Reduced risk and gestation period associated with a new business." },
  { icon: Banknote, text: "Low to moderate investment with fast break-even and strong ROI." },
  { icon: Building2, text: "Low real estate cost — prime commercial location not required." },
  { icon: Star, text: "Save time and effort — brand name, curriculum and materials are ready." },
  { icon: TrendingUp, text: "Fast-growing market with increasing awareness for quality pre-schools." },
  { icon: BookOpen, text: "No stress in designing curriculum, books, study material or advertisements." },
  { icon: Clock, text: "Easy work timings (9 am – 1 pm) with holidays matching your child's school." },
  { icon: Heart, text: "High satisfaction — you lay the foundation for so many children's careers." },
  { icon: Globe, text: "Remain in your own city or town. Own a self-sustaining, recession-proof business." },
  { icon: Users, text: "Respect from the community — enjoy the status of an esteemed educationist." },
  { icon: Zap, text: "Positive work environment with well-structured procedures from day one." },
  { icon: Award, text: "Be part of a successful, proven franchise business model." },
];

function AdvantageSection() {
  return (
    <section id="advantages" className="py-28 px-6 bg-surface scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Eyebrow color="sky">Franchise Advantage</Eyebrow>
          <h2 className="heading-lg text-primary mt-2 max-w-3xl mx-auto">
            Why a BITTY BALPAN franchise is a{" "}
            <span className="text-sky italic">smart, safe investment.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Owning a pre-school franchise with us combines the freedom of entrepreneurship with the
            security of a trusted, established system.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((a, i) => (
            <motion.div
              key={i}
              {...stagger(i)}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-white hover:border-sky/30 hover:-translate-y-0.5 hover:shadow-md transition duration-300"
            >
              <div className="size-10 rounded-xl bg-sky/10 grid place-items-center shrink-0 group-hover:bg-sky/20 transition">
                <a.icon className="size-4 text-sky" />
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — FRANCHISE OPPORTUNITY
   ═══════════════════════════════════════════════════════════════ */
function OpportunitySection() {
  return (
    <section id="opportunity" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        {/* Image */}
        <motion.div {...stagger(0)} className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img src={campusImg} alt="Franchise Opportunity" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 bg-white/12 backdrop-blur-md rounded-2xl p-5 border border-white/20">
            <p className="text-white font-display font-bold text-base mb-1">India's pre-school segment is booming.</p>
            <p className="text-white/65 text-sm">Still under-penetrated — the perfect time to enter.</p>
          </div>
          {/* Decorative corner */}
          <div className="absolute -top-5 -right-5 size-20 rounded-2xl bg-coral/20 -z-10 rotate-12" />
        </motion.div>

        {/* Content */}
        <motion.div {...stagger(1)}>
          <Eyebrow color="coral">Franchise Opportunity</Eyebrow>
          <h2 className="heading-lg text-primary mt-2 mb-6">
            One of the most lucrative and{" "}
            <span className="text-coral italic">safe investments</span> available today.
          </h2>
          <div className="space-y-4 text-muted-foreground text-[0.95rem] leading-[1.85]">
            <p>
              Pre-schools bring forth one of the most lucrative and safe investment opportunities. A
              pre-school franchise provides an opportunity to earn a high income — especially with the
              support and back-up of a credible franchisor and a recognized brand.
            </p>
            <p>
              Owning and operating a play school doesn't require any technical qualification or past
              experience. Neither does it involve investing huge sums of money, nor does it have
              extended break-even periods.
            </p>
            <p>
              The Indian pre-school segment is poised to grow at a tremendous pace as the market is
              still under-penetrated. In order to start a{" "}
              <strong className="text-primary font-semibold">BITTY BALPAN Preschool</strong>, the
              first and most basic requirement is that the partner should{" "}
              <strong className="text-primary font-semibold">love kids</strong> and have a passion
              for this business with a long-term vision.
            </p>
            <p>
              We at BITTY BALPAN believe that alliances are an integral part of contemporary
              strategic businesses. We always look for good business partners who can share our vision,
              articulate it, passionately own it, and relentlessly drive it to completion.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — FRANCHISE MODEL
   ═══════════════════════════════════════════════════════════════ */
const franchiseeQualities = [
  { icon: Heart, label: "Keen interest in educational services" },
  { icon: Zap, label: "Enthusiasm and hands-on involvement" },
  { icon: TrendingUp, label: "Aptitude and will to start a new business" },
  { icon: Banknote, label: "Reasonable financial resources" },
  { icon: CalendarDays, label: "Interested in long-term business relationship" },
];

function ModelSection() {
  return (
    <section id="model" className="py-28 px-6 bg-surface scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Eyebrow color="mint">Franchise Model</Eyebrow>
          <h2 className="heading-lg text-primary mt-2 max-w-3xl mx-auto">
            A superior business model built to{" "}
            <span className="text-emerald-600 italic">maximize your success.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Model description */}
          <motion.div {...stagger(0)}>
            <div className="bg-white rounded-[2rem] border border-border/60 p-8 mb-6">
              <h3 className="font-display font-bold text-xl text-primary mb-4">About the Model</h3>
              <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                <p>
                  BITTY BALPAN's franchise model offers lucrative business opportunities for
                  entrepreneurs who have the desire to flourish in the education sector. Our model
                  ensures vital support on the most important aspects of business — optimizing
                  operations and maximizing benefits for every franchisee.
                </p>
                <p>
                  We are looking for committed partners who will help us carry forward our ambition
                  of making quality early education accessible across India.
                </p>
              </div>
            </div>

            {/* Pre-School Programs card */}
            <div className="rounded-[2rem] overflow-hidden border border-border/60 relative">
              <div className="h-44 overflow-hidden">
                <img src={nurseryImg} alt="Pre-School Programs" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent h-44" />
              </div>
              <div className="p-7 bg-white">
                <h3 className="font-display font-bold text-xl text-primary mb-2">Pre-School Programs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  BITTY BALPAN is a standard pre-school founded to provide the best education to
                  children aged 2 to 6 years. Established under the aegis of Birsa Institute of
                  Technology Trust (BITT), with an unmatched management team, BITTY BALPAN focuses
                  on all facets of a child's growth.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: What we look for */}
          <motion.div {...stagger(1)}>
            <div className="bg-gradient-to-br from-emerald-50 to-sky/10 rounded-[2rem] border border-emerald-200/60 p-8">
              <h3 className="font-display font-bold text-xl text-primary mb-6">What we look for in a Franchisee</h3>
              <div className="space-y-4">
                {franchiseeQualities.map((q, i) => (
                  <motion.div
                    key={i}
                    {...stagger(i + 2)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-emerald-100 hover:border-emerald-300 hover:-translate-x-1 transition duration-200"
                  >
                    <div className="size-10 rounded-xl bg-emerald-100 grid place-items-center shrink-0">
                      <q.icon className="size-4 text-emerald-600" />
                    </div>
                    <span className="text-sm text-foreground/80">{q.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Process steps */}
              <div className="mt-8 pt-8 border-t border-emerald-200/60">
                <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground mb-5">From Enquiry to Opening</p>
                <div className="space-y-3">
                  {[
                    { n: "01", t: "Discovery Call", d: "Understand your vision and city." },
                    { n: "02", t: "Site & Approval", d: "Finalise location and documentation." },
                    { n: "03", t: "Build & Train", d: "Interior setup and staff training." },
                    { n: "04", t: "Launch", d: "Onsite support for grand opening." },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="size-8 rounded-full bg-primary text-white grid place-items-center text-xs font-bold font-mono shrink-0 mt-0.5">
                        {s.n}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">{s.t}</p>
                        <p className="text-xs text-muted-foreground">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — WHY CHOOSE US
   ═══════════════════════════════════════════════════════════════ */
const whyUs = [
  { icon: Award, text: "Promoted by BITT — a brand with 21+ years of expertise spanning higher technical, primary and pre-primary education." },
  { icon: Banknote, text: "Reasonable initial investment with ultra-high returns. Franchisee-friendly pricing model." },
  { icon: Megaphone, text: "Nominal franchise fee & yearly support charges. Marketing support for brand awareness." },
  { icon: Globe, text: "Regular coverage in Print & Electronic Media — goodwill for easier media coverage." },
  { icon: MapPin, text: "Multiple franchises not given in a territory. No other BITTY BALPAN within 3 km of your centre." },
  { icon: Users, text: "Dedicated Franchise Service Team with scheduled visits and personalized attention." },
  { icon: BookOpen, text: "Well-researched, child-centric curriculum designed by highly qualified educationists from India." },
  { icon: CalendarDays, text: "Centrally designed Annual Calendar and Systematic Monthly Planner for the full academic session." },
  { icon: GraduationCap, text: "Extensive training of Centre Head, Teachers and Counselors by expert educators." },
  { icon: Paintbrush, text: "Professionally prepared advertising and marketing material customized for your branch." },
  { icon: ShieldCheck, text: "Clearly defined territory in your agreement to ensure the safety of your investment." },
  { icon: Sparkles, text: "Onsite assistance by BITTY BALPAN representative for initial branding, advertising and launch." },
];

function WhyUsSection() {
  return (
    <section id="why-us" className="py-28 px-6 bg-primary text-white overflow-hidden relative scroll-mt-20">
      <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-coral/15 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 size-[400px] rounded-full bg-sky/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Eyebrow color="white">Why Bitty Balpan?</Eyebrow>
          <h2 className="heading-lg mt-2 max-w-3xl mx-auto">
            12 reasons to choose us as your{" "}
            <span className="text-sun italic">franchise partner.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map((w, i) => (
            <motion.div
              key={i}
              {...stagger(i)}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition duration-300"
            >
              <div className="size-10 rounded-xl bg-sun/20 grid place-items-center shrink-0 group-hover:bg-sun/30 transition">
                <w.icon className="size-4 text-sun" />
              </div>
              <p className="text-white/75 text-sm leading-relaxed">{w.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — REQUIREMENTS
   ═══════════════════════════════════════════════════════════════ */
const requirements = [
  { label: "Property", value: "Own property or ability to rent space", icon: Building2 },
  { label: "Area", value: "Min. 2,500 sq. ft. carpet area on ground floor (covered)", icon: MapPin },
  { label: "Approvals", value: "Society NOC, Municipal Authority approval, site commercialization proof", icon: ShieldCheck },
  { label: "Franchise Fee", value: "₹2,25,000 (non-refundable)", icon: Banknote },
  { label: "Infrastructure Investment", value: "₹5–9 Lakhs (Furniture / Teaching Aids / Setup / Painting)", icon: Paintbrush },
  { label: "Royalty", value: "20% of monthly collection", icon: BarChart3 },
  { label: "Interiors", value: "Arranged by franchisee as per BITTY BALPAN specifications", icon: Sparkles },
];

function RequirementsSection() {
  return (
    <section id="requirements" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Eyebrow color="violet">Requirements</Eyebrow>
          <h2 className="heading-lg text-primary mt-2">
            What you need to{" "}
            <span className="text-violet-600 italic">get started.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Please note that the initial investment depends on the pre-school model and may vary
            based on location, size, and condition of property.
          </p>
        </motion.div>

        <div className="space-y-4">
          {requirements.map((r, i) => (
            <motion.div
              key={i}
              {...stagger(i)}
              className="group grid sm:grid-cols-[180px_1fr] gap-4 items-center p-5 rounded-2xl border border-border/60 bg-white hover:border-violet-300/60 hover:shadow-md transition duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-violet-50 grid place-items-center shrink-0 group-hover:bg-violet-100 transition">
                  <r.icon className="size-4 text-violet-600" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{r.label}</span>
              </div>
              <span className="text-foreground/85 font-medium text-sm">{r.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Investment callout */}
        <motion.div
          {...fadeUp}
          className="mt-8 p-7 rounded-2xl bg-gradient-to-br from-violet-50 to-sky/10 border border-violet-200/60 text-center"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-primary">Total Estimated Investment:</strong> ₹7.25 – 11.25 Lakhs
            (franchise fee + infrastructure). Investment varies based on location and other factors.
            Contact us for a detailed breakdown customized to your city.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — SUPPORT
   ═══════════════════════════════════════════════════════════════ */
const supports = [
  { icon: Paintbrush, t: "Branch Development", d: "Complete support in interior & exterior designing, concept planning, colour scheme and branding of your new branch." },
  { icon: Megaphone, t: "Marketing & PR", d: "Pre-launch, launch and post-launch advertising, marketing, promotion, press releases and media invites." },
  { icon: BookOpen, t: "Academic Support", d: "Specially designed curriculum, monthly planners, activities, lesson plans, notices and celebration guides." },
  { icon: Sparkles, t: "Design & Collaterals", d: "Professionally designed brochures, leaflets, banners, hoardings, newspaper ads and e-mailers for your branch." },
  { icon: Globe, t: "Website Listing", d: "BITTY BALPAN will mention your franchise address and contact details prominently on its official website." },
  { icon: Users, t: "Dedicated Executive", d: "Scheduled visits and personalized attention from a BITTY BALPAN Support Executive to help generate good business." },
  { icon: GraduationCap, t: "Staff Training", d: "Extensive initial training of franchisee, branch head and teachers by expert educationists." },
  { icon: CalendarDays, t: "Periodic Workshops", d: "Regular performance reviews, training, skill upgrades and workshops to keep you ahead of competition." },
];

function SupportSection() {
  return (
    <section id="support" className="py-28 px-6 bg-surface scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Eyebrow color="sky">Bitty Balpan Support</Eyebrow>
          <h2 className="heading-lg text-primary mt-2 max-w-3xl mx-auto">
            End-to-end support, every step{" "}
            <span className="text-sky italic">of the way.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            We don't just hand you a franchise — we walk alongside you from day one until your
            centre is thriving.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {supports.map((s, i) => (
            <motion.div
              key={i}
              {...stagger(i)}
              className="group p-6 rounded-2xl bg-white border border-border/60 hover:border-sky/30 hover:-translate-y-1 hover:shadow-lg transition duration-300"
            >
              <div className="size-12 rounded-xl bg-sky/10 grid place-items-center text-sky mb-4 group-hover:bg-sky/20 group-hover:scale-110 transition-all">
                <s.icon className="size-5" />
              </div>
              <h3 className="font-display font-bold text-base text-primary mb-2">{s.t}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — TERMS & CONDITIONS
   ═══════════════════════════════════════════════════════════════ */
const terms = [
  "There will be a non-refundable license / franchise fee payable at the time of agreement.",
  "Royalty at 20% has to be paid from the monthly collection as per the agreement.",
  "The area of operation shall be clearly defined in the agreement.",
  "The agreement terms shall be for three (3) years initially, renewable thereafter.",
  "Taxes shall be liable as per Government policy and subject to change from time to time.",
];

function TermsSection() {
  return (
    <section id="terms" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Eyebrow color="coral">Terms & Conditions</Eyebrow>
          <h2 className="heading-lg text-primary mt-2">
            General{" "}
            <span className="text-coral italic">terms at a glance.</span>
          </h2>
        </motion.div>

        <motion.div {...fadeUp} className="rounded-[2rem] border border-border/60 bg-white overflow-hidden">
          {terms.map((t, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 px-7 py-5 ${i !== terms.length - 1 ? "border-b border-border/40" : ""} hover:bg-coral/3 transition`}
            >
              <div className="size-6 rounded-full bg-coral/15 grid place-items-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-xs">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{t}</p>
            </div>
          ))}
        </motion.div>

        <motion.p {...fadeUp} className="text-center text-xs text-muted-foreground mt-6">
          Full terms and conditions will be provided as part of the Franchise Agreement document.
          Please consult the franchise development team for complete details.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — FRANCHISE CONTACT
   ═══════════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...fadeUp}
          className="rounded-[2.5rem] bg-primary text-white overflow-hidden relative"
        >
          {/* Decorative blobs */}
          <div className="absolute -top-32 -right-32 size-80 rounded-full bg-coral/25 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 size-60 rounded-full bg-sky/20 blur-[80px] pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-0">
            {/* Left: CTA text */}
            <div className="p-12 lg:p-16">
              <Eyebrow color="white">Franchise Contact</Eyebrow>
              <h2 className="heading-lg text-white mt-2 mb-5">
                Ready to bring BITTY BALPAN to your city?
              </h2>
              <p className="text-white/65 text-base leading-relaxed mb-8">
                Get in touch with our Franchise Development Team for complete information about
                starting your own BITTY BALPAN Pre-School. We'll walk you through everything —
                no commitment needed for an initial conversation.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sun text-ink font-bold text-sm hover:bg-sun/90 transition"
              >
                Apply for Franchise <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Right: Contact details */}
            <div className="lg:border-l border-white/10 p-12 lg:p-16 flex flex-col justify-center gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-white/40 mb-4">
                  Franchise Development Team
                </p>
                <div className="space-y-5">
                  <a
                    href="tel:9431707380"
                    className="flex items-center gap-4 group"
                  >
                    <div className="size-12 rounded-xl bg-white/10 grid place-items-center group-hover:bg-white/20 transition">
                      <Phone className="size-5 text-sun" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-mono uppercase tracking-widest">Mobile</p>
                      <p className="text-white font-display font-bold text-lg">9431707380</p>
                    </div>
                  </a>
                  <a
                    href="mailto:franchise@bittybalpan.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="size-12 rounded-xl bg-white/10 grid place-items-center group-hover:bg-white/20 transition">
                      <Mail className="size-5 text-sun" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-mono uppercase tracking-widest">Email</p>
                      <p className="text-white font-display font-bold text-lg break-all">franchise@bittybalpan.com</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Quick assurance */}
              <div className="mt-4 p-5 rounded-2xl bg-white/6 border border-white/10">
                <p className="text-white/60 text-xs leading-relaxed">
                  Our franchise team typically responds within 24 hours. Initial consultations are
                  completely free and without obligation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE
   ═══════════════════════════════════════════════════════════════ */
function FranchisePage() {
  return (
    <>
      <HeroSection />
      <AdvantageSection />
      <OpportunitySection />
      <ModelSection />
      <WhyUsSection />
      <RequirementsSection />
      <SupportSection />
      <TermsSection />
      <ContactSection />
    </>
  );
}