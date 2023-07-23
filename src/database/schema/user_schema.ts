import { Schema, model } from 'mongoose';
import { extendBaseSchema } from './base_schema';
import { IUser } from '../interface';
import { HOBBIE_COLLECTION_NAME } from './hobbie_schema';

export const USER_COLLECTION_NAME = 'users';
export const USER_DOCUMENT_NAME = 'user';

// Define the User schema and extend it from the base schema
const UserSchema = extendBaseSchema(
  new Schema<IUser>(
    {
      name: {
        type: String,
        required: true,
      },
      hobbies: [{
        type: Schema.Types.ObjectId,
        ref: HOBBIE_COLLECTION_NAME,
      }],
    },
    {
      versionKey: false, // Do not include the "__v" field in the documents
    }
  )
);

// Export the User schema and model
export { UserSchema };
export const UserModel = model<IUser>(USER_DOCUMENT_NAME, UserSchema, USER_COLLECTION_NAME);
