/* @flow */
'use strict';
// Libraries imports

const express = require('express');
const bodyParser = require('body-parser');

// Local imports

const movieController = require('./controllers/movie');
const personController = require('./controllers/person');
const commonController = require('./controllers/common');

const database = require('./database');
const searchIndex = require('./search');

const app = express();

app.use(bodyParser.json());

app.get('/movies/:id', movieController.getMovie);
app.put('/movies/:id', movieController.saveMovie);
app.get('/movies/search-index/is-empty', movieController.isSearchIndexEmpty);
app.post('/movies/search-index/populate', movieController.populateSearchIndex);
app.post('/movies/search', movieController.search);

app.get('/people/:id', personController.getPerson);
app.put('/people/:id', personController.savePerson);
app.get('/people/search-index/is-empty', personController.isSearchIndexEmpty);
app.post('/people/search-index/populate', personController.populateSearchIndex);
app.post('/movies/search', personController.search);

app.post('/common/search', commonController.search);

const launchServer = () => {
    app.listen(3000, () => {
        console.log('API listening on port 3000');
    });
}

Promise.all([database.init, searchIndex.init])
.then(launchServer);

console.log('Initializing the API...');
