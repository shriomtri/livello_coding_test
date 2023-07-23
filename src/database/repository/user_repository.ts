import { BadRequestError, InternalError } from "../../core/api_error";
import { Types } from "mongoose";
import { IUser } from "../interface";
import { UserModel } from "../schema";

export default class UserRepo {
  /**
   * Create a new User.
   * @param {string} name - The name of the user.
   * @returns {Promise<IUser>} The newly created user.
   */
  public static async createUser(name: string): Promise<IUser> {
    const userCount = await UserModel.find({ name: name.toLocaleLowerCase() }).countDocuments();
    if (userCount > 0) {
      throw new BadRequestError("User already exists");
    }
    const resp = await UserModel.create({ name } as IUser);
    return resp;
  }

  /**
   * Get all Users.
   * @returns {Promise<IUser[]>} Array of users.
   */
  public static async getUsers(): Promise<IUser[]> {
    return await UserModel.find({}).lean<IUser>();
  }

  /**
   * Delete a User by its ID.
   * @param {string} id - The ID of the user to be deleted.
   * @returns {Promise<void>}
   */
  public static async deleteUser(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  /**
   * Get a User with associated Hobbies by User ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<IUser>} The user object with associated hobbies.
   */
  public static async getUserWithHobbies(id: string): Promise<IUser> {
    return await UserModel.findOne({ _id: Types.ObjectId(id) }).populate("hobbies").exec();
  }

  /**
   * Add a Hobbie to a User's hobbies array by User ID and Hobbie ID.
   * @param {string} id - The ID of the user.
   * @param {string} hobbie_id - The ID of the hobbie to be added to the user's hobbies.
   * @returns {Promise<void>}
   */
  public static async pushHobbie(id: string, hobbie_id: string): Promise<void> {
    await UserModel.findOneAndUpdate({ _id: Types.ObjectId(id) }, { $addToSet: { hobbies: hobbie_id } });
  }

  /**
   * Remove a Hobbie from a User's hobbies array by User ID and Hobbie ID.
   * @param {string} user_id - The ID of the user.
   * @param {string} hobbie_id - The ID of the hobbie to be removed from the user's hobbies.
   * @returns {Promise<void>}
   */
  public static async deleteUserHobbie(user_id: string, hobbie_id: string): Promise<void> {
    await UserModel.findOneAndUpdate({ _id: Types.ObjectId(user_id) }, { $pull: { hobbies: hobbie_id } });
  }
}
