import { jest } from '@jest/globals';
import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import UserRoutes from '../../src/routes/user';
import UserRepo from '../../src/database/repository/user_repository';

jest.mock('../../src/database/repository/user_repository');

const app = express();
app.use(express.json());
app.use('/users', UserRoutes);

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should get a list of users', async () => {
      // Mock the UserRepo.getUsers method to return a list of mock users
      const mockUsers = [{ _id: 'user_id1', name: 'User 1' }, { _id: 'user_id2', name: 'User 2' }];
      (UserRepo.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app).get('/users');

      expect(response.status).to.equal(200);
      expect(response.body.data).to.deep.equal(mockUsers);
      expect(UserRepo.getUsers).to.have.been.calledOnce;
    });

  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      // Mock the UserRepo.createUser method to return a mock user
      const mockUser = { _id: 'user_id', name: 'User 1' };
      (UserRepo.createUser as jest.Mock).mockResolvedValue(mockUser);

      const requestBody = { name: 'User 1' };
      const response = await request(app).post('/users').send(requestBody);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'user_created', data: mockUser });
      expect(UserRepo.createUser).to.have.been.calledOnce;
    });

  });

  describe('GET /users/:user_id/hobbies', () => {
    it('should get a user with associated hobbies', async () => {
      // Mock the UserRepo.getUserWithHobbies method to return a mock user with hobbies
      const mockUserWithHobbies = {
        _id: 'user_id',
        name: 'User 1',
        hobbies: [{ _id: 'hobbie_id1', name: 'Hobbie 1', passion_lvl: 'LOW' }],
      };
      (UserRepo.getUserWithHobbies as jest.Mock).mockResolvedValue(mockUserWithHobbies);

      const response = await request(app).get('/users/user_id/hobbies');

      expect(response.status).to.equal(200);
      expect(response.body.data).to.deep.equal(mockUserWithHobbies);
      expect(UserRepo.getUserWithHobbies).to.have.been.calledOnce;
    });

  });

  describe('DELETE /users', () => {
    it('should delete a user', async () => {
      // Mock the UserRepo.deleteUser method to resolve without errors
      (UserRepo.deleteUser as jest.Mock).mockResolvedValue(undefined); // <-- Explicitly provide the value

      const requestBody = { user_id: 'user_id' };
      const response = await request(app).delete('/users').send(requestBody);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'user_deleted', data: null });
      expect(UserRepo.deleteUser).to.have.been.calledOnce;
    });

  });
});
