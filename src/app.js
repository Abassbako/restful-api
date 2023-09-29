const express = require('express');

const app = express();

const booksRoute = require('../routes/book');

const { ObjectId } = require('mongodb');

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use('/api/v1/books', booksRoute);

const PORT = process.env.PORT || 3000;

const { connectToDb, getDb } = require('./db');
var db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log('app listening on port', PORT);
        })
        db = getDb()
    }
});

app.get('/', (req, res) => {
    let books = []
    db.collection('books')
    .find()
    .sort({ name: 1 })
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch(() => {
        res.status(500).json({error: 'Could not fetch the document'})
    });
});

app.get('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.params.id)})
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the document'})
        })
    } else {
        res.status(500).json({error: 'Not a valid id'})
    }
});

app.patch('/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        
    db.collection('books')
    .updateOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((e) => {
        res.status(500).json({ "error": "Could not update the document" })
    }) 
    } else {
        res.status(500).json({ "error": "Not a valid id" })
    }
});

app.delete('/:id', async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            db.collection('books')
            .deleteOne( { _id: ObjectId(req.params.id) } )
            res.status(200).json(result)
        } else res.status(500).json( { "error": "Not a valid id" } )
    } catch (err) {
        console.error(new Error(err))
        res.status(500).json('This document can not be deleted');
    }
});