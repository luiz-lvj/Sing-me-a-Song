import express from "express";
import {postRecommendationController, recommendationUpvoteController} from "../controllers/recommendationController";


const recommendationRouter = express.Router();

recommendationRouter.post("/:id/upvote", recommendationUpvoteController)
recommendationRouter.post("", postRecommendationController)

export default recommendationRouter;