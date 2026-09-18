import { CheckCircle2, LayoutTemplate, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContextStrip = () => {
  const steps = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-teal-400" />,
      title: "1. Quality Gating",
      description: "A poor-quality image needs another capture—not a confident-looking result. Automatic gating rejects ungradable inputs.",
    },
    {
      icon: <Activity className="w-6 h-6 text-amber-400" />,
      title: "2. Calibrated Probability",
      description: "Review the full 5-class DR distribution and referable threshold, preventing borderline cases from being hidden behind a single label.",
    },
    {
      icon: <LayoutTemplate className="w-6 h-6 text-blue-400" />,
      title: "3. Structural Context",
      description: "Inspect vessel segmentation alongside the original image to evaluate retinal structure and algorithm spatial awareness.",
    }
  ];

  return (
    <section id="context" className="py-24 bg-ink-950 border-y border-ink-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-serif font-bold text-paper-50 mb-4">Better screening starts before the prediction.</h2>
          <p className="text-lg text-ink-300 leading-relaxed">
            Screening access is heavily constrained in rural settings. Clinicians need interpretable information, not just a black-box class label. This workflow structures quality, probability, and evidence together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-ink-900/50 border border-ink-800 rounded-2xl p-8 hover:bg-ink-900 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-ink-950 border border-ink-800 flex items-center justify-center mb-6 shadow-inner">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-paper-50 mb-3">{step.title}</h3>
              <p className="text-ink-300 leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
