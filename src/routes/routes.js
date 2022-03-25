import {Router} from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv';
import path from 'path'
let __dirname = path.resolve();
dotenv.config({path:__dirname+'/config/.env'})
mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
})
const cardSchema = new mongoose.Schema({ Id: String, validFrom: Date, validTo: Date, holder: String, code: String});

const clientSchema = new mongoose.Schema({
    Card: cardSchema,
    Limit: Number
});

const Client = mongoose.model('Clients', clientSchema, 'clients');

export const cardsRouter = Router()

cardsRouter
.post('', (req,res,next)=>{
    console.log("hi");
    Client.findOne({'Card.Id': req.body.Id}, (err, found) => {
        if (err) {
            console.log(err);
            res.send("Some error occured!")
        }
        if(found == null){
            res.json({valid: false, error:'Card not found'});
            return;
        }
        let price = parseInt(req.body.Price);
        let cardLimit = found.Limit;
        if(price>cardLimit)
            res.json({valid: false, error:'Card limit exceeded.'});
            
        else
            res.json({valid: true});
        return;
    });
})
.get('', (req,res,next)=>{
    console.log("hi");
    console.log(req.body)
    Client.findOne({'Card.Id': req.body.Id}, (err, found) => {
        if (err) {
            console.log(err);
            res.send("Some error occured!")
        }
        if(found == null){
            res.json({valid: false, error:'Card not found'});
            return;
        }
        let price = parseInt(req.body.Price);
        let cardLimit = found.Limit;

        if(price>cardLimit)
            res.json({valid: false, error:'Card limit exceeded.'});
            
        else{
            found.Limit -= req.body.Price;
            found.save();
            res.json({valid: true, error:''});
        }
        return;
    });
})
.get('/first', async function(req,res,next){
    console.log("First");
    await sleep(5000)
    res.json({value: 'first'});
})
.get('/second', (req,res,next)=>{
    console.log("Second");
    res.json({value: 'second'});
})
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }