import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default DepartmentData;
