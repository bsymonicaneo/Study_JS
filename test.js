const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
    input.push(parseInt(line));
}).on('close', () => {
    const mx = Math.max(...input);
    const idx = input.indexOf(mx);

    console.log(`${mx}\n${idx + 1}`);

    rl.close();
});
