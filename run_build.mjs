import { build } from 'vite';
import fs from 'fs';

build().catch(err => {
    fs.writeFileSync('err.txt', err.stack || err.message || JSON.stringify(err));
    process.exit(1);
});
