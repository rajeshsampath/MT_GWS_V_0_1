/**
 *@description GWS->User Services
 *@author Fahid Mohammad
 *@email mec.fahid@gmail.com
 *@return Object<Router>
 */
//Load dependend modules
let express = require('express'),
	router = express.Router(),
    _ = require('lodash');

let masterModule = rootRequire('lib/Masters');


/*    --------------------------------------------------
    :: Product Master Related Routes Start's Here
-------------------------------------------------- */

// List all products data (Paginated)
router.get('/getProducts', function(req, res){
    let query = {
        page: req.query.page,
        limit: req.query.limit,
        search: req.query.query
    }
    let search = {};
    masterModule.product.getProducts(query, function(response){
        res.json(response);
    });
});

// List all products data (Paginated)
router.post('/getProductById', function(req, res){
    masterModule.product.getProductById(req.body.id, function(response){
        res.json(response);
    });
});

// Add a product 
router.post('/addProduct', function(req, res){
    masterModule.product.addProduct(req, function(response){
        res.json(response);
    });
});

// Update a product
router.post('/updateProductById', function(req, res){
    let data = {
        id:req.body.id,
        product_id: req.body.product_id,
        product_type: req.body.product_type
    }
    masterModule.product.updateProductById(data, function(response){
        res.json(response);
    })
});

// Delete Product By Id (making state as false)
router.post('/deleteProductById', function(req, res){
    let data = {
        id:req.body.id
    }
    masterModule.product.deleteProductById(data, function(response){
        res.json(response);
    })
})


/*    --------------------------------------------------
    :: Product Master Related Routes End's Here
-------------------------------------------------- */

//Export the controller
module.exports = router;
