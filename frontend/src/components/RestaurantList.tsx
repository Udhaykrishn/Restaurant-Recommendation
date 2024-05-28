import React from "react";
import { FaUtensils, FaMapMarkerAlt, FaMoneyBillAlt } from "react-icons/fa";

interface Restaurant {
  name: string;
  cuisine: string;
  location: string;
  budget: string;
  costRange: string;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(restaurants.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Recommended Restaurants
      </h2>
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((restaurant: Restaurant, index: number) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow dark:bg-gray-800"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-lg flex items-center">
                  <FaUtensils className="mr-2" />
                  <span>Restaurant: {restaurant.name}</span>
                </div>
                <div className="text-gray-700 dark:text-gray-300 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Location: {restaurant.location}</span>
                </div>
              </div>
              <div className="text-gray-700 dark:text-gray-300 flex items-center">
                <FaUtensils className="mr-2" />
                <span>Cuisine: {restaurant.cuisine}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-300 flex items-center">
                <FaMoneyBillAlt className="mr-2" />
                <span>
                  Budget: {restaurant.budget} (${restaurant.costRange})
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recommendations found.</p>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={indexOfLastItem >= restaurants.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
