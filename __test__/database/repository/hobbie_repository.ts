import { expect } from 'chai';
import HobbieRepo from '../../../src/database/repository/hobbie_repository';
import { HobbieModel } from '../../../src/database/schema';
import { IHobbie } from '../../../src/database/interface';
import { EHobbiePassion } from '../../../src/database/enum';

jest.mock('../../../src/database/schema'); // Mock the HobbieModel

describe('Hobbie Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createHobbie', () => {
    it('should create a new hobbie', async () => {
      // Mock the HobbieModel.create method to return a mock hobbie
      const mockHobbie: any = {
        _id: 'hobbie_id',
        name: 'Hobbie 1',
        passion_lvl: EHobbiePassion.LOW,
        year: new Date().toISOString(),
      };
      (HobbieModel.create as jest.Mock).mockResolvedValue(mockHobbie);

      const hobbie = await HobbieRepo.createHobbie('Hobbie 1', EHobbiePassion.LOW);

      expect(hobbie).to.deep.equal(mockHobbie);
      expect(HobbieModel.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('getHobbies', () => {
    it('should get a list of hobbies', async () => {
      // Mock the HobbieModel.find method to return a list of mock hobbies
      const mockHobbies: any[] = [
        { _id: 'hobbie_id1', name: 'Hobbie 1', passion_lvl: EHobbiePassion.LOW, year: new Date().toISOString() },
        { _id: 'hobbie_id2', name: 'Hobbie 2', passion_lvl: EHobbiePassion.HIGH, year: new Date().toISOString() },
      ];
      (HobbieModel.find as jest.Mock).mockResolvedValue(mockHobbies);

      const hobbies = await HobbieRepo.getHobbies();

      expect(hobbies).to.deep.equal(mockHobbies);
      expect(HobbieModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteHobbie', () => {
    it('should delete a hobbie', async () => {
      const hobbieId = 'hobbie_id';
      // Mock the HobbieModel.deleteOne method to resolve without errors
      (HobbieModel.deleteOne as jest.Mock).mockResolvedValue({} as any);

      await HobbieRepo.deleteHobbie(hobbieId);

      expect(HobbieModel.deleteOne).toHaveBeenCalledTimes(1);
      expect(HobbieModel.deleteOne).toHaveBeenCalledWith({ _id: hobbieId });
    });
  });

});
