const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
const database = new Datastore('database.db');
database.loadDatabase();
//database.insert({name: 'Radtke', status: 'married'});
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
    
} );

app.post('/api', (request, response) => {
    //console.log(request.body);
    
    //response.end;
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    
    database.insert(data);
    console.log(database);
    response.json({
        status: 'success',
        latitude: data.lat,
        time: timestamp,
        longitude: data.lon
    });
});