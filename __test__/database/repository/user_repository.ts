import { expect } from 'chai';
import UserRepo from '../../../src/database/repository/user_repository';
import { UserModel } from '../../../src/database/schema';
import { IUser } from '../../../src/database/interface';

jest.mock('../../../src/database/schema'); // Mock the UserModel

describe('User Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Mock the UserModel.create method to return a mock user
      const mockUser = { _id: 'user_id', name: 'User 1', hobbies: [] };
      (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

      const user = await UserRepo.createUser('User 1');

      expect(user).to.deep.equal(mockUser);
      expect(UserModel.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestError if user already exists', async () => {
      // Mock the UserModel.find method to return a user count greater than 0
      (UserModel.find as jest.Mock).mockReturnValue({ count: jest.fn().mockResolvedValue(1) } as any);

      // Expect the function to throw BadRequestError
      await expect(UserRepo.createUser('User 1')).to.be.rejectedWith('User already exists');

      expect(UserModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUsers', () => {
    it('should get a list of users', async () => {
      // Mock the UserModel.find method to return a list of mock users
      const mockUsers: any[] = [
        { _id: 'user_id1', name: 'User 1', hobbies: [] },
        { _id: 'user_id2', name: 'User 2', hobbies: [] },
      ];
      (UserModel.find as jest.Mock).mockResolvedValue(mockUsers);

      const users = await UserRepo.getUsers();

      expect(users).to.deep.equal(mockUsers);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 'user_id';
      // Mock the UserModel.findByIdAndDelete method to resolve without errors
      (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue({} as any);

      await UserRepo.deleteUser(userId);

      expect(UserModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
    });
  });

});
