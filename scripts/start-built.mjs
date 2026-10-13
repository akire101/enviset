import {readFileSync,writeFileSync} from 'node:fs';
import {spawn} from 'node:child_process';
const config=JSON.parse(readFileSync('dist/server/wrangler.json','utf8'));
// Konfigurácia pri koreňovom .dev.vars zachová miestne tajomstvá mimo buildu.
config.main='dist/server/index.js';config.assets.directory='dist/client';
writeFileSync('.built-preview.json',JSON.stringify(config));
const child=spawn(process.execPath,['--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js','dev','--config','.built-preview.json','--local','--persist-to','.wrangler/state','--ip','127.0.0.1','--inspector-port','0',...process.argv.slice(2)],{stdio:'inherit'});
child.on('error',error=>{console.error(error.message);process.exitCode=1});
child.on('exit',code=>{process.exitCode=code??1});
