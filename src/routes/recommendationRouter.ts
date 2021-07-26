import express from "express";
import postRecommendationController from "../controllers/recommendationController";


const recommendationRouter = express.Router();

recommendationRouter.post("", postRecommendationController)

export default recommendationRouter;