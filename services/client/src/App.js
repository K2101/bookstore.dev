import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import BookDetailScreen from './screens/BookDetailScreen';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-10">
        <Route path="/book/:bookId" component={BookDetailScreen} />
        <Route path="/" component={HomeScreen} exact />
      </main>
    </Router>
  );
}

export default App;
