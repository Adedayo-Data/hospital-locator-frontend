import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CallToAction() {
  return (
    <section className="bg-green-600 py-16 px-4 md:px-10 text-white overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Need urgent care? Start finding hospitals around you now.
        </h2>
        <p className="text-green-100 mb-6 text-lg">
          With real-time navigation, traffic updates, and verified hospital info.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="bg-white text-green-700 hover:bg-green-100 px-6 py-3 text-lg font-semibold rounded-full">
            Start Now
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
