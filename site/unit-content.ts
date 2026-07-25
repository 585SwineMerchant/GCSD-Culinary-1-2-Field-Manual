export type Lesson = {
  title: string;
  purpose: string;
  targets: string[];
  sections: { heading: string; text?: string; points?: string[] }[];
  standard: string;
  kitchen: string[];
  check: string[];
  evidence: string;
};

export type UnitContent = {
  title: string;
  course: "Culinary Arts 1" | "Culinary Arts 2";
  summary: string;
  essentialQuestion: string;
  enduring: string[];
  vocabulary: string[];
  lessons: Lesson[];
};

const lesson = (
  title: string, purpose: string, targets: string[], sections: Lesson["sections"],
  standard: string, kitchen: string[], check: string[], evidence: string
): Lesson => ({title,purpose,targets,sections,standard,kitchen,check,evidence});

export const unitContent: UnitContent[] = [
  {
    title:"Kitchen Readiness", course:"Culinary Arts 1",
    summary:"Get ready to work safely. Learn the habits, tools, and routines you will use in every kitchen lab.",
    essentialQuestion:"What needs to be in place before safe, organized kitchen work can begin?",
    enduring:["Professionalism is observable through preparation, communication, responsibility, and follow-through.","Safety and sanitation are production skills, not rules that sit beside production.","Mise en place organizes ingredients, equipment, information, people, and time before work begins.","Control and consistency matter more than speed."],
    vocabulary:["mise en place","cross-contamination","cross-contact","sanitize","TCS food","FIFO","conduction","convection","radiation"],
    lessons:[
      lesson("Professional Habits & Kitchen Communication","Professional habits make other people able to trust your work.",
        ["Describe professionalism through observable behavior.","Use brief, respectful kitchen communication.","Complete opening and closing responsibilities.","Report mistakes and hazards immediately."],
        [{heading:"The daily professional routine",points:["Arrive prepared and in complete uniform.","Store personal items where directed and wash hands before touching food, equipment, or sanitized surfaces.","Read the objective, recipe, production plan, and station assignment before gathering anything.","Confirm roles, timing, and communication with the team.","Work cleanly and ask for help before a small problem becomes a major one.","Complete closing duties and leave the station inspection-ready."]},{heading:"Useful kitchen language",text:"“Behind,” “hot,” “sharp,” “corner,” “heard,” and “may I clarify?” prevent collisions and confusion. Communication should tell the team what it needs to know without adding noise."},{heading:"When you finish early",text:"Verify your own work, complete assigned cleaning, ask what the team needs, and remain responsible for the shared result."}],
        "A prepared student is present, properly dressed, informed about the task, ready to work, and responsible through closing.",
        ["Use the opening checklist before every lab.","State hazards aloud when moving through shared space.","End each lab by checking the station from the next user’s point of view."],
        ["What makes professionalism observable rather than subjective?","Why is reporting a mistake immediately professional?","What should you do after completing your assigned task early?"],
        "Opening/closing checklist, teamwork feedback, or a reflection describing one professional habit you improved."),
      lesson("Kitchen Safety & Emergency Response","Safe habits come before production.",
        ["Recognize heat, sharp-tool, electrical, chemical, slip, lifting, and traffic hazards.","Prevent burns and cuts.","Respond correctly to an injury, spill, fire, or damaged tool.","Locate and use classroom emergency information."],
        [{heading:"Burn prevention",points:["Assume metal near cooking equipment may be hot.","Use clean, dry towels or approved mitts; moisture can become burning steam.","Turn handles away from aisle traffic and open lids away from your face.","Announce “hot” before moving a pan or liquid.","Never add water to hot oil."]},{heading:"Cut or injury response",points:["Stop work and place the tool safely down.","Tell the instructor immediately.","Follow first-aid and contamination procedures.","Discard contaminated food and clean and sanitize affected surfaces as directed.","Document the incident when required."]},{heading:"Chemical and equipment safety",points:["Keep chemicals labeled and separate from food.","Never mix chemicals unless the manufacturer directs it.","Do not bypass guards or safety switches.","Remove damaged equipment from use and report unusual heat, sound, smell, sparks, or performance."]}],
        "No deadline or product is more important than controlling a hazard and communicating it.",
        ["Identify two hazards before starting production.","Keep dry heat protection accessible.","Stop and report any damaged tool, spill, injury, or unsafe condition."],
        ["Why can a wet towel increase burn risk?","What is your first responsibility after finding a spill?","Describe the correct response to a kitchen injury."],
        "Completed safety inspection, health-inspector challenge record, or instructor observation."),
      lesson("Food Safety, Sanitation & Allergens","Safe food protects every person who eats it.",
        ["Explain biological, chemical, and physical contamination.","Control time and temperature.","Distinguish cross-contamination from allergen cross-contact.","Wash hands and clean and sanitize correctly."],
        [{heading:"FAT TOM and TCS food",text:"Food, Acidity, Time, Temperature, Oxygen, and Moisture support bacterial growth. Kitchens focus especially on time, temperature, and contamination. Cold holding is 41°F or lower; hot holding is 135°F or higher."},{heading:"Cross-contamination and cross-contact",points:["Store raw animal products below ready-to-eat food.","Use separate equipment or fully clean and sanitize between tasks.","Change gloves when contaminated, torn, or used for a new task.","Use tasting utensils once.","Check labels and recipes before discussing allergens.","Never promise that food is allergen-free without an approved procedure."]},{heading:"Clean and sanitize",points:["Remove food and soil.","Wash with the correct detergent.","Rinse with clean water.","Sanitize with the approved method and concentration.","Air-dry completely."]},{heading:"The nine major allergens",text:"Milk, eggs, fish, crustacean shellfish, tree nuts, peanuts, wheat, soybeans, and sesame."}],
        "Record actual measurements honestly. A missing or false safety check is not acceptable evidence.",
        ["Wash hands for at least 20 seconds and whenever contamination may have occurred.","Use a clean, calibrated thermometer.","Build raw-to-ready separation into the station plan."],
        ["What is the difference between cross-contamination and cross-contact?","List the five cleaning and sanitizing steps.","Why are raw animal foods stored below ready-to-eat foods?"],
        "Temperature log, sanitation check, allergen analysis, or Grade 6 safety teaching material."),
      lesson("Equipment, Knives, Measurement & Cooking Methods","Use the right tool. Use it safely. Leave it ready for the next person.",
        ["Set up a stable cutting station and use a claw grip.","Identify foundational knife cuts.","Read and scale a standardized recipe.","Choose a cooking method based on the ingredient and intended result."],
        [{heading:"Knife standard",points:["Place a damp towel or nonslip mat under the board.","Inspect the knife and keep the station clear.","Carry the knife pointed down; announce “sharp.”","Never place knives in sinks or under towels.","Use a bench scraper—not the cutting edge—to move food.","Honing realigns an edge; sharpening removes metal to create a new edge."]},{heading:"Foundational cuts",text:"Slice, dice, julienne, brunoise, batonnet, chiffonade, and mince. A correct cut is safe, appropriately sized, reasonably uniform, and suited to the recipe."},{heading:"Recipe and measurement",text:"A standardized recipe identifies yield, ingredients, quantities, equipment, procedure, temperatures, timing, and quality standards. Conversion factor = desired yield ÷ original yield. Recheck pan size, equipment capacity, cooking time, and procedure after scaling."},{heading:"Heat and method",text:"Conduction transfers heat by contact, convection through moving air or liquid, and radiation through waves. Select dry, moist, or combination methods by tenderness, thickness, moisture, connective tissue, desired browning, time, and equipment."}],
        "Accuracy, safety, and consistency come before speed.",
        ["Read the complete formula before gathering ingredients.","Work backward from service time.","Judge doneness with temperature and quality indicators, not the clock alone."],
        ["Why does cut uniformity matter beyond appearance?","How is a conversion factor calculated?","What is carryover cooking?"],
        "Knife-skills record, scaled recipe, mise en place plan, or cooking-method comparison.")
    ]
  },
  {
    title:"Bread, Fermentation, Grains & Pasta", course:"Culinary Arts 1",
    summary:"Learn how measurement, mixing, time, and heat turn simple ingredients into breads, grains, and pasta.",
    essentialQuestion:"How do measurement, mixing, time, and heat build structure?",
    enduring:["Baking rewards precision.","Fermentation is alive and must be judged by the dough, not only by the clock.","Grains and pasta require method-specific texture standards.","Resting can hydrate ingredients and relax gluten."],
    vocabulary:["gluten","fermentation","proof","knead","hydration","al dente","pilaf","risotto"],
    lessons:[
      lesson("Baking Foundations & Quick Breads","Small measurement and mixing errors create large changes in baked products.",
        ["Explain the functions of major baking ingredients.","Distinguish muffin, biscuit, and creaming methods.","Prevent overmixing.","Evaluate volume, crumb, color, texture, and doneness."],
        [{heading:"Ingredient functions",points:["Flour builds structure; liquid hydrates starch and proteins.","Fat tenderizes and carries flavor; sugar sweetens, browns, tenderizes, and holds moisture.","Eggs add structure, richness, color, emulsification, and leavening.","Salt controls flavor and strengthens structure; chemical leaveners produce gas."]},{heading:"Mixing methods",points:["Muffin method: combine dry and wet mixtures separately, then mix only until combined.","Biscuit method: cut cold fat into dry ingredients, add liquid, and handle gently.","Creaming method: beat fat and sugar to trap air before adding remaining ingredients."]},{heading:"Troubleshooting",text:"Tough quick breads often come from overmixing or excess flour. Low volume can come from expired leavener, inaccurate measurement, or incorrect mixing."}],
        "Use weight when assigned, follow the mixing method, and stop mixing when the required structure has formed.",
        ["Preheat and prepare pans before mixing.","Keep biscuit fat cold.","Check doneness in the correct location."],
        ["Why is accurate measurement especially important in baking?","How do the muffin and creaming methods differ?","Why can overmixing toughen a quick bread?"],
        "Product-quality evaluation comparing waffles/pancakes, biscuits, or banana bread."),
      lesson("Yeast, Fermentation & Dough Development","Yeast activity changes with temperature, time, sugar, salt, hydration, and dough strength.",
        ["Describe fermentation.","Develop and assess gluten.","Judge proofing from dough evidence.","Diagnose dense or poorly browned bread."],
        [{heading:"Control points",points:["Confirm yeast is active and ingredients are at the assigned temperature.","Mix and knead until the dough reaches the required development.","Protect fermentation temperature and time.","Shape without destroying all internal gas.","Proof until the dough shows assigned readiness signs.","Bake for structure, color, and internal doneness."]},{heading:"Diagnose before blaming",text:"Dense bread may result from weak development, underproofing, inactive yeast, or poor fermentation control. Excessive salt can slow yeast; excessive heat can damage it; insufficient time can limit gas production."}],
        "The clock guides the process, but the condition of the dough determines readiness.",
        ["Record dough temperature or room conditions when directed.","Compare dough before and after fermentation.","Evaluate crust, crumb, volume, aroma, and internal doneness."],
        ["What conditions influence fermentation?","How can you tell that dough is developed?","Why should proofing not be judged by time alone?"],
        "Fermentation notes and product evaluation from pizza dough, focaccia, naan, or cinnamon rolls."),
      lesson("Grains, Starches & Fresh Pasta","Ingredient knowledge helps preserve quality and reduce waste.",
        ["Select a grain method.","Prepare pasta to an appropriate texture.","Make, rest, roll, and cut fresh pasta.","Evaluate hydration and doneness."],
        [{heading:"Method-specific standards",points:["Steamed or boiled rice: tender grains with appropriate separation.","Risotto: creamy surrounding texture with correctly cooked grains.","Polenta or grits: smooth, fully hydrated, and seasoned.","Potatoes: texture appropriate to variety and method.","Pasta: tender with slight firmness when appropriate, never mushy."]},{heading:"Fresh pasta process",points:["Measure flour and eggs accurately.","Develop a smooth, elastic dough.","Rest to relax gluten and hydrate flour.","Roll gradually to prevent tearing.","Cut uniformly and protect from sticking.","Cook briefly and evaluate before draining."]}],
        "Texture must match the ingredient, method, and intended dish.",
        ["Salt cooking water as directed.","Taste for doneness before draining.","Reserve useful cooking liquid when the formula requires it."],
        ["What distinguishes risotto from steamed rice?","Why is pasta dough rested?","What makes pasta al dente?"],
        "Fresh-pasta process record or grain-method quality comparison.")
    ]
  },
  {
    title:"Nutrition, Flavor & Kitchen Mathematics", course:"Culinary Arts 1",
    summary:"Taste with purpose. Use nutrition and kitchen math to make food that is balanced, safe, and realistic.",
    essentialQuestion:"How do you make food safe, balanced, appropriate, and realistic?",
    enduring:["Flavor combines taste, aroma, texture, temperature, appearance, and sound.","Seasoning is a controlled process of tasting, identifying, adjusting, and retasting.","Never guess about an allergy.","Cost, value, nutrition, and quality are related but not interchangeable."],
    vocabulary:["umami","aroma","seasoning","AP","EP","yield percent","portion cost","conversion factor"],
    lessons:[
      lesson("Taste, Flavor & Controlled Seasoning","Seasoning should make food taste more like itself, not simply taste salty.",
        ["Distinguish taste from flavor.","Identify sweet, sour, salty, bitter, and umami.","Adjust one variable at a time.","Evaluate balance in relation to the intended dish."],
        [{heading:"Taste and flavor",text:"Taste receptors detect sweet, sour, salty, bitter, and umami. Aroma comes through the nose. Flavor combines taste with aroma, texture, temperature, appearance, and sound."},{heading:"Controlled adjustment",points:["Taste only when safe and permitted, using a clean utensil once.","Identify what is missing: salt, acid, sweetness, depth, aroma, or texture.","Make one small adjustment.","Mix, allow the adjustment to distribute, and taste again.","Record the useful change when consistency matters."]},{heading:"Balance is contextual",text:"A curry, soup, bread, sauce, and dessert do not share one universal balance. Evaluate whether flavor is appropriate to the dish and culinary tradition."}],
        "Diagnose before adding. One controlled change gives useful evidence; several changes at once hide the cause.",
        ["Use a tasting plan.","Name the problem before selecting the correction.","Compare the final flavor to the product goal."],
        ["How is taste different from flavor?","Why adjust one variable at a time?","What can acid change besides sourness?"],
        "Flavor-adjustment log or before-and-after sensory evaluation."),
      lesson("Nutrition, Dietary Needs & Allergen Responsibility","Plan food that is safe, appropriate, and satisfying.",
        ["Identify nutrient categories.","Recognize common dietary needs.","Explain how cooking choices affect nutrition.","Communicate honestly about ingredients and allergens."],
        [{heading:"Nutrient categories",points:["Carbohydrates provide energy, fiber, and food structure.","Protein supports growth, repair, enzymes, and structure.","Fat provides energy, flavor, vitamins, and cell function.","Vitamins and minerals support body processes and regulation.","Water supports hydration, temperature control, and transport."]},{heading:"Planning considerations",points:["Vegetarian and vegan choices require checking hidden ingredients.","Gluten-related restrictions require attention to wheat, barley, rye, labels, and shared equipment.","Lactose tolerance varies and alternatives perform differently.","Religious and cultural practices deserve accurate, respectful planning.","Food allergies require cross-contact prevention and verified ingredients."]},{heading:"Never guess",text:"When you do not know, say that you do not know and ask the instructor or responsible supervisor. Confidence without verification is dangerous."}],
        "An adaptation must remain safe, satisfying, and honest about what it contains.",
        ["Review labels before production.","Identify shared-equipment risks.","Evaluate whether an adaptation still meets the dish’s purpose."],
        ["How can a cooking method change nutrition?","Why are ingredient substitutions not always equivalent?","What should you say when you cannot verify an allergen question?"],
        "Recipe allergen analysis or a justified dietary adaptation."),
      lesson("Yield, Portions, Cost & Menu Decisions","Kitchen mathematics connects ingredients to the real production plan.",
        ["Use common conversions.","Differentiate as-purchased and edible-portion quantities.","Calculate yield percent and portion cost.","Explain how cost affects menu decisions."],
        [{heading:"Core formulas",points:["Conversion factor = desired yield ÷ original yield.","New quantity = original quantity × conversion factor.","Yield percent = edible portion ÷ as-purchased quantity × 100.","Cost per portion = total recipe cost ÷ portions produced."]},{heading:"AP and EP",text:"As-purchased quantity includes trim and waste. Edible portion is the usable amount. Ten pounds of carrots producing eight pounds of usable carrots has an 80% yield."},{heading:"Cost and value",text:"A low-cost dish can still be a poor choice if it wastes labor, equipment capacity, time, or ingredients. A professional plan considers the entire operation."},{heading:"Menu performance",text:"A star is high popularity/high contribution; a plowhorse is high/low; a puzzle is low/high; and a dog is low/low. These labels support analysis, not automatic decisions."}],
        "Show the calculation, label the unit, and test whether the result is realistic.",
        ["Verify yield before scaling.","Use realistic portion sizes.","Recheck equipment capacity after changing batch size."],
        ["What is the difference between AP and EP?","How do you calculate cost per portion?","Why is lowest ingredient cost not always best value?"],
        "Scaled formula, yield test, virtual-shopping sheet, or portion-cost analysis.")
    ]
  },
  {
    title:"Proteins & Eggs", course:"Culinary Arts 1",
    summary:"Cook eggs and proteins safely while building the texture, flavor, and doneness the dish needs.",
    essentialQuestion:"How does the protein tell you which method and doneness it needs?",
    enduring:["Quality and safety are separate checks.","Connective tissue, fat, thickness, and tenderness influence method selection.","Egg proteins change quickly under heat.","Resting and carryover cooking affect final doneness."],
    vocabulary:["fabrication","coagulation","emulsion","brine","carryover cooking","connective tissue"],
    lessons:[
      lesson("Protein Selection, Fabrication & Method","Choose a method based on the product rather than habit.",
        ["Identify quality and storage considerations.","Prevent contamination during fabrication.","Match tenderness and structure to a cooking method.","Verify safe temperature and dish-appropriate quality."],
        [{heading:"Match product to method",points:["Tender cuts: fast dry heat such as sauté, grill, roast, or broil.","More connective tissue: combination methods such as braise or stew.","Ground products: careful sanitation and required final temperature.","Delicate fish: gentle sauté, poach, steam, or bake.","Large roasts or whole poultry: even heat, correct thermometer placement, and resting."]},{heading:"Safe fabrication",points:["Keep raw product and ready-to-eat food separate.","Use clean, sanitized tools and boards.","Return product to temperature control promptly.","Do not wash raw poultry in the sink.","Clean and sanitize after fabrication."]},{heading:"Safety and quality",text:"A protein may reach a safe temperature and still be dry, tough, greasy, or poorly seasoned. Professional performance requires both checks."}],
        "Use the required thermometer location and temperature while also protecting texture, moisture, seasoning, and presentation.",
        ["Plan the raw-product workflow.","Use separate quality and safety checkpoints.","Account for resting and carryover."],
        ["Why should raw poultry not be washed?","How does connective tissue affect method selection?","Why are safety and quality evaluated separately?"],
        "Protein method justification, temperature log, or product-quality evaluation."),
      lesson("Brining, Breading & Frying Control","Layer technique while controlling moisture, adhesion, oil, and final temperature.",
        ["Explain how brining changes seasoning and moisture.","Build an organized breading station.","Control oil temperature and batch size.","Evaluate crust, interior moisture, and safety."],
        [{heading:"Brine control",text:"Concentration, contact time, product size, and temperature matter. Keep poultry under safe temperature control and follow the standardized formula."},{heading:"Breading system",points:["Prepare dry, wet, and final coating stages in order.","Keep one hand dry and one hand wet when practical.","Coat completely without heavy clumps.","Rest breaded product when directed."]},{heading:"Frying",points:["Do not overload the fryer or pan.","Monitor oil temperature between batches.","Lower food safely and never add water to hot oil.","Verify internal temperature and drain without trapping steam."]}],
        "The coating should adhere and brown while the interior remains moist and reaches the required safe temperature.",
        ["Sequence the station before touching raw poultry.","Track oil recovery between batches.","Avoid cross-contaminating finished product."],
        ["How can an overloaded batch affect quality?","Why separate wet and dry breading work?","What evidence shows both safety and quality?"],
        "Chicken-nugget production record with temperatures and quality notes."),
      lesson("Egg Functions, Coagulation & Custards","Control temperature to protect texture and safety.",
        ["Explain egg functions.","Prepare eggs using controlled heat.","Prevent curdling and overcoagulation.","Use eggs to structure, bind, thicken, coat, leaven, or emulsify."],
        [{heading:"Egg functions",points:["Structure in cakes, custards, and mixtures.","Emulsification in mayonnaise and hollandaise.","Leavening in foams and sponge products.","Binding in breaded or shaped foods.","Coating in egg wash and breading.","Thickening in custards and sauces.","Color and richness in pasta and baked goods."]},{heading:"Heat control",text:"Egg proteins coagulate as they heat. Excess temperature or time squeezes out moisture and creates curdling, toughness, or weeping. Gentle, even heat and correct doneness indicators protect texture."}],
        "Finished egg products meet both their temperature requirement and their intended texture.",
        ["Use gentle heat for delicate egg products.","Temper when combining eggs with hot liquid.","Remove products with carryover cooking in mind."],
        ["What is coagulation?","How do eggs function in an emulsion?","Why can high heat damage a custard?"],
        "Crème brûlée or egg-technique evaluation explaining heat control.")
    ]
  },
  {
    title:"Stocks, Soups, Sauces & Emulsions", course:"Culinary Arts 2",
    summary:"Build flavor in layers. Use stocks, herbs, spices, thickening, and finishing to create soups and sauces.",
    essentialQuestion:"How do you build flavor in layers and finish it with control?",
    enduring:["A simmer extracts differently from a boil.","Sauce consistency must suit its use.","Herbs and spices require timing and control.","Emulsions depend on ratio, temperature, and gradual incorporation."],
    vocabulary:["stock","broth","roux","slurry","reduction","liaison","emulsion","aromatics","mother sauce"],
    lessons:[
      lesson("Herbs, Spices & Aromatic Flavor Building","Build flavor in layers so each ingredient has a clear job.",
        ["Distinguish herbs, spices, and aromatics.","Choose whole, ground, fresh, or dried forms.","Control bloom, toast, steep, and finishing timing.","Avoid muddy or overpowering flavor."],
        [{heading:"Forms and timing",points:["Fresh delicate herbs are often added late.","Hardy herbs can tolerate longer cooking.","Whole spices release gradually and may need removal.","Ground spices release quickly and can burn.","Toasting or blooming in fat can develop aroma when controlled."]},{heading:"Build in layers",text:"Aromatics establish the base; herbs and spices add identity; stock or liquid carries flavor; reduction concentrates; finishing salt, acid, fat, or fresh herbs completes balance."}],
        "Seasoning should support the dish, not overpower it. Taste, identify, adjust, and taste again.",
        ["Smell and identify before adding.","Record amount and timing.","Taste after adequate distribution time."],
        ["Why might delicate herbs be added late?","What happens when ground spices burn?","How does fat affect spice aroma?"],
        "Spice comparison, mulled-cider analysis, or documented seasoning adjustment."),
      lesson("Stocks, Broths & Flavor Extraction","A controlled simmer extracts flavor while protecting clarity and quality.",
        ["Differentiate stock and broth.","Identify white, brown, vegetable, and fish stocks.","Use simmering, skimming, and straining procedures.","Cool and store safely."],
        [{heading:"Stock families",points:["White stock: bones and aromatics without deep browning.","Brown stock: browned bones and aromatics.","Vegetable stock: vegetables and aromatics with shorter extraction.","Fish stock or fumet: delicate bones and aromatics cooked briefly.","Broth: flavorful liquid often made with meat and suitable for direct service."]},{heading:"Control points",points:["Start with the formula’s assigned temperature and ratio.","Maintain a simmer rather than a violent boil.","Skim impurities as directed.","Strain without forcing solids through.","Cool rapidly using the approved method, label, date, and store."]}],
        "Finished stock has clean, appropriate flavor and body and has been handled safely from extraction through cooling.",
        ["Avoid unnecessary stirring.","Keep solids submerged as directed.","Record cooling controls."],
        ["How does stock differ from broth?","Why can boiling cloud a stock?","Why does fish stock use a shorter extraction?"],
        "Chicken-stock process record or stock-quality evaluation."),
      lesson("Soups, Mother Sauces & Thickening","Use the correct system to create the intended body, flavor, and finish.",
        ["Classify soups.","Identify the five mother sauces.","Select a thickener.","Diagnose consistency and flavor."],
        [{heading:"Soup categories",text:"Clear, thickened, purée, chowder, specialty or regional, and cold soups each require different body and finishing standards."},{heading:"Mother sauces",points:["Béchamel: milk and white roux.","Velouté: light stock and roux.","Espagnole: brown stock, brown roux, and aromatics.","Tomato: tomato base and aromatics.","Hollandaise: warm egg-yolk and butter emulsion."]},{heading:"Thickening systems",points:["Roux: cooked fat and flour.","Slurry: starch dispersed in cold liquid.","Reduction: evaporation concentrates body and flavor.","Purée: vegetables, legumes, or starch provide body.","Liaison: egg yolk and cream finish carefully.","Emulsion: technique suspends fat and liquid."]}],
        "Body, seasoning, temperature, and garnish fit the soup or sauce and its intended use.",
        ["Cook roux to the assigned stage.","Add slurry gradually and allow starch to cook.","Evaluate formula-specific consistency."],
        ["How does a roux differ from a slurry?","Name the five mother sauces.","Why does reduction change both body and flavor?"],
        "Béchamel, red sauce, or chicken-noodle-soup evaluation."),
      lesson("Emulsions & Sauce Repair","Temperature, ratio, and gradual incorporation determine whether liquids remain combined.",
        ["Explain temporary and stable emulsions.","Build mayonnaise safely.","Recognize a broken emulsion.","Use a controlled repair when appropriate."],
        [{heading:"How emulsions work",text:"An emulsion disperses one liquid in another liquid that normally separates. An emulsifier helps stabilize droplets. Adding fat too quickly, using poor ratios, or losing temperature control can break the system."},{heading:"Prevention and repair",points:["Begin with ingredients at the assigned temperature.","Add the dispersed phase slowly while mixing continuously.","Stop and diagnose at the first sign of separation.","Repair with a fresh base only when the approved method permits it."]}],
        "The sauce is smooth, stable for its intended service, properly seasoned, and handled safely.",
        ["Control addition rate.","Watch texture instead of following time blindly.","Keep raw-egg products under the approved safety procedure."],
        ["What causes an emulsion to break?","Why is gradual incorporation important?","Why is prevention easier than repair?"],
        "Mayonnaise production notes or emulsion troubleshooting record.")
    ]
  },
  {
    title:"Fruits, Vegetables, Potatoes & Dairy", course:"Culinary Arts 2",
    summary:"Choose the right method for each ingredient and protect its color, texture, flavor, and value.",
    essentialQuestion:"How do you stop cooking when the ingredient is at its best?",
    enduring:["The ingredient’s structure and intended result determine the method.","Uniform cuts support even cooking and portioning.","Blanching and shocking separate partial cooking from final service.","Dairy requires temperature control to prevent scorching, curdling, and separation."],
    vocabulary:["blanch","shock","purée","curdle","cultured dairy","yield"],
    lessons:[
      lesson("Produce Selection, Cuts & Method","Protect quality and reduce waste from receiving through service.",
        ["Evaluate produce quality.","Choose cuts and methods.","Protect color, texture, and nutrients.","Use trim responsibly."],
        [{heading:"Quality goals",points:["Protect color by avoiding unnecessary overcooking.","Protect texture with a method suited to the ingredient’s structure.","Reduce waste through careful trimming and usable trim recovery.","Develop flavor with roast, sauté, grill, steam, braise, or blanch methods.","Improve presentation with consistent cuts and portions."]},{heading:"Method decision",text:"Consider density, water content, natural sugar, desired browning, final texture, service timing, and whether the product will be cooked again."}],
        "Cook produce to the texture the dish needs—not simply until it becomes soft.",
        ["Wash before cutting.","Separate usable trim as directed.","Taste at multiple points to identify the correct stopping point."],
        ["How does cut size affect cooking?","Why can overcooking dull color?","List three ways to reduce vegetable waste."],
        "Produce yield record or method comparison."),
      lesson("Blanching, Shocking, Potatoes & Starches","Control partial cooking, color, texture, and later service.",
        ["Explain blanching and shocking.","Prepare an ice bath correctly.","Choose potato methods by variety and desired texture.","Prevent waterlogging or uneven cooking."],
        [{heading:"Blanch and shock",text:"Blanching briefly cooks food in boiling water. Shocking cools it rapidly in ice water to stop cooking. The process can set color, partially cook vegetables, loosen skins, or prepare food for later service. Drain and store safely afterward."},{heading:"Potato control",points:["Choose a variety suited to the method.","Cut uniformly.","Start in the assigned water temperature.","Control agitation to prevent breakdown.","Drain and dry when the next method requires browning."]}],
        "Partial cooking stops at the intended stage and the product is cooled, drained, and stored correctly.",
        ["Have the ice bath ready before blanching.","Do not overload the water.","Label products prepared for later service."],
        ["What is the purpose of shocking?","Why must blanched food be drained?","How does potato variety affect method?"],
        "Blanch/shock process check or pumpkin-gnocchi texture analysis."),
      lesson("Milk, Cream, Butter, Cheese & Cultured Dairy","Use heat and acidity carefully to protect dairy texture.",
        ["Identify dairy products and uses.","Prevent scorching and curdling.","Select cheese for melting or finishing.","Compare dairy and plant-based alternatives."],
        [{heading:"Control points",points:["Milk: avoid scorching and maintain cold storage.","Cream: control reduction and do not overwhip.","Butter: understand smoke point and prevent burning.","Cheese: match melting behavior to the dish.","Cultured dairy: add carefully because acid and high heat can curdle.","Plant-based alternatives: check allergens and performance differences."]},{heading:"Fresh cheese",text:"Acid and heat can coagulate milk proteins. Curds must be handled gently, drained to the intended moisture, seasoned appropriately, and cooled safely."}],
        "Dairy contributes the intended richness, structure, acidity, or texture without scorching, greasiness, or unwanted separation.",
        ["Use moderate heat and stir where the formula directs.","Watch the product’s texture, not only temperature.","Store finished dairy products promptly."],
        ["Why can cultured dairy curdle?","What controls whipped-cream texture?","How does acid help create fresh ricotta?"],
        "Fresh-ricotta process record or dairy troubleshooting reflection.")
    ]
  },
  {
    title:"Pastry, Cookies, Cakes & Advanced Baking", course:"Culinary Arts 2",
    summary:"Use precise mixing, temperature, shaping, baking, and cooling to create tender pastries and baked goods.",
    essentialQuestion:"How do small, precise choices create tenderness, lift, and a clean finish?",
    enduring:["Different products need different kinds of structure.","Temperature controls fat behavior and spread.","Overmixing can create toughness or tunneling.","A product is not finished until it has cooled, set, and been evaluated."],
    vocabulary:["lamination","creaming","aeration","custard","blind bake","tenderness"],
    lessons:[
      lesson("Cookies & Creaming","Control aeration, spread, texture, portion, and doneness.",
        ["Use the creaming method.","Portion consistently.","Control dough and pan temperature.","Diagnose spread and toughness."],
        [{heading:"Control points",points:["Use fat at the assigned temperature.","Cream only to the required aeration.","Add eggs gradually and scrape the bowl.","Mix flour only until incorporated.","Portion uniformly on cool prepared pans.","Remove at dish-appropriate doneness and cool before moving."]},{heading:"Troubleshooting",text:"Excessive spreading may come from warm dough, too much fat or sugar, weak flour structure, or hot pans. Tough texture often comes from overmixing or excess flour."}],
        "Cookies are uniform in size, spread, color, texture, and doneness.",
        ["Check pan temperature between batches.","Use a consistent scoop or weight.","Compare edge and center doneness."],
        ["How does fat temperature affect spread?","Why can hot pans create inconsistency?","What causes toughness?"],
        "Chocolate-chip or gingerbread cookie batch comparison."),
      lesson("Pie Dough, Fillings & Pastry","Limit gluten while controlling fat, water, rest, shape, and final bake.",
        ["Use the pie-dough method.","Recognize correct hydration.","Rest and roll without stretching.","Prepare and evaluate fillings."],
        [{heading:"Pie dough method",points:["Keep fat at the assigned temperature.","Cut fat into flour to the required size.","Add only enough cold liquid for the dough to hold.","Mix minimally and rest before rolling.","Roll evenly and transfer without stretching.","Chill or blind bake as directed."]},{heading:"Troubleshooting",text:"Tough crust often comes from too much water or gluten development. Shrinking can come from overworking, insufficient rest, or stretching dough in the pan."},{heading:"Filling control",text:"Balance fruit, sugar, acid, starch, and moisture so the filling sets without becoming pasty or flooding the crust."}],
        "The crust is tender, baked through, properly shaped, and appropriate to the filling.",
        ["Keep tools and ingredients cool.","Avoid adding flour carelessly during rolling.","Vent, dock, weight, or seal according to the product."],
        ["Why does pie dough rest?","What causes shrinking?","How does filling moisture affect crust?"],
        "Pie-dough handling record and finished-crust evaluation."),
      lesson("Cakes, Custards, Creams & Finishing","Build and set aerated or egg-thickened structures without overworking or overheating them.",
        ["Control cake aeration and mixing.","Prepare pastry cream safely.","Whip cream to an intended stage.","Evaluate structure, crumb, smoothness, and finish."],
        [{heading:"Cake structure",text:"Low volume can come from poor aeration, expired leavener, or incorrect mixing. Tunnels often indicate overmixing or incorrect oven temperature."},{heading:"Custard and pastry cream",points:["Measure starch, sugar, eggs, and dairy accurately.","Temper eggs when directed.","Cook long enough to thicken and remove raw starch flavor.","Prevent scorching with controlled heat and mixing.","Cool rapidly with surface protection."]},{heading:"Whipped cream",text:"Cold cream and equipment support aeration. Stop at the intended peak; overwhipping moves toward graininess and butter."}],
        "The finished component has the intended volume, set, smoothness, sweetness, and service stability.",
        ["Prepare cooling space before cooking custard.","Scrape bowls during mixing.","Finish only after components reach the correct temperature."],
        ["What causes cake tunnels?","Why is pastry cream cooled with surface protection?","How can whipped cream be overworked?"],
        "Cheesecake, pastry-cream, crème brûlée, or finishing-component evaluation."),
      lesson("Fried & Yeasted Pastry","Combine fermentation, shaping, frying, draining, and finishing without losing structure.",
        ["Develop and proof enriched dough.","Shape consistently.","Control frying temperature.","Finish at the correct stage."],
        [{heading:"Production control",points:["Develop the dough while accounting for fat and sugar.","Ferment and proof from product evidence.","Shape to even thickness and size.","Fry in controlled batches.","Drain before glazing or coating.","Evaluate interior doneness as well as exterior color."]}],
        "The product is evenly shaped, fully cooked, not greasy, and finished cleanly.",
        ["Track oil temperature.","Avoid overcrowding.","Use a cooling and finishing sequence that does not trap excess oil."],
        ["Why can enriched dough ferment differently?","What makes fried dough greasy?","Why is color alone not enough to judge doneness?"],
        "Donut or cinnamon-roll production reflection.")
    ]
  },
  {
    title:"Global Culinary Applications", course:"Culinary Arts 2",
    summary:"Bring your skills together to plan, cook, serve, and reflect on food made for a real audience.",
    essentialQuestion:"How do you use your course skills to do responsible work for a real audience?",
    enduring:["Authentic work combines several competencies for someone beyond the instructor.","Cultural responsibility requires research and avoids careless stereotypes.","Hospitality never overrides safety.","Reflection uses specific evidence to improve the next performance."],
    vocabulary:["authentic recipient","hospitality","sustainability","production plan","portfolio evidence","capstone"],
    lessons:[
      lesson("Global Foodways & Cultural Responsibility","Prepare food connected to a culinary tradition with accuracy, curiosity, and respect.",
        ["Research origin and context.","Identify ingredients and techniques.","Distinguish adaptation from misrepresentation.","Explain decisions with sources."],
        [{heading:"Responsible inquiry",points:["Locate credible information about place, people, history, ingredients, and service.","Avoid presenting one dish as if it represents an entire culture.","Name adaptations honestly.","Use respectful language and verify unfamiliar claims.","Let culinary technique and evidence lead the explanation."]},{heading:"Application",text:"Coconut curry chicken and guajillo-braised chicken tacos demonstrate layered aromatics, spice handling, protein method, sauce development, timing, and cultural research. The recipe is a starting point for study, not the whole story of a cuisine."}],
        "Use research to explain the dish accurately. Name adaptations honestly, and do not treat one dish as an entire culture.",
        ["Connect each major ingredient or method to research.","Document substitutions.","Evaluate dish-appropriate quality rather than one familiar standard."],
        ["Why can one dish not represent an entire culture?","How should an adaptation be described?","What makes a source useful?"],
        "Research notes, source list, or menu explanation."),
      lesson("Sustainability, Hospitality & Service","Use resources responsibly while caring for the recipient’s experience.",
        ["Reduce avoidable waste.","Use water and energy responsibly.","Communicate with guests respectfully.","Respond professionally to delays, feedback, and problems."],
        [{heading:"Sustainable student actions",points:["Purchase and gather realistic quantities.","Label, date, rotate, and protect food.","Trim carefully and portion accurately.","Use equipment at appropriate capacity.","Keep oven and refrigerator doors closed.","Track what is discarded and why."]},{heading:"Hospitality moments",points:["Greet and acknowledge promptly.","Listen, confirm details, and avoid assumptions.","Verify allergy questions; do not guess.","Communicate delays honestly.","Listen to complaints without arguing and involve the responsible supervisor.","Verify packaging, labels, quantities, and condition before pickup or delivery."]},{heading:"Non-negotiable",text:"Never serve unsafe food, hide an allergen risk, skip a required check, or ignore policy simply to make a guest happy."}],
        "The recipient receives safe, accurate, timely, respectful service and the operation accounts for its resources.",
        ["Assign a final product verifier.","Track leftovers and avoidable waste.","Debrief both food quality and recipient experience."],
        ["How is waste prevention different from waste disposal?","What should happen when service is delayed?","Why can hospitality never override safety?"],
        "Waste record, service checklist, client feedback, or event debrief."),
      lesson("Grade 6 Safety Knowledge-Transfer Experience","Teach foundational food and kitchen safety to an authentic younger audience.",
        ["Verify content accuracy.","Adapt explanations and demonstrations for Grade 6.","Plan audience participation.","Evaluate what the audience understood."],
        [{heading:"Required preparation",points:["Instructor-checked safety concepts.","Language and examples suited to Grade 6.","Opening, explanation, demonstration, participation, and closing.","Clear voice, respectful interaction, and appropriate pacing.","No unsafe demonstration or uncontrolled equipment use.","Reflection on understanding and improvement."]},{heading:"Authentic evidence",text:"The measure is not simply whether you spoke. Evidence should show what learners did, understood, asked, or could explain afterward."}],
        "The lesson is accurate, safe, age-appropriate, organized, and responsive to the audience.",
        ["Rehearse all demonstrations.","Plan how materials are distributed and controlled.","Prepare a check for understanding."],
        ["How will you know the audience learned?","Which examples fit Grade 6?","What safety controls does the teaching plan need?"],
        "Approved lesson plan, teaching materials, audience evidence, and reflection."),
      lesson("Global Menu Student-Designed Culinary Capstone","Demonstrate course learning through one realistic dish for an authentic recipient.",
        ["Research and propose a dish.","Standardize and scale the recipe.","Plan ingredients, equipment, timing, safety, and quality.","Produce, evaluate, and reflect with evidence."],
        [{heading:"Ten phases",points:["Selection: choose a realistic dish tied to a culinary tradition and course skills.","Research: document origin, context, ingredients, methods, and sources.","Proposal: identify recipient, method, timeline, safety controls, and resources.","Recipe work: standardize and calculate yield.","Ingredient plan: submit a department-funded request; families are not required to purchase ingredients.","Production plan: sequence mise en place, cooking, holding, plating, cleanup, and timing.","Safety plan: control temperature, contamination, allergens, and equipment.","Production: execute within the approved late-spring window.","Evaluation: assess taste, texture, appearance, safety, organization, and dish-appropriate quality.","Reflection: explain decisions, evidence, feedback, and next steps."]},{heading:"Success criteria",points:["Safety and sanitation meet the required standard.","The plan is realistic and materials are ready.","Techniques are applied correctly with growing independence.","Taste, texture, appearance, and doneness fit the dish.","Research is culturally responsible.","Communication, cleanup, and response to feedback are professional.","Reflection cites specific evidence."]},{heading:"Critical standard",text:"A strong final product cannot cancel a serious safety failure. Safety, sanitation, and essential technical execution must each meet the required standard."}],
        "Essential categories must meet the course proficiency standard; the finished product is only one part of the evidence.",
        ["Work backward from the production deadline.","Confirm every critical control before production.","Retain approved evidence without interrupting safe work."],
        ["Who is the authentic recipient?","Which taught competencies does the dish demonstrate?","What evidence will support the final reflection?"],
        "Proposal, research, standardized recipe, cost/yield work, production plan, safety plan, final evaluation, feedback, and reflection.")
    ]
  }
];
