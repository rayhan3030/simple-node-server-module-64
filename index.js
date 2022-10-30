const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('simple node Yayy');
});

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: 'shabana@gmail.com' },
    { id: 2, name: 'Sabnoor', email: 'Shabnoor@gmail.com' },
    { id: 3, name: 'Sabila', email: 'Shabila@gmail.com' }
];
// username: dbuser1
// password: annRgvtufzkKmTMO




const uri = "mongodb+srv://dbuser1:annRgvtufzkKmTMO@cluster0.hktfmxy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('user');
        // const user = { name: 'Nahiya Mahi', email: 'neahi@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally {

    }

}

run().catch(err => console.log(err))


// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         // filter users by query
//         const search = req.query.name;
//         const filtered = users.filter(user => user.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
// })


// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// })


app.listen(port, () => {
    console.log(`simple node server running on port ${port}`)
})