export const useRating=(id, startRating, callback)=>{
    let rating = {
        value: startRating
    }
    const ratingElement = document.getElementById(id)
    ratingElement.innerText = startRating
    const updateRating = (newRating)=> {
        rating.value += newRating
        ratingElement.innerText = rating.value
        callback&&callback()
    }
        
    return [rating, updateRating]
}