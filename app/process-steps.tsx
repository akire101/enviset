import { Icon } from './components';
import { cooperationSteps } from './client-content';

export function ProcessSteps(){return <div className="process-flow"><ol className="process-timeline">{cooperationSteps.map(([title,text,icon],i)=><li className="timeline-stage" key={title}>
 <span className="timeline-number" aria-hidden="true">0{i+1}</span>
 <div className="timeline-content"><div className="timeline-heading"><h3>{title}</h3><span className="timeline-icon"><Icon name={icon} size={27}/></span></div><p>{text}</p></div>
 </li>)}</ol></div>}
