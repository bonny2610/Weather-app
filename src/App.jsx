import { WeatherProvider } from './views/context/WeatherContext';
import { ErrorProvider } from './views/context/ErrorContext';
import { HomePage } from './views/HomePage';

function App() {
  return (
    <ErrorProvider>
      <WeatherProvider>
        <HomePage />
      </WeatherProvider>
    </ErrorProvider>
  );
}

export default App;

export const foo = 12;
