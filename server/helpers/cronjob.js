const CronJob = require('cron').CronJob;
const Cart = require('../models/cart')

module.exports = function () {
    // 0 18 * * *
    console.log('masuk');

    new CronJob('0 0 */2 * * *', function () {
        console.log('running cronjob');
        let arr = []
        Cart.find()
            .then((data) => {
                data.forEach(el => {
                    console.log(data,'ini cart');
                    
                    console.log(new Date() - new Date(el.createdAt));
                    
                    if (new Date() - new Date(el.createdAt) >= 7235733) { //2 jam
                        arr.push(el)
                    }
                });
                console.log(arr);
                arr.forEach(el => {
                    Cart.deleteMany({
                        _id: el._id
                    })
                        .then(data => {
                            console.log('deleted data cart success');
                        })
                        .catch(err => {
                            console.log(err);
                        })
                });
            })
            .catch(err => {
                console.log(err);

            })




    }, null, true, 'Asia/Jakarta');
}

