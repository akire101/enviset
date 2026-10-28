import {SupportPanel} from './support-panel';
import {supportSession} from '../support-server';
import { isAdmin } from '../server';
import { PageHero } from '../components';
import { Login,Admin } from './panel';
export const dynamic='force-dynamic';
export const metadata={title:'Administrácia',robots:{index:false,follow:false}};
export default async function AdminPage(){const logged=await isAdmin();const support=!logged&&await supportSession();return <main id="main" className="admin-page"><PageHero label="Administrácia" title={support?'Online podpora':logged?'Administrácia ENVI set':'Vitajte späť.'} text={support?'Konverzácie so zákazníkmi na jednom mieste.':logged?'Prehľad zákazníckych otázok, podpory a obsahu webu.':'Prihláste sa a spravujte blog ENVI set.'}/>{logged?<Admin/>:support?<SupportPanel/>:<Login/>}</main>}
