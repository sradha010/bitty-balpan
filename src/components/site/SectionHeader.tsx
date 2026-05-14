import { motion } from "framer-motion";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-14`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4 block"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="heading-lg text-primary text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-5 text-lg text-muted-foreground text-pretty"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  accent,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  accent?: string;
}) {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sky/10 via-warm to-warm" />
        <div className="absolute top-20 -left-20 size-96 rounded-full bg-sky/20 blur-[100px] animate-blob" />
        <div className="absolute top-40 right-0 size-80 rounded-full bg-coral/15 blur-[100px] animate-blob" style={{ animationDelay: "-4s" }} />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-sun/15 blur-[100px] animate-blob" style={{ animationDelay: "-8s" }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.05 }}
          className="heading-xl text-primary mt-4 text-balance"
        >
          {title}
          {accent && (
            <span className="ml-3 italic underline decoration-sky decoration-[6px] underline-offset-[10px]">
              {accent}
            </span>
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-pretty"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
