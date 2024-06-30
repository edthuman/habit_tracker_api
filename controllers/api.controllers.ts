import { Request, Response } from "express";
import { selectEndpoints } from "../models/api.models";

function getEndpoints(req: Request, res: Response ){
    
    selectEndpoints().then((endpoints)=>{
        res.status(200).send(endpoints)
    })
}

export { getEndpoints }