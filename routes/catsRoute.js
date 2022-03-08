const express = require('express');
const router = express.Router();    //Router

const Cat = require('../models/Cat')
const notLoggedIn = require('../Middlewares/notLoggedIn')
/*HTTPS requests*/

router.get('/add-cat', notLoggedIn, (req, res) => {
    res.render('pages/cat-form')
})

router.post('/all-cats', notLoggedIn, async (req, res) => {

    console.log('add cat')

    let cat = new Cat(req.body)
    try {
        await cat.save()
    }
    catch(err){
        console.log(err)
        res.redirect('/cats/add-cat')
    }

    res.redirect('/cats/all-cats')
})

router.get('/all-cats', notLoggedIn, async (req, res) => {



    const page = req.query.page  //Getting the page number from the query request
    const limit = 2
    
    const options = {
        page: parseInt(page, 10),
        limit: limit
    }

    const allCats = await Cat.paginate({}, options)    //get all cats
    console.log(allCats)
   
    var pageExists = true
    if (page > allCats.totalPages) {
        pageExists = false
    }
    
    res.render('pages/cats', {
        allCats: allCats,
        pageExists: pageExists
    })
})

router.get('/cat-edit/:id', notLoggedIn, async (req, res) => {
    let cat = await Cat.findById(req.params.id) 

    if(cat == null) redirect('/cats/all-cats')  //if the cat obj wasn't found

    res.render('pages/cat-edit.ejs', {cat:cat})
})

router.put('/cat-edit/:id', notLoggedIn, async (req, res) => {
  
    try {
        await Cat.findByIdAndUpdate(req.params.id, req.body)
    }
    catch(e) {
        console.log(e)
    }
   
    res.redirect('/cats/all-cats')
})

router.delete('/cat-delete/:id', notLoggedIn, async (req, res) => {
    try {
        await Cat.findByIdAndDelete(req.params.id)
        res.redirect('/cats/all-cats')
    }
    catch(e) {
        console.log(e)
        res.redirect('/cats/all-cats')
    }
})

/*Export file*/
module.exports = router;
