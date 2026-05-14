import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Monitor,
  Library,
  ShieldCheck,
  Bus,
  Cpu,
  Star,
  ArrowRight,
  Quote,
  MapPin,
  Gift,
  Mic,
  Palette,
  Globe,
  Camera,
} from "lucide-react";
import campusImg from "@/assets/school_img.png";
import parentChildImg from "@/assets/parent-child2.png";
import nurseryImg from "@/assets/pre-school.png";
import prepImg from "@/assets/baby pre-school.png";
import leader1 from "@/assets/leader1.png";
import leader2 from "@/assets/leader2.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bitty Balpan Play School" },
      {
        name: "description",
        content:
          "25 years of the BITT Group's educational excellence, now nurturing children from 1.5 to 5.5 years.",
      },
    ],
  }),
  component: AboutPage,
});

/* ─── Animation Variants ─────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as const },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { delay: i * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] as const },
});

/* ─── Shared Pill Label ──────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-coral/30 bg-coral/8 text-coral text-xs font-mono uppercase tracking-[0.18em] mb-4">
      <span className="size-1.5 rounded-full bg-coral animate-pulse" />
      {children}
    </span>
  );
}

/* ─── Section Heading ────────────────────────────────────────── */
function SectionTitle({
  eyebrow,
  children,
  align = "left",
}: {
  eyebrow: string;
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-14 ${align === "center" ? "text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="heading-lg text-primary mt-2">{children}</h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — ABOUT BITTY BALPAN
   ═══════════════════════════════════════════════════════════════ */
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const pillars = [
    "Every child is unique",
    "Every child has infinite potential",
    "Every child is born with an innate desire to learn",
    "Every child learns best through observation",
    "Every child constructs knowledge in multiple ways",
  ];

  const stats = [
    { v: "25+", l: "Years of BITT Legacy" },
    { v: "1.2k+", l: "Alumni" },
    { v: "4", l: "Programs" },
    { v: "6mo", l: "Earliest Intake" },
  ];

  return (
    <section ref={ref} className="py-28 px-6 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          {/* Image Column */}
          <motion.div
            {...stagger(0)}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <motion.img
                src={campusImg}
                alt="Bitty Balpan Campus"
                loading="lazy"
                style={{ y: imgY }}
                className="w-full h-[115%] object-cover object-center"
              />
              {/* Floating stats badge */}
              <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 grid grid-cols-4 gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-2xl font-extrabold text-coral leading-none">{s.v}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-mono leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 size-24 rounded-3xl bg-sun/40 -z-10 rotate-12" />
            <div className="absolute -bottom-4 -right-4 size-16 rounded-2xl bg-mint/40 -z-10 -rotate-6" />
          </motion.div>

          {/* Content Column */}
          <div className="lg:pt-4">
            <motion.div {...stagger(0)}>
              <Eyebrow>About Bitty Balpan</Eyebrow>
              <h2 className="heading-lg text-primary mt-2 mb-6">
                A Pre-School venture rooted in{" "}
                <span className="text-coral italic">25 years</span> of educational excellence.
              </h2>
            </motion.div>

            <motion.div {...stagger(1)} className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                <strong className="text-primary font-semibold">BITTY BALPAN PLAY SCHOOL</strong> is a
                Pre-School venture of the BITT Group — managed by a team of highly qualified, dedicated and
                experienced educationists with 25 years of glorious experience in the education sector.
              </p>
              <p>
                Built around the strong belief that childhood is precious, our academic programs comprise of{" "}
                <strong className="text-primary font-medium">
                  Baby Pre-Nursery, Pre-Nursery, Nursery & Prep
                </strong>{" "}
                — catering to age groups from <strong className="text-primary font-medium">1.5 to 5.5 years</strong>.
              </p>
              <p>
                We also provide a full{" "}
                <strong className="text-primary font-medium">Daycare Program</strong> for children between 6
                months and 5.5 years — a safe, nurturing space for children while parents are at work.
              </p>
            </motion.div>

            {/* Philosophy Pillars */}
            <motion.div {...stagger(2)} className="mt-10">
              <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground mb-4">
                Our Core Beliefs
              </p>
              <ul className="space-y-2.5">
                {pillars.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-coral" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision & Mission */}
            <motion.div {...stagger(3)} className="mt-10 grid sm:grid-cols-2 gap-5">
              {[
                {
                  label: "Vision",
                  text: "To be nationally recognized for our innovative approach to improving childhood education — providing a stimulating, welcoming environment where every child discovers their fullest potential.",
                  color: "bg-sky/10 border-sky/20 text-sky",
                  dot: "bg-sky",
                },
                {
                  label: "Mission",
                  text: "To provide a safe, friendly environment that develops active, creative minds — nurturing the spiritual, moral, intellectual, socio-emotional and physical ability of each child.",
                  color: "bg-coral/10 border-coral/20 text-coral",
                  dot: "bg-coral",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border ${item.color.split(" ").slice(1).join(" ")} bg-opacity-10`}
                  style={{ background: "" }}
                >
                  <div className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-3 ${item.color.split(" ")[2]}`}>
                    <span className={`size-1.5 rounded-full ${item.dot}`} />
                    {item.label}
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — LEADERSHIP
   ═══════════════════════════════════════════════════════════════ */
const leaders = [
  {
    name: "Dr. Vandana Kumari",
    role: "Chairperson, BITT Trust",
    salutation: "Dear Parents,",
    message: `"Our children are our future. They must be nurtured and given the right environment for developing as complete individuals who will help in nation building and contribute towards the welfare of the society."

Driven by these thoughts, BITTY Balpan School was conceptualized. It is our endeavor to establish a quality school where excellence is driven by values, success is strengthened by ethics, and modernity is fortified by tradition.

A person's knowledge is unique to him. Our system of education has to appreciate this diversity. There has to be encouragement given to innovation, quality and creativity in education. Let us accept our responsibilities as 'Parents' at school and you as 'Teachers' at home, to nurture the young minds and enable their talents to fructify.`,
    gradient: "from-rose-100/60 via-amber-50/40 to-sky-100/30",
    accent: "text-rose-500",
    border: "border-rose-200/60",
    img: leader1,
  },
  {
    name: "Dr. Ranjeet Kumar",
    role: "Chairman, BITT Group of Institutions",
    salutation: "Dear Parents,",
    message: `On behalf of the BITT Group, I extend a very warm welcome to you. We started our journey in pursuit of excellence and it has been a wonderful experience — one that will be cherished by all associated with this institution.

An education of the highest quality is the greatest gift that parents can give to their children. The curriculum at BITTY Balpan is tailored to meet the needs of the hour — a plethora of academic and co-curricular activities offers every student the opportunity to discover facets of their personalities.

We are pledged to live up to the rising expectations of parents and set a benchmark in quality education. Excellence is a mindset and we wish to realize it in our students.`,
    gradient: "from-sky-100/60 via-mint/20 to-emerald-50/30",
    accent: "text-sky-600",
    border: "border-sky-200/60",
    img: leader2,
  },
];

function LeadershipSection() {
  return (
    <section className="py-28 px-6 bg-surface" id="leadership">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionTitle eyebrow="Leadership" align="center">
            The hearts & minds{" "}
            <span className="text-coral italic">behind Balpan</span>
          </SectionTitle>
        </motion.div>

        <div className="space-y-16">
          {leaders.map((leader, i) => (
            <motion.div
              key={i}
              {...stagger(i)}
              className={`relative rounded-[2.5rem] border ${leader.border} bg-gradient-to-br ${leader.gradient} overflow-hidden`}
            >
              {/* Decorative quote mark */}
              <div className="absolute top-6 right-8 opacity-10">
                <Quote className="size-24 text-primary" />
              </div>

              <div className={`grid lg:grid-cols-[280px_1fr] gap-0 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Portrait Side */}
                <div className={`p-10 flex flex-col items-center justify-center gap-5 border-b lg:border-b-0 ${i % 2 === 1 ? "lg:border-l lg:[direction:ltr]" : "lg:border-r"} border-white/50`}>
                  <div className="size-48 rounded-[1.8rem] overflow-hidden shadow-lg">
                    <img
                      src={leader.img}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-display font-bold text-xl text-primary">{leader.name}</h3>
                    <p className={`text-sm font-mono mt-1 ${leader.accent}`}>{leader.role}</p>
                  </div>
                </div>

                {/* Message Side */}
                <div className={`p-10 lg:p-14 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <p className="text-sm font-semibold text-primary mb-4">{leader.salutation}</p>
                  <div className="space-y-4">
                    {leader.message.split("\n\n").map((para, j) => (
                      <p key={j} className="text-foreground/75 leading-[1.85] text-[0.95rem]">
                        {para}
                      </p>
                    ))}
                  </div>
                  <p className="mt-6 text-sm font-semibold text-primary">
                    Warm Regards,
                    <br />
                    <span className={`${leader.accent} font-display font-bold text-base`}>{leader.name}</span>
                    <br />
                    <span className="font-normal text-muted-foreground">{leader.role}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — FACILITIES
   ═══════════════════════════════════════════════════════════════ */
const facilities = [
  {
    icon: Monitor,
    title: "Smart Classes",
    color: "from-sky/20 to-sky/5",
    iconColor: "text-sky",
    iconBg: "bg-sky/15",
    description:
      "What might otherwise seem dull with just text-books becomes bright and captivating through flash and animation movies. This makes learning fun and ensures lasting impact on the tech-savvy minds of today's generation.",
    img: prepImg,
  },
  {
    icon: Library,
    title: "Library",
    color: "from-amber-100/60 to-amber-50/20",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    description:
      "Our school library holds printed and audio-visual material including DVDs, picture books, activity books, and reference materials in English and Hindi — keeping students abreast with everything around them.",
    img: nurseryImg,
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    color: "from-emerald-100/60 to-emerald-50/20",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    description:
      "Closed Circuit Cameras at vantage locations, trained security personnel, intercoms connecting all key points, and mandatory checks at the entrance gate — only authorized guardians may collect students.",
    bullets: [
      "CCTV at all crucial campus locations",
      "Trained personnel at vantage points",
      "Intercom-connected campus grid",
      "Mandatory entrance gate verification",
    ],
    img: campusImg,
  },
  {
    icon: Bus,
    title: "Transport Facility",
    color: "from-violet-100/60 to-violet-50/20",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    description:
      "The school provides a dedicated transport facility for student convenience. Routes and timings are drawn up carefully — parents and guardians can consult the school office for details and applications.",
    img: parentChildImg,
  },
];

function FacilitiesSection() {
  return (
    <section className="py-28 px-6" id="facilities">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionTitle eyebrow="Facilities" align="center">
            Spaces designed for{" "}
            <span className="text-coral italic">every dimension</span> of childhood
          </SectionTitle>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7">
          {facilities.map((f, i) => (
            <motion.div
              key={i}
              {...stagger(i)}
              className={`rounded-[2rem] bg-gradient-to-br ${f.color} border border-white/70 overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition duration-500`}
            >
              {/* Image Strip */}
              <div className="h-52 overflow-hidden relative">
                <img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Icon floating badge */}
                <div className={`absolute top-4 left-4 size-11 rounded-xl ${f.iconBg} grid place-items-center shadow-md backdrop-blur-sm`}>
                  <f.icon className={`size-5 ${f.iconColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="font-display font-bold text-xl text-primary mb-3">{f.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">{f.description}</p>
                {f.bullets && (
                  <ul className="space-y-1.5">
                    {f.bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-xs text-foreground/65">
                        <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — TECHNOLOGY AIDED LEARNING
   ═══════════════════════════════════════════════════════════════ */
const techBenefits = [
  { label: "Clarifies basic concepts of numbers & words" },
  { label: "Enhances concentration power" },
  { label: "Improves listening, speaking & reading skills" },
  { label: "Enables fast-paced learning" },
  { label: "Makes learning genuinely enjoyable" },
];

const techTools = [
  { label: "Interactive Whiteboards", icon: Monitor },
  { label: "e-Blocks", icon: Cpu },
  { label: "Smart Class Modules", icon: Star },
];

function TechSection() {
  return (
    <section className="py-28 px-6 bg-primary text-white overflow-hidden relative" id="technology">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-sky/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 size-[400px] rounded-full bg-coral/15 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <div className="mb-4">
            <Eyebrow>Technology Aided Learning</Eyebrow>
          </div>
          <h2 className="heading-lg mb-6">
            Where curiosity meets{" "}
            <span className="text-sky italic">cutting-edge tools.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center mt-10">
          {/* Left: description + benefits */}
          <motion.div {...stagger(0)}>
            <p className="text-white/75 text-lg leading-relaxed mb-10">
              At BITTY Balpan, we provide a carefully planned and structured environment in which the
              child grows and learns naturally. We equip our classrooms with the latest technological
              teaching tools — including{" "}
              <strong className="text-white">interactive whiteboards</strong> and{" "}
              <strong className="text-white">e-blocks</strong> — so learning stays hands-on, engaging,
              and effective from day one.
            </p>

            <p className="text-xs uppercase tracking-widest font-mono text-white/40 mb-5">
              Learning Outcomes
            </p>
            <ul className="space-y-3">
              {techBenefits.map((b, i) => (
                <motion.li
                  key={i}
                  {...stagger(i + 1)}
                  className="flex items-center gap-3 text-white/80 text-sm"
                >
                  <span className="size-5 rounded-full bg-sky/20 border border-sky/30 grid place-items-center shrink-0">
                    <span className="size-1.5 rounded-full bg-sky" />
                  </span>
                  {b.label}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: tool cards */}
          <motion.div {...stagger(1)} className="space-y-5">
            {techTools.map((t, i) => (
              <motion.div
                key={i}
                {...stagger(i + 2)}
                className="flex items-center gap-5 p-6 rounded-2xl bg-white/6 border border-white/10 backdrop-blur hover:bg-white/10 hover:-translate-y-0.5 transition duration-300"
              >
                <div className="size-14 rounded-xl bg-sky/20 grid place-items-center shrink-0">
                  <t.icon className="size-6 text-sky" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg">{t.label}</h4>
                  <p className="text-white/50 text-sm mt-0.5">
                    Integrated into every classroom across all programs
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Highlighted callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-coral/20 to-sun/10 border border-coral/20">
              <p className="text-white/85 text-sm leading-relaxed italic">
                "Technology doesn't replace the teacher — it amplifies the learning experience,
                making each concept vivid, memorable and deeply understood."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — ACTIVITIES
   ═══════════════════════════════════════════════════════════════ */
const activityImages = [campusImg, nurseryImg, prepImg, parentChildImg];

const eventsList = [
  { icon: Star, label: "Happy Independence Day 2020" },
  { icon: Gift, label: "Children's Day 2019 Celebration" },
  { icon: Star, label: "Makar Sankranti Celebration" },
  { icon: Palette, label: "Fancy Dress — Fruits & Vegetables Theme" },
  { icon: Star, label: "Christmas Celebration" },
  { icon: Mic, label: "Diet Awareness Session" },
  { icon: Monitor, label: "Free Computer Literacy Program (SSCL)" },
  { icon: Star, label: "Hand-Writing Competition" },
  { icon: Star, label: "Raksha-Bandhan Celebration" },
  { icon: Star, label: "72nd Independence Day Celebration" },
  { icon: Palette, label: "Drawing Competition" },
  { icon: Mic, label: "PRATIBHA — A Talent Contest" },
];

const programTypes = [
  {
    icon: Globe,
    title: "Educational Tours",
    desc: "We take students to Parks, Shopping Malls, Zoos, Museums, Science Centres, and Dairy Farms — giving them real-time, experiential learning beyond the classroom.",
  },
  {
    icon: MapPin,
    title: "Picnics",
    desc: "Periodic school picnics to places of student interest — Parks, Zoos, Museums — creating joy-filled memories alongside meaningful learning.",
  },
  {
    icon: Mic,
    title: "Competitions",
    desc: "Academic, cultural and sports competitions including rhyme & recitation, colouring, dance, and fancy dress — celebrating every child's unique talent.",
  },
];

function ActivitiesSection() {
  return (
    <section className="py-28 px-6" id="activities">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionTitle eyebrow="Activities" align="center">
            Every event, a memory{" "}
            <span className="text-coral italic">worth keeping.</span>
          </SectionTitle>
        </motion.div>

        {/* Photo Wall — Masonry-style grid */}
        <motion.div
          {...fadeUp}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-20"
        >
          {activityImages.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl relative group ${i === 0 ? "lg:col-span-2 lg:row-span-2 aspect-[4/5]" : "aspect-square"}`}
            >
              <img
                src={img}
                alt={`Activity ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <Camera className="size-6 text-white opacity-80" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Events List */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div {...stagger(0)}>
            <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground mb-6">
              Events & Celebrations
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {eventsList.map((e, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-surface border border-border/50 hover:border-coral/30 hover:bg-coral/4 transition duration-200"
                >
                  <div className="size-8 rounded-lg bg-coral/10 grid place-items-center shrink-0">
                    <e.icon className="size-3.5 text-coral" />
                  </div>
                  <span className="text-sm text-foreground/80 leading-tight">{e.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Program Types */}
          <motion.div {...stagger(1)} className="space-y-5">
            <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground mb-6">
              Beyond the Classroom
            </p>
            {programTypes.map((p, i) => (
              <motion.div
                key={i}
                {...stagger(i + 2)}
                className="flex gap-5 p-5 rounded-2xl bg-surface border border-border/50 hover:-translate-y-0.5 hover:shadow-md transition duration-300"
              >
                <div className="size-12 rounded-xl bg-primary/8 grid place-items-center shrink-0 mt-0.5">
                  <p.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary mb-1.5">{p.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA FOOTER BAND
   ═══════════════════════════════════════════════════════════════ */
function CTABand() {
  return (
    <section className="px-6 pb-24">
      <motion.div
        {...fadeUp}
        className="max-w-4xl mx-auto text-center bg-gradient-to-br from-sun/30 via-coral/10 to-sky/20 rounded-[2.5rem] p-14 md:p-20 border border-sun/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,white/50,transparent_70%)]" />
        <div className="relative">
          <h2 className="heading-lg text-primary mb-5">
            Come experience the <span className="text-coral italic">Balpan warmth.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Walk through our centers, meet our teachers, and see firsthand why thousands of
            families trust us with their most precious.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Schedule a Visit <ArrowRight className="size-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE HERO
   ═══════════════════════════════════════════════════════════════ */
function PageHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden text-center">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-sun/20 via-coral/5 to-transparent rounded-b-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        <Eyebrow>Our Story</Eyebrow>
        <h1 className="heading-xl text-primary mt-4 max-w-4xl mx-auto">
          Nurturing{" "}
          <span className="text-coral italic">little minds</span>
          {" "}for over a decade.
        </h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Backed by 25 years of the BITT Group's educational legacy — Bitty Balpan is where
          curiosity is the curriculum and every child is celebrated.
        </p>
      </motion.div>

      {/* Nav pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-10 flex flex-wrap gap-3 justify-center"
      >
        {["About", "Leadership", "Facilities", "Technology", "Activities"].map((s) => (
          <a
            key={s}
            href={`#${s.toLowerCase()}`}
            className="px-5 py-2 rounded-full border border-border bg-white/70 backdrop-blur text-sm text-foreground/70 hover:border-coral/40 hover:text-coral hover:bg-coral/5 transition"
          >
            {s}
          </a>
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function AboutPage() {
  return (
    <>
      <PageHero />
      <AboutSection />
      <LeadershipSection />
      <FacilitiesSection />
      <TechSection />
      <ActivitiesSection />
      <CTABand />
    </>
  );
}