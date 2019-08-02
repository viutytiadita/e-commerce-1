const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const deleteAllProduct = require('../helpers/deleteDataTesting')
const { readFileSync } = require('fs')

chai.use(chaiHttp);
const expect = chai.expect;

let tokenUSer = ""
let idProduct = ""

after(function (done) {
    deleteAllProduct('product', done)
})

console.log(tokenUSer);
console.log('ini token');


describe('CRUD products', function () {
    this.timeout(10000)
    before(function (done) {
        console.log("masuk before")
        chai
            .request(app)
            .post("/users/login")
            .send({ email: 'andri@yahoo.com', password: '12345' })
            .then(function (res) {

                tokenUSer = res.body.token

                roleUser = res.body.role
                done()
            })
            .catch(function (err) {
                console.log(err);
            })
    })

    describe('GET / products', function () {
        it('should be an array with 200 status code', function (done) {
            chai.request(app).get('/products')
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

    describe('POST / products', function () {
        it('should be upload file with 201 status code', function (done) {
            console.log(tokenUSer, "======")
            chai.request(app).post('/products')
                .set('token', tokenUSer)
                .attach("image", readFileSync('./test/pic-testing/test.png'), "test.png")
                .field("name", "basic shirt")
                .field("stock", "5")
                .field("price", "80000")
                .then(function (res) {
                    console.log(res.body)
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('picture')
                    expect(res.body.price).to.be.a('number')
                    idProduct = res.body._id

                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 400 status code(empty body)', function (done) {
            chai.request(app).post('/products')
                .set('token', tokenUSer)
                .send({})
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 401 status code(without token)', function (done) {
            const data = {name:"basic shirt", "stock": 5, "price": 2000}
            chai.request(app).post('/products')
                .send(data)
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
        it('should be an object with 400 status code(minus price and stock)', function (done) {
            const data = {name:"basic shirt", "stock": -5, "price": -2000}
            chai.request(app).post('/products')
                .set('token', tokenUSer)
                .send(data)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
    })
    
    describe('Edit / products', function () {
        it('should be upload file with 200 status code', function (done) {
            chai.request(app).put(`/products/${idProduct}`)
                .set('token', tokenUSer)
                .attach("image", readFileSync('./test/pic-testing/test.png'), "test.png")
                .field("name", "basic shirt")
                .field("stock", "5")
                .field("price", "80000")
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('price')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 400 status code(empty body)', function (done) {
            chai.request(app).put(`/products/${idProduct}`)
                .set('token', tokenUSer)
                .send({})
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
        it('should be an object with 401 status code(without token)', function (done) {
            const data = {name:"basic shirt", "stock": 5, "price": 2000}
            chai.request(app).put(`/products/${idProduct}`)
                .send(data)
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
        it('should be an object with 400 status code(if user input minus price-stock)', function (done) {
            const data = {name:"basic shirt", "stock": -5, "price": -2000}
            chai.request(app).put(`/products/${idProduct}`)
                .set('token', tokenUSer)
                .send(data)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                })
        })
    })
    describe('Delete / products', function () {
        it('should be an object with 200 status code', function (done) {
            chai.request(app).delete(`/products/${idProduct}`)
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
            chai.request(app).delete(`/products/${idProduct}`)
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

module.exports = idProduct