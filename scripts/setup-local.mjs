import {randomBytes,pbkdf2Sync} from 'node:crypto';
import {existsSync,writeFileSync} from 'node:fs';
if(existsSync('.dev.vars'))throw new Error('Lokálna konfigurácia už existuje; nebude prepísaná.');
const username='envi_admin';const password=randomBytes(24).toString('base64url');const salt=randomBytes(32).toString('hex');
writeFileSync('.dev.vars',`ADMIN_USERNAME=${username}\nADMIN_PASSWORD_SALT=${salt}\nADMIN_PASSWORD_HASH=${pbkdf2Sync(password,salt,100000,32,'sha256').toString('hex')}\n`);
writeFileSync('.local-admin.json',JSON.stringify({username,password},null,2));
console.log('Vytvorený unikátny lokálny účet. Údaje sú v ignorovanom .local-admin.json, nepoužívajte ich v produkcii.');
