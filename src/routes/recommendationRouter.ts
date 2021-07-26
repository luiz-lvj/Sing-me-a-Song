import express, { Router } from "express";
import {postRecommendationController, randomRecommendationController, recommendationDownvoteController, recommendationUpvoteController, topRecommendationsController} from "../controllers/recommendationController";

export interface recommendationObj{
    id?: number,
    name?: string,
    youtubeLink?: string,
    score?: number
};

const recommendationRouter: Router = express.Router();

recommendationRouter.post("/:id/upvote", recommendationUpvoteController);
recommendationRouter.post("/:id/downvote", recommendationDownvoteController);
recommendationRouter.post("", postRecommendationController);

recommendationRouter.get("/random", randomRecommendationController);
recommendationRouter.get("/top/:amount", topRecommendationsController);

export default recommendationRouter;