import {Request, Response} from "express";
import postRecommendationRepository from "../repositories/recommendationRepository";
import { isValidYoutubeLink } from "../services/recommendationService";

async function postRecommendationController(req: Request, res: Response){
    try{
        if(req.body.name === undefined || req.body.youtubeLink === undefined){
            return res.sendStatus(400);
        }
        const name: string = req.body.name;
        const youtubeLink: string = req.body.youtubeLink;
        const initialScore: number = 0;
        if(!isValidYoutubeLink(youtubeLink)){
            return res.sendStatus(400);
        }
        await postRecommendationRepository(name, youtubeLink, initialScore);
        return res.sendStatus(201);
    } catch{
        return res.sendStatus(500);
    }
}

export default postRecommendationController;