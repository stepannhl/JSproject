const levelsData ={
    "firstLevel": {
        "levelName": "firstLevel",
        "nextLevelName": "secondLevel",
        "title": "Аим тренажер",
        "figureSize": {
            "min": 50,
            "max": 100
        },
        "timerTime": 10
    },
    "secondLevel": {
        "levelName": "secondLevel",
        "nextLevelName": "thirdLevel",
        "title": "клики",
        "figureSize": {
            "min": 50,
            "max": 100
        },
        "timerTime": 15
    },
    "thirdLevel": {
        "levelName": "thirdLevel",
        "title": "контейнеры",
        "figureSize": {
            "min": 50,
            "max": 100
        },
        "timerTime": 10
    }
}

export class GameService {

    static ELevelStatus = {
        LOCK: 'lock',
        OPEN: 'open',
        COMPLETE: 'complete',
    };

    static getLevelData = (levelName) => {
        const levelData = levelsData[levelName];

        return levelData;
    }

    static getLevelTitle = (levelName) => {
        const levelTitle = levelsData[levelName].title

        return levelTitle;
    }

    static getRating = (user) => {
        const levels  = this.getLevelsRating(user);
        return levels.reduce((prev, level) => {
            return prev += level.rating;
        }, 0);
    }

    static complitedLevelsAmount = (user) => {
        const { levels } = user;
        const complitedLevels = Object.keys(levels).filter(key => levels[key].status === this.ELevelStatus.COMPLETE);
        return complitedLevels.length;
    }
    
    static getLevelsRating = (user) => {
        return Object.keys(user.levels).map(key=>{
            return {name:key, rating:user.levels[key].rating}
        })
    }

    static compliteLevel = (user, levelName, rating) => {
        user.levels[levelName].status = this.ELevelStatus.COMPLETE;
        user.levels[levelName].rating = rating;

        return user;
    }

    static unlockLevel = (user, levelName) => {
        if (levelName&&user.levels[levelName].status === this.ELevelStatus.LOCK) {
            user.levels[levelName].status = this.ELevelStatus.OPEN;
        }

        return user;
    }

}