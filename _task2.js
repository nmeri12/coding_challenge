function scheduleTalks(talks) {

    const tracks = [];
    let trackCount = 1;
    let hours = 9;
    let minutes = 0;
    let period = 'AM';

    talks = formatTalks();

    while (talks.length > 0) {
        const track = [];
        let timeRemaind = 180; // 3 hours

        while (timeRemaind > 0 && talks.length > 0) {
            const talk = talks.shift();
            const duration = parseInt(talk.match(/\d+/)[0]);

            if (duration <= timeRemaind) {
                track.push(`${formatTime(hours, minutes, period)} ${talk}`);
                [hours, minutes, period] = incrementTime(hours, minutes, period, duration);
                timeRemaind -= duration;
            }
        }

        track.push("12:00PM Lunch");
        hours = 13;
        minutes = 0;
        period = 'PM';

        while (timeRemaind > 0 && talks.length > 0) {
            const talk = talks.shift();
            const duration = parseInt(talk.match(/\d+/)[0]);

            if (duration <= timeRemaind) {
                track.push(`${formatTime(hours, minutes, period)} ${talk}`);
                [hours, minutes, period] = incrementTime(hours, minutes, period, duration);
                timeRemaind -= duration;
            }
        }

        // Add networking event
        track.push("05:00PM Networking Event");

        tracks.push(`Track ${trackCount}:\n${track.join("\n")}`);
        trackCount++;
        hours = 9;
        minutes = 0;
        period = 'AM';
    }

    return tracks;
}

function incrementTime(hours, minutes, period, duration) {
    let totalMinutes = hours * 60 + minutes + duration;
    hours = Math.floor(totalMinutes / 60) % 12 || 12;
    minutes = totalMinutes % 60;
    period = totalMinutes < 720 ? 'AM' : 'PM';
    return [hours, minutes, period];
}

function formatTime(hours, minutes, period) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${period}`;
}


function formatTalks(){
    return talks.map(talk => {
        if (talk.endsWith("lightning")) {
            return talk.replace("lightning", "5min");
        }
        return talk;
    }).sort((a, b) => {
        const duration_1 = parseInt(a.match(/\d+/)[0]);
        const duration_2 = parseInt(b.match(/\d+/)[0]);
        return duration_2 - duration_1;
    });
}
