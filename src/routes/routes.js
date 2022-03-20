import {Router} from "express"
export const cardsRouter = Router()
cardsRouter
.get('/', (req,res,next)=>{
    res.json({val:"ok"});    
})