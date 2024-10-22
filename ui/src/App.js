import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import RoutesComponent from './routes'; 
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import ToastComponent from './utilities/ToastComponent';


function App() {
  return (
    <PrimeReactProvider>
      <ToastComponent />
      <RoutesComponent /> 
    </PrimeReactProvider>
  );
}

export default App;
