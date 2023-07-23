import { BadRequestError, InternalError } from "../../core/api_error";
import { Types } from "mongoose";
import { IHobbie } from "../interface";
import { HobbieModel } from "../schema";
import { EHobbiePassion } from "../enum";

export default class HobbieRepo {
  /**
   * Create a new Hobbie.
   * @param {string} name - The name of the hobbie.
   * @param {EHobbiePassion} passion_lvl - The passion level of the hobbie.
   * @returns {Promise<IHobbie>} The newly created hobbie.
   */
  public static async createHobbie(name: string, passion_lvl: EHobbiePassion): Promise<IHobbie> {
    const hobbie = await HobbieModel.create({ name, passion_lvl, year: new Date().toISOString() } as IHobbie);
    return hobbie;
  }

  /**
   * Get all Hobbies.
   * @returns {Promise<IHobbie[]>} Array of hobbies.
   */
  public static async getHobbies(): Promise<IHobbie[]> {
    return await HobbieModel.find({}).lean<IHobbie>();
  }

  /**
   * Get Hobbies by their IDs.
   * @param {Types.ObjectId[]} ids - Array of Hobbie IDs.
   * @returns {Promise<IHobbie[]>} Array of hobbies with the provided IDs.
   */
  public static async getHobbiesByIds(ids: Types.ObjectId[]): Promise<IHobbie[]> {
    return (await HobbieModel.find({ _id: { $in: ids } }).lean()) as IHobbie[];
  }

  /**
   * Delete a Hobbie by its ID.
   * @param {string} id - The ID of the hobbie to be deleted.
   * @returns {Promise<void>}
   */
  public static async deleteHobbie(id: string): Promise<void> {
    await HobbieModel.deleteOne({ _id: Types.ObjectId(id) });
  }
}
