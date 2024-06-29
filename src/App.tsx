import { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent.tsx";
import Header from "./components/Header.tsx";
import "./App.css";
import FilterComponent from "./components/FilterComponent.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import getData from "./api/getCities";
import { Department, City } from "./interfaces/interface.ts";
import { departmentsCoordinates } from "./departmentsCoordinates"; // Importer la table des coordonnées

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    [],
  );
  const [selectedFilter, setSelectedFilter] = useState("Villes");

  useEffect(() => {
    const fetchCitiesAndDepartments = async () => {
      const citiesData: City[] = await getData("http://localhost:3000/cities");
      const departmentsData: Department[] = await getData(
        "http://localhost:3000/departments",
      );

      if (citiesData && departmentsData) {
        const limitedCities = citiesData.slice(0, 10000);
        setCities(limitedCities);
        setDepartments(departmentsData);
        setFilteredCities(limitedCities); // Default to showing cities
      }
    };

    fetchCitiesAndDepartments();
  }, []);

  const aggregateSolarPanels = (cities: City[], departments: Department[]) => {
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

    const departmentsArray: Department[] = Object.keys(departmentCounts).map(
      (code) => {
        const department = departments.find((dep) => dep.code === code);
        const coordinates = departmentsCoordinates[code] || [
          46.603354, 1.888334,
        ]; // Coordonnées par défaut si non trouvées
        return {
          code,
          name: department ? department.name : "Unknown",
          solar_panel_count: departmentCounts[code],
          coordinates: `${coordinates[0]},${coordinates[1]}`, // Convertir en chaîne de caractères
        };
      },
    );

    setFilteredDepartments(departmentsArray);
    console.log(filteredDepartments);
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === "Villes") {
      setFilteredCities(cities);
    } else if (filter === "Départements") {
      aggregateSolarPanels(cities, departments);
    } else if (filter === "Régions") {
      // Implement region filtering logic
    }
  };

  useEffect(() => {
    handleSelectFilter(selectedFilter);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <div className="flex flex-row items-start justify-start h-screen w-screen">
        <div className="w-3/4 h-full">
          <MapComponent
            cities={filteredCities}
            departments={filteredDepartments}
            selectedFilter={selectedFilter}
          />
        </div>
        <div className="w-1/4 h-full">
          <FilterComponent onSelectFilter={handleSelectFilter} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
