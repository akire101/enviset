import {SupportPanel} from './support-panel';
import {supportSession} from '../support-server';
import { isAdmin } from '../server';
import { PageHero } from '../components';
import { Login,Admin } from './panel';
export const dynamic='force-dynamic';
export const metadata={title:'Administrácia',robots:{index:false,follow:false}};
export default async function AdminPage(){const logged=await isAdmin();const support=!logged&&await supportSession();return <main id="main"><PageHero label="Administrácia" title={support?'Online podpora':logged?'Váš obsah. Váš priestor.':'Vitajte späť.'} text={support?'Konverzácie so zákazníkmi na jednom mieste.':logged?'Správa článkov, správ a štatistík návštevnosti na jednom mieste.':'Prihláste sa a spravujte blog ENVI set.'}/>{logged?<Admin/>:support?<SupportPanel/>:<Login/>}</main>}
