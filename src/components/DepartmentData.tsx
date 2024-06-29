import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Department } from "../interfaces/interface.ts";

const DepartmentData = ({ department }: { department: Department }) => {
  return (
    <div className={"pt-6"}>
      <Card>
        <CardHeader>
          <CardTitle>{department.name}</CardTitle>
          <CardDescription>
            Taux d'ensoleillement : {department.sun_rate || "N/A"} jours / 365
            jours par an
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Ce département contient {department.solar_panel_count || "N/A"}{" "}
            panneaux solaires
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentData;
