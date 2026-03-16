const fs = require('fs');
const json = JSON.parse(fs.readFileSync('eslint_results.json', 'utf8'));
json.forEach(file => {
    if (file.messages.length > 0) {
        console.log(`File: ${file.filePath}`);
        file.messages.forEach(msg => {
            console.log(`  Line ${msg.line}: ${msg.message} (${msg.ruleId})`);
        });
    }
});
