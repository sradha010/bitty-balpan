import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, memo, useCallback } from "react";
import type { Transition } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  GraduationCap,
  MessageSquareHeart,
  CheckCircle2,
  Send,
  ChevronDown,
  Star,
  Clock,
  User,
  Baby,
  Users,
  CalendarDays,
  FileText,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Bitty Balpan" },
      {
        name: "description",
        content:
          "Reach out to Bitty Balpan Play School — find our branch locations, submit an admission enquiry, or share your feedback with us.",
      },
    ],
  }),
  component: ContactPage,
});

const EASE = [0.19, 1, 0.22, 1] as const;
const sharedTransition: Transition = { duration: 0.8, ease: EASE };

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: sharedTransition,
};

const stagger = (i = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { ...sharedTransition, delay: i * 0.1 } satisfies Transition,
});

type EyebrowColor = "coral" | "sky" | "mint" | "sun" | "violet";
type AccentColor = "sky" | "coral";

interface EyebrowProps { children: React.ReactNode; color?: EyebrowColor; }
interface FieldLabelProps { children: React.ReactNode; required?: boolean; htmlFor?: string; }
interface SelectFieldProps {
  id: string; options: string[]; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; icon?: LucideIcon;
}
interface BranchData {
  tag: string; name: string; subtitle: string; address: string; phones: string[]; email: string;
}
interface BranchCardProps { branch: BranchData; accent: AccentColor; index: number; }
interface StarRatingProps { value: number; onChange: (n: number) => void; }

/* ─── Eyebrow ────────────────────────────────────────────────── */
function Eyebrow({ children, color = "coral" }: EyebrowProps) {
  const map: Record<EyebrowColor, string> = {
    coral: "border-coral/30 bg-coral/8 text-coral",
    sky: "border-sky/30 bg-sky/8 text-sky",
    mint: "border-emerald-300/40 bg-emerald-50 text-emerald-600",
    sun: "border-amber-300/40 bg-amber-50 text-amber-600",
    violet: "border-violet-300/40 bg-violet-50 text-violet-600",
  };
  const dot: Record<EyebrowColor, string> = {
    coral: "bg-coral", sky: "bg-sky", mint: "bg-emerald-500", sun: "bg-amber-400", violet: "bg-violet-500",
  };
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-[0.18em] mb-4 ${map[color]}`}>
      <span className={`size-1.5 rounded-full shrink-0 ${dot[color]} animate-pulse`} />
      {children}
    </span>
  );
}

/* ─── Field label ────────────────────────────────────────────── */
function FieldLabel({ children, required = false, htmlFor }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
      {children}
      {required && <span className="text-coral ml-1">*</span>}
    </label>
  );
}

/* ─── Input ──────────────────────────────────────────────────── */
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-xl border border-border/70 bg-white text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral/50 transition ${className}`}
      {...props}
    />
  );
}

/* ─── Textarea ───────────────────────────────────────────────── */
function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) {
  return (
    <textarea
      className={`w-full px-4 py-3 rounded-xl border border-border/70 bg-white text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral/50 transition resize-none ${className}`}
      {...props}
    />
  );
}

/* ─── Select ─────────────────────────────────────────────────── */
function SelectField({ id, options, placeholder, value, onChange, icon: Icon }: SelectFieldProps) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 pointer-events-none shrink-0" />}
      <select
        id={id} name={id} value={value} onChange={onChange}
        className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-10 py-3 rounded-xl border border-border/70 bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral/50 transition appearance-none`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 pointer-events-none shrink-0" />
    </div>
  );
}

/* ─── Branch card ────────────────────────────────────────────── */
const BranchCard = memo(function BranchCard({ branch, accent, index }: BranchCardProps) {
  const accentMap: Record<AccentColor, { badge: string; icon: string; hover: string; dot: string }> = {
    sky: { badge: "bg-sky/15 text-sky border-sky/20", icon: "bg-sky/10 text-sky", hover: "hover:border-sky/40", dot: "bg-sky" },
    coral: { badge: "bg-coral/10 text-coral border-coral/20", icon: "bg-coral/10 text-coral", hover: "hover:border-coral/40", dot: "bg-coral" },
  };
  const a = accentMap[accent];

  return (
    <motion.div
      {...stagger(index)}
      className={`group p-8 rounded-3xl border border-border/60 bg-white hover:-translate-y-1 hover:shadow-xl transition duration-400 ${a.hover}`}
    >
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest mb-5 ${a.badge}`}>
        <span className={`size-1.5 rounded-full shrink-0 ${a.dot}`} />
        {branch.tag}
      </div>
      <h3 className="font-display font-bold text-xl text-primary mb-1">{branch.name}</h3>
      <p className="text-xs text-muted-foreground font-mono mb-6">{branch.subtitle}</p>

      <div className="space-y-4">
        {[
          { Icon: MapPin, label: "Address", content: <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{branch.address}</p> },
          {
            Icon: Phone, label: "Contact",
            content: branch.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="block text-sm text-foreground/80 hover:text-coral transition">{p}</a>
            ))
          },
          {
            Icon: Mail, label: "Email",
            content: <a href={`mailto:${branch.email}`} className="text-sm text-foreground/80 hover:text-coral transition">{branch.email}</a>
          },
          {
            Icon: Globe, label: "Website",
            content: <a href="https://www.bittybalpan.com" target="_blank" rel="noreferrer" className="text-sm text-foreground/80 hover:text-coral transition">www.bittybalpan.com</a>
          },
        ].map(({ Icon, label, content }) => (
          <div key={label} className="flex items-start gap-3">
            <div className={`size-8 rounded-xl grid place-items-center shrink-0 mt-0.5 ${a.icon}`}>
              <Icon className="size-4 shrink-0" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground mb-1">{label}</p>
              {content}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   SECTION 0 — HERO
   ═══════════════════════════════════════════════════════════════ */
const HeroSection = memo(function HeroSection() {
  const sections = [
    { label: "School Offices", href: "#offices", color: "bg-sky/15 text-sky border-sky/20" },
    { label: "Admission Enquiry", href: "#admission", color: "bg-coral/10 text-coral border-coral/20" },
    { label: "Feedback", href: "#feedback", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ];
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-b from-coral/10 via-sky/5 to-transparent rounded-b-full blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
        <Eyebrow color="coral">Get in Touch</Eyebrow>
        <h1 className="heading-xl text-primary mt-4 max-w-3xl mx-auto">
          We'd love to <span className="text-coral italic">hear from you.</span>
        </h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
          Whether you're enquiring about admissions, looking for our branch, or want to share feedback — we're always here for you.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
        className="mt-10 flex flex-wrap gap-3 justify-center"
      >
        {sections.map((s) => (
          <a key={s.label} href={s.href}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md ${s.color}`}>
            {s.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — SCHOOL OFFICES
   ═══════════════════════════════════════════════════════════════ */

/* FIX: Corrected branch data matching real school addresses */
const branches: BranchData[] = [
  {
    tag: "Indrapuri Branch",
    name: "Bitty Balpan Play School",
    subtitle: "Main Campus · Ranchi",
    address: "5012, Road No. 5, Indrapuri Colony\nRanchi, Jharkhand – 834005",
    phones: ["9905011011", "9525120111"],
    email: "contact@bittybalpan.com",
  },
  {
    tag: "Getlatu Branch",
    name: "Bitty Balpan Play School",
    subtitle: "Second Campus · Ranchi",
    address: "Just beside Birsa Institute Of Technology Trust,\nBehind BSNL Training Centre, Getlatu\nRanchi, Jharkhand – 835217",
    phones: ["9905011011", "9525140111"],
    email: "info1001@bittybalpan.com",
  },
];

/*
 * FIX: Map embed + link data.
 *
 * Three things changed from the old version:
 *
 * 1. CORRECT EMBEDS — the second map was pointing to "BITT Public School",
 *    a completely different institution. Both URLs now query the actual
 *    school addresses.
 *
 * 2. CORRECT DEEP LINKS — the "Open in Maps" anchor now uses the real
 *    maps.app.goo.gl short links provided, which reliably open the correct
 *    pin on Android, iOS, and desktop.
 *
 * 3. pointer-events-none ON THE IFRAME — the iframe was eating all mouse
 *    events including clicks on the absolutely-positioned button sitting
 *    visually above it. With pointer-events-none on the iframe:
 *      ✅ "Open in Maps" button is always clickable
 *      ✅ Hover scale effect on the iframe works
 *      ✅ No accidental map pan/zoom that locks scroll on mobile
 *    Users who want to explore the map interactively can click
 *    "Open in Maps" to do so in the full Google Maps app.
 */
const mapData = [
  {
    label: "Indrapuri Branch",
    embed: "https://maps.google.com/maps?q=5012,Road%20No.5,Indrapuri%20Colony,Ranchi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    link: "https://maps.app.goo.gl/1j12zWviwDeBcGcX7",
  },
  {
    label: "Getlatu Branch",
    embed: "https://maps.google.com/maps?q=Birsa%20Institute%20Of%20Technology%20Trust,Getlatu,Ranchi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    link: "https://maps.app.goo.gl/PwWqoLUjY7dLe4Ch7",
  },
];

const OfficesSection = memo(function OfficesSection() {
  return (
    <section id="offices" className="py-24 px-6 bg-surface scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <Eyebrow color="sky">School Office</Eyebrow>
          <h2 className="heading-lg text-primary mt-2 max-w-2xl mx-auto">
            Two campuses, <span className="text-sky italic">one family.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
            Visit us at either of our Ranchi campuses — our doors are always open for a warm conversation.
          </p>
        </motion.div>

        {/* Branch info cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <BranchCard branch={branches[0]} accent="sky" index={0} />
          <BranchCard branch={branches[1]} accent="coral" index={1} />
        </div>

        {/* Map embeds */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sharedTransition}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          {mapData.map((m) => (
            <div
              key={m.label}
              className="rounded-3xl overflow-hidden border border-border/60 h-72 bg-white relative group shadow-lg"
            >
              {/* pointer-events-none: lets the "Open in Maps" button receive clicks */}
              <iframe
                title={m.label}
                src={m.embed}
                className="w-full h-full pointer-events-none group-hover:scale-[1.03] transition duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Branch label — top left */}
              <div className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow">
                {m.label}
              </div>

              {/* Open in Maps — bottom left, always clickable */}
              <div className="absolute bottom-4 left-4 z-50">
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:scale-105 hover:shadow-xl transition"
                >
                  <MapPin className="size-4 shrink-0" />
                  Open in Maps
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — ADMISSION ENQUIRY FORM
   ═══════════════════════════════════════════════════════════════ */
interface AdmissionForm {
  childName: string; childAge: string; parentName: string; mobile: string;
  email: string; admissionFor: string; academicYear: string; branch: string; otherInfo: string;
}

const AdmissionSection = memo(function AdmissionSection() {
  const [form, setForm] = useState<AdmissionForm>({
    childName: "", childAge: "", parentName: "", mobile: "",
    email: "", admissionFor: "", academicYear: "", branch: "", otherInfo: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = useCallback(
    (k: keyof AdmissionForm) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm((prev) => ({ ...prev, [k]: e.target.value })),
    []
  );
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  const programs = [
    "Baby Pre-Nursery (1.5–2.5 yrs)", "Pre-Nursery (2.5–3.5 yrs)",
    "Nursery (3.5–4.5 yrs)", "Preparatory (4.5–5.5 yrs)", "Day Care (1.5–9 yrs)",
  ];
  const years = ["2025–2026", "2026–2027", "2027–2028"];
  /* FIX: branch names match the corrected branches array */
  const branchOptions = ["Indrapuri Branch", "Getlatu Branch"];

  const quickInfo: { icon: LucideIcon; label: string }[] = [
    { icon: Clock, label: "Response within 24 hours" },
    { icon: Users, label: "Personalised guidance from educators" },
    { icon: Star, label: "Campus tour arranged on request" },
  ];
  const branchMini = [
    { tag: "Indrapuri", address: "5012, Road No. 5, Indrapuri Colony\nRanchi – 834005", phones: "9905011011 / 9525120111", email: "contact@bittybalpan.com" },
    { tag: "Getlatu", address: "Near Birsa Institute Of Technology Trust\nGetlatu, Ranchi – 835217", phones: "9905011011 / 9525140111", email: "info1001@bittybalpan.com" },
  ];

  return (
    <section id="admission" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <motion.div {...fadeUp}>
              <Eyebrow color="coral">Admission Enquiry</Eyebrow>
              <h2 className="heading-lg text-primary mt-2 mb-5">
                Begin your child's <span className="text-coral italic">journey with us.</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Fill in the form and one of our team members will get in touch within 24 hours to guide you through the admission process.
              </p>
              <div className="space-y-4 mb-10">
                {quickInfo.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="size-8 rounded-xl bg-coral/10 grid place-items-center text-coral shrink-0">
                      <Icon className="size-4 shrink-0" />
                    </div>
                    <span className="text-sm text-foreground/75">{label}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {branchMini.map((b) => (
                  <div key={b.tag} className="p-5 rounded-2xl border border-border/60 bg-surface">
                    <p className="text-xs font-mono uppercase tracking-widest text-coral mb-2">{b.tag} Branch</p>
                    <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed mb-2">{b.address}</p>
                    <p className="text-xs text-muted-foreground">{b.phones}</p>
                    <p className="text-xs text-muted-foreground">{b.email}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={sharedTransition}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-5 rounded-3xl border border-emerald-200 bg-emerald-50">
                <div className="size-16 rounded-full bg-emerald-100 grid place-items-center">
                  <CheckCircle2 className="size-8 text-emerald-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-primary">Enquiry Submitted!</h3>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                  Thank you! Our admissions team will reach out to you within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-2 text-xs font-mono text-muted-foreground hover:text-coral transition underline underline-offset-4">
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-3xl border border-border/60 bg-white shadow-sm space-y-6">
                <div className="mb-2">
                  <p className="font-display font-bold text-xl text-primary">Enrol Now</p>
                  <p className="text-muted-foreground text-sm mt-1">All fields marked <span className="text-coral">*</span> are required.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="adm-child-name" required>Child's Name</FieldLabel>
                    <div className="relative">
                      <Baby className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40 pointer-events-none shrink-0" />
                      <Input id="adm-child-name" name="adm-child-name" placeholder="e.g. Aarav Sharma" className="pl-10" value={form.childName} onChange={set("childName")} required />
                    </div>
                  </div>
                  <div>
                    <FieldLabel htmlFor="adm-child-age" required>Child's Age</FieldLabel>
                    <SelectField id="adm-child-age" icon={Baby} placeholder="Select age" value={form.childAge} onChange={set("childAge")}
                      options={["1.5 yrs","2 yrs","2.5 yrs","3 yrs","3.5 yrs","4 yrs","4.5 yrs","5 yrs","5.5 yrs","6+ yrs"]} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="adm-parent-name" required>Parent's Name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40 pointer-events-none shrink-0" />
                      <Input id="adm-parent-name" name="adm-parent-name" placeholder="e.g. Priya Sharma" className="pl-10" value={form.parentName} onChange={set("parentName")} required />
                    </div>
                  </div>
                  <div>
                    <FieldLabel htmlFor="adm-mobile" required>Mobile Number</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40 pointer-events-none shrink-0" />
                      <Input id="adm-mobile" name="adm-mobile" type="tel" placeholder="+91 98765 43210" className="pl-10" value={form.mobile} onChange={set("mobile")} required />
                    </div>
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="adm-email">Email Address</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40 pointer-events-none shrink-0" />
                    <Input id="adm-email" name="adm-email" type="email" placeholder="you@example.com" className="pl-10" value={form.email} onChange={set("email")} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="adm-program" required>Admission For</FieldLabel>
                    <SelectField id="adm-program" icon={GraduationCap} placeholder="Select program" value={form.admissionFor} onChange={set("admissionFor")} options={programs} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="adm-year" required>Academic Year</FieldLabel>
                    <SelectField id="adm-year" icon={CalendarDays} placeholder="Select year" value={form.academicYear} onChange={set("academicYear")} options={years} />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="adm-branch">Preferred Branch</FieldLabel>
                  <SelectField id="adm-branch" icon={Building2} placeholder="Select branch" value={form.branch} onChange={set("branch")} options={branchOptions} />
                </div>

                <div>
                  <FieldLabel htmlFor="adm-notes">Other Information</FieldLabel>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 size-4 text-muted-foreground/40 pointer-events-none shrink-0" />
                    <Textarea id="adm-notes" name="adm-notes" rows={4} placeholder="Any special requirements, questions or additional details..." className="pl-10" value={form.otherInfo} onChange={set("otherInfo")} />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
                  Submit Enquiry <Send className="size-4 shrink-0" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — FEEDBACK
   ═══════════════════════════════════════════════════════════════ */
const feedbackCategories: string[] = [
  "Teaching Quality", "Facilities & Infrastructure", "Communication & Updates",
  "Safety & Security", "Extracurricular Activities", "Overall Experience",
];

const StarRating = memo(function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)} className="transition hover:scale-110">
          <Star className={`size-7 transition ${n <= value ? "fill-amber-400 text-amber-400" : "text-border fill-transparent"}`} />
        </button>
      ))}
    </div>
  );
});

interface FeedbackForm {
  parentName: string; childName: string; branch: string; category: string; rating: number; message: string;
}

const FeedbackSection = memo(function FeedbackSection() {
  const [feedback, setFeedback] = useState<FeedbackForm>({
    parentName: "", childName: "", branch: "", category: "", rating: 0, message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const setF = useCallback(
    (k: keyof FeedbackForm) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setFeedback((prev) => ({ ...prev, [k]: e.target.value })),
    []
  );
  const setRating = useCallback((n: number) => setFeedback((p) => ({ ...p, rating: n })), []);
  const setCategory = useCallback((c: string) => setFeedback((p) => ({ ...p, category: c })), []);
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setSubmitted(true);
  }, []);

  return (
    <section id="feedback" className="py-28 px-6 bg-primary text-white overflow-hidden relative scroll-mt-20">
      <div className="absolute -top-32 right-0 size-[500px] rounded-full bg-coral/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 left-0 size-[400px] rounded-full bg-sky/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Eyebrow color="sun">Help Us Improve</Eyebrow>
          <h2 className="heading-lg mt-2 max-w-3xl mx-auto">
            Your voice shapes <span className="text-sun italic">every child's tomorrow.</span>
          </h2>
          <p className="mt-5 text-white/65 text-base max-w-xl mx-auto leading-relaxed">
            At BITTY Balpan we are always looking for ideas and suggestions from you. Based on your feedback, we constantly make effort to improve ourselves — so tell us how your partner in parenting can do better.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={sharedTransition} className="lg:sticky lg:top-28 space-y-6">
            <div className="p-7 rounded-3xl bg-white/6 border border-white/15 space-y-5">
              <Sparkles className="size-8 text-sun shrink-0" />
              <h3 className="font-display font-bold text-xl">"We read every word."</h3>
              <p className="text-white/65 text-sm leading-relaxed">
                Every piece of feedback is reviewed by our leadership team. You're not sending a message into a void — you're helping shape the school your child grows up in.
              </p>
            </div>
            {feedbackCategories.map((c, i) => (
              <motion.div key={c} {...stagger(i * 0.05)} className="flex items-center gap-3 text-white/70">
                <CheckCircle2 className="size-4 text-sun shrink-0" />
                <span className="text-sm">{c}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={sharedTransition}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-5 rounded-3xl border border-white/15 bg-white/6">
                <div className="size-16 rounded-full bg-sun/20 grid place-items-center">
                  <MessageSquareHeart className="size-8 text-sun" />
                </div>
                <h3 className="font-display font-bold text-xl">Thank you!</h3>
                <p className="text-white/65 text-sm max-w-xs leading-relaxed">
                  Your feedback has been received. We truly appreciate you taking the time to help us grow.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-2 text-xs font-mono text-white/40 hover:text-sun transition underline underline-offset-4">
                  Submit more feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-3xl border border-white/15 bg-white/6 backdrop-blur space-y-6">
                <div className="mb-2">
                  <p className="font-display font-bold text-xl">Submit Your Feedback</p>
                  <p className="text-white/50 text-sm mt-1">Anonymous feedback is also welcome.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fb-parent" className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Your Name</label>
                    <input id="fb-parent" name="fb-parent" placeholder="Parent's name" value={feedback.parentName} onChange={setF("parentName")}
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/8 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sun/40 focus:border-sun/50 transition" />
                  </div>
                  <div>
                    <label htmlFor="fb-child" className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Child's Name</label>
                    <input id="fb-child" name="fb-child" placeholder="Child's name" value={feedback.childName} onChange={setF("childName")}
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/8 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sun/40 focus:border-sun/50 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="fb-branch" className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Branch</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/30 pointer-events-none shrink-0" />
                    <select id="fb-branch" name="fb-branch" value={feedback.branch} onChange={setF("branch")}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/15 bg-white/8 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sun/40 focus:border-sun/50 transition appearance-none">
                      <option value="" disabled className="text-gray-800">Select branch</option>
                      {/* FIX: updated to match corrected branch names */}
                      <option value="Indrapuri" className="text-gray-800">Indrapuri Branch</option>
                      <option value="Getlatu" className="text-gray-800">Getlatu Branch</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-white/30 pointer-events-none shrink-0" />
                  </div>
                </div>

                <div>
                  <p className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Feedback Category</p>
                  <div className="flex flex-wrap gap-2">
                    {feedbackCategories.map((c) => (
                      <button key={c} type="button" onClick={() => setCategory(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${feedback.category === c ? "bg-sun/30 border-sun/60 text-sun" : "bg-white/5 border-white/15 text-white/60 hover:border-white/30 hover:text-white/80"}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-3">Overall Rating</p>
                  <StarRating value={feedback.rating} onChange={setRating} />
                </div>

                <div>
                  <label htmlFor="fb-message" className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                    Your Feedback <span className="text-coral">*</span>
                  </label>
                  <textarea id="fb-message" name="fb-message" rows={5} required
                    placeholder="Share your thoughts, suggestions or appreciation..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/8 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sun/40 focus:border-sun/50 transition resize-none"
                    value={feedback.message} onChange={setF("message")} />
                </div>

                <button type="submit" className="btn-primary bg-sun text-ink hover:bg-sun/90 w-full flex items-center justify-center gap-2 py-4 text-base">
                  Submit Feedback <Send className="size-4 shrink-0" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════
   CTA BAND
   ═══════════════════════════════════════════════════════════════ */
const CTABand = memo(function CTABand() {
  return (
    <section className="px-6 py-24">
      <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center bg-gradient-to-br from-sun/25 via-coral/10 to-sky/20 rounded-[2.5rem] p-14 md:p-20 border border-sun/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_70%)]" />
        <div className="relative">
          <Eyebrow color="coral">Still have questions?</Eyebrow>
          <h2 className="heading-lg text-primary mb-5 mt-2">
            Come visit us — your <span className="text-coral italic">child will love it here.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Nothing beats walking through our campuses and meeting the team who will care for your child.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/admission" className="btn-primary inline-flex items-center gap-2">
              Apply Now <ArrowRight className="size-4 shrink-0" />
            </Link>
            <a href="tel:9905011011" className="px-6 py-3 rounded-full border border-primary/25 text-primary font-semibold text-sm hover:bg-primary/5 transition inline-flex items-center gap-2">
              <Phone className="size-4 shrink-0" /> Call Us Now
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE
   ═══════════════════════════════════════════════════════════════ */
function ContactPage() {
  return (
    <>
      <HeroSection />
      <OfficesSection />
      <AdmissionSection />
      <FeedbackSection />
      <CTABand />
    </>
  );
}