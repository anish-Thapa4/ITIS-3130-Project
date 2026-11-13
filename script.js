(() => {
  "use strict";
const icon = (name, size = "") =>
  `<svg class="icon ${size}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const restaurants = [
  {
    id: "parkside",
    name: "Parkside Kitchen",
    cuisine: "American",
    style: "burger",
    price: 22,
    distance: 2.4,
    rating: 4.8,
    reviewCount: 218,
    open: true,
    vegetarian: false,
    desc: "Modern comfort food, great burgers, and a relaxed neighborhood atmosphere.",
    address: "University City, Charlotte, NC",
    hours: "11:00 AM – 9:00 PM",
    menu: [
      ["Classic Smash Burger", "$16"],
      ["Grilled Chicken Bowl", "$18"],
      ["House Fries", "$6"],
    ],
  },
  {
    id: "wings",
    name: "Carolina Wing Co.",
    cuisine: "American",
    style: "wings",
    price: 18,
    distance: 3.1,
    rating: 4.6,
    reviewCount: 165,
    open: true,
    vegetarian: false,
    desc: "Crispy wings, homemade sauces, and satisfying meals for a casual night out.",
    address: "North Charlotte, NC",
    hours: "11:30 AM – 10:00 PM",
    menu: [
      ["Signature Wings", "$15"],
      ["Chicken Tenders", "$14"],
      ["Side Salad", "$7"],
    ],
  },
  {
    id: "noodle",
    name: "Noodle District",
    cuisine: "Asian",
    style: "noodle",
    price: 16,
    distance: 1.8,
    rating: 4.9,
    reviewCount: 302,
    open: true,
    vegetarian: true,
    desc: "Fresh noodle bowls with customizable broths, vegetables, and bold flavors.",
    address: "University City, Charlotte, NC",
    hours: "11:00 AM – 9:30 PM",
    menu: [
      ["Vegetable Ramen", "$15"],
      ["Spicy Noodles", "$16"],
      ["Crispy Dumplings", "$8"],
    ],
  },
  {
    id: "tacos",
    name: "Queen City Tacos",
    cuisine: "Mexican",
    style: "tacos",
    price: 15,
    distance: 4,
    rating: 4.7,
    reviewCount: 189,
    open: true,
    vegetarian: true,
    desc: "Street-style tacos, colorful bowls, and house-made salsas.",
    address: "NoDa, Charlotte, NC",
    hours: "11:00 AM – 9:00 PM",
    menu: [
      ["Three Street Tacos", "$13"],
      ["Veggie Burrito", "$12"],
      ["Guacamole & Chips", "$7"],
    ],
  },
  {
    id: "napoli",
    name: "Napoli Slice",
    cuisine: "Italian",
    style: "pizza",
    price: 24,
    distance: 3.4,
    rating: 4.5,
    reviewCount: 241,
    open: false,
    vegetarian: true,
    desc: "Stone-baked pizza, fresh salads, and handmade pasta dishes.",
    address: "Plaza Midwood, Charlotte, NC",
    hours: "12:00 PM – 10:00 PM",
    menu: [
      ["Margherita Pizza", "$19"],
      ["Pesto Pasta", "$17"],
      ["Garlic Knots", "$7"],
    ],
  },
  {
    id: "fresh",
    name: "Fresh Table",
    cuisine: "Healthy",
    style: "salad",
    price: 19,
    distance: 2.3,
    rating: 4.8,
    reviewCount: 146,
    open: true,
    vegetarian: true,
    desc: "Fresh, buildable salads and grain bowls made with seasonal produce.",
    address: "University City, Charlotte, NC",
    hours: "10:00 AM – 8:00 PM",
    menu: [
      ["Green Goddess Bowl", "$17"],
      ["Roasted Veggie Bowl", "$16"],
      ["Fruit Cup", "$6"],
    ],
  },
];
const initial = () => ({
  page: "home",
  query: "",
  cuisine: "Any",
  budget: 30,
  distance: 5,
  vegetarian: false,
  openOnly: false,
  selected: [],
  saved: ["noodle"],
  detail: "parkside",
  detailFrom: "results",
  searchNotice: false,
  priorities: ["price", "distance"],
  suggestion: null,
  chosen: null,
  toast: "",
});
let state = initial(),
  toastTimeout;
const $ = (id) => document.getElementById(id),
  find = (id) => restaurants.find((r) => r.id === id),
  safe = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
function art(style) {
  const bg = {
    burger: ["#fee2c1", "#ffc88a"],
    wings: ["#fbe1d2", "#f8b697"],
    noodle: ["#fce5d9", "#edc5af"],
    tacos: ["#ffe7ca", "#f6c18f"],
    pizza: ["#ffe4d3", "#f8b59b"],
    salad: ["#dbefdc", "#b2d7b7"],
  }[style] || ["#e2e8f0", "#cbd5e1"];
  const art = {
    burger: `<ellipse cx="90" cy="108" rx="53" ry="12" fill="#b86b3760"/><path d="M47 74q4-36 43-36t43 36z" fill="#eaa94e"/><path d="M51 79h78" stroke="#fff0b6" stroke-width="8"/><path d="M48 86q35-11 84 0" stroke="#579647" stroke-width="11"/><rect x="48" y="92" width="84" height="14" rx="7" fill="#8c4734"/><path d="M48 105q42 9 84 0" stroke="#efb75e" stroke-width="11"/><g fill="#fff2ca"><ellipse cx="72" cy="55" rx="4" ry="2" transform="rotate(-25 72 55)"/><ellipse cx="90" cy="49" rx="4" ry="2"/><ellipse cx="110" cy="58" rx="4" ry="2"/></g>`,
    wings: `<ellipse cx="90" cy="87" rx="63" ry="37" fill="#fff9ef"/><ellipse cx="90" cy="87" rx="53" ry="28" fill="#f7e7cf"/><path d="M51 86q4-20 23-22 19-1 20 17-1 20-21 22-17-2-22-17z" fill="#c97942"/><path d="M89 85q4-25 27-26 23 0 22 24-6 22-26 22-19-1-23-20z" fill="#e19552"/><path d="M58 80q10-12 25-6M101 73q14-11 27 0" stroke="#f4c184" stroke-width="6" stroke-linecap="round"/>`,
    noodle: `<ellipse cx="90" cy="78" rx="58" ry="37" fill="#f9f0da"/><ellipse cx="90" cy="78" rx="49" ry="27" fill="#d7aa76"/><path d="M48 79q16-22 33-8t43-4" stroke="#f4d98f" stroke-width="7" fill="none"/><path d="M46 92q31-27 64-9t26-5" stroke="#f9dc84" stroke-width="5" fill="none"/><path d="M39 90q3 33 51 37 47-3 51-37" fill="#e86457"/><path d="M42 93q46 19 96 0" stroke="#b94f45" stroke-width="4" fill="none"/><path d="M65 60q15 14 28 9" stroke="#5c9659" stroke-width="8"/><path d="M110 58q-7 17-20 16" stroke="#5c9659" stroke-width="7"/><path d="m119 30-13 45M127 31l-13 45" stroke="#5b4436" stroke-width="4"/>`,
    tacos: `<ellipse cx="90" cy="103" rx="64" ry="14" fill="#cf9d6c55"/><path d="M42 101Q30 53 65 50q37 0 29 51z" fill="#eab85d"/><path d="M84 99Q73 47 114 48q39 5 29 54z" fill="#edbf69"/><path d="M46 76q16-15 39 0M88 75q20-17 43 1" stroke="#619353" stroke-width="11"/><path d="M46 84q18-10 38 0M91 83q22-10 42 0" stroke="#b55a40" stroke-width="10"/><g fill="#f9df9d"><circle cx="67" cy="62" r="3"/><circle cx="112" cy="62" r="3"/></g>`,
    pizza: `<ellipse cx="90" cy="79" rx="59" ry="46" fill="#d1a06d55"/><circle cx="90" cy="79" r="46" fill="#f2ce77" stroke="#db9952" stroke-width="7"/><circle cx="90" cy="79" r="38" fill="#d56e58"/><g fill="#f7e8b5"><circle cx="72" cy="60" r="10"/><circle cx="104" cy="69" r="10"/><circle cx="91" cy="95" r="10"/><circle cx="65" cy="94" r="8"/></g><g fill="#65934f"><ellipse cx="90" cy="54" rx="7" ry="3" transform="rotate(-20 90 54)"/><ellipse cx="118" cy="93" rx="7" ry="3" transform="rotate(30 118 93)"/><ellipse cx="75" cy="77" rx="7" ry="3"/></g>`,
    salad: `<ellipse cx="90" cy="82" rx="58" ry="42" fill="#fff8ee"/><ellipse cx="90" cy="82" rx="48" ry="32" fill="#cce0b0"/><g fill="#5d9a68"><ellipse cx="67" cy="67" rx="20" ry="12" transform="rotate(-30 67 67)"/><ellipse cx="113" cy="74" rx="22" ry="12" transform="rotate(25 113 74)"/><ellipse cx="77" cy="94" rx="22" ry="13"/><ellipse cx="105" cy="94" rx="20" ry="12"/></g><circle cx="84" cy="77" r="12" fill="#efb35a"/><circle cx="107" cy="64" r="8" fill="#da755d"/><circle cx="66" cy="90" r="8" fill="#da755d"/><path d="M39 89q2 37 51 41 48-4 51-41" fill="#f2f1e7" stroke="#d3dad8" stroke-width="3"/>`,
  }[style];
  return `<div class="thumb" style="background:linear-gradient(145deg,${bg[0]},${bg[1]})"><svg viewBox="0 0 180 144" aria-hidden="true"><circle cx="90" cy="73" r="57" fill="#ffffff30"/>${art}</svg></div>`;
}
function showToast(message) {
  state.toast = message;
  const area = $("toast-area");
  if (!area) return;
  area.innerHTML = `<div class="toast">${icon("check-circle", "sm")}${safe(message)}</div>`;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    state.toast = "";
    if ($("toast-area")) $("toast-area").innerHTML = "";
  }, 2400);
}
function home() {
  return `<div class="between"><div><div class="kicker">GOOD AFTERNOON</div><h2 class="h1" style="margin-bottom:4px">What's for dinner?</h2><p class="lead">A better meal starts with an easier choice.</p></div><span class="badge blue">Demo</span></div><section class="hero mt20"><div class="kicker">PERSONALIZED PICKS</div><h1>Good food, <span>less guessing.</span></h1><p>Tell us what you're looking for and we'll narrow down your options.</p><button class="btn primary" data-go="filters">Find my match ${icon("arrow-right", "sm")}</button></section><div class="mt24"><label class="label" for="home-search">Know what you're craving?</label><form id="home-search-form" class="row"><div class="inputwrap grow">${icon("search", "sm")}<input id="home-search" name="query" autocomplete="off" placeholder="Restaurant or cuisine" value="${safe(state.query)}"/></div><button class="btn primary" type="submit" aria-label="Search restaurants">${icon("arrow-right", "sm")}</button></form>${state.searchNotice ? '<p class="search-unavailable" role="status">Does not function yet!</p>' : ""}</div><div class="between mt24"><h3 class="section-heading">Browse cuisines</h3></div><div class="quick-cats">${[
    ["American", "utensils"],
    ["Asian", "leaf"],
    ["Mexican", "compass"],
    ["Italian", "star"],
  ]
    .map(
      ([c, i]) =>
        `<button class="cat" data-cuisine="${c}"><span class="cat-icon">${icon(i, "lg")}</span>${c}</button>`,
    )
    .join(
      "",
    )}</div><div class="between mt24"><h3 class="section-heading">Popular near you</h3><button class="text-button" data-go="results">View all ${icon("arrow-right", "xs")}</button></div><div class="cards mt12">${restaurants
    .slice(0, 2)
    .map((r) => card(r, true))
    .join("")}</div>`;
}
function progress(done) {
  return `<div class="progress" aria-label="Step ${done} of 3"><span class="done"></span><span class="${done > 1 ? "done" : ""}"></span><span class="${done > 2 ? "done" : ""}"></span></div>`;
}
function filters() {
  return `<button class="go-back" data-go="home">${icon("arrow-left", "sm")} Back</button><div class="kicker">STEP 1 OF 3</div><h1 class="h1">Make it your kind of meal</h1><p class="lead">Use a few preferences to find a spot that fits.</p>${progress(1)}<section class="card form-card"><div class="field"><label class="label" for="budget">Maximum price per person</label><div class="selectbox"><select class="select" id="budget">${[10, 15, 20, 25, 30, 40].map((n) => `<option value="${n}" ${state.budget === n ? "selected" : ""}>Up to $${n}</option>`).join("")}</select></div></div><div class="field"><div class="between"><label class="label" for="distance">Distance from you</label><span class="badge blue" id="distance-display">${state.distance} miles</span></div><input class="range" type="range" min="1" max="10" step="1" value="${state.distance}" id="distance"><div class="range-labels"><span>1 mile</span><span>10 miles</span></div></div><div class="field"><div class="label">Cuisine</div><div class="options">${["Any", "American", "Asian", "Mexican", "Italian", "Healthy"].map((c) => `<button class="option ${state.cuisine === c ? "active" : ""}" data-filter-cuisine="${c}" aria-pressed="${state.cuisine === c}">${c}</button>`).join("")}</div></div><div class="divider"></div><label class="check-line"><input id="vegetarian" type="checkbox" ${state.vegetarian ? "checked" : ""}><span><strong>Vegetarian-friendly</strong><small>Show places with vegetarian options</small></span></label><label class="check-line"><input id="openOnly" type="checkbox" ${state.openOnly ? "checked" : ""}><span><strong>Open now</strong><small>Based on sample opening status</small></span></label></section><button class="btn primary full large mt16" data-apply="1">See matching restaurants ${icon("arrow-right", "sm")}</button><button class="btn ghost full mt8" data-resetfilters="1">Reset all filters</button>`;
}
function matches() {
  return restaurants.filter(
    (r) =>
      r.price <= state.budget &&
      r.distance <= state.distance &&
      (state.cuisine === "Any" || r.cuisine === state.cuisine) &&
      (!state.vegetarian || r.vegetarian) &&
      (!state.openOnly || r.open) &&
      (!state.query ||
        `${r.name} ${r.cuisine} ${r.desc}`
          .toLowerCase()
          .includes(state.query.toLowerCase())),
  );
}
function card(r, compact = false) {
  const selected = state.selected.includes(r.id),
    saved = state.saved.includes(r.id);
  return `<article class="card restaurant"><button type="button" class="restaurant-photo-link" data-detail="${r.id}" aria-label="View details for ${safe(r.name)}">${art(r.style)}</button><div class="restaurant-body"><div class="between" style="gap:3px"><h3><button type="button" class="restaurant-name-link" data-detail="${r.id}" aria-label="View details for ${safe(r.name)}">${safe(r.name)}</button></h3><button class="btn iconbtn ${saved ? "saved" : ""}" style="width:30px;height:30px" data-save="${r.id}" aria-label="${saved ? "Remove" : "Save"} ${safe(r.name)}">${icon("heart", "sm")}</button></div><div class="meta-line"><span class="rating">${icon("star", "xs")}${r.rating}</span><span>${r.distance} mi</span><span>~$${r.price}/person</span></div>${!compact ? `<p class="desc">${safe(r.desc)}</p>` : `<p class="desc" style="margin:8px 0 8px">${r.cuisine} · ${r.open ? "Open in demo" : "Closed in demo"}</p>`}<div class="card-actions"><button class="btn small-btn ${selected ? "outline-blue" : "secondary"}" data-select="${r.id}">${selected ? icon("check", "xs") : icon("plus", "xs")}${selected ? "Selected" : "Compare"}</button><button class="btn small-btn" data-detail="${r.id}">Details ${icon("arrow-right", "xs")}</button></div></div></article>`;
}
function results() {
  const arr = matches();
  return `<div class="between"><div><div class="kicker">STEP 2 OF 3</div><h1 class="h1" style="margin-bottom:4px">Explore restaurants</h1><p class="lead">A shortlist tailored to your preferences.</p></div><button class="btn iconbtn" data-go="filters" aria-label="Edit filters">${icon("sliders", "sm")}</button></div>${progress(2)}<div class="summary">${icon("filter", "sm")} <strong>${arr.length} result${arr.length === 1 ? "" : "s"}</strong><span>·</span><span>Under $${state.budget}</span><span>·</span><span>${state.distance} mi</span>${state.cuisine !== "Any" ? `<span>·</span><span>${state.cuisine}</span>` : ""}</div>${arr.length ? `<div class="cards mt16">${arr.map((r) => card(r)).join("")}</div><div class="notice mt16">${icon("info", "sm")}<span>Select two restaurants using the <strong>Compare</strong> buttons to view them side by side. You can also open details and choose a restaurant directly.</span></div><button class="btn primary full large mt16" data-go="compare" ${state.selected.length !== 2 ? "disabled" : ""}>Compare selected (${state.selected.length}/2) ${icon("arrow-right", "sm")}</button>` : `<div class="empty mt16"><div class="empty-icon">${icon("search", "xl")}</div><h2>No matches found</h2><p>These filters are a little too narrow. Try raising your budget or expanding your distance.</p><div class="stack"><button class="btn primary full" data-go="filters">${icon("sliders", "sm")} Edit filters</button><button class="btn full" data-resetresults="1">${icon("rotate", "sm")} Reset and show all</button></div></div>`}<p class="tiny muted mt16">Restaurant details are fictional data for this prototype.</p>`;
}
function detail() {
  const r = find(state.detail) || restaurants[0];
  return `<button class="go-back" data-go="${["home", "saved", "compare", "finish"].includes(state.detailFrom) ? state.detailFrom : "results"}">${icon("arrow-left", "sm")} Back to ${["home", "saved", "compare", "finish"].includes(state.detailFrom) ? state.detailFrom : "results"}</button><div class="detail-image">${art(r.style)}</div><div class="between mt16"><div><h1 class="h1" style="margin:0 0 5px">${safe(r.name)}</h1><div class="row"><span class="badge">${r.cuisine}</span><span class="badge ${r.open ? "green" : ""}">${r.open ? "Open in demo" : "Closed in demo"}</span></div></div><button class="btn iconbtn ${state.saved.includes(r.id) ? "saved" : ""}" data-save="${r.id}" aria-label="Save restaurant">${icon("heart", "lg")}</button></div><p class="lead mt16">${safe(r.desc)}</p><div class="row mt20"><div class="detail-metric"><span>Rating</span><strong class="rating-value"><span class="star-visual" aria-hidden="true" style="--fill:${Math.min(100, (r.rating / 5) * 100)}%">★★★★★</span><span>${r.rating} / 5</span></strong></div><div class="detail-metric"><span>Distance</span><strong>${r.distance} mi</strong></div><div class="detail-metric"><span>Typical price</span><strong>$${r.price}</strong></div></div><div class="between mt24"><h2 class="section-heading">Popular menu items</h2><span class="badge">Sample menu</span></div><div class="card mt12" style="padding:0 14px">${r.menu.map(([m, p]) => `<div class="menu-row"><span>${safe(m)}</span><strong>${safe(p)}</strong></div>`).join("")}</div><div class="row mt16 small muted">${icon("pin", "sm")} ${safe(r.address)}</div><div class="row mt8 small muted">${icon("clock", "sm")} ${safe(r.hours)}</div><button class="btn primary full large mt24" data-choose="${r.id}">Choose this restaurant ${icon("arrow-right", "sm")}</button><button class="btn secondary full mt8" data-select="${r.id}">${state.selected.includes(r.id) ? "Remove from comparison" : "Add to comparison"}</button>`;
}
function compare() {
  const pair = state.selected.map(find).filter(Boolean);
  if (pair.length !== 2)
    return `<button class="go-back" data-go="results">${icon("arrow-left", "sm")} Results</button><h1 class="h1">Compare restaurants</h1><div class="empty mt20"><div class="empty-icon">${icon("scale", "xl")}</div><h2>Pick two restaurants</h2><p>Select exactly two restaurants from Explore to compare their details side by side.</p><button class="btn primary full" data-go="results">Browse restaurants</button></div>`;
  const [a, b] = pair;
  const rows = [
    ["Cuisine", a.cuisine, b.cuisine],
    ["Average price", `$${a.price}`, `$${b.price}`],
    ["Distance", `${a.distance} miles`, `${b.distance} miles`],
    ["Rating", `${a.rating} / 5`, `${b.rating} / 5`],
    [
      "Vegetarian",
      a.vegetarian ? "Options" : "Not listed",
      b.vegetarian ? "Options" : "Not listed",
    ],
    ["Sample hours", a.open ? "Open" : "Closed", b.open ? "Open" : "Closed"],
  ];
  return `<button class="go-back" data-go="results">${icon("arrow-left", "sm")} Back to results</button><div class="kicker">STEP 3 OF 3</div><h1 class="h1">Side-by-side comparison</h1><p class="lead">The details that matter, all in one place.</p>${progress(3)}<section class="card card-pad"><div class="compare-head"><div></div>${pair.map((r) => `<button type="button" class="compare-place" data-detail="${r.id}" aria-label="View details for ${safe(r.name)}"><div class="swatch">${art(r.style)}</div><strong>${safe(r.name)}</strong></button>`).join("")}</div><div class="compare-table mt12">${rows.map(([name, left, right]) => `<div class="compare-row"><span class="metric-label">${safe(name)}</span><strong>${safe(left)}</strong><strong>${safe(right)}</strong></div>`).join("")}</div><div class="row mt16"><button class="btn secondary full" data-go="results">${icon("sliders", "sm")} Edit choices</button></div></section><button class="btn primary full large mt16" data-go="decide">${icon("sparkles", "sm")} Help me decide ${icon("arrow-right", "sm")}</button><p class="tiny muted mt16">Still deciding? We'll recommend a match based on what matters to you.</p>`;
}
function decide() {
  if (state.selected.length !== 2)
    return `<h1 class="h1">Help me decide</h1><div class="empty mt16"><p>Choose two restaurants to get a recommendation.</p><button class="btn primary" data-go="results">Explore restaurants</button></div>`;
  const p = [
    ["price", "wallet", "Lower cost", "Stay within your budget"],
    ["distance", "pin", "Closer location", "Spend less time traveling"],
    ["rating", "star", "Higher reviews", "Prioritize guest ratings"],
    [
      "vegetarian",
      "leaf",
      "Vegetarian options",
      "Consider dietary preferences",
    ],
  ];
  return `<button class="go-back" data-go="compare">${icon("arrow-left", "sm")} Comparison</button><div class="kicker">PERSONALIZED RECOMMENDATION</div><h1 class="h1">What matters most?</h1><p class="lead">Choose your top priorities for this meal.</p><section class="card card-pad mt20">${p.map(([id, ic, title, desc]) => `<label class="priority-item"><span class="small-graphic">${icon(ic, "sm")}</span><span class="grow"><strong>${title}</strong><span class="tiny muted" style="display:block;margin-top:2px">${desc}</span></span><input type="checkbox" data-priority="${id}" ${state.priorities.includes(id) ? "checked" : ""}></label>`).join("")}</section><button class="btn primary full large mt16" data-recommend="1">${icon("sparkles", "sm")} Find my best match</button>${state.suggestion ? recommendation() : ""}`;
}
function score(r) {
  return state.priorities.reduce(
    (acc, id) =>
      acc +
      (id === "price"
        ? (40 - r.price) / 10
        : id === "distance"
          ? (10 - r.distance) / 3
          : id === "rating"
            ? r.rating / 2
            : r.vegetarian
              ? 2
              : 0),
    0,
  );
}
function recommendation() {
  const r = find(state.suggestion);
  if (!r) return "";
  const names = {
    price: "price",
    distance: "distance",
    rating: "ratings",
    vegetarian: "vegetarian availability",
  };
  return `<section class="recommendation mt16"><span class="reco-label">YOUR BEST MATCH</span><h3>${safe(r.name)}</h3><div class="row"><span class="badge white">${icon("star", "xs")} ${r.rating}</span><span class="badge white">$${r.price}/person</span><span class="badge white">${r.distance} mi</span></div><p>Based on your priorities${state.priorities.length ? ` (${state.priorities.map((v) => names[v]).join(", ")})` : ""}, this is the strongest match from your two options. The final choice is yours.</p><button class="btn primary full" data-choose="${r.id}">Choose this restaurant ${icon("arrow-right", "sm")}</button><button class="btn full mt8" data-go="compare">Review comparison</button></section>`;
}
function saved() {
  const list = state.saved.map(find).filter(Boolean);
  return `<div class="kicker">YOUR COLLECTION</div><h1 class="h1">Saved restaurants</h1><p class="lead">Keep track of your favorites and compare them later.</p>${list.length ? `<div class="cards mt20">${list.map((r) => card(r)).join("")}</div><button class="btn primary full mt16" data-savedcompare="1" ${list.length < 2 ? "disabled" : ""}>Compare saved (${list.length}) ${icon("arrow-right", "sm")}</button>` : `<div class="empty mt20"><div class="empty-icon">${icon("heart", "xl")}</div><h2>No favorites yet</h2><p>Tap the heart on any restaurant card to save it here.</p><button class="btn primary full" data-go="results">Explore restaurants</button></div>`}`;
}
function finish() {
  const r = find(state.chosen) || restaurants[0];
  return `<div class="choose-final"><div class="check-large">${icon("check", "xl")}</div><div class="kicker">DECISION COMPLETE</div><h1>You found your place.</h1><p class="lead">One less decision to worry about today.</p></div><section class="card chosen-box mt24"><div class="row"><div style="width:92px;height:82px;border-radius:9px;overflow:hidden">${art(r.style)}</div><div class="grow"><span class="badge blue">Your pick</span><h2 style="margin:7px 0 3px;font-size:17px;line-height:1.2">${safe(r.name)}</h2><div class="tiny muted">${r.cuisine} · ${r.distance} miles away</div></div></div><div class="divider"></div><div class="between small"><span class="muted">Typical price per person</span><strong>$${r.price}</strong></div><div class="between small mt12"><span class="muted">Guest rating</span><strong style="display:flex;align-items:center;gap:7px"><span class="star-visual" aria-hidden="true" style="--fill:${Math.min(100, (r.rating / 5) * 100)}%">★★★★★</span>${r.rating} / 5</strong></div><div class="between small mt12"><span class="muted">Location</span><strong style="font-size:10px;text-align:right;max-width:190px">${safe(r.address)}</strong></div><button class="btn secondary full mt20" data-detail="${r.id}">View restaurant details ${icon("arrow-right", "sm")}</button></section><button class="btn primary full large mt16" data-restart="1">${icon("rotate", "sm")} Start a new decision</button><p class="tiny muted" style="text-align:center;margin:15px 6px">Prototype demonstration only. No real reservation, payment, or order was made.</p>`;
}
const pages = {
  home,
  filters,
  results,
  detail,
  compare,
  decide,
  saved,
  finish,
};
function render() {
  const cur = pages[state.page] || home;
  $("screen").innerHTML = cur();
  $("nav").innerHTML = [
    ["home", "home", "Home"],
    ["results", "compass", "Explore"],
    ["compare", "scale", "Compare"],
    ["saved", "heart", "Saved"],
  ]
    .map(
      ([id, ic, label]) =>
        `<button class="nav-button ${state.page === id || (id === "results" && ["filters", "detail"].includes(state.page)) || (id === "compare" && state.page === "decide") ? "active" : ""}" data-go="${id}" ${state.page === id ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span></button>`,
    )
    .join("");
  $("scroll").scrollTop = 0;
}
function go(page) {
  state.page = page;
  render();
}
function resetFilters() {
  Object.assign(state, {
    query: "",
    budget: 30,
    distance: 5,
    cuisine: "Any",
    vegetarian: false,
    openOnly: false,
  });
}
function choose(id) {
  state.chosen = id;
  go("finish");
}
function toggleSaved(id) {
  state.saved = state.saved.includes(id)
    ? state.saved.filter((x) => x !== id)
    : [...state.saved, id];
  render();
  showToast(
    state.saved.includes(id)
      ? "Saved to your favorites"
      : "Removed from favorites",
  );
}
function toggleCompare(id) {
  state.selected = state.selected.includes(id)
    ? state.selected.filter((x) => x !== id)
    : state.selected.length < 2
      ? [...state.selected, id]
      : [state.selected[1], id];
  state.suggestion = null;
  render();
  showToast(
    state.selected.includes(id)
      ? `Added to comparison (${state.selected.length}/2)`
      : "Removed from comparison",
  );
}
document.addEventListener("submit", (e) => {
  if (e.target.id === "home-search-form") {
    e.preventDefault();
    state.query = $("home-search").value.trim();
    state.searchNotice = true;
    render();
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "distance")
    $("distance-display").textContent = e.target.value + " miles";
  if (e.target.dataset.priority) {
    const id = e.target.dataset.priority;
    state.priorities = e.target.checked
      ? [...state.priorities, id]
      : state.priorities.filter((x) => x !== id);
    state.suggestion = null;
    const rec = document.querySelector(".recommendation");
    if (rec) rec.remove();
  }
});
document.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const d = b.dataset;
  if (d.go) {
    go(d.go);
    return;
  }
  if (d.cuisine) {
    state.cuisine = d.cuisine;
    state.query = "";
    state.budget = 40;
    state.distance = 10;
    state.vegetarian = false;
    state.openOnly = false;
    go("results");
    return;
  }
  if (d.filterCuisine) {
    state.cuisine = d.filterCuisine;
    document.querySelectorAll("[data-filter-cuisine]").forEach((chip) => {
      const active = chip.dataset.filterCuisine === state.cuisine;
      chip.classList.toggle("active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    return;
  }
  if (d.apply) {
    state.budget = Number($("budget").value);
    state.distance = Number($("distance").value);
    state.openOnly = $("openOnly").checked;
    state.vegetarian = $("vegetarian").checked;
    state.query = "";
    go("results");
    return;
  }
  if (d.resetfilters) {
    resetFilters();
    render();
    return;
  }
  if (d.resetresults) {
    resetFilters();
    go("results");
    return;
  }
  if (d.save) {
    toggleSaved(d.save);
    return;
  }
  if (d.select) {
    toggleCompare(d.select);
    return;
  }
  if (d.detail) {
    state.detail = d.detail;
    state.detailFrom = ["home", "saved", "compare", "finish"].includes(
      state.page,
    )
      ? state.page
      : "results";
    go("detail");
    return;
  }
  if (d.savedcompare) {
    state.selected = state.saved.slice(0, 2);
    state.suggestion = null;
    go("compare");
    return;
  }
  if (d.recommend) {
    const list = state.selected.map(find).filter(Boolean);
    if (list.length !== 2) return;
    state.suggestion = list.sort(
      (a, b) => score(b) - score(a) || a.price - b.price,
    )[0].id;
    render();
    $("scroll").scrollTo({ top: $("scroll").scrollHeight, behavior: "smooth" });
    return;
  }
  if (d.choose) {
    choose(d.choose);
    return;
  }
  if (d.restart) {
    state = initial();
    go("home");
  }
});
render();
})();
