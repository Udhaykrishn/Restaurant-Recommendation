// src/app.service.ts
import { Injectable } from "@nestjs/common";
import * as data from "./data.json";

@Injectable()
export class AppService {
  private readonly restaurants = data;

  getAllRestaurants() {
    console.log(this.restaurants);
    return this.restaurants;
  }

  getRecommendations(preferences: {
    cuisine: string;
    location: string;
    budget: string;
  }) {
    const { cuisine, location, budget } = preferences;
    return this.restaurants.filter((restaurant) => {
      return (
        (!cuisine ||
          restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())) &&
        (!location ||
          restaurant.location.toLowerCase().includes(location.toLowerCase())) &&
        (!budget || restaurant.budget.toLowerCase() === budget.toLowerCase())
      );
    });
  }
}
