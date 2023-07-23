import { Schema, model } from 'mongoose';
import { extendBaseSchema } from './base_schema';
import { IHobbie } from '../interface';
import { EHobbiePassion } from '../enum';

export const HOBBIE_COLLECTION_NAME = 'hobbies';
export const HOBBIE_DOCUMENT_NAME = 'hobbie';

// Define the Hobbie schema and extend it from the base schema
const HobbieSchema = extendBaseSchema(
  new Schema<IHobbie>(
    {
      name: {
        type: String,
        required: true,
      },
      passion_lvl: {
        type: String,
        enum: [EHobbiePassion.LOW, EHobbiePassion.MEDIUM, EHobbiePassion.HIGH, EHobbiePassion.VERY_HIGH],
        default: EHobbiePassion.LOW,
      },
      year: {
        type: Date,
        required: true,
      },
    },
    {
      versionKey: false, // Do not include the "__v" field in the documents
    }
  )
);

// Export the Hobbie schema and model
export { HobbieSchema };
export const HobbieModel = model<IHobbie>(HOBBIE_DOCUMENT_NAME, HobbieSchema, HOBBIE_COLLECTION_NAME);
