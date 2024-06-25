import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Set the default icon URLs with React-Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const MapComponent = () => {
  const franceBounds: [number, number][] = [
    [41.333, -5.225],
    [51.124, 9.662],
  ];

  const projectData = [
    {
      latitude: 48.8566,
      longitude: 2.3522,
      project_count: 5,
    },
    {
      latitude: 47.2184,
      longitude: -1.5536,
      project_count: 3,
    },
    {
      latitude: 43.2965,
      longitude: 5.3698,
      project_count: 7,
    },
    {
      latitude: 45.764,
      longitude: 4.8357,
      project_count: 4,
    },
    {
      latitude: 44.8378,
      longitude: -0.5792,
      project_count: 2,
    },
    {
      latitude: 50.6292,
      longitude: 3.0573,
      project_count: 6,
    },
    {
      latitude: 43.6108,
      longitude: 3.8767,
      project_count: 8,
    },
    {
      latitude: 48.5839,
      longitude: 7.7455,
      project_count: 1,
    },
    {
      latitude: 49.2583,
      longitude: 4.0317,
      project_count: 3,
    },
    {
      latitude: 48.1173,
      longitude: -1.6778,
      project_count: 4,
    },
  ];

  return (
    <div>
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={5}
        minZoom={6.5}
        style={{ height: "100vh", width: "100%" }}
        zoomSnap={0.5}
        zoomDelta={0.5}
        maxBounds={franceBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {projectData.map((project, index) => (
          <Circle
            key={index}
            center={[project.latitude, project.longitude]}
            radius={project.project_count * 10000} // Adjust the multiplier as needed
            color="red"
            fillColor="#f03"
            fillOpacity={0.5}
          >
            <Popup>Projects: {project.project_count}</Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
