exports.generateItinerary = async(details) => {
    // This is a placeholder. Later, we will put the real Gemini/OpenAI API code here.
    return {
        message: `Plan for ${details.destination}`,
        schedule: [
            { day: 1, activity: "Arrival and local exploration" },
            { day: 2, activity: "Main sightseeing attractions" }
        ],
        tips: "Don't forget to carry a water bottle!"
    };
};