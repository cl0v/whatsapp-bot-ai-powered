import fs from 'fs';

const fileName = "logs.json";

/// Currently this log is not working for practical chat

export default function logChat(sessionId, from, message) {
    fs.readFile(fileName, 'utf8', async function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let list = JSON.parse(data);

            const i = list.findIndex(e => e.id === sessionId);

            if (i > -1) {
                list[i].history.push({ from: from, message: message });
            } else {
                list.push({ id: sessionId, history: [{ from: from, message: message }] });
            }

            let json = JSON.stringify(list);
             fs.writeFile(fileName, json, 'utf8', (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}
