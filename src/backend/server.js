import express from 'express';
import mongodb from 'mongodb';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-Parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://user1:user1@ds151752.mlab.com:51752/crudwithredux';

function validate(data) {
let errors = {};
      if (data.title === '') errors.title = "Can't be Empty";
      if (data.cover === '') errors.cover = "Can't be Empty";
      const isValid = Object.keys(errors).length === 0
      return { errors, isValid};
}

mongodb.MongoClient.connect(dbUrl, function (err, db) {

  app.get('/api/games', (req, res) => {
    db.collection('games').find({}).toArray((err, games) => {
      res.json({ games });
    });
  });

  app.post('/api/games',(req, res) => {
    const {errors, isValid } = validate(req.body);
    if (isValid){
      const { title, cover } = req.body;
      db.collection('games').insert({ title, cover }, (err,result) => {
        if (err){
          res.status(500).json({ errors: { global: "Something Went Wrong.Please Try Again"}});
        } else {
          res.json({ game: result.ops[0]});
        }
      })

    } else {
      res.status(400).json({ errors });
    }
  });

app.put('/api/games/:_id', (req,res) => {
  const {errors, isValid }= validate(req.body);

  if (isValid){
    const {title,cover} = req.body;
    db.collection('games').findOneAndUpdate(
      {_id: new mongodb.ObjectID(req.params._id)},
      { $set: {title,cover}},
      { returnOrignal: false},
      (err,result)=> {
        if (err) {res.status(500).json({ errors:{global: err}}); return }

        res.json({game:result.value});
      }
    );
  } else {
    res.status(400).json({ error });
  }
});



  app.get('/api/games/:_id', (req,res)=> {
    db.collection('games').findOne({_id:new mongodb.ObjectID(req.params._id)}, (err,game)=> {
      res.json({game});
    })
  });

  app.delete('/api/games/:_id', (req,res) => {
    db.collection('games').deleteOne({_id:new mongodb.ObjectID(req.params._id)}, (err,game)=> {
      if (err) { res.status(500).json({ errors: { global: err}}); return;}
      res.json({});
    });
  });
  

  app.use((req,res) =>{
    res.status(404).json({
      errors:{
        global: "Something went wrong. Please try Again"
      }
    });
  }
  )

  app.listen(7000, () => console.log('Server is runing on localhost: 7000'));
})
