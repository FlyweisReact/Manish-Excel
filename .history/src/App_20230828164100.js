import { AllRoutes } from "./Routes/AllRoutes";
import "./App.css";
import { SubAdminAllRoutes } from "./Routes/SubAdminAllRoutes";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div className="font-fam">
      <AllRoutes />
      <SubAdminAllRoutes />
    </div>
  );
}

export default App;
