// src/app.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { IsString, IsIn } from "class-validator";
import { validate } from "class-validator";

class PreferencesDto {
  @IsString()
  cuisine: string;

  @IsString()
  location: string;

  @IsIn(["Low", "Medium", "High"])
  budget: string;
}

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("restaurants")
  getAllRestaurants() {
    return this.appService.getAllRestaurants();
  }

  @Post("recommend")
  async getRecommendations(@Body() preferences: PreferencesDto) {
    const errors = await validate(preferences);
    if (errors.length > 0) {
      throw new BadRequestException("Invalid preferences");
    }
    return this.appService.getRecommendations(preferences);
  }
}
