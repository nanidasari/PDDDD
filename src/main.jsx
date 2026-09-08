import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,useMotionValue,useSpring} from 'framer-motion';
import {ArrowUpRight,Menu,X,MoveUpRight,Layers3,Box,Share2,Sparkles,Quote,Mail,ChevronDown} from 'lucide-react';
import './styles.css';

const siteRaw=import.meta.glob('../content/site.json',{eager:true,import:'default'});
const site=Object.values(siteRaw)[0];
const portfolioRaw=import.meta.glob('../content/portfolio/*.json',{eager:true,import:'default'});
const projects=Object.values(portfolioRaw).filter(x=>x.featured!==false);
const testimonialRaw=import.meta.glob('../content/testimonials/*.json',{eager:true,import:'default'});
const testimonials=Object.values(testimonialRaw);
const serviceRaw=import.meta.glob('../content/services/*.json',{eager:true,import:'default'});
const serviceData=Object.values(serviceRaw)[0] || [];
const serviceIcons=[Sparkles,Box,Share2];
const services=serviceData.map((s,i)=>({...s,icon:serviceIcons[i%serviceIcons.length],number:String(i+1).padStart(2,'0')}));

function App(){
 const [open,setOpen]=useState(false); const [active,setActive]=useState(0); const cursorX=useMotionValue(-100); const cursorY=useMotionValue(-100); const sx=useSpring(cursorX,{stiffness:500,damping:35}); const sy=useSpring(cursorY,{stiffness:500,damping:35});
 useEffect(()=>{const m=e=>{cursorX.set(e.clientX);cursorY.set(e.clientY)};window.addEventListener('pointermove',m);return()=>window.removeEventListener('pointermove',m)},[]);
 const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setOpen(false)};
 return <div className="site">
  <motion.div className="cursor" style={{x:sx,y:sy}}/><div className="grain"/>
  <header className="nav"><button className="logo" onClick={()=>scrollTo('top')}><span>PX</span> Pixcel Studio</button><nav>{['work','services','about','contact'].map(x=><button key={x} onClick={()=>scrollTo(x)}>{x}</button>)}</nav><button className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>
  {open&&<div className="mobileNav">{['work','services','about','contact'].map(x=><button key={x} onClick={()=>scrollTo(x)}>{x}<ArrowUpRight size={18}/></button>)}</div>}
  <main id="top">
   <section className="hero"><div className="orb orb1"/><div className="orb orb2"/><div className="heroGrid"/>
    <div className="heroCopy"><div className="eyebrow"><i/> {site.eyebrow}</div><h1>{site.headline.split('\n').map((t,i)=><React.Fragment key={t}>{t}{i<site.headline.split('\n').length-1&&<br/>}</React.Fragment>)}</h1><p>{site.intro}</p><div className="heroActions"><button className="pill primary" onClick={()=>scrollTo('contact')}>{site.cta}<ArrowUpRight size={18}/></button><button className="textBtn" onClick={()=>scrollTo('work')}>Explore work <MoveUpRight size={17}/></button></div></div>
    <motion.div className="heroGlass" initial={{opacity:0,scale:.9,rotate:7}} animate={{opacity:1,scale:1,rotate:3}} transition={{duration:1.2,ease:[.16,1,.3,1]}}><div className="glassTop"><span>PX / 01</span><span>CREATIVE DIRECTION</span></div><div className="glassCenter"><div className="liquidWord">PIX<span>·</span>CEL</div><div className="spinRing">STUDIO&nbsp; / &nbsp;DESIGN&nbsp; / &nbsp;STUDIO&nbsp; / &nbsp;</div></div><div className="glassBottom"><span>Hyderabad / India</span><span>2026</span></div></motion.div>
   </section>
   <section className="marquee"><div>IDENTITY <b>✳</b> PACKAGING <b>✳</b> SOCIAL <b>✳</b> MOTION <b>✳</b> DIGITAL <b>✳</b> IDENTITY <b>✳</b></div></section>
   <section className="section work" id="work"><div className="sectionHead"><div><span className="kicker">Selected work</span><h2>Made to <em>matter.</em></h2></div><p>Visual systems that give good ideas a distinct presence.</p></div><div className="projectGrid">{projects.map((p,i)=><motion.article className="project" key={p.title} whileHover={{y:-8}}><div className="projectImage"><img src={p.image} alt={p.title}/><div className="projectHover">View case <ArrowUpRight/></div></div><div className="projectMeta"><div><h3>{p.title}</h3><span>{p.tag}</span></div><span className="num">0{i+1}</span></div></motion.article>)}</div></section>
   <section className="section services" id="services"><div className="sectionHead"><div><span className="kicker">What we do</span><h2>Three ways to<br/><em>make noise.</em></h2></div></div><div className="serviceList">{services.map(s=>{const I=s.icon;return <motion.button key={s.title} className="service" onMouseEnter={()=>setActive(Number(s.number)-1)} whileHover={{x:8}}><span className="serviceNum">{s.number}</span><div className="serviceIcon"><I/></div><div className="serviceText"><h3>{s.title}</h3><p>{s.copy}</p></div><ArrowUpRight className="serviceArrow"/></motion.button>})}</div><div className="serviceVisual"><div className="visualCard"><span>0{active+1}</span><strong>{services[active].title}</strong><div className="visualSymbol">{React.createElement(services[active].icon)}</div></div></div></section>
   <section className="section about" id="about"><div className="aboutGlass"><div className="kicker">A little about us</div><h2>Small studio.<br/><em>Big energy.</em></h2><p>Pixcel Studio is a design practice for brands with something worth saying. We mix strategy, graphic craft and motion to make identities people can feel — not just see.</p><div className="stats"><div><b>12+</b><span>brands shaped</span></div><div><b>4</b><span>design disciplines</span></div><div><b>∞</b><span>curiosity</span></div></div></div></section>
   <section className="section testimonials"><div className="sectionHead"><div><span className="kicker">Kind words</span><h2>Good work<br/><em>travels.</em></h2></div></div><div className="quoteGrid">{testimonials.map(t=><article className="quote" key={t.name}><Quote size={28}/><p>“{t.quote}”</p><div><b>{t.name}</b><span>{t.role}</span></div></article>)}</div></section>
   <section className="contact" id="contact"><div className="contactGlow"/><div className="kicker">Have a good idea?</div><h2>Let's make it<br/><em>impossible to ignore.</em></h2><a className="pill primary" href="mailto:hello@pixcel.studio">hello@pixcel.studio <ArrowUpRight size={18}/></a><div className="contactFoot"><span>Branding · Packaging · Social</span><span><svg className="socialIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> @pixcelstudio</span></div></section>
  </main>
  <footer><span>© 2026 Pixcel Studio</span><span>Designed with intent.</span><button onClick={()=>scrollTo('top')}><ChevronDown size={17}/></button></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
