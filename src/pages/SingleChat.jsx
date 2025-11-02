import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { getEmployees } from "../firebase/controllers/firebaseChat";
import EmployeesList from "../components/chat/EmployeesList";
import ChatWindow from "../components/chat/ChatWindow";

function SingleChat() {
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
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        <EmployeesList employees={employeeNames} isLoading={isLoading} />
        <ChatWindow />
      </div>
    </Layout>
  );
}

export default SingleChat;
