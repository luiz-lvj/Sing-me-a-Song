import {Request, Response} from "express";
import {deleteRecommendation, postRecommendationRepository, recommendationScore, setRecommendationScore} from "../repositories/recommendationRepository";
import { downvoteScore, isUnvalidScore, isValidYoutubeLink, upvoteScore } from "../services/recommendationService";

export async function postRecommendationController(req: Request, res: Response){
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

export async function recommendationUpvoteController(req: Request, res: Response){
    try{
        const recommendationId: number = parseInt(req.params.id);
        if(isNaN(recommendationId) || recommendationId < 0){
            return res.sendStatus(400);
        }
        const responseScore: [boolean, number] = await recommendationScore(recommendationId);
        if(!responseScore[0]){
            return res.sendStatus(404);
        }
        const score = responseScore[1];
        const newScore:number = upvoteScore(score);
        if(await setRecommendationScore(recommendationId, newScore)){
            return res.sendStatus(201);
        }
        return res.sendStatus(404);
    } catch{
        return res.sendStatus(500);
    }
}

export async function recommendationDownvoteController(req: Request, res: Response){
    try{
        const recommendationId: number = parseInt(req.params.id);
        if(isNaN(recommendationId) || recommendationId < 0){
            return res.sendStatus(400);
        }
        const responseScore: [boolean, number] = await recommendationScore(recommendationId);
        if(!responseScore[0]){
            return res.sendStatus(404);
        }
        const score = responseScore[1];
        if(isUnvalidScore(score)){
            await deleteRecommendation(recommendationId);
            res.status(200);
            return res.send("Recommendation deleted!");
        }
        const newScore = downvoteScore(score);
        if(await setRecommendationScore(recommendationId, newScore)){
            return res.sendStatus(201);
        }

    } catch{
        return res.sendStatus(500);
    }
}
