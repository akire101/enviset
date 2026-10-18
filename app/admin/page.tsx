import { isAdmin } from '../server';
import { PageHero } from '../components';
import { Login,Admin } from './panel';
export const dynamic='force-dynamic';
export const metadata={title:'Administrácia',robots:{index:false,follow:false}};
export default async function AdminPage(){const logged=await isAdmin();return <main id="main"><PageHero label="Administrácia" title={logged?'Váš obsah. Váš priestor.':'Vitajte späť.'} text={logged?'Správa článkov a správ od návštevníkov na jednom mieste.':'Prihláste sa a spravujte blog ENVI set.'}/>{logged?<Admin/>:<Login/>}</main>}
