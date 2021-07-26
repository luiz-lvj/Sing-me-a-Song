import express from "express";
import {postRecommendationController, recommendationDownvoteController, recommendationUpvoteController} from "../controllers/recommendationController";


const recommendationRouter = express.Router();

recommendationRouter.post("/:id/upvote", recommendationUpvoteController)
recommendationRouter.post("/:id/downvote", recommendationDownvoteController)
recommendationRouter.post("", postRecommendationController)

export default recommendationRouter;