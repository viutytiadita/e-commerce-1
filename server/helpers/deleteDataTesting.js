
let objectModel = {
    user: require("../models/user"),
    product: require("../models/product"),
    cart: require("../models/cart"),
    transaction: require("../models/transaction")
}
module.exports = function (modelName, done) {

    if (process.env.NODE_ENV === 'test') {
        console.log('masuk delete testing');

        objectModel[modelName].deleteMany({})
            .then(() => {
                console.log(`${modelName} collection deleted!`);
                done()
            })
            .catch(function (err) {
                console.log(err);
            });

    }
}