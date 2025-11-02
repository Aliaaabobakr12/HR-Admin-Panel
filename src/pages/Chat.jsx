import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { getEmployees } from "../firebase/controllers/firebaseChat";
import EmployeesList from "../components/chat/EmployeesList";

function Chat() {
  const [employeeNames, setEmployeeNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getEmployees((employees) => {
      setEmployeeNames(employees);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-4">
        <EmployeesList employees={employeeNames} isLoading={isLoading} />
        <div className=" bg-white border rounded-md lg:w-[70%] h-[400px] flex items-center justify-center ">
          Click on an employee to start a chat
        </div>
      </div>
    </Layout>
  );
}

export default Chat;
