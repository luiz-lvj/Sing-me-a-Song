export function isValidYoutubeLink(link: string): boolean{
    const regex: RegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return regex.test(link);
}
export function upvoteScore(score: number): number{
    return score +1;
}