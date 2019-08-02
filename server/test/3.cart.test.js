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
let idCart = ""

after(function (done) {
    deleteAllCart('cart', done)
})


describe('Test Cart', function () {
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
    describe('GET /carts', function () {
        it('should be an array with 200 status code', function (done) {
            chai.request(app).get('/carts')
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
    
    describe('POST / carts', function () {
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
            chai.request(app).post('/carts')
                .set('token', tokenUSer)
                .send({ user_id: idUser, product_id: idProduct, count: 1 })
                .then(function (res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('user_id')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('product_id')
                    expect(res.body).to.have.property('count')
                    idCart = res.body._id
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 401 status code(without token)', function (done) {
            chai.request(app).post('/carts')
                .send({ user_id: idUser, product_id: idProduct, count: 1 })
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
    describe('Delete /carts/', function () {
        it('should be an object with 200 status code', function (done) {
            chai.request(app).delete(`/carts/${idCart}`)
                .set('token', tokenUSer)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 401 status code(without token)', function (done) {
            chai.request(app).delete(`/carts/${idCart}`)
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