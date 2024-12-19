import { expect } from 'chai';
import sinon from 'sinon';
import CompanyController from '../controllers/companyController.js';
import CompanyModel from '../models/companyModel.js';

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

describe('Company Controller Tests', () => {
    let consoleErrorStub;

    before(() => {
        console.log('Initializing tests for Company Controller...');
    });

    beforeEach(() => {
        consoleErrorStub = sinon.stub(console, 'error');
    });

    afterEach(() => {
        sinon.restore();
    });

    after(() => {
        console.log('Completed all tests for Company Controller.');
    });

    describe('Testing Asynchronous Code with async/await', () => {
        it('should fetch all companies', async() => {
            const mockCompanies = [
                { name: 'Company A', address: '123 Street', pin: '12345' },
                { name: 'Company B', address: '456 Avenue', pin: '67890' },
            ];
            sinon.stub(CompanyModel, 'getAllCompanies').resolves(mockCompanies);

            const req = mockRequest();
            const res = mockResponse();

            await CompanyController.getCompanies(req, res);

            expect(res.statusCode).to.equal(200);
            expect(res.message).to.deep.equal(mockCompanies);
        });

        it('should return 500 if getCompanies fails', async() => {
            sinon.stub(CompanyModel, 'getAllCompanies').rejects(new Error('Database error'));

            const req = mockRequest();
            const res = mockResponse();

            await CompanyController.getCompanies(req, res);

            expect(res.statusCode).to.equal(500);
            expect(res.message).to.equal('Internal server error');
        });
    });

    describe('Working with Promises', () => {
        it('should add a new company and resolve the promise', async() => {
            sinon.stub(CompanyModel, 'addCompany').returns(Promise.resolve({ insertedId: '12345' }));

            const req = mockRequest({ name: 'New Company', address: '456 Lane', pin: '12345' });
            const res = mockResponse();

            await CompanyController.addCompany(req, res);

            expect(res.statusCode).to.equal(201);
            expect(res.message).to.equal('Company added successfully');
        });

        it('should reject the promise and return 500', async() => {
            sinon.stub(CompanyModel, 'addCompany').returns(Promise.reject(new Error('Promise failed')));

            const req = mockRequest({ name: 'Invalid Company' });
            const res = mockResponse();

            await CompanyController.addCompany(req, res);

            expect(res.statusCode).to.equal(500);
            expect(res.message).to.equal('Internal server error');
        });
    });

    describe('Testing Mocha Hooks', () => {
        let testCompanyId;

        before(async() => {
            testCompanyId = '12345';
            sinon.stub(CompanyModel, 'addCompany').resolves({ insertedId: testCompanyId });
            console.log('Added test company.');
        });

        it('should update a company', async() => {
            sinon.stub(CompanyModel, 'updateCompany').resolves({ modifiedCount: 1 });

            const req = mockRequest({ name: 'Updated Company', address: '789 Updated St', pin: '99999' }, { id: testCompanyId });
            const res = mockResponse();

            await CompanyController.updateCompany(req, res);

            expect(res.statusCode).to.equal(200);
            expect(res.message).to.equal('Company updated successfully');
        });

        it('should delete a company', async() => {
            sinon.stub(CompanyModel, 'deleteCompany').resolves({ deletedCount: 1 });

            const req = mockRequest({}, { id: testCompanyId });
            const res = mockResponse();

            await CompanyController.deleteCompany(req, res);

            expect(res.statusCode).to.equal(200);
            expect(res.message).to.equal('Company deleted successfully');
        });

        after(async() => {
            sinon.restore();
            console.log('Cleaned up test company data.');
        });
    });
});