import { jest } from '@jest/globals';
import { expect } from 'chai';
import request from 'supertest';
import express from 'express';

import HobbiesRoutes from '../../src/routes/hobbie';
import HobbieRepo from '../../src/database/repository/hobbie_repository';
import UserRepo from '../../src/database/repository/user_repository';

jest.mock('../../src/database/repository/hobbie_repository');
jest.mock('../../src/database/repository/user_repository');

const app = express();
app.use(express.json());
app.use('/hobbies', HobbiesRoutes);

describe('Hobbies Routes', () => {
  describe('POST /hobbies', () => {
    it('should create a new hobbie and associate it with the user', async () => {
      // Mock the HobbieRepo.createHobbie method to return a mock hobbie
      const mockHobbie = { _id: 'hobbie_id', name: 'Hobbie 1', passion_lvl: 'LOW' };
      (HobbieRepo.createHobbie as jest.Mock).mockResolvedValue(mockHobbie);

      // Mock the UserRepo.pushHobbie method to resolve without errors
      ( UserRepo.pushHobbie as jest.Mock).mockResolvedValue(undefined);

      const requestBody = { name: 'Hobbie 1', passion_lvl: 'LOW' };
      const response = await request(app).post('/hobbies/user_id').send(requestBody);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'hobbie_created', data: null });
      expect(HobbieRepo.createHobbie).to.have.been.calledOnce;
      expect(UserRepo.pushHobbie).to.have.been.calledOnce;
    });

  });

  describe('DELETE /hobbies', () => {
    it('should delete a hobbie and remove it from the associated user', async () => {
      // Mock the HobbieRepo.deleteHobbie method to resolve without errors
      (HobbieRepo.deleteHobbie as jest.Mock).mockResolvedValue(undefined);

      // Mock the UserRepo.deleteUserHobbie method to resolve without errors
      (UserRepo.deleteUserHobbie as jest.Mock).mockResolvedValue(undefined);

      const requestBody = { user_id: 'user_id', hobbie_id: 'hobbie_id' };
      const response = await request(app).delete('/hobbies').send(requestBody);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'hobbie_deleted', data: null });
      expect(HobbieRepo.deleteHobbie).to.have.been.calledOnce;
      expect(UserRepo.deleteUserHobbie).to.have.been.calledOnce;
    });

  });
});
