import { useEffect, useState } from "react";
import { Department } from "../interfaces/interface.ts";
import getData from "../api/getCities.ts";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.tsx";
import { Button } from "./ui/button";
import { Label } from "./ui/label.tsx";
import DepartmentData from "./DepartmentData.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";

const FilterComponent = ({ onSelectFilter }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("Villes");
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const fetchDepartments = async () => {
    const data = await getData("http://localhost:3000/departments");
    if (data) {
      setDepartments(data);
    }
  };

  const handleSelectChange = (value: string) => {
    const department = departments.find((dep) => dep.name === value);
    setSelectedDepartment(department || null);
    onSelectFilter(selectedFilter, department ? department.code : null);
  };

  const handleClickOnReset = () => {
    setSelectedDepartment(null);
    onSelectFilter(selectedFilter, null);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className={"m-7"}>
      <p className={"text-2xl"}>Filtrer par</p>
      <hr className={"my-5"} />
      <RadioGroup
        defaultValue="Villes"
        onValueChange={(value) => {
          setSelectedFilter(value);
          onSelectFilter(value, null);
          setSelectedDepartment(null); // Réinitialiser la sélection du département lors du changement de filtre
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Villes" id="option-one" />
          <Label htmlFor="option-one">Ville</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Départements" id="option-two" />
          <Label htmlFor="option-two">Département</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Régions" id="option-three" />
          <Label htmlFor="option-three">Région</Label>
        </div>
      </RadioGroup>

      {selectedFilter === "Départements" && (
        <>
          <div className={"flex pt-8"}>
            <Select
              onValueChange={handleSelectChange}
              value={selectedDepartment ? selectedDepartment.name : ""}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Départements" />
              </SelectTrigger>
              <SelectContent>
                {departments.length > 0 ? (
                  departments.map((department, index) => (
                    <SelectItem value={department.name} key={index}>
                      {department.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="erreur">
                    Aucun département trouvé
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Button className={"ml-6"} onClick={handleClickOnReset}>
              Reset
            </Button>
          </div>
          {selectedDepartment && (
            <DepartmentData department={selectedDepartment} />
          )}
        </>
      )}
    </div>
  );
};

export default FilterComponent;
