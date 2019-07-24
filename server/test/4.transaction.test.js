const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const deleteAllCart = require('../helpers/deleteDataTesting')
const { readFileSync } = require('fs')

chai.use(chaiHttp);
const expect = chai.expect;

let tokenUSer = ""
let idUser = ""
let idProduct = ""

after(function (done) {
    deleteAllCart('transaction', done)
})


describe('Test Transaction', function () {
    before(function (done) {
        chai
            .request(app)
            .post("/users/login")
            .send({ email: 'tviuty@yahoo.com', password: '12345' })
            .then(function (res) {
                idUser = res.body._id
                tokenUSer = res.body.token
                done()
            })
            .catch(function (err) {
                console.log(err);
            })
    })
    describe('GET /transactions', function () {
        it('should be an array with 200 status code(all)', function (done) {
            chai.request(app).get('/transactions/all')
                .set('token', tokenUSer)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it("should be an array with 200 status code(user's)", function (done) {
            chai.request(app).get('/transactions/user')
                .set('token', tokenUSer)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
    })

    describe('POST / transactions', function () {
        before(function (done) {
            const data = {name:"basic shirt", "stock": 5, "price": 2000}
            chai
                .request(app)
                .post("/products")
                .set('token', tokenUSer)
                .send(data)
                .then(function (res) {
                    idProduct = res.body._id
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 201 status code', function (done) {
            chai.request(app).post('/transactions')
                .set('token', tokenUSer)
                .send({ user_id: idUser, product_id: idProduct, total: 50000, count: 1 })
                .then(function (res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('user_id')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('products')
                    expect(res.body).to.have.property('total')
                    expect(res.body).to.have.property('status')
                    idCart = res.body._id
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 401 status code(without token)', function (done) {
            chai.request(app).post('/transactions')
                .send({ user_id: idUser, product_id: idProduct, total: 50000, count: 1 })
                .then(function (res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
    })
})
