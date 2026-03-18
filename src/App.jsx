import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MovieRow from './components/MovieRow/MovieRow';
import Footer from './components/Footer/Footer';
import { allMovies } from './data/mockData';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#141414', minHeight: '100vh' }}>
          <h2>Something went wrong in the App.</h2>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  try {
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
  } catch (error) {
    console.error("Error in AppContent render:", error);
    return <div style={{ color: 'white', background: '#141414', height: '100vh' }}>App Render Error</div>;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
