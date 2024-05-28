import React, { useState, useEffect } from "react";
import axios from "axios";
import PreferenceForm from "./components/PreferenceForm";
import RestaurantList from "./components/RestaurantList";

interface Preferences {
  cuisine: string;
  location: string;
  budget: string;
  costRange?: string;
}

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/restaurants")
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  const getRecommendations = (preferences: Preferences) => {
    axios
      .post("http://localhost:3000/api/recommend", preferences)
      .then((response) => {
        setRestaurants(response.data);
        setCurrentPage(1);
      })
      .catch((error) =>
        console.error("Error fetching recommendations:", error)
      );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-4">
              Restaurant Recommendation App
            </h1>
            <button
              onClick={toggleDarkMode}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Toggle Light Mode
            </button>
          </div>
          <div className="max-w-md mx-auto">
            <PreferenceForm onSubmit={getRecommendations} />
          </div>
          <div className="mt-8">
            {loading ? (
              <>Loading...</>
            ) : (
              <RestaurantList
                restaurants={restaurants}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={5}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
