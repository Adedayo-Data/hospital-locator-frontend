import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { dummyHospitals } from "@/data/DummyData"
import { motion } from "framer-motion"

export default function FeaturedHospitals() {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-8 text-center">
          Featured Hospitals
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto no-scrollbar">
          {dummyHospitals.map((hospital, index) => (
            <motion.div
              key={index}
              className="bg-green-50 border border-green-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-green-800">{hospital.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{hospital.location}</p>

                <div className="flex items-center gap-1 text-yellow-500 mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(hospital.rating) ? "fill-yellow-400" : "stroke-yellow-400"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">({hospital.rating})</span>
                </div>

                <Button
                  variant="outline"
                  className="mt-auto border-green-600 text-green-700 hover:bg-green-100"
                >
                  View on Map
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
