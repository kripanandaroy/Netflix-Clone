import React from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MovieRow from './components/MovieRow/MovieRow';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { allMovies } from './data/mockData';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div style={{color:'white',background:'#141414',minHeight:'100vh',padding:'20px'}}><h2>Something went wrong.</h2></div>;
    return this.props.children;
  }
}

function AppContent() {
  const { isLoggedIn, loading } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [authPage, setAuthPage] = React.useState('login');

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="loading-screen">
      <h1 className="loading-logo">N</h1>
    </div>
  );

  if (!isLoggedIn) {
    if (authPage === 'signup') {
      return <Signup onSwitchToLogin={() => setAuthPage('login')} />;
    }
    return <Login onSwitchToSignup={() => setAuthPage('signup')} />;
  }

  return (
    <>
      <div className={`loading-screen ${!isLoading ? 'loading-screen--hidden' : ''}`}>
        <h1 className="loading-logo">N</h1>
      </div>
      {!isLoading && (
        <div className="app">
          <Navbar />
          <Hero />
          <MovieRow title="Trending in India 🔥" data={allMovies.trending} />
          <MovieRow title="Bollywood Blockbusters" data={allMovies.bollywood} />
          <MovieRow title="Netflix Indian Originals" data={allMovies.indianOriginals} isLargeRow />
          <MovieRow title="South Indian Hits" data={allMovies.southIndian} />
          <MovieRow title="Continue Watching for You" data={allMovies.continueWatching} isContinueWatching />
          <MovieRow title="Top Picks for You" data={allMovies.trending} />
          <MovieRow title="Award Winning Shows" data={allMovies.bollywood} />
          <Footer />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
