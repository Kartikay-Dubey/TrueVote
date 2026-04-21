// MIGRATION SCRIPT TO ADD AADHAAR
const fs = require('fs');

let usersContent = fs.readFileSync('backend/data/users.js', 'utf8');

let counter = 1000;
usersContent = usersContent.replace(/\{ name: "(.*?)", phone: "(.*?)", hasVoted: (.*?), voteHash: (.*?) \}/g, (match, name, phone, hasVoted, voteHash) => {
    counter++;
    const fakeAadhaar = `48219376${counter}`;
    return `{ name: "${name}", phone: "${phone}", aadhaarNumber: "${fakeAadhaar}", hasVoted: ${hasVoted}, voteHash: ${voteHash} }`;
});

fs.writeFileSync('backend/data/users.js', usersContent);
console.log("Users updated with Aadhaar numbers!");
