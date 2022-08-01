import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './components/routing/PageRoutes';
import './App.css';

function App() {
  return (
    <div className="app bg-gray-100 font-family-karla flex min-h-screen">
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
