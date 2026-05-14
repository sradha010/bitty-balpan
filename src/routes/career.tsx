import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useRef, memo, useCallback } from "react";
import { Upload, Heart, Sparkles, TrendingUp, Users, ArrowRight, Check, FileText } from "lucide-react";
import { PageHero, SectionHeader } from "@/components/site/SectionHeader";
import campusImg from "@/assets/school_img.png";
import nurseryImg from "@/assets/pre-school.png";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers — Bitty Balpan Play School" },
      { name: "description", content: "Join a team that shapes the future, one tiny human at a time. Open roles across India." },
    ],
  }),
  component: CareerPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const },
};

const REASONS = [
  { i: TrendingUp, t: "Real career growth", d: "Clear paths from teacher to head educator to center director." },
  { i: Sparkles, t: "Continuous training", d: "Quarterly workshops with global pedagogy experts — paid by us." },
  { i: Heart, t: "Friendly culture", d: "Annual retreats, monthly family days and a warm leadership." },
  { i: Users, t: "Creative freedom", d: "Bring your craft into the classroom — we'll give you the studio." },
];

function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Shape the future,"
        accent="one hello at a time."
        subtitle="We're looking for warm, curious humans to join our family of educators and creators."
      />

      {/* Stats strip */}
      <section className="px-6 -mt-4 mb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { v: "320+", l: "Team Members" },
            { v: "4.8★", l: "Glassdoor Score" },
            { v: "92%", l: "Retention" },
            { v: "24", l: "City Centers" },
          ].map((s, i) => (
            <motion.div
              key={i} {...fadeUp} transition={{ delay: i * 0.05, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="bg-white p-5 rounded-2xl border border-border text-center"
            >
              <div className="font-display text-3xl font-extrabold text-coral">{s.v}</div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Culture split */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
            <img src={campusImg} alt="" loading="lazy" className="rounded-3xl aspect-square object-cover translate-y-8" />
            <img src={nurseryImg} alt="" loading="lazy" className="rounded-3xl aspect-square object-cover" />
          </motion.div>
          <div>
            <span className="eyebrow">Life at Balpan</span>
            <h2 className="heading-lg text-primary mt-3 mb-6 text-balance">Where your work matters — every single day.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              You'll work alongside designers, child psychologists, artists and parents. You'll see your
              ideas turn into giggles and curiosity in real time. You'll go home tired in the best way possible.
            </p>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="py-24 px-6 bg-primary text-white relative overflow-hidden">
        <div className="absolute -top-32 right-0 size-[500px] rounded-full bg-sky/20 blur-[140px] animate-blob" />
        <div className="relative max-w-7xl mx-auto">
          <SectionHeader eyebrow="Why join us" title={<>Reasons our team <span className="text-sun italic">never wants to leave.</span></>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REASONS.map((r, i) => (
              <motion.div
                key={i} {...fadeUp} transition={{ delay: i * 0.07, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="p-7 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <div className="size-12 rounded-2xl bg-sun/20 text-sun grid place-items-center mb-4">
                  <r.i className="size-5" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{r.t}</h3>
                <p className="text-sm text-white/65">{r.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ApplicationForm />
    </>
  );
}

/*
 * FIX: The original Field component wrapped everything in a <label> element.
 * When an <input> is nested inside a <label> WITHOUT a matching htmlFor/id,
 * clicking anywhere on the label (including the text span) fires TWO click events:
 *   1. The label's default behavior: programmatically focuses/clicks the input
 *   2. The input's own click/focus handler
 * This caused React to fire two synthetic focus events in quick succession,
 * which in a controlled input scenario triggers two state updates back-to-back.
 * Combined with framer-motion's IntersectionObserver re-evaluation on every
 * render, this created an event-handler accumulation loop → browser freeze.
 *
 * FIX: Use a plain <div> wrapper + explicit <label htmlFor={id}> pointing to
 * the input's id. This is the correct accessible pattern and eliminates the
 * double-click event entirely.
 *
 * FIX: memo() prevents this component from re-rendering when parent step state
 * changes. Inputs are uncontrolled (no value/onChange), so typing never causes
 * a re-render cascade.
 */
const Field = memo(function Field({
  id,
  label,
  type = "text",
}: {
  id: string;
  label: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-mono uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="w-full bg-surface border border-border rounded-2xl px-5 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-white transition"
      />
    </div>
  );
});

/*
 * FIX: ApplicationForm state is isolated here. The only state that changes
 * during form interaction is `step`, `done`, and `file` — none of which are
 * updated on every keystroke. Inputs are uncontrolled, so no render storm.
 */
function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const steps = ["About you", "Role", "Resume"];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(true);
  }, []);

  const handleDragLeave = useCallback(() => setDrag(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }, []);

  const handleFileClick = useCallback(() => fileRef.current?.click(), []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  }, []);

  const handleNext = useCallback(() => {
    if (step === 2) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  }, [step]);

  const handleBack = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow="Apply" title="Start your Balpan journey." />

        <div className="bg-white border border-border rounded-[2rem] p-8 md:p-10 shadow-card">
          <div className="flex items-center gap-3 mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex items-center gap-3">
                <div className={`size-9 rounded-full grid place-items-center font-display font-bold text-sm transition ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"
                }`}>
                  {i < step || done ? <Check className="size-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i === step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="mx-auto size-16 rounded-full bg-mint text-white grid place-items-center mb-5">
                <Check className="size-7" />
              </div>
              <h3 className="heading-lg text-primary mb-3">Application received!</h3>
              <p className="text-muted-foreground">Our talent team will reach out within 3 working days.</p>
            </motion.div>
          ) : (
            <>
              {step === 0 && (
                <div className="space-y-5">
                  <Field id="career-name" label="Full name" />
                  <Field id="career-email" label="Email" type="email" />
                  <Field id="career-phone" label="Phone" type="tel" />
                </div>
              )}
              {step === 1 && (
                <div className="space-y-5">
                  <Field id="career-role" label="Role you're applying for" />
                  <Field id="career-exp" label="Years of experience" type="number" />
                  <Field id="career-city" label="Preferred city" />
                </div>
              )}
              {step === 2 && (
                <div>
                  <span className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Upload resume (PDF)</span>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleFileClick}
                    className={`cursor-pointer border-2 border-dashed rounded-3xl p-10 text-center transition ${
                      drag ? "border-primary bg-primary/5" : "border-border bg-surface hover:border-primary/40"
                    }`}
                  >
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" hidden onChange={handleFileChange} />
                    {file ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="size-8 text-primary" />
                        <div className="text-left">
                          <div className="font-display font-bold text-primary">{file.name}</div>
                          <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="size-10 mx-auto text-primary mb-3" />
                        <p className="font-display font-bold text-primary">Drop your resume here</p>
                        <p className="text-sm text-muted-foreground mt-1">or click to browse · PDF / DOC</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-10">
                <button onClick={handleBack} disabled={step === 0} className="btn-ghost disabled:opacity-40">
                  Back
                </button>
                <button onClick={handleNext} className="btn-primary">
                  {step === 2 ? "Submit application" : "Continue"} <ArrowRight className="size-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}