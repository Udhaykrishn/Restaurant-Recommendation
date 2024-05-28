// PreferenceForm.tsx
import React, { useState } from "react";

interface Preferences {
  cuisine: string;
  location: string;
  budget: string;
  costRange?: string;
}

interface PreferenceFormProps {
  onSubmit: (preferences: Preferences) => void;
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit }) => {
  const [preferences, setPreferences] = useState<Preferences>({
    cuisine: "",
    location: "",
    budget: "Medium",
  });
  const [errors, setErrors] = useState<Partial<Preferences>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const validate = () => {
    const newErrors: Partial<Preferences> = {};
    if (!preferences.cuisine) newErrors.cuisine = "Cuisine is required";
    if (!preferences.location) newErrors.location = "Location is required";
    if (!preferences.budget) newErrors.budget = "Budget is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(preferences);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="mb-3 text-start text-2xl text-bold">Filter</h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Cuisine Type:
        </label>
        <input
          type="text"
          name="cuisine"
          value={preferences.cuisine}
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.cuisine && "border-red-500"
          }`}
        />
        {errors.cuisine && (
          <p className="text-red-500 text-xs italic">{errors.cuisine}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Location:
        </label>
        <input
          type="text"
          name="location"
          value={preferences.location}
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.location && "border-red-500"
          }`}
        />
        {errors.location && (
          <p className="text-red-500 text-xs italic">{errors.location}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Budget:
        </label>
        <select
          name="budget"
          value={preferences.budget}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Low">Low ($10-20)</option>
          <option value="Medium">Medium ($50-100)</option>
          <option value="High">High ($100-200)</option>
        </select>
        {errors.budget && (
          <p className="text-red-500 text-xs italic">{errors.budget}</p>
        )}
      </div>
      <div className=" flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Recommendations
        </button>
        <a href="/" className="hover:underline">
          Reset
        </a>
      </div>
    </form>
  );
};

export default PreferenceForm;
