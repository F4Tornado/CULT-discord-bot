function runAV(candidatesa, votesa) {
    let votesCounted = {};
    let candidates = JSON.parse(JSON.stringify(candidatesa));
    let votes = JSON.parse(JSON.stringify(votesa));
    let ret;
    for (let i = 0; i < candidates.length; i++) {
        votesCounted[candidates[i]] = 0;
    }

    function countVotes() {
        for (let i = 0; i < Object.keys(votesCounted).length; i++) {
            if (candidates.indexOf(Object.keys(votesCounted)[i])) {
                delete votesCounted[Object.keys(votesCounted)[i]];
            }
            votesCounted[Object.keys(votesCounted)[i]] = 0;
        }

        for (let i = 0; i < votes.length; i++) {
            votesCounted[votes[i][0]]++;
        }

        console.log("Counted votes, ", votesCounted);

        eliminate();
    }

    function eliminate() {
        let keys = Object.keys(votesCounted);
        let minScore = { key: "", votes: Infinity };

        for (let i = 0; i < keys.length; i++) {
            if (votesCounted[keys[i]] < minScore.votes) {
                minScore.key = keys[i];
            }
        }

        candidates = candidates.filter((a) => {
            return a !== minScore.key
        });

        for (let i = 0; i < votes.length; i++) {
            votes[i] = votes[i].filter((a) => {
                return a !== minScore.key
            });
        }

        console.log(`Eliminated ${minScore.key}`, votes, candidates);

        if (candidates.length > 1) {
            countVotes();
        } else {
            ret = candidates[0];
        }
    }

    countVotes();
    return ret;
}

console.log(runAV(["a", "b", "c"], [["a", "b", "c"], ["a", "c", "b"], ["c", "b", "a"]]));