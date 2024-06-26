import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { Departement, Project } from "../interfaces/interface.ts";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import getData from "../api/getCities.ts";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const MapComponent = () => {
  const [cities, setCities] = useState<Project[]>([]);
  const [departements, setDepartements] = useState<Departement[]>([]);
  const franceBounds: [number, number][] = [
    [41.333, -5.225],
    [51.124, 9.662],
  ];

  const fetchCitiesAndDepartments = async () => {
    const citiesData: Project[] = await getData("http://localhost:3000/cities");
    const departmentsData: Departement[] = await getData(
      "http://localhost:3000/departments",
    );

    if (citiesData && departmentsData) {
      const limitedCities = citiesData.slice(0, 1000);
      setCities(limitedCities);
      aggregateSolarPanels(limitedCities, departmentsData);
    }
  };

  const aggregateSolarPanels = (
    cities: Project[],
    departments: Departement[],
  ) => {
    const departmentCounts: { [key: string]: number } = {};

    cities.forEach((city) => {
      if (city.departement_code) {
        if (!departmentCounts[city.departement_code]) {
          departmentCounts[city.departement_code] = 0;
        }
        departmentCounts[city.departement_code] += parseInt(
          city.total_count,
          10,
        );
      }
    });

    const departmentsArray: Departement[] = Object.keys(departmentCounts).map(
      (code) => {
        const department = departments.find((dep) => dep.code === code);
        return {
          code,
          name: department ? department.name : "Unknown",
          solar_panel_count: departmentCounts[code],
        };
      },
    );

    setDepartements(departmentsArray);
    console.log(departmentsArray);
  };

  useEffect(() => {
    fetchCitiesAndDepartments();
  }, []);

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
          {cities ? (
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
            })
          ) : (
            <p>Error</p>
          )}
        </div>
      </MapContainer>
      <div>
        {departements.length > 0 && (
          <div>
            <h2 className="text-xl mt-4">
              Nombre de panneaux solaires par département
            </h2>
            <ul>
              {departements.map((departement) => (
                <li key={departement.code}>
                  {departement.name} ({departement.code}):{" "}
                  {departement.solar_panel_count}
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
