import { recommendationObj } from "../routes/recommendationRouter";

export function isValidYoutubeLink(link: string): boolean{
    const regex: RegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return regex.test(link);
}
export function upvoteScore(score: number): number{
    return score +1;
}

export function downvoteScore(score: number): number{
    return score -1;
}

export function isUnvalidScore(score:number): boolean{
    if(score <= -5){
        return true;
    }
    return false;
}
export function getRandomRecommendation(recommendations: recommendationObj[]): recommendationObj{
    const highRecommended = recommendations.filter((recommendation) =>{
        if(recommendation.score > 10){
            return true;
        }
        return false;
    });
    const lowRecommended = recommendations.filter(recommendation => {
        if(recommendation.score <= 10){
            return true;
        }
        return false;
    });
    let arrayOfRecommendations: recommendationObj[] = [];
    if(highRecommended.length <= 0 && lowRecommended.length <= 0){
        return {}
    }
    else if(highRecommended.length <=0 ){
        arrayOfRecommendations = lowRecommended;
    }
    else if(lowRecommended.length <= 0){
        arrayOfRecommendations = highRecommended;
    }
    else{
        const randomNumber: number = Math.floor(Math.random() * 10);
        if(randomNumber < 7){
            arrayOfRecommendations = highRecommended;
        }
        else{
            arrayOfRecommendations = lowRecommended;
        }
    }
    const randomIndex: number = Math.floor(Math.random()*arrayOfRecommendations.length);

    return arrayOfRecommendations[randomIndex];
}