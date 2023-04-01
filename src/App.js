import { AllRoutes } from "./Routes/AllRoutes";
import "./App.css";
import { SubAdminAllRoutes } from "./Routes/SubAdminAllRoutes";

function App() {

  return (
    <div className="font-fam">
      <AllRoutes />
      <SubAdminAllRoutes />
    </div>
  );
}

export default App;
