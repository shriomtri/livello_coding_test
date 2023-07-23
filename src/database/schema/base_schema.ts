import mongoose, { Schema } from 'mongoose';

/**
 * BaseSchema function to create a new Mongoose schema with common configurations.
 * @returns {Schema} The base Mongoose schema.
 */
const BaseSchema = (): Schema => {
  return new mongoose.Schema(
    {},
    {
      strict: false, // Allow dynamic fields
      toObject: {
        transform: (doc, ret) => {
          ret.id = ret._id; // Map _id to id during serialization toObject
          delete ret._id;
        },
      },
      toJSON: {
        transform: (doc, ret) => {
          ret.id = ret._id; // Map _id to id during serialization toJSON
          delete ret._id;
        },
      },
    }
  );
};

/**
 * ExtendBaseSchema function to extend a given schema with additional configurations.
 * @param {Schema} schema The schema to be extended.
 * @returns {Schema} The extended Mongoose schema.
 */
export const extendBaseSchema = (schema: Schema): Schema => {
  schema.set('strict', false); // Allow dynamic fields
  schema.set('toObject', { virtuals: true }); // Include virtuals when converting to object
  schema.set('toJSON', { virtuals: true }); // Include virtuals when converting to JSON
  schema.plugin(BaseSchema); // Apply the BaseSchema plugin to the given schema
  return schema;
};
