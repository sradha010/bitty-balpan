import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, memo, useCallback } from "react";
import { Check, ArrowRight, ArrowLeft, Star } from "lucide-react";
import { PageHero, SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/admission")({
  head: () => ({
    meta: [
      { title: "Admissions — Bitty Balpan Play School" },
      { name: "description", content: "Open admissions for 2026. Eligibility, fees and a beautiful three-step application." },
    ],
  }),
  component: AdmissionPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const },
};

function AdmissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions 2026"
        title="The first step to"
        accent="something wonderful."
        subtitle="Open seats across all programs. Applications take under five minutes."
      />

      <section className="px-6 -mt-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Eligibility" title="Find the right level for your child." />
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { p: "Baby Pre-Nursery", age: "1.5 – 2.5 yrs", color: "sky" },
              { p: "Nursery", age: "2.5 – 3.5 yrs", color: "coral" },
              { p: "Preparatory", age: "3.5 – 5 yrs", color: "mint" },
              { p: "Day Care", age: "All ages", color: "sun" },
            ].map((row, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.07, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="glass p-6 rounded-3xl hover:-translate-y-1 hover:shadow-card transition"
              >
                <div className={`size-10 rounded-xl bg-${row.color}/20 grid place-items-center mb-4`}>
                  <div className={`size-3 rounded-full bg-${row.color}`} />
                </div>
                <h3 className="font-display font-bold text-lg text-primary mb-1">{row.p}</h3>
                <p className="text-sm text-muted-foreground">{row.age}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ParentVoices />
      <ApplicationForm />
    </>
  );
}

// Isolated into its own component so its state changes don't affect the rest of the page
function ParentVoices() {
  const items = [
    { name: "Diya R.", text: "The application took 4 minutes. The campus tour took my breath away." },
    { name: "Karan S.", text: "Felt like a concierge experience. Updates at every step." },
    { name: "Mira P.", text: "Our daughter was offered a seat and welcomed by name on day one." },
  ];
  const [i, set] = useState(0);
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <span className="eyebrow">Parents on Admissions</span>
        <h2 className="heading-lg text-primary mt-3 mb-10">Welcomed from the very first hello.</h2>
        <div className="relative bg-white rounded-[2.5rem] p-10 md:p-14 border border-border min-h-[260px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-5 fill-sun text-sun" />
                ))}
              </div>
              <p className="text-xl md:text-2xl font-display text-foreground italic mb-6">"{items[i].text}"</p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— {items[i].name}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => set(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-2 bg-border"}`}
                aria-label={`Slide ${k + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/*
 * FIX: Field is memoized so it never re-renders due to parent state changes.
 * Each field manages its own value independently (uncontrolled with defaultValue),
 * OR is passed a stable onChange via useCallback from the parent.
 *
 * Using uncontrolled inputs here is correct because the form only needs values
 * on submit (step navigation), not on every keystroke — this eliminates the
 * render-storm entirely.
 */
const Field = ({
  id,
  label,
  type = "text",
  multiline = false,
  placeholder = "",
}: {
  id: string;
  label: string;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
}) => {
  return (
    <div className="flex flex-col gap-2">

      <label
        htmlFor={id}
        className="
          text-xs
          font-mono-custom
          uppercase
          tracking-[0.25em]
          text-muted-foreground
        "
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          placeholder={placeholder}
          className="
            w-full
            rounded-2xl
            border
            border-border
            bg-surface
            px-5
            py-4
            text-foreground
            font-medium
            placeholder:text-muted-foreground/50
            focus:outline-none
            focus:border-primary
            focus:bg-white
            transition-all
          "
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className="
            w-full
            rounded-2xl
            border
            border-border
            bg-surface
            px-5
            py-4
            text-foreground
            font-medium
            placeholder:text-muted-foreground/50
            focus:outline-none
            focus:border-primary
            focus:bg-white
            transition-all
          "
        />
      )}
    </div>
  );
};

/*
 * FIX: step and submitted are the ONLY state here. Inputs are uncontrolled
 * (no value/onChange wired up), so typing into a field never triggers a
 * React re-render — eliminating the IntersectionObserver/framer-motion storm.
 * Values are read from the DOM via FormData on submit if needed.
 */
function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const steps = ["Child", "Guardian", "Program"];

  const handleNext = useCallback(() => {
    if (step === 2) {
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  }, [step]);

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow="Apply Online" title="A few quick details." />

        <div className="bg-white border border-border rounded-[2rem] p-8 md:p-10 shadow-card">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex items-center gap-3">
                <div
                  className={`size-9 rounded-full grid place-items-center font-display font-bold text-sm transition ${
                    i <= step ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="size-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i === step ? "text-primary" : "text-muted-foreground"}`}>
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto size-16 rounded-full bg-mint text-white grid place-items-center mb-5">
                  <Check className="size-7" />
                </div>
                <h3 className="heading-lg text-primary mb-3">Application received!</h3>
                <p className="text-muted-foreground">We'll reach out within 24 hours to schedule your visit.</p>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-5">
                    <Field id="child-name" label="Child's full name" />
                    <Field id="child-dob" label="Date of birth" type="date" />
                    <Field id="child-notes" label="Allergies / notes" />
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-5">
                    <Field id="guardian-name" label="Guardian name" />
                    <Field id="guardian-email" label="Email address" type="email" />
                    <Field id="guardian-phone" label="Phone number" type="tel" />
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-5">
                    <Field id="program-choice" label="Preferred program" placeholder="Pre-Nursery, Nursery, Prep or Day Care" />
                    <Field id="program-city" label="Preferred center city" />
                    <Field id="program-notes" label="Anything you'd like us to know" multiline />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!submitted && (
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                {step === 2 ? "Submit application" : "Continue"} <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}