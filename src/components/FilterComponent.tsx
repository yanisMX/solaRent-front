import { useEffect, useState } from "react";
import { Departement } from "../interfaces/interface.ts";
import getData from "../api/getCities.ts";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.tsx";
import { Label } from "./ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";

const FilterComponent = ({ onSelectDepartment }) => {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [selectedDepartement, setSelectedDepartement] =
    useState<Departement | null>(null);

  const fetchDepartements = async () => {
    const data: Departement[] = await getData(
      "http://localhost:3000/departments",
    );

    if (data) {
      // Déduplication des départements
      const uniqueDepartements = data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name),
      );

      setDepartements(uniqueDepartements);
    }
  };

  const handleSelectChange = (value: string) => {
    const departement = departements.find((dep) => dep.name === value);
    setSelectedDepartement(departement || null);
    onSelectDepartment(departement ? departement.code : null);
  };

  useEffect(() => {
    fetchDepartements();
  }, []);

  return (
    <div className={" m-7"}>
      <p className={"text-2xl"}>Filtrer par </p>
      <hr className={"my-5"} />
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Villes" id="option-one" />
          <Label htmlFor="option-one">Ville</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Départements" id="option-two" />
          <Label htmlFor="option-two">Département</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Régionse" id="option-three" />
          <Label htmlFor="option-three">Région</Label>
        </div>
      </RadioGroup>

      <div className={"pt-8"}>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Départements" />
          </SelectTrigger>
          <SelectContent>
            {departements.length > 0 ? (
              departements.map((departement, index) => (
                <SelectItem value={departement.name} key={index}>
                  {departement.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="erreur">Aucun département trouvé</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        {selectedDepartement?.sun_rate ? (
          <div className={"pt-5"}>
            <p>Taux d'ensoleillement en {selectedDepartement.name}: </p>
            <span>{selectedDepartement.sun_rate} / 365 jours</span>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
