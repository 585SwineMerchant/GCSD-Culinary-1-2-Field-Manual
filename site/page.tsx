"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import recipes from "./recipes.json";
import {unitContent} from "./unit-content";
import "./globals.css";
import "./unit.css";
type View="home"|"units"|"recipes"|"reference"|"mission";
type Recipe=(typeof recipes)[number];
type Profile={name:string;date:string;period:string;instructor:string};
type LessonResponse={bell:string;exit:string};
type LessonPrompt={bell:string;exit:string};
const units=unitContent.map(u=>[u.title,u.summary]);
const asset=(path:string)=>`./${path}?v=20260725-homepage-image`;
const unitImages=["unit-1-kitchen-readiness.png","unit-2-bread-grains-pasta.png","unit-3-flavor-math.png","unit-4-proteins-eggs.png","unit-5-stocks-soups-sauces.png","unit-6-produce-dairy.png","unit-7-baking-pastry.png","unit-8-global-menu.png"].map(name=>asset(`assets/${name}`));
const instructors=["Kevin McCann","Jason Carlson","Linda"] as const;
const lessonPrompts:LessonPrompt[][]=[
 [
  {bell:"What makes professionalism observable rather than subjective?",exit:"What should you do after completing your assigned task early?"},
  {bell:"Why can a wet towel increase burn risk?",exit:"Describe the correct response to a kitchen injury."},
  {bell:"What is the difference between cross-contamination and allergen cross-contact?",exit:"Why are raw animal foods stored below ready-to-eat foods?"},
  {bell:"What problems does mise en place prevent?",exit:"Why does uniformity matter beyond appearance?"}
 ],
 [
  {bell:"Why is accurate measurement especially important in baking?",exit:"Why can overmixing toughen a quick bread?"},
  {bell:"What factors influence fermentation?",exit:"Why should proofing be judged by the dough and not only by the clock?"},
  {bell:"What quality distinguishes risotto from steamed rice?",exit:"Why is pasta dough rested?"}
 ],
 [
  {bell:"What is the difference between taste and flavor?",exit:"Why should one seasoning adjustment be made at a time?"},
  {bell:"What are the six major nutrient categories?",exit:"What should you say when you are uncertain about an allergen?"},
  {bell:"What is the difference between AP and EP?",exit:"What information is needed to calculate cost per portion?"}
 ],
 [
  {bell:"How does connective tissue affect cooking-method selection?",exit:"Why are safety and quality checked separately?"},
  {bell:"Why should raw poultry not be washed in the sink?",exit:"What evidence would show that a fried product met both its safety and quality standards?"},
  {bell:"Name four culinary functions of eggs.",exit:"Why can high heat damage egg texture?"}
 ],
 [
  {bell:"How are tender herbs commonly handled differently from hardy herbs?",exit:"Why should one flavor adjustment be made at a time?"},
  {bell:"Why should stock usually simmer rather than boil?",exit:"Why must stock be cooled rapidly?"},
  {bell:"What is the difference between a roux and a slurry?",exit:"Name the five mother sauces."},
  {bell:"What is an emulsion?",exit:"What three controls help prevent an emulsion from breaking?"}
 ],
 [
  {bell:"List three ways to reduce vegetable waste.",exit:"How does a uniform cut improve more than appearance?"},
  {bell:"What is the purpose of shocking after blanching?",exit:"Why must blanched food be drained before storage or further cooking?"},
  {bell:"What causes dairy products to scorch?",exit:"How can heat or acid change dairy proteins?"}
 ],
 [
  {bell:"What is the main difference between the muffin and creaming methods?",exit:"How can temperature change a cookie’s spread?"},
  {bell:"Why should pastry dough be handled as little as possible?",exit:"What can make a pie crust shrink during baking?"},
  {bell:"Name four culinary functions of eggs.",exit:"How can too much heat or mixing damage a custard, cream, or cake?"},
  {bell:"What factors influence fermentation?",exit:"Why must fried pastry be judged by interior doneness as well as exterior color?"}
 ],
 [
  {bell:"What makes a culinary experience authentic?",exit:"How will your research show respect for the food and the people connected to it?"},
  {bell:"What is the first step in the waste-prevention hierarchy?",exit:"Why can customer service never override safety?"},
  {bell:"What is the instructional goal of the Grade 6 experience?",exit:"What evidence will show what the Grade 6 students understood?"},
  {bell:"List the ten phases of the Global Menu capstone.",exit:"Why can a strong final product not cancel a serious safety failure?"}
 ]
];
const unitTasks=[
 ["Preview the kitchen-readiness lessons","Demonstrate safe handwashing and sanitation","Complete the safety and equipment readiness checks","Explain one professional habit in your exit response"],
 ["Preview the assigned formula and method","Identify the product’s key structure-building step","Complete the assigned bread, grain, or pasta lab","Evaluate structure, texture, and one next-step improvement"],
 ["Complete the assigned flavor, nutrition, or math task","Show calculations with units and check the result","Use a controlled taste-adjust-taste process when assigned","Explain your decision with evidence"],
 ["Preview the assigned egg or protein formula","Identify the required safety temperature and doneness signs","Complete the assigned production lab","Evaluate safety, doneness, texture, and organization"],
 ["Preview the assigned soup, stock, or sauce formula","Identify the flavor-building and thickening sequence","Complete the assigned production lab","Evaluate body, balance, consistency, and finish"],
 ["Preview the assigned produce, potato, or dairy formula","Choose the correct method and quality standard","Complete the assigned production lab","Evaluate color, texture, yield, flavor, and safety"],
 ["Preview the assigned baking formula and mixing method","Identify temperature and structure control points","Complete the assigned production lab","Evaluate volume, tenderness, shape, doneness, and finish"],
 ["Complete the research, proposal, and production plan","Confirm the recipient, safety controls, and quality standard","Produce and serve the approved dish or experience","Submit evidence, feedback, and a specific reflection"]
];
const glossary:Record<string,string>={
 "mise en place":"Everything in place: ingredients, equipment, information, and work arranged before production begins.",
 "cross-contamination":"The transfer of harmful microorganisms from one food, surface, or person to another.",
 "cross-contact":"The accidental transfer of a food allergen to another food or surface.",
 "sanitize":"Reduce harmful microorganisms on a cleaned surface to a safe level.",
 "TCS food":"Food that needs time and temperature control for safety.",
 "FIFO":"First In, First Out: use the oldest safe product before newer product.",
 "conduction":"Heat transfer through direct contact.",
 "convection":"Heat transfer through moving air or liquid.",
 "radiation":"Heat transfer through waves without direct contact.",
 "gluten":"A protein network that gives wheat dough strength and elasticity.",
 "fermentation":"The process in which yeast or bacteria convert sugars and create gas, acid, or alcohol.",
 "proof":"The final rise of shaped yeast dough before baking.",
 "knead":"Work dough to organize and strengthen its gluten network.",
 "hydration":"The amount of liquid in relation to flour or another dry ingredient.",
 "al dente":"Cooked until tender with a slight firmness when bitten.",
 "pilaf":"A grain method that begins by coating the grain in fat before adding liquid.",
 "risotto":"A rice method that builds a creamy surrounding texture while keeping the grains distinct.",
 "umami":"The savory taste associated with glutamates.",
 "aroma":"The part of flavor detected through the nose.",
 "seasoning":"Adjusting food to improve and balance its flavor.",
 "AP":"As purchased: the full amount of an ingredient before trimming or preparation.",
 "EP":"Edible portion: the usable amount after trimming or preparation.",
 "yield percent":"The edible-portion amount divided by the as-purchased amount, multiplied by 100.",
 "portion cost":"The total recipe cost divided by the number of portions produced.",
 "conversion factor":"Desired yield divided by original yield; used to scale a recipe.",
 "coagulation":"The setting or firming of proteins through heat, acid, or another change.",
 "carryover cooking":"Cooking that continues after food leaves the heat source.",
 "resting":"Holding cooked food before cutting so heat and moisture can redistribute.",
 "brining":"Soaking food in a salt solution to season it and change moisture retention.",
 "emulsion":"A mixture of two liquids that normally separate, such as oil and water.",
 "denaturation":"The change in a protein’s structure caused by heat, acid, or agitation.",
 "stock":"A flavorful liquid made by gently simmering bones, vegetables, and aromatics.",
 "roux":"A cooked mixture of fat and flour used to thicken.",
 "reduction":"Concentrating a liquid by simmering away water.",
 "aromatics":"Flavor-building ingredients such as onion, celery, garlic, herbs, and spices.",
 "mother sauce":"One of the foundational sauces used as a base for other sauces.",
 "nappe":"A sauce consistency that coats the back of a spoon.",
 "blanch":"Cook briefly in boiling water or steam.",
 "shock":"Cool food rapidly, usually in ice water, to stop cooking.",
 "cultured dairy":"Dairy changed by beneficial bacteria, such as yogurt or sour cream.",
 "yield":"The usable amount or number of portions a recipe produces.",
 "lamination":"Building thin alternating layers of dough and fat.",
 "creaming":"Beating fat and sugar together to incorporate air.",
 "aeration":"Adding or trapping air in a mixture.",
 "custard":"A liquid thickened mainly by egg proteins.",
 "blind bake":"Bake a pastry shell before adding its final filling.",
 "tenderness":"A texture that is easy to bite or cut, often created by limiting gluten.",
 "authentic recipient":"A real person or group beyond the instructor who receives or responds to the work.",
 "hospitality":"Caring for a guest or recipient through safe, accurate, respectful service.",
 "sustainability":"Using food, water, energy, and materials responsibly.",
 "production plan":"A written sequence for ingredients, equipment, roles, timing, safety, and service.",
 "portfolio evidence":"Work saved to show a skill, decision, result, or growth.",
 "capstone":"A culminating experience that brings several course skills together."
};
const refs=[
 ["Food Safety Essentials",["Temperature danger zone: 41°F–135°F","Cold holding: 41°F or below","Hot holding: 135°F or above","FIFO: use the oldest safe product first","Storage order, top to bottom: ready-to-eat food; seafood; whole cuts of beef and pork; ground meat; poultry","Clean → rinse → sanitize → air-dry"]],
 ["Measurements & Conversions",["3 tsp = 1 Tbsp","16 Tbsp = 1 cup","2 cups = 1 pint","2 pints = 1 quart","4 quarts = 1 gallon","28.35 g = 1 oz","453.6 g = 1 lb","1 kg = 1,000 g","1 kg = 2.205 lb","1 lb = 0.454 kg"]],
 ["Culinary Math",["Conversion factor = desired yield ÷ original yield","New quantity = original quantity × conversion factor","Yield % = EP quantity ÷ AP quantity × 100","Food cost % = food cost ÷ selling price × 100","Cost per portion = total recipe cost ÷ portions produced"]],
 ["Recipe Reading",["Confirm yield and portion size","Read ingredients and method together","Check allergens and substitutions","Gather equipment before production","Mark temperatures and control points"]],
 ["Quality Check",["Taste: balanced and dish-appropriate","Texture: intentional and correctly cooked","Appearance: clean and consistent","Safety: measured and verified","Next step: one specific improvement"]]
] as const;
const sharedPrinciples=[
 ["Why Before How","Students should understand the purpose of their learning before they are asked to master the process. Purpose gives new knowledge and skills context, relevance, and a place to be used again.","Ask questions, connect each task to its purpose, and understand the goal before beginning.","Explain the purpose, professional relevance, success criteria, and next step before expecting independent work."],
 ["Structure Creates Freedom","Clear routines, predictable expectations, and organized systems reduce uncertainty. Once the structure becomes familiar, students have more room to create, solve problems, and work independently.","Learn the routines, prepare your station and thinking, and use the system to take greater ownership of your work.","Build consistent, understandable systems and provide the preparation and support students need before increasing independence."],
 ["Competence Builds Confidence","Confidence is earned through preparation, practice, feedback, and demonstrated competency. Responsibility grows when students can apply knowledge, skill, behavior, and judgment consistently.","Practice before expecting mastery, respond to coaching, and use evidence to show when you are ready for greater responsibility.","Introduce and model skills before assessing them, provide meaningful practice, and base progression on demonstrated competency rather than participation alone."],
 ["Learning Is a Partnership","Students and teachers share responsibility for the educational process. Teachers provide direction, structure, feedback, and opportunity; students contribute effort, professionalism, curiosity, and accountability.","Come prepared to participate, ask for clarification, act on feedback, and take increasing responsibility for your growth.","Provide clear direction, useful feedback, fair opportunities, and the support required for students to succeed."],
 ["Professionalism Is Practiced, Not Presumed","Professional behavior is not a personality trait or an assumption. Communication, teamwork, organization, accountability, and leadership are habits that must be taught, modeled, practiced, and reinforced.","Practice professional habits every day, accept correction respectfully, and contribute to the success of the team.","Teach and model professional expectations explicitly, coach mistakes, recognize growth, and create real opportunities to lead."],
 ["Authentic Work Creates Authentic Learning","Students learn best when their work has genuine purpose and a real audience. Labs, projects, events, and partnerships should mirror professional practice while always serving a clear educational goal—learning comes before labor.","Treat authentic work as practice with purpose, protect safety and quality, and use each experience to show what you can do.","Design authentic experiences that serve learning, remain manageable with available support, and never use students simply as a source of labor."],
 ["Reflection Strengthens Performance","Experience becomes learning when students study their decisions, results, successes, and mistakes. Specific reflection and feedback turn evidence from one experience into improvement in the next.","Evaluate your work honestly, identify what succeeded, and name a specific change for next time.","Build reflection into meaningful experiences, provide timely feedback, and use evidence to guide instruction and future opportunity."],
 ["Inspect What You Expect","Expectations matter only when they are consistently observed, reinforced, and supported. Safety, quality, accuracy, and professional habits are verified through observation, measurement, coaching, documentation, and follow-through.","Use checklists, measurements, feedback, and honest self-evaluation to verify your work.","Observe, coach, document, recognize success, and correct concerns before they become habits."],
 ["Quality Before Quantity","More work is not automatically better work. The right amount of work is the amount that can be completed safely, thoughtfully, and to an appropriate standard with the time and support available.","Choose careful, complete work over rushing, and protect safety and quality when time or conditions change.","Keep the size and complexity of experiences within available time, staffing, equipment, supervision, and student readiness."],
 ["Responsibility Is Earned and Supported","Greater independence, leadership, public-facing work, and off-campus opportunity follow demonstrated readiness. Responsibility grows step by step and remains matched with appropriate teaching, supervision, and support.","Earn greater responsibility through preparation, consistent performance, professional judgment, and care for others.","Increase responsibility when readiness is demonstrated, explain decisions clearly, and provide the supervision and support each opportunity requires."]
] as const;
export default function Home(){
 const [view,setView]=useState<View>("home"),[unit,setUnit]=useState(1),[lesson,setLesson]=useState(0),[recipe,setRecipe]=useState<Recipe|null>(null),[q,setQ]=useState(""),[done,setDone]=useState<Record<string,boolean>>({});
 const [term,setTerm]=useState("");
 const [profile,setProfile]=useState<Profile>({name:"",date:new Date().toISOString().slice(0,10),period:"",instructor:""});
 const [responses,setResponses]=useState<Record<string,LessonResponse>>({});
 const vocabDialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const x=localStorage.getItem("culinary-progress");if(x)setDone(JSON.parse(x))},[]);
 useEffect(()=>{const x=localStorage.getItem("culinary-daily-profile");if(x)setProfile(d=>({...d,...JSON.parse(x)}));const y=localStorage.getItem("culinary-lesson-responses");if(y)setResponses(JSON.parse(y))},[]);
 const toggle=(k:string)=>{const x={...done,[k]:!done[k]};setDone(x);localStorage.setItem("culinary-progress",JSON.stringify(x))};
 const pct=(n:number)=>Math.round(unitTasks[n-1].filter((_,i)=>done[`${n}-${i}`]).length/4*100);
 const current=units.findIndex((_,i)=>pct(i+1)<100)+1||8;
 const filtered=useMemo(()=>recipes.filter(r=>r.name.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name)),[q]);
 const glossaryEntries=useMemo(()=>Object.entries(glossary).sort(([a],[b])=>a.localeCompare(b)),[]);
 const go=(v:View)=>{setRecipe(null);setView(v);scrollTo(0,0)};
 const openUnit=(n:number)=>{setUnit(n);setLesson(0);setRecipe(null);setView("units");scrollTo(0,0)};
 const content=unitContent[unit-1], activeLesson=content.lessons[lesson];
 const tasks=unitTasks[unit-1];
 const showTerm=(x:string)=>{setTerm(x);vocabDialog.current?.showModal()};
 const responseKey=`${unit}-${lesson}`;
 const response=responses[responseKey]||{bell:"",exit:""};
 const updateProfile=(key:keyof Profile,value:string)=>{const next={...profile,[key]:value};setProfile(next);localStorage.setItem("culinary-daily-profile",JSON.stringify(next))};
 const updateResponse=(key:keyof LessonResponse,value:string)=>{const next={...responses,[responseKey]:{...response,[key]:value}};setResponses(next);localStorage.setItem("culinary-lesson-responses",JSON.stringify(next))};
 const prompt=lessonPrompts[unit-1][lesson];
 const bellPrompt=prompt.bell;
 const exitPrompt=prompt.exit;
 const dailyText=`GCSD Culinary Arts 1 & 2 — Daily Response
Student: ${profile.name || "Not entered"}
Date: ${profile.date}
Class period: ${profile.period || "Not entered"}
Instructor: ${profile.instructor || "Not selected"}
Unit ${unit}: ${content.title}
Lesson: ${activeLesson.title}

Bell Ringer
Prompt: ${bellPrompt}
${response.bell || "No response entered."}

Exit Ticket
Prompt: ${exitPrompt}
${response.exit || "No response entered."}`;
 const emailDaily=()=>{location.href=`mailto:?subject=${encodeURIComponent(`Culinary Daily Response — ${profile.name || "Student"} — ${profile.date}`)}&body=${encodeURIComponent(dailyText)}`};
 const copyDaily=async()=>{await navigator.clipboard.writeText(dailyText);alert("Lesson response copied. Paste it into email, Classroom, or your course submission space.")};
 return <div className="shell">
  <header><button className="brand" onClick={()=>go("home")}><i>✦</i> GCSD Culinary Arts 1 & 2</button><nav>{(["home","units","recipes","reference","mission"] as View[]).map(v=><button className={view===v?"active":""} onClick={()=>go(v)} key={v}>{v==="home"?"⌂ ":v==="units"?"▤ ":v==="recipes"?"♨ ":v==="reference"?"☷ ":"✦ "}{v==="reference"?"Quick Reference":v==="mission"?"Our Program":v[0].toUpperCase()+v.slice(1)}</button>)}</nav></header>
  <main>
  {view==="home"&&<><section className="hero"><div><small>STUDENT FIELD MANUAL</small><h1>Your Culinary Field Manual</h1><p>Learn the skill. Prepare for the lab. Cook with purpose. Return afterward to evaluate the result.</p><div><button className="red" onClick={()=>openUnit(current)}>Continue to Unit {current} →</button><button className="outline" onClick={()=>go("recipes")}>Browse recipes ▤</button></div></div><aside className="heroArt"><img className="heroArtwork" src={asset("assets/homepage-course-illustrations.png")} alt="Hand-drawn culinary tools and foods from across the course"/><small>PREP • PRACTICE • REFLECT</small></aside></section>
  <section className="courseIntro"><div><small>ABOUT THE COURSE</small><h2>Build the foundation for everything that comes next.</h2><p>Culinary Arts 1 &amp; 2 is a full-year introduction to professional kitchen practice. You will learn food and kitchen safety, sanitation, knife and equipment skills, recipe reading, measurement, culinary math, flavor development, cooking methods, baking, teamwork, and professional habits through connected lessons and hands-on labs.</p><p>The goal is bigger than finishing recipes. Each unit helps you become a safer, more capable, more responsible, and more independent culinary professional—and prepares you for Advanced Culinary, Kitchen Management, work-based learning, and future opportunities in food and hospitality.</p></div><aside><small>OUR SHARED APPROACH</small><h3>Prepare. Verify. Improve.</h3><p>Prepare your station and your thinking. Verify safety, quality, and accuracy. Improve through feedback and reflection.</p><button className="outline" onClick={()=>go("mission")}>Read our mission and commitments →</button></aside></section>
  <section className="cards">
   <article className="current"><h2>♨ Current Unit</h2><h3>Unit {current}: {units[current-1][0]}</h3><div className="progressline"><b>{pct(current)}% complete</b><span>{unitTasks[current-1].filter((_,i)=>done[`${current}-${i}`]).length}/4 checkpoints</span></div><div className="bar"><i style={{width:`${pct(current)}%`}}/></div><button className="next" onClick={()=>openUnit(current)}><span>✓</span><b>Next: {unitTasks[current-1].find((_,i)=>!done[`${current}-${i}`])||"Review the completed unit"}</b><strong>›</strong></button><button className="green" onClick={()=>openUnit(current)}>Open Unit {current} →</button></article>
   <article><h2>▤ Recipe Library</h2><p>Ingredients, equipment, and method stay together on one complete preparation page.</p>{[...recipes].sort((a,b)=>a.name.localeCompare(b.name)).slice(0,3).map(r=><button className="row" key={r.name} onClick={()=>{setRecipe(r);setView("recipes")}}><span>♨</span><b>{r.name}</b><strong>›</strong></button>)}<button className="link" onClick={()=>go("recipes")}>Browse all {recipes.length} recipes →</button></article>
   <article><h2>☷ Quick Reference</h2><p>Focused lookup tools for facts you need without reopening an entire unit.</p>{refs.slice(0,3).map(r=><button className="row" key={r[0]} onClick={()=>go("reference")}><span>⌁</span><b>{r[0]}</b><strong>›</strong></button>)}<button className="link" onClick={()=>go("reference")}>View all references →</button></article>
  </section>
  <section className="unitGallery"><div className="galleryHeading"><small>EIGHT CONNECTED UNITS</small><h2>Follow the course. Revisit any station.</h2></div><div>{units.map((u,i)=><button key={u[0]} onClick={()=>openUnit(i+1)}><span className="unitArtwork" style={{backgroundImage:`url("${unitImages[i]}")`}} role="img" aria-label={`${u[0]} illustration`}/><span className="unitGalleryLabel"><small>UNIT {i+1}</small><b>{u[0]}</b></span></button>)}</div></section></>}
  {view==="units"&&!recipe&&<section className="page unitPage"><small>{content.course.toUpperCase()} • COURSE SEQUENCE</small><h1>Unit {unit}: {content.title}</h1><p className="lead">{content.summary}</p><div className="unitLayout"><aside className="unitList">{units.map((u,i)=><button className={unit===i+1?"selected":""} onClick={()=>openUnit(i+1)} key={u[0]}><span>{i+1}</span><b>{u[0]}</b><small>{pct(i+1)}%</small></button>)}</aside><div className="unitDetail">
   <h3 className="sectionTitle">Lessons in this unit</h3><div className="lessonNav">{content.lessons.map((l,i)=><button className={lesson===i?"selectedLesson":""} onClick={()=>{setLesson(i);setTimeout(()=>document.getElementById("lesson")?.scrollIntoView({behavior:"smooth",block:"start"}),0)}} key={l.title}><span>{i+1}</span><b>{l.title}</b><small>{l.purpose}</small></button>)}</div>
   <section className="responseProfile"><small>THIS CHROMEBOOK REMEMBERS THESE DETAILS</small><div className="studentFields"><label>Student<input value={profile.name} onChange={e=>updateProfile("name",e.target.value)} placeholder="Your name"/></label><label>Class period<input value={profile.period} onChange={e=>updateProfile("period",e.target.value)} placeholder="Example: Period 3"/></label><label>Instructor<select value={profile.instructor} onChange={e=>updateProfile("instructor",e.target.value)}><option value="">Choose instructor</option>{instructors.map(x=><option key={x}>{x}</option>)}</select></label><label>Date<input type="date" value={profile.date} onChange={e=>updateProfile("date",e.target.value)}/></label></div></section>
   <section className="dailyResponse bellRinger"><div><small>START OF LESSON {lesson+1}</small><h2>Bell ringer</h2><p>{bellPrompt}</p></div><label><span className="srOnly">Bell ringer response</span><textarea value={response.bell} onChange={e=>updateResponse("bell",e.target.value)} placeholder="Write your opening response here."/></label><small className="privacyNote">Saved automatically on this Chromebook for this lesson.</small></section>
   <section className="unitIntro"><div className="unitSketch" style={{backgroundImage:`url("${unitImages[unit-1]}")`}} role="img" aria-label={`${content.title} illustration`}/><small>UNIT OVERVIEW</small><h2>{content.essentialQuestion}</h2><h3>What should stay with you</h3><ul>{content.enduring.map(x=><li key={x}>{x}</li>)}</ul><div className="vocab"><b>Unit vocabulary <small>Choose a word for its definition.</small></b>{content.vocabulary.map(x=><button onClick={()=>showTerm(x)} key={x}>{x}</button>)}</div></section>
   <article className="lesson" id="lesson"><small>LESSON {lesson+1} OF {content.lessons.length}</small><h2>{activeLesson.title}</h2><p className="lessonPurpose">{activeLesson.purpose}</p><h3>Learning targets</h3><ul className="targets">{activeLesson.targets.map(x=><li key={x}>✓ {x}</li>)}</ul>{activeLesson.sections.map(s=><section className="knowledge" key={s.heading}><h3>{s.heading}</h3>{s.text&&<p>{s.text}</p>}{s.points&&<ul>{s.points.map(x=><li key={x}>{x}</li>)}</ul>}</section>)}<aside className="standard"><small>PROFESSIONAL STANDARD</small><p>{activeLesson.standard}</p></aside><div className="lessonColumns"><section><h3>In the kitchen</h3><ul>{activeLesson.kitchen.map(x=><li key={x}>{x}</li>)}</ul></section><section><h3>Check your understanding</h3><ol>{activeLesson.check.map(x=><li key={x}>{x}</li>)}</ol></section></div><aside className="evidence"><small>PORTFOLIO OPPORTUNITY</small><p>{activeLesson.evidence}</p></aside></article>
   <section className="dailyResponse exitTicket"><div><small>END OF LESSON {lesson+1}</small><h2>Exit ticket</h2><p>{exitPrompt}</p></div><label><span className="srOnly">Exit ticket response</span><textarea value={response.exit} onChange={e=>updateResponse("exit",e.target.value)} placeholder="Write your closing response here."/></label><div className="dailyActions"><button className="outline" onClick={copyDaily}>Copy this lesson response</button><button className="red" onClick={emailDaily}>Open email draft</button></div><small className="privacyNote">The email draft includes your saved student details, this lesson’s prompts, and both responses. Add the instructor’s school email before sending.</small></section>
   <section className="unitResources"><div><h3>Unit progress</h3><div className="checklist">{tasks.map((t,i)=><label key={t}><input type="checkbox" checked={!!done[`${unit}-${i}`]} onChange={()=>toggle(`${unit}-${i}`)}/><span><b>{t}</b><small>{i<2?"Complete before production":"Complete after the lab"}</small></span></label>)}</div></div><div><h3>Connected recipes</h3><div className="connected">{recipes.filter(r=>r.unit===unit).sort((a,b)=>a.name.localeCompare(b.name)).map(r=><button className="row" key={r.name} onClick={()=>setRecipe(r)}><span>♨</span><b>{r.name}</b><strong>›</strong></button>)}</div>{!recipes.some(r=>r.unit===unit)&&<p className="note">This unit develops foundational knowledge without a standalone production formula.</p>}</div></section>
  </div></div></section>}
  {view==="recipes"&&!recipe&&<section className="page"><small>COMPLETE PRODUCTION FORMULAS</small><h1>Recipe Library</h1><p className="lead">Recipes are arranged alphabetically. Open one to prepare, cook, evaluate, or print that recipe alone.</p><label className="search">⌕ <input placeholder="Search all recipes" value={q} onChange={e=>setQ(e.target.value)}/></label><div className="recipeGrid">{filtered.map(r=><button onClick={()=>setRecipe(r)} key={r.name}><div><span>Future in-house photo</span></div><small>UNIT {r.unit}</small><h2>{r.name}</h2><span>{r.ingredients.length} ingredients • Complete recipe →</span></button>)}</div></section>}
  {recipe&&<section className="recipe"><div className="toolbar"><button onClick={()=>setRecipe(null)}>← Back</button><button onClick={()=>print()}>Print this recipe</button></div><article><small>UNIT {recipe.unit} • STANDARDIZED RECIPE</small><h1>{recipe.name}</h1><p className="lead callout">Read ingredients and method together before collecting equipment. Confirm batch, yield, allergens, and instructor adjustments.</p><div className="columns"><div><h2>Ingredients</h2><ul>{recipe.ingredients.map((x,i)=><li key={i}>{x}</li>)}</ul><h2>Equipment</h2><ul>{recipe.equipment.map((x,i)=><li key={i}>{x}</li>)}</ul></div><div><h2>Method</h2><ol>{recipe.method.map((x,i)=><li key={i}>{x}</li>)}</ol></div></div><div className="after"><h2>After the lab</h2><p>Evaluate taste, texture, appearance, safety, organization, and the one change that would most improve the next attempt.</p></div></article></section>}
  {view==="reference"&&<section className="page referencePage"><small>FAST, REUSABLE LOOKUP TOOLS</small><h1>Quick Reference</h1><p className="lead">Reference tools follow course-use order: safety first, then measuring, math, recipe reading, quality, knife cuts, and an A–Z glossary.</p><div className="refGrid">{refs.map(r=><article key={r[0]}><i>⌁</i><h2>{r[0]}</h2><ul>{r[1].map(x=><li key={x}>{x}</li>)}</ul></article>)}</div><section className="knifeReference"><small>VISUAL REFERENCE</small><h2>Foundational knife cuts</h2><p>Dimensions are the target. Safe control and reasonable consistency come before speed.</p><div className="cutGrid"><div><i className="cut batonnet"></i><b>Batonnet</b><span>¼ × ¼ × 2–2½ in</span></div><div><i className="cut julienne"></i><b>Julienne</b><span>⅛ × ⅛ × 2 in</span></div><div><i className="cut largeDice"></i><b>Large dice</b><span>¾ in cube</span></div><div><i className="cut mediumDice"></i><b>Medium dice</b><span>½ in cube</span></div><div><i className="cut smallDice"></i><b>Small dice</b><span>¼ in cube</span></div><div><i className="cut brunoise"></i><b>Brunoise</b><span>⅛ in cube</span></div><div><i className="cut chiffonade"></i><b>Chiffonade</b><span>Thin ribbons</span></div><div><i className="cut mince"></i><b>Mince</b><span>Very fine pieces</span></div></div></section><section className="glossary"><small>COURSE VOCABULARY • A–Z</small><h2>Clickable glossary</h2><p>Choose any term to see its definition without leaving this page.</p><dl>{glossaryEntries.map(([word,definition])=><div key={word}><dt><button onClick={()=>showTerm(word)}>{word}</button></dt><dd>{definition}</dd></div>)}</dl></section></section>}
  {view==="mission"&&<section className="page missionPage"><small>WHY WE WORK THIS WAY</small><h1>Our Mission &amp; Commitments</h1><p className="lead">The GCSD Culinary Pathway is one connected learning sequence, not a collection of separate electives. Students build skill through instruction, practice, authentic experience, feedback, and reflection. Greater opportunity and responsibility follow demonstrated competency.</p><section className="missionStatement"><div><small>OUR MISSION</small><h2>Learn with purpose. Grow through practice. Earn greater responsibility.</h2><p>We develop confident, reflective, professionally minded students through authentic culinary experiences. The goal is to prepare students for meaningful careers, lifelong learning, and responsible leadership—not simply to finish recipes.</p></div><div><small>HOW WE LEARN</small><h2>Why → Learn → Practice → Apply → Experience → Reflect → Grow</h2><p>Each step builds on the one before it. We explain the purpose, teach the skill, practice it with support, apply it in real work, study the evidence, and use feedback to improve.</p></div></section><section className="commitmentMatrix"><small>HOW WE LEARN AND WORK TOGETHER</small><h2>Our principles and shared commitments</h2><p>Each principle carries a shared responsibility. Students commit to the habits that build readiness; the program commits to the instruction, support, evidence, and fair decisions that make growth possible.</p><div className="commitmentHead"><b>Principle</b><b>What it means</b><b>Student commitment</b><b>Program commitment</b></div>{sharedPrinciples.map(([title,meaning,student,program],i)=><article key={title}><h3><span>{i+1}</span>{title}</h3><div><small>WHAT IT MEANS</small><p>{meaning}</p></div><div><small>STUDENT COMMITMENT</small><p>{student}</p></div><div><small>PROGRAM COMMITMENT</small><p>{program}</p></div></article>)}</section><aside className="closingCommitment"><small>OUR SHARED APPROACH</small><h2>Prepare. Verify. Improve.</h2><p>Prepare students and the conditions for learning. Verify safety, competency, quality, and readiness. Improve through experience, feedback, and reflection.</p></aside></section>}
  </main><footer><span>GCSD Culinary Arts 1 & 2</span><span>Prepare before the lab • Reflect afterward</span></footer><dialog ref={vocabDialog} className="vocabDialog" onClick={e=>{if(e.target===e.currentTarget)e.currentTarget.close()}}><button className="dialogClose" onClick={()=>vocabDialog.current?.close()} aria-label="Close definition">×</button><small>COURSE VOCABULARY</small><h2>{term}</h2><p>{glossary[term]||"Definition coming soon."}</p><button className="green" onClick={()=>vocabDialog.current?.close()}>Back to the lesson</button></dialog>
 </div>
}
