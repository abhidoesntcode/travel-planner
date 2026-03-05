// File: services/aiService.js

exports.generateItinerary = async({ destination, days, budget, vibe }) => {
    // This mocks the AI response so your app doesn't crash
    return {
        overview: `A custom ${vibe} trip to ${destination}.`,
        schedule: Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            activity: `Morning visit to ${destination} landmarks, followed by a ${vibe} lunch and evening sightseeing.`,
            location: destination
        }))
    };
};