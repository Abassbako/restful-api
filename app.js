const express = require('express');

const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/v1/books', bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app listening on port ${ PORT }`);
});