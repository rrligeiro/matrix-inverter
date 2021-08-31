import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MatrixField from './components/MatrixField/MatrixField';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <MatrixField/>
      <Footer/>
    </div>
  );
}

export default App;
