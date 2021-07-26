import connection from "../database";
import { recommendationObj } from "../routes/recommendationRouter";

export async function postRecommendationRepository(name: string, youtubeLink: string, initialScore: number): Promise<boolean>{
    try{
        await connection.query(`INSERT INTO recommendations(
            name, "youtubeLink", score
        ) VALUES ($1, $2, $3)`, [name, youtubeLink, initialScore]);
        return true;
    } catch{
        return false;
    }
}

export async function recommendationScore(recommendationId: number): Promise<[boolean, number]>{
    try{
        const recommendations = await connection.query(`SELECT score FROM recommendations
        WHERE id=$1`, [recommendationId]);
        
        if(recommendations && recommendations.rowCount > 0){
            const score: number = recommendations.rows[0].score;
            return [true, score];
        }
        return [false, -1];
    } catch{
        return [false, -1];
    }
}

export async function setRecommendationScore(recommendationId: number, newScore: number): Promise<boolean>{
    try{
        await connection.query(`UPDATE recommendations
        SET score=$1 WHERE id=$2`, [newScore, recommendationId]);
        return true;
    } catch{
        return false;
    }
}

export async function deleteRecommendation(recommendationId: number): Promise<void>{
    try{
        await connection.query(`DELETE FROM recommendations WHERE
        id=$1`, [recommendationId]);
    } catch{
        console.error("Problems deleting");
    }
}

export async function getAllRecomendations(): Promise<recommendationObj[]>{
    try{
        const recommendation = await connection.query(`SELECT * FROM recommendations`);
        return recommendation.rows;
    } catch{
        return [];
    }
}