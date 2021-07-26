import { QueryResult } from "pg";
import connection from "../database";

async function postRecommendationRepository(name: string, youtubeLink: string, initialScore: number): Promise<boolean>{
    try{
        await connection.query(`INSERT INTO recommendations(
            name, "youtubeLink", score
        ) VALUES ($1, $2, $3)`, [name, youtubeLink, initialScore]);
        return true;
    } catch{
        return false;
    }
}

export default postRecommendationRepository;