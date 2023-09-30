const { Router } = require('express');

const router = Router();

const books = [
    {
        "_id": "642617fdd6d66b917f569663",
        "name": "Angular",
        "author": "Precious Newton",
        "year": 2017,
        "genres": [
            "Programming",
            "Documentation"
        ],
        "rating": 5
    },
    {
        "_id": "6428f25f66b05c38b41fb05c",
        "name": "C#",
        "author": "Pablo leichsteiner",
        "rating": 10,
        "year": 1995
    },
    {
        "_id": "6428f25f66b05c38b41fb05d",
        "name": "C++",
        "author": "Postman",
        "year":1972,
        "rating": 6,
        "genres": [
            "Programming",
            "Fantasy"
        ]
    },
    {
        "_id": "6429154666b05c38b41fb063",
        "name": "Django Tutorial",
        "author": "Ryan Dahl",
        "year": 2001,
        "genres": [
            "Programming",
            "Real Life Project"
        ]
    },
    {
        "_id": "6428ec41d6a81b866542e7b1",
        "name": "HTML and CSS",
        "author": "Arnold Zuckerberg",
        "year": 2010,
        "pages": 2500,
        "genres": [
            "Documentation",
            "Programming"
        ],
        "rating": 3.5
    },
    {
        "_id": "6428ee56d6a81b866542e7b2",
        "name": "HTML and CSS",
        "author": "Arnold Zuckerberg",
        "year": 2010,
        "pages": 2500,
        "genres": [
            "Documentation",
            "Programming"
        ],
        "rating": 3.5
    },
    {
        "_id": "642617fdd6d66b917f569664",
        "name": "Introduction to JavaScript",
        "author": "Blastina Lokonsa",
        "year": 2009,
        "genres": [
            "Documentation"
        ]
    },
    {
        "_id": "642617fdd6d66b917f569665",
        "name": "Kotlin Development",
        "author": "Precious Newton",
        "year": 2009,
        "genres": [
            "Programming"
        ]
    },
    {
        "_id": "6428ee56d6a81b866542e7b3",
        "name": "Kotlin Programming Language",
        "author": "Bako Abdullahi",
        "year": 2017,
        "pages": 900,
        "rating": 4.5
    },
    {
        "_id": "6428f4a966b05c38b41fb061",
        "name": "Learn AI python",
        "author": "Austin Gravenverch",
        "year": 1878,
        "rating": 9.5
    },
    {
        "_id": "6428f4a966b05c38b41fb060",
        "name": "Learn Scala",
        "author": "Jack Mason",
        "year": 2018,
        "rating": 7.5
    },
    {
        "_id": "641e57310c4c8cb0e5758bde",
        "name": "Node.js",
        "author": "Ryan Dahl",
        "year": 2009,
        "rating": 8
    },
    {
        "_id": "64262b64d6d66b917f569667",
        "name": "Php",
        "author": "Ryan Dahl",
        "year": 2004,
        "pages": 1000,
        "genres": [
            "Programming"
        ],
        "rating": 10
    },
    {
        "_id": "641e580f0c4c8cb0e5758bdf",
        "name": "Python",
        "author": "Guido Van Rossum",
        "year": 1981,
        "rating": 5.5
    },
    {
        "_id": "644e76a8dc0834c7e3992613",
        "name": "Scala",
        "author": "Olushola Bako",
        "year": 1900
    },
    {
        "_id": "644e754cdc0834c7e3992612",
        "name": "Swift",
        "author": "Bako Abass",
        "year": 1219,
        "genres": [
            "programming"
        ]
    },
    {
        "_id": "64263527d6d66b917f569668",
        "name": "asp.net",
        "year": 2005,
        "genres": [
            "Programming",
            "Documentation",
            "Encyclopedia"
        ]
    }
];

router.get('/', (req, res) => {
    res.send(books);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
    books.push(req.body);
});

router.get('/:name', (req, res) => {
    const { name } = req.params;
    const booksName = books.find((b) => b.name === name);
    res.send(booksName);
});

router.get('/', (req, res) => {
    const { rating } = req.query;
    const parsedRating = parseInt(rating);
    if (!isNaN(parsedRating)) {
        const filteredRating = books.filter((b) => b.rating <= parsedRating);
        res.send(filteredRating);
    } else res.send(books);
});

module.exports = router;