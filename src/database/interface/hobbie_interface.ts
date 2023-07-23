import { EHobbiePassion } from "../enum";
import { Document } from "mongoose";

export interface IHobbie extends Document {
    id?: string;
    name: string;
    passion_lvl: EHobbiePassion;
    year: string;
    createdAt: string | any;
    updatedAt: string | any;
  }
