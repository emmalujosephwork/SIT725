import { expect } from 'chai';
import sinon from 'sinon';
import UserController from '../controllers/userController.js';
import UserModel from '../models/userModel.js';

function mockRequest(body = {}, params = {}) {
    return { body, params };
}

function mockResponse() {
    return {
        statusCode: 0,
        message: '',
        status(code) {
            this.statusCode = code;
            return this;
        },
        send(msg) {
            this.message = msg;
        },
        json(data) {
            this.message = data;
        },
    };
}

describe('User Controller Tests', () => {
    let consoleErrorStub;

    beforeEach(() => {
        consoleErrorStub = sinon.stub(console, 'error');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should fetch all users', async() => {
        const mockUsers = [
            { name: 'User A', email: 'usera@example.com', phone: '1234567890' },
            { name: 'User B', email: 'userb@example.com', phone: '0987654321' },
        ];
        sinon.stub(UserModel, 'getAllUsers').resolves(mockUsers);

        const req = mockRequest();
        const res = mockResponse();

        await UserController.getUsers(req, res);

        expect(res.statusCode).to.equal(200);
        expect(res.message).to.deep.equal(mockUsers);
    });

    it('should return 500 if getUsers fails', async() => {
        sinon.stub(UserModel, 'getAllUsers').rejects(new Error('Database error'));

        const req = mockRequest();
        const res = mockResponse();

        await UserController.getUsers(req, res);

        expect(res.statusCode).to.equal(500);
        expect(res.message).to.equal('Internal server error');
    });

    it('should add a new user', async() => {
        sinon.stub(UserModel, 'addUser').resolves({ insertedId: '12345' });

        const req = mockRequest({ name: 'New User', email: 'newuser@example.com', phone: '1234567890' });
        const res = mockResponse();

        await UserController.addUser(req, res);

        expect(res.statusCode).to.equal(201);
        expect(res.message).to.equal('User added successfully');
    });

    it('should return 500 if addUser fails', async() => {
        sinon.stub(UserModel, 'addUser').rejects(new Error('Database error'));

        const req = mockRequest({ name: 'Invalid User' });
        const res = mockResponse();

        await UserController.addUser(req, res);

        expect(res.statusCode).to.equal(500);
        expect(res.message).to.equal('Internal server error');
    });

    it('should update a user', async() => {
        sinon.stub(UserModel, 'updateUser').resolves({ modifiedCount: 1 });

        const req = mockRequest({ name: 'Updated User', email: 'updateduser@example.com', phone: '9876543210' }, { id: '12345' });
        const res = mockResponse();

        await UserController.updateUser(req, res);

        expect(res.statusCode).to.equal(200);
        expect(res.message).to.equal('User updated successfully');
    });

    it('should return 500 if updateUser fails', async() => {
        sinon.stub(UserModel, 'updateUser').rejects(new Error('Update failed'));

        const req = mockRequest({}, { id: '12345' });
        const res = mockResponse();

        await UserController.updateUser(req, res);

        expect(res.statusCode).to.equal(500);
        expect(res.message).to.equal('Internal server error');
    });

    it('should delete a user', async() => {
        sinon.stub(UserModel, 'deleteUser').resolves({ deletedCount: 1 });

        const req = mockRequest({}, { id: '12345' });
        const res = mockResponse();

        await UserController.deleteUser(req, res);

        expect(res.statusCode).to.equal(200);
        expect(res.message).to.equal('User deleted successfully');
    });

    it('should return 500 if deleteUser fails', async() => {
        sinon.stub(UserModel, 'deleteUser').rejects(new Error('Delete failed'));

        const req = mockRequest({}, { id: '12345' });
        const res = mockResponse();

        await UserController.deleteUser(req, res);

        expect(res.statusCode).to.equal(500);
        expect(res.message).to.equal('Internal server error');
    });
});