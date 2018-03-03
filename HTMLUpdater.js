// const pug = require('pug');

module.exports = {
    updateCurrently:function(currently)
    {
        res.render('index.pug', currently);
    }
};