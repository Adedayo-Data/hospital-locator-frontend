import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

export default function MiniMapPreview() {
  const center: [number, number] = [6.5244, 3.3792]

  return (
    <section className="bg-green-50 py-14 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
          See Hospitals Around You
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          This map shows sample hospitals in your region.
        </p>

        <div className="rounded-xl overflow-hidden shadow-md border border-green-200 max-w-5xl mx-auto h-[400px]">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full"
          style={{ height: "100%", minHeight: "400px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />

          <Marker position={[6.5244, 3.3792]} icon={hospitalIcon}>
            <Popup>General Hospital Ikeja</Popup>
          </Marker>

          <Marker position={[6.5115, 3.3881]} icon={hospitalIcon}>
            <Popup>Lagoon Hospital</Popup>
          </Marker>
        </MapContainer>
      </div>
      </div>
    </section>
  )
}
