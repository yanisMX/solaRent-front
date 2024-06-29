import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { City, Department } from "../interfaces/interface.ts";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const MapComponent = ({ cities, departments, selectedFilter }) => {
  const franceBounds: [number, number][] = [
    [41.333, -5.225],
    [51.124, 9.662],
  ];

  return (
    <div className={"pl-8"}>
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={5}
        minZoom={6.5}
        style={{ height: "85vh", width: "100%" }}
        zoomSnap={0.5}
        zoomDelta={0.5}
        maxBounds={franceBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <div>
          {selectedFilter === "Villes" &&
            cities.map((city, index) => {
              if (!city.coordinates) return null;

              const [latitude, longitude] = city.coordinates
                .split(",")
                .map((coord) => parseFloat(coord));

              return (
                <Circle
                  key={index}
                  center={[latitude, longitude]}
                  radius={parseInt(city.total_count, 10) * 0.5}
                  color="red"
                  fillColor="#f03"
                  fillOpacity={0.5}
                >
                  <Popup>
                    <span className={"font-bold"}>{city.name}</span>
                    <br />
                    Panneaux solaires : {city.total_count}
                    <br />
                    Département : {city.departement_code}
                  </Popup>
                </Circle>
              );
            })}

          {selectedFilter === "Départements" &&
            departments.map((department, index) => {
              if (!department.coordinates) return null;

              const [latitude, longitude] = department.coordinates
                .split(",")
                .map((coord) => parseFloat(coord));

              return (
                <Circle
                  key={index}
                  center={[latitude, longitude]} // Utiliser les coordonnées du département
                  radius={department.solar_panel_count * 7} // Ajuster le rayon en fonction des panneaux solaires
                  color="red"
                  fillColor="#f03"
                  fillOpacity={0.5}
                >
                  <Popup>
                    <span className={"font-bold"}>{department.name}</span>
                    <br />
                    Panneaux solaires : {department.solar_panel_count}
                  </Popup>
                </Circle>
              );
            })}
        </div>
      </MapContainer>
      <div>
        {departments.length > 0 && (
          <div>
            <h2 className="text-xl mt-4">
              Nombre de panneaux solaires par département
            </h2>
            <ul>
              {departments.map((department) => (
                <li key={department.code}>
                  {department.name} ({department.code}):{" "}
                  {department.solar_panel_count}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
