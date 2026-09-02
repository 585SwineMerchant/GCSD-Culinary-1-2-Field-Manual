"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import recipes from "./recipes.json";
import {unitContent} from "./unit-content";
import "./globals.css";
import "./unit.css";
type View="home"|"units"|"recipes"|"reference"|"mission";
type Recipe=(typeof recipes)[number];
const units=unitContent.map(u=>[u.title,u.summary]);
const asset=(path:string)=>`${import.meta.env.BASE_URL}${path}`;
const unitImages=["unit-1-kitchen-readiness.png","unit-2-bread-grains-pasta.png","unit-3-flavor-math.png","unit-4-proteins-eggs.png","unit-5-stocks-soups-sauces.png","unit-6-produce-dairy.png","unit-7-baking-pastry.png","unit-8-global-menu.png"].map(name=>asset(`assets/${name}`));
const unitTasks=[
 ["Learn and practice the opening kitchen standards","Complete the six-scene professional-kitchen safety challenge","Produce, store, taste, and evaluate Salsa Fresca","Create and revise the Grade 6 home-kitchen safety challenge"],
 ["Preview the assigned formula and method","Identify the product’s key structure-building step","Complete the assigned bread, grain, or pasta lab","Evaluate structure, texture, and one next-step improvement"],
 ["Complete the assigned flavor, nutrition, or math task","Show calculations with units and check the result","Use a controlled taste-adjust-taste process when assigned","Explain your decision with evidence"],
 ["Preview the assigned egg or protein formula","Identify the required safety temperature and doneness signs","Complete the assigned production lab","Evaluate safety, doneness, texture, and organization"],
 ["Preview the assigned soup, stock, or sauce formula","Identify the flavor-building and thickening sequence","Complete the assigned production lab","Evaluate body, balance, consistency, and finish"],
 ["Preview the assigned produce, potato, or dairy formula","Choose the correct method and quality standard","Complete the assigned production lab","Evaluate color, texture, yield, flavor, and safety"],
 ["Preview the assigned baking formula and mixing method","Identify temperature and structure control points","Complete the assigned production lab","Evaluate volume, tenderness, shape, doneness, and finish"],
 ["Complete the research, proposal, and production plan","Confirm the recipient, safety controls, and quality standard","Produce and serve the approved dish or experience","Submit evidence, feedback, and a specific reflection"]
];
const glossary:Record<string,string>={
 "professionalism":"Behavior that shows workplace readiness, responsibility, respect, communication, and care.",
 "reliability":"Consistently completing the work that other people are counting on you to do.",
 "standard":"An agreed-upon expectation used to decide whether work is safe, correct, and complete.",
 "station":"A worker’s assigned area, tools, ingredients, tasks, and responsibilities.",
 "chain of communication":"The approved route for reporting questions, hazards, injuries, changes, and problems to the correct person.",
 "incident":"An event that causes or could cause injury, illness, or damage.",
 "prevention":"An action that keeps an incident from happening.",
 "report":"Tell the correct person about a hazard, injury, change, or problem.",
 "evacuate":"Leave an unsafe area using the approved route.",
 "personal hygiene":"Habits that keep your body and clothing clean and ready for food work.",
 "handwashing":"Cleaning hands with soap and running water using the approved steps.",
 "illness reporting":"Telling the teacher when symptoms or a diagnosis could make food work unsafe.",
 "ready-to-eat food":"Food that will be eaten without another cooking step.",
 "contamination":"The presence of a harmful biological, chemical, or physical substance in food or on a surface.",
 "mise en place":"Everything in place: ingredients, equipment, information, and work arranged before production begins.",
 "cross-contamination":"The transfer of harmful microorganisms from one food, surface, or person to another.",
 "cross-contact":"The accidental transfer of a food allergen to another food or surface.",
 "clean":"Free of visible food, soil, and debris.",
 "sanitize":"Reduce harmful microorganisms on a cleaned surface to a safe level.",
 "hazard":"A condition or item that can cause injury, illness, or damage.",
 "risk":"The chance that a hazard will cause harm.",
 "corrective action":"A step taken to fix a problem and bring work back to the standard.",
 "verify":"Check that information is correct or that a correction worked.",
 "demonstration":"A teacher model that shows a process and the standard for performing it.",
 "knife safety":"Habits that protect the cook and other people while a knife is selected, carried, used, cleaned, and stored.",
 "recipe":"Written quantities and directions used to produce a food item consistently.",
 "assign":"Give a specific task and responsibility to a team member.",
 "quality":"How well a product meets its intended standard.",
 "finished volume":"The measured amount of completed food produced by a recipe or batch.",
 "waste":"Food or material that is discarded rather than used or served; avoidable waste reduces value.",
 "purchase unit":"The package or quantity in which an ingredient is bought, such as a 32-ounce package, one lime, or one bunch.",
 "purchase price":"The amount paid for one purchase unit.",
 "unit cost":"The cost of one usable measure, such as one ounce, one item, or one bunch.",
 "ingredient cost":"The cost of the quantity of one ingredient used in a recipe.",
 "batch cost":"The total cost of all ingredients used to make one batch.",
 "cost per portion":"The total batch cost divided by the number of portions produced.",
 "label":"Written product identification and required date or storage information.",
 "closeout":"The complete cleaning, storage, return, and inspection of a station.",
 "evaluate":"Judge a product or process using specific evidence and a standard.",
 "texture":"How food feels in the mouth or responds when handled.",
 "flavor":"The combined experience of taste, aroma, texture, temperature, and other sensory information.",
 "process":"The sequence of decisions and actions used to produce a result.",
 "transfer":"Apply learning from one situation to another.",
 "professional kitchen":"A workplace kitchen organized around shared standards, roles, communication, and accountability.",
 "home kitchen":"A household cooking space used by family members or other home cooks.",
 "audience":"The people a product, explanation, or experience is designed to help.",
 "feedback":"Information that helps a person improve work.",
 "revise":"Make a purposeful change to improve accuracy, clarity, or usefulness.",
 "accuracy":"Information, measurement, or work that is correct and dependable.",
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
const sharedCommitments=[
 ["Every Day Is a School Day","Come ready to learn from lessons, labs, feedback, mistakes, and each other.","Design every class, lab, event, and partnership as a real learning opportunity."],
 ["Provide Clear Direction","Ask questions, confirm the goal, and understand the standard before beginning.","Make the goal, directions, quality standard, and next step clear before students work independently."],
 ["Inspect What You Expect","Use checklists, measurements, feedback, and honest self-evaluation to verify your work.","Observe, coach, document, and follow through on the safety, quality, and professional habits we teach."],
 ["Students Advance by Demonstrating Competency","Show what you know and can do consistently; participation alone is not mastery.","Base advancement and increased responsibility on demonstrated knowledge, skill, behavior, and judgment."],
 ["Experiences Provide Evidence. Competencies Determine Progression.","Use each lab, project, event, and reflection to show what you can do and what you need to improve.","Provide meaningful experiences, collect useful evidence, and use that evidence to make progression decisions."],
 ["Learning Before Labor","Treat production as practice with a purpose—not simply as work that needs to be finished.","Accept only work that serves a clear educational purpose and protect students from being used as free labor."],
 ["Preparation Before Independence","Earn independence by preparing carefully, practicing safely, and responding well to coaching.","Teach, model, supervise, and verify readiness before reducing support or increasing responsibility."],
 ["Quality Before Quantity","Complete an appropriate amount of work safely, accurately, and well.","Keep the size and complexity of experiences within the time, staffing, equipment, and support available."],
 ["Build Leaders, Not Just Cooks","Practice communication, teamwork, decision-making, coaching, and responsibility alongside technical skill.","Create structured opportunities for students to lead, contribute, reflect, and grow—not only produce food."],
 ["Travel Rights Are Earned","Represent the pathway beyond the classroom only after showing readiness, professionalism, and sound judgment.","Approve off-campus and public-facing opportunities only when readiness is verified and proper supervision is in place."]
] as const;
export default function Home(){
 const [view,setView]=useState<View>("home"),[unit,setUnit]=useState(1),[lesson,setLesson]=useState(0),[recipe,setRecipe]=useState<Recipe|null>(null),[q,setQ]=useState(""),[done,setDone]=useState<Record<string,boolean>>({});
 const [term,setTerm]=useState("");
 const [menuOpen,setMenuOpen]=useState(false);
 const vocabDialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const x=localStorage.getItem("culinary-progress");if(x)setDone(JSON.parse(x))},[]);
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
 const showLesson=(n:number)=>{setLesson(n);setMenuOpen(false);setTimeout(()=>document.getElementById("lesson")?.scrollIntoView({behavior:"smooth",block:"start"}),0)};
 const previousLesson=()=>{if(lesson>0)showLesson(lesson-1);else if(unit>1){const previousUnit=unit-1;setUnit(previousUnit);setLesson(unitContent[previousUnit-1].lessons.length-1);scrollTo(0,0)}};
 const nextLesson=()=>{if(lesson<content.lessons.length-1)showLesson(lesson+1);else if(unit<units.length){setUnit(unit+1);setLesson(0);scrollTo(0,0)}};
 return <div className="shell">
  <header><button className="brand" onClick={()=>go("home")}><i>✦</i> GCSD Culinary Arts 1 & 2</button><nav>{(["home","units","recipes","reference","mission"] as View[]).map(v=><button className={view===v?"active":""} onClick={()=>go(v)} key={v}>{v==="home"?"⌂ ":v==="units"?"▤ ":v==="recipes"?"♨ ":v==="reference"?"☷ ":"✦ "}{v==="reference"?"Quick Reference":v==="mission"?"Our Program":v[0].toUpperCase()+v.slice(1)}</button>)}</nav></header>
  <main>
  {view==="home"&&<><section className="hero"><div><small>STUDENT FIELD MANUAL</small><h1>Your Culinary Field Manual</h1><p>Learn the skill. Prepare for the lab. Cook with purpose. Return afterward to evaluate the result.</p><div><button className="red" onClick={()=>openUnit(current)}>Continue to Unit {current} →</button><button className="outline" onClick={()=>go("recipes")}>Browse recipes ▤</button></div></div><aside className="heroArt"><img src={asset("assets/homepage-course-illustrations.png")} alt="Hand-drawn culinary tools and foods from across the course"/><small>PREP • PRACTICE • REFLECT</small></aside></section>
  <section className="courseIntro"><div><small>ABOUT THE COURSE</small><h2>Build the foundation for everything that comes next.</h2><p>Culinary Arts 1 &amp; 2 is a full-year introduction to professional kitchen practice. You will learn food and kitchen safety, sanitation, knife and equipment skills, recipe reading, measurement, culinary math, flavor development, cooking methods, baking, teamwork, and professional habits through connected lessons and hands-on labs.</p><p>The goal is bigger than finishing recipes. Each unit helps you become a safer, more capable, more responsible, and more independent culinary professional—and prepares you for Advanced Culinary, Kitchen Management, work-based learning, and future opportunities in food and hospitality.</p></div><aside><small>OUR SHARED APPROACH</small><h3>Prepare. Verify. Improve.</h3><p>Prepare your station and your thinking. Verify safety, quality, and accuracy. Improve through feedback and reflection.</p><button className="outline" onClick={()=>go("mission")}>Read our mission and commitments →</button></aside></section>
  <section className="cards">
   <article className="current"><h2>♨ Current Unit</h2><h3>Unit {current}: {units[current-1][0]}</h3><div className="progressline"><b>{pct(current)}% complete</b><span>{unitTasks[current-1].filter((_,i)=>done[`${current}-${i}`]).length}/4 checkpoints</span></div><div className="bar"><i style={{width:`${pct(current)}%`}}/></div><button className="next" onClick={()=>openUnit(current)}><span>✓</span><b>Next: {unitTasks[current-1].find((_,i)=>!done[`${current}-${i}`])||"Review the completed unit"}</b><strong>›</strong></button><button className="green" onClick={()=>openUnit(current)}>Open Unit {current} →</button></article>
   <article><h2>▤ Recipe Library</h2><p>Ingredients, equipment, and method stay together on one complete preparation page.</p>{[...recipes].sort((a,b)=>a.name.localeCompare(b.name)).slice(0,3).map(r=><button className="row" key={r.name} onClick={()=>{setRecipe(r);setView("recipes")}}><span>♨</span><b>{r.name}</b><strong>›</strong></button>)}<button className="link" onClick={()=>go("recipes")}>Browse all {recipes.length} recipes →</button></article>
   <article><h2>☷ Quick Reference</h2><p>Focused lookup tools for facts you need without reopening an entire unit.</p>{refs.slice(0,3).map(r=><button className="row" key={r[0]} onClick={()=>go("reference")}><span>⌁</span><b>{r[0]}</b><strong>›</strong></button>)}<button className="link" onClick={()=>go("reference")}>View all references →</button></article>
  </section>
  <section className="unitGallery"><div className="galleryHeading"><small>EIGHT CONNECTED UNITS</small><h2>Follow the course. Revisit any station.</h2></div><div>{units.map((u,i)=><button key={u[0]} onClick={()=>openUnit(i+1)}><img src={unitImages[i]} alt="" /><span><small>UNIT {i+1}</small><b>{u[0]}</b></span></button>)}</div></section></>}
  {view==="units"&&!recipe&&<section className="page unitPage"><div className="unitHeading"><div><small>{content.course.toUpperCase()} • UNIT {unit} OF {units.length}</small><h1>{content.title}</h1><p className="lead">{content.summary}</p></div><img src={unitImages[unit-1]} alt="" /></div><nav className="lessonToolbar" aria-label="Lesson navigation"><button className="menuToggle" onClick={()=>setMenuOpen(x=>!x)} aria-expanded={menuOpen} aria-controls="course-menu"><span aria-hidden="true">☰</span> {menuOpen?"Close menu":"Course menu"}</button><button onClick={previousLesson} disabled={unit===1&&lesson===0} aria-label="Open previous lesson">← <span>Previous lesson</span></button><div><small>UNIT {unit} • LESSON {lesson+1} OF {content.lessons.length}</small><b>{activeLesson.title}</b></div><button onClick={nextLesson} disabled={unit===units.length&&lesson===content.lessons.length-1} aria-label="Open next lesson"><span>Next lesson</span> →</button></nav><div className={`unitWorkspace ${menuOpen?"menuOpen":"menuClosed"}`}>
   <aside className="unitRail" id="course-menu" aria-hidden={!menuOpen}><div className="courseMenuHeader"><b>Course menu</b><button onClick={()=>setMenuOpen(false)} aria-label="Close course menu">×</button></div><label className="unitPicker"><span>Choose a unit</span><select value={unit} onChange={e=>openUnit(Number(e.target.value))}>{units.map((u,i)=><option value={i+1} key={u[0]}>Unit {i+1}: {u[0]}</option>)}</select></label><section className="lessonMenu"><small>LESSONS IN THIS UNIT</small><div className="lessonNav">{content.lessons.map((l,i)=><button className={lesson===i?"selectedLesson":""} onClick={()=>showLesson(i)} key={l.title} aria-current={lesson===i?"page":undefined}><span>{i+1}</span><b>{l.title}</b></button>)}</div></section><section className="unitIntro"><small>UNIT OVERVIEW</small><h2>{content.essentialQuestion}</h2><h3>What should stay with you</h3><ul>{content.enduring.map(x=><li key={x}>{x}</li>)}</ul><div className="vocab"><b>Unit vocabulary</b>{content.vocabulary.map(x=><button onClick={()=>showTerm(x)} key={x}>{x}</button>)}</div></section></aside>{menuOpen&&<button className="menuScrim" onClick={()=>setMenuOpen(false)} aria-label="Close course menu"/>}
   <div className="unitDetail"><article className="lesson" id="lesson"><small>LESSON {lesson+1} OF {content.lessons.length}</small><h2>{activeLesson.title}</h2><p className="lessonPurpose">{activeLesson.purpose}</p><h3>Learning targets</h3><ul className="targets">{activeLesson.targets.map(x=><li key={x}>✓ {x}</li>)}</ul>{activeLesson.sections.map(s=><section className="knowledge" key={s.heading}><h3>{s.heading}</h3>{s.text&&<p>{s.text}</p>}{s.points&&<ul>{s.points.map(x=><li key={x}>{x}</li>)}</ul>}</section>)}<aside className="standard"><small>PROFESSIONAL STANDARD</small><p>{activeLesson.standard}</p></aside><div className="lessonColumns"><section><h3>In the kitchen</h3><ul>{activeLesson.kitchen.map(x=><li key={x}>{x}</li>)}</ul></section><section><h3>Check your understanding</h3><ol>{activeLesson.check.map(x=><li key={x}>{x}</li>)}</ol></section></div><aside className="evidence"><small>PORTFOLIO OPPORTUNITY</small><p>{activeLesson.evidence}</p></aside></article><section className="unitResources"><div><h3>Unit progress</h3><div className="checklist">{tasks.map((t,i)=><label key={t}><input type="checkbox" checked={!!done[`${unit}-${i}`]} onChange={()=>toggle(`${unit}-${i}`)}/><span><b>{t}</b><small>{i<2?"Complete before production":"Complete after the lab"}</small></span></label>)}</div></div><div><h3>Connected recipes</h3><div className="connected">{recipes.filter(r=>r.unit===unit).sort((a,b)=>a.name.localeCompare(b.name)).map(r=><button className="row" key={r.name} onClick={()=>setRecipe(r)}><span>♨</span><b>{r.name}</b><strong>›</strong></button>)}</div>{!recipes.some(r=>r.unit===unit)&&<p className="note">This unit develops foundational knowledge without a standalone production formula.</p>}</div></section></div>
  </div></section>}
  {view==="recipes"&&!recipe&&<section className="page"><small>COMPLETE PRODUCTION FORMULAS</small><h1>Recipe Library</h1><p className="lead">Recipes are arranged alphabetically. Open one to prepare, cook, evaluate, or print that recipe alone.</p><label className="search">⌕ <input placeholder="Search all recipes" value={q} onChange={e=>setQ(e.target.value)}/></label><div className="recipeGrid">{filtered.map(r=><button onClick={()=>setRecipe(r)} key={r.name}><div><span>Future in-house photo</span></div><small>UNIT {r.unit}</small><h2>{r.name}</h2><span>{r.ingredients.length} ingredients • Complete recipe →</span></button>)}</div></section>}
  {recipe&&<section className="recipe"><div className="toolbar"><button onClick={()=>setRecipe(null)}>← Back</button><button onClick={()=>print()}>Print this recipe</button></div><article><small>UNIT {recipe.unit} • STANDARDIZED RECIPE</small><h1>{recipe.name}</h1><p className="lead callout">Read ingredients and method together before collecting equipment. Confirm batch, yield, allergens, and instructor adjustments.</p><div className="columns"><div><h2>Ingredients</h2><ul>{recipe.ingredients.map((x,i)=><li key={i}>{x}</li>)}</ul><h2>Equipment</h2><ul>{recipe.equipment.map((x,i)=><li key={i}>{x}</li>)}</ul></div><div><h2>Method</h2><ol>{recipe.method.map((x,i)=><li key={i}>{x}</li>)}</ol></div></div><div className="after"><h2>After the lab</h2><p>Evaluate taste, texture, appearance, safety, organization, and the one change that would most improve the next attempt.</p></div></article></section>}
  {view==="reference"&&<section className="page referencePage"><small>FAST, REUSABLE LOOKUP TOOLS</small><h1>Quick Reference</h1><p className="lead">Reference tools follow course-use order: safety first, then measuring, math, recipe reading, quality, knife cuts, and an A–Z glossary.</p><div className="refGrid">{refs.map(r=><article key={r[0]}><i>⌁</i><h2>{r[0]}</h2><ul>{r[1].map(x=><li key={x}>{x}</li>)}</ul></article>)}</div><section className="knifeReference"><small>VISUAL REFERENCE</small><h2>Foundational knife cuts</h2><p>Dimensions are the target. Safe control and reasonable consistency come before speed.</p><div className="cutGrid"><div><i className="cut batonnet"></i><b>Batonnet</b><span>¼ × ¼ × 2–2½ in</span></div><div><i className="cut julienne"></i><b>Julienne</b><span>⅛ × ⅛ × 2 in</span></div><div><i className="cut largeDice"></i><b>Large dice</b><span>¾ in cube</span></div><div><i className="cut mediumDice"></i><b>Medium dice</b><span>½ in cube</span></div><div><i className="cut smallDice"></i><b>Small dice</b><span>¼ in cube</span></div><div><i className="cut brunoise"></i><b>Brunoise</b><span>⅛ in cube</span></div><div><i className="cut chiffonade"></i><b>Chiffonade</b><span>Thin ribbons</span></div><div><i className="cut mince"></i><b>Mince</b><span>Very fine pieces</span></div></div></section><section className="glossary"><small>COURSE VOCABULARY • A–Z</small><h2>Clickable glossary</h2><p>Choose any term to see its definition without leaving this page.</p><dl>{glossaryEntries.map(([word,definition])=><div key={word}><dt><button onClick={()=>showTerm(word)}>{word}</button></dt><dd>{definition}</dd></div>)}</dl></section></section>}
  {view==="mission"&&<section className="page missionPage"><small>WHY WE WORK THIS WAY</small><h1>Our Mission &amp; Commitments</h1><p className="lead">The GCSD Culinary Pathway is one connected learning sequence, not a collection of separate electives. Students build skill through instruction, practice, authentic experience, feedback, and reflection. Greater opportunity and responsibility follow demonstrated competency.</p><section className="missionStatement"><div><small>OUR MISSION</small><h2>Learn with purpose. Grow through practice. Earn greater responsibility.</h2><p>We develop confident, reflective, professionally minded students through authentic culinary experiences. The goal is to prepare students for meaningful careers, lifelong learning, and responsible leadership—not simply to finish recipes.</p></div><div><small>HOW WE LEARN</small><h2>Why → Learn → Practice → Apply → Experience → Reflect → Grow</h2><p>Each step builds on the one before it. We explain the purpose, teach the skill, practice it with support, apply it in real work, study the evidence, and use feedback to improve.</p></div></section><section className="commitmentMatrix"><small>WHAT WE PROMISE EACH OTHER</small><h2>Our shared commitments</h2><p>The same operating principles create responsibilities on both sides. Students commit to the habits that build readiness. The program commits to the instruction, support, evidence, and fair decisions that make growth possible.</p><div className="commitmentHead"><b>Operating principle</b><b>Student commitment</b><b>Program commitment</b></div>{sharedCommitments.map(([title,student,program],i)=><article key={title}><h3><span>{i+1}</span>{title}</h3><div><small>STUDENT COMMITMENT</small><p>{student}</p></div><div><small>PROGRAM COMMITMENT</small><p>{program}</p></div></article>)}</section></section>}
  </main><footer><span>GCSD Culinary Arts 1 & 2</span><span>Prepare before the lab • Reflect afterward</span></footer><dialog ref={vocabDialog} className="vocabDialog" onClick={e=>{if(e.target===e.currentTarget)e.currentTarget.close()}}><button className="dialogClose" onClick={()=>vocabDialog.current?.close()} aria-label="Close definition">×</button><small>COURSE VOCABULARY</small><h2>{term}</h2><p>{glossary[term]||"Definition coming soon."}</p><button className="green" onClick={()=>vocabDialog.current?.close()}>Back to the lesson</button></dialog>
 </div>
}
