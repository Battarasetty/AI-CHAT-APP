export async function getF1LastRaceWinner() {
    try {
        const res = await fetch("https://ergast.com/api/f1/current/last/results.json")
        const data = await res.json()
        const race = data.MRData.RaceTable.Races[0]

        if (!race) throw new Error("No race found")

        const winner = race.Results[0].Driver
        return { winner: `${winner.givenName} ${winner.familyName}`, raceName: race.raceName }
    } catch (err) {
        return { winner: "Unknown", raceName: "No recent race data available" }
    }

}

