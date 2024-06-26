import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { Project } from "../interfaces/interface.ts";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import getData from "../api/getCities.ts";

// Set the default icon URLs with React-Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const MapComponent = () => {
  const [projectData, setProjectData] = useState<Project[]>([]);

  const franceBounds: [number, number][] = [
    [41.333, -5.225],
    [51.124, 9.662],
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data: Project[] = await getData("http://localhost:3000/cities");

      if (data) {
        const limitedData = data.slice(0, 100);
        setProjectData(limitedData);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
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
        {projectData ? (
          projectData.map((project, index) => {
            if (!project.coordinates) return null;

            const [latitude, longitude] = project.coordinates
              .split(",")
              .map((coord) => parseFloat(coord));

            return (
              <Circle
                key={index}
                center={[latitude, longitude]}
                radius={parseInt(project.total_count, 10) * 0.5}
                color="red"
                fillColor="#f03"
                fillOpacity={0.5}
              >
                <Popup>
                  <span className={"font-bold"}>{project.name}</span>
                  <br />
                  Panneaux solaires : {project.total_count}
                  <br />
                  Département : {project.departement_code}
                </Popup>
              </Circle>
            );
          })
        ) : (
          <p>Error</p>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
