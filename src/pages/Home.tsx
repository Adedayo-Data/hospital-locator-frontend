import heroImage from "@/assets/hero-image.jpg";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import SearchBar from "@/components/ui/SearchBar";
import MiniMapPreview from "@/components/ui/MiniMapPreview";
import FeaturedHospitals from "@/components/ui/FeaturedHospitals";
import CallToAction from "@/components/ui/CallToAction";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/find-hospitals?query=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        {/* Hero Section */}
        <section id="hero" className="py-20 px-4 md:px-10 lg:px-20 bg-green-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
                Find Hospitals Fast. Get There Faster.
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                Whether you're dealing with an emergency or just seeking nearby medical care, our app helps you locate and navigate to verified hospitals with confidence.
              </p>

              {/* Stats Row */}
              <div className="flex gap-6 mb-6 flex-wrap">
                {[
                  { value: "4.9★", label: "User Reviews" },
                  { value: "200+", label: "Verified Hospitals" },
                  { value: "Real-time", label: "Traffic Updates" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <StatItem value={stat.value} label={stat.label} />
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full"
                  onClick={() => navigate("/find-hospitals")} 
                  >
                    Start Locating
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-100 rounded-full"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img
                src={heroImage}
                alt="Hero image"
                className="w-full rounded-2xl shadow-md"
              />
              <div className="absolute bottom-4 left-4 bg-white rounded-full px-4 py-2 shadow flex items-center gap-2 text-green-700 font-medium text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                </svg>
                Accredited Excellence
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search Bar Section */}
        <SearchBar onSearch={handleSearch} />
        <MiniMapPreview />
        <FeaturedHospitals />
        <CallToAction />
      </div>
    </>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatProps) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-green-700">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
}
