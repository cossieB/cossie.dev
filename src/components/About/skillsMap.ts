export function skillsMap(skillLevel: number): [string, string] {
    if (skillLevel >= 8 ) {
        return ["#00ffea", "Excellent"]
    }
    else if (skillLevel >= 6 ) {
        return ["springgreen", "Good"]
    }
    else if (skillLevel >= 4 ) {
        return ["greenyellow", "Average"]
    }
    else if (skillLevel >= 2 ) {
        return ["yellow", "Novice"]
    }
    else  {
        return ["red", "Beginner"]
    }
}