/* =========================================================
   My Tours Cartagena — App
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const IMG = CONFIG.img;
  const PLACEHOLDER =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='%23ff8a2b'/><stop offset='1' stop-color='%2313b4d6'/></linearGradient></defs>" +
      "<rect width='400' height='300' fill='url(%23g)'/>" +
      "<text x='50%' y='52%' font-size='90' text-anchor='middle' dominant-baseline='middle'>🏝️</text></svg>"
    );
  window.imgError = function (el) { el.onerror = null; el.src = PLACEHOLDER; };

  const fmt = new Intl.NumberFormat("es-CO");
  const cop = (n) => "$" + fmt.format(n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const byId = (id) => PRODUCTS.find((p) => p.id === id);

  function galleryFor(p) {
    const pool = IMG_POOL[p.cat] || [];
    const imgs = [p.img];
    for (const f of pool) { if (imgs.length >= 5) break; if (!imgs.includes(f)) imgs.push(f); }
    return imgs;
  }

  /* ---------- Unidad de precio: persona / noche / fijo ---------- */
  const clampQty = (n) => Math.min(20, Math.max(1, Math.round(Number(n)) || 1));
  function unitOf(p) {
    if (p.unit) return p.unit;                                   // override opcional desde data.js
    if (p.cat === "alojamientos") return "noche";                // se cobra por noche
    if (p.id === "lancha-trapa" || p.id === "bote-sofial") return "fijo"; // precio por paquete (barco completo)
    return "persona";                                            // tours/pasadías: por persona
  }
  const hasQty = (p) => { const u = unitOf(p); return u === "persona" || u === "noche"; };
  function unitWord(u, n) {
    if (u === "noche") return n === 1 ? "noche" : "noches";
    if (u === "persona") return n === 1 ? "persona" : "personas";
    return "";
  }
  const unitCap = (u) => (u === "noche" ? "Noches" : "Personas");
  function unitSuffix(u, big) {
    if (u === "noche") return big ? "por noche" : "/noche";
    if (u === "persona") return big ? "por persona" : "p/p";
    return big ? "precio del paquete" : "paquete";
  }

  function priceHTML(p, big) {
    if (p.price == null) return `<span class="ask">Consultar precio</span>`;
    const now = `<span class="now">${cop(p.price)}</span>`;
    const old = p.oldPrice ? `<span class="old">${cop(p.oldPrice)}</span>` : "";
    const per = `<small>${unitSuffix(unitOf(p), big)}</small>`;
    return now + old + per;
  }

  /* ---------- Estado ---------- */
  const STORE_KEY = "mytours_plan_v2";
  let plan = []; // [{ id, qty }]
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY)) ||
                JSON.parse(localStorage.getItem("mytours_plan_v1")) || [];
    plan = raw.map((x) => (typeof x === "string" ? { id: x, qty: 1 } : { id: x.id, qty: clampQty(x.qty) }))
              .filter((e) => byId(e.id));
  } catch (e) { plan = []; }
  const savePlan = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(plan)); } catch (e) {} };
  const planFind = (id) => plan.find((e) => e.id === id);
  const inPlan = (id) => !!planFind(id);

  let currentCat = "todos";
  let query = "";
  let shown = 0;
  const PAGE = 8;

  /* ---------- WhatsApp ---------- */
  const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  const waDefault = () =>
    waLink("¡Hola My Tours Cartagena! 👋 Quiero información sobre sus tours y experiencias.");

  function wirePassiveWA() {
    ["#waHeader", "#waHero", "#waCta", "#waFab", "#waTab"].forEach((s) => {
      const el = $(s); if (el) el.href = waDefault();
    });
    const f = $("#waFooter"); if (f) f.href = waDefault();
    const ig = $("#igFooter"); if (ig) ig.href = CONFIG.instagram;
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Categorías (rail) ---------- */
  function countCat(id) {
    return id === "todos" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === id).length;
  }
  function renderCatRail() {
    const rail = $("#catRail");
    rail.innerHTML = CATEGORIES.filter((c) => c.id !== "todos").map((c) => `
      <button class="cat-card" data-cat="${c.id}" aria-label="Ver ${esc(c.label)}">
        <img src="${IMG}${c.img}" alt="" loading="lazy" onerror="imgError(this)">
        <span class="cat-card__ic">${c.icon}</span>
        <span class="cat-card__txt"><b>${esc(c.label)}</b><small>${countCat(c.id)} planes</small></span>
      </button>`).join("");
    $$(".cat-card", rail).forEach((el) =>
      el.addEventListener("click", () => { setCat(el.dataset.cat); scrollToCatalog(); })
    );
  }

  /* ---------- Filtros (pills) ---------- */
  function renderFilters() {
    const box = $("#filters");
    box.innerHTML = CATEGORIES.map((c) => `
      <button class="chip ${c.id === currentCat ? "is-active" : ""}" role="tab" data-cat="${c.id}">
        ${c.id !== "todos" ? c.icon + " " : ""}${esc(c.label)}
        <span class="chip__n">${countCat(c.id)}</span>
      </button>`).join("");
    $$(".chip", box).forEach((el) =>
      el.addEventListener("click", () => setCat(el.dataset.cat))
    );
  }
  function setCat(id) {
    currentCat = id;
    $$("#filters .chip").forEach((c) => c.classList.toggle("is-active", c.dataset.cat === id));
    shown = 0;
    renderGrid();
  }

  function scrollToCatalog() {
    const y = $("#catalogo").getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  /* ---------- Grid ---------- */
  function filtered() {
    const q = norm(query.trim());
    return PRODUCTS.filter((p) => {
      if (currentCat !== "todos" && p.cat !== currentCat) return false;
      if (!q) return true;
      const hay = norm(p.name + " " + p.zone + " " + (p.tags || []).join(" ") + " " + p.desc);
      return hay.includes(q);
    });
  }

  function cardHTML(p) {
    const isIn = inPlan(p.id);
    const off = p.oldPrice && p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    return `
      <article class="card" data-id="${p.id}">
        <div class="card__media" data-open="${p.id}">
          <img src="${IMG}${p.img}" alt="${esc(p.name)}" loading="lazy" onerror="imgError(this)">
          <span class="card__tag">${catLabel(p.cat)}</span>
          ${off > 0 ? `<span class="card__off">-${off}%</span>` : ""}
        </div>
        <div class="card__body">
          <span class="card__zone">📍 ${esc(p.zone)}</span>
          <h3 class="card__title" data-open="${p.id}">${esc(p.name)}</h3>
          <div class="card__price">${priceHTML(p, false)}</div>
          <div class="card__actions">
            <button class="card__view" data-open="${p.id}">Ver detalles</button>
            <button class="card__add ${isIn ? "added" : ""}" data-add="${p.id}" aria-label="Agregar al plan">${isIn ? "✓" : "+"}</button>
          </div>
        </div>
      </article>`;
  }
  function catLabel(id) { const c = CATEGORIES.find((x) => x.id === id); return c ? esc(c.label) : ""; }

  function renderGrid() {
    const grid = $("#grid");
    const list = filtered();
    shown = Math.min(Math.max(shown, PAGE), list.length) || Math.min(PAGE, list.length);
    const slice = list.slice(0, shown);
    grid.innerHTML = slice.map(cardHTML).join("");
    $("#empty").hidden = list.length !== 0;
    $("#loadMore").hidden = shown >= list.length;
    // bind
    $$("[data-open]", grid).forEach((el) => el.addEventListener("click", () => openModal(el.dataset.open)));
    $$("[data-add]", grid).forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); toggleQuick(el.dataset.add); }));
  }
  $("#loadMore").addEventListener("click", () => { shown += PAGE; renderGrid(); });
  $("#search").addEventListener("input", (e) => { query = e.target.value; shown = 0; renderGrid(); });

  /* ---------- Plan / carrito ---------- */
  function addItem(id, qty) {
    const p = byId(id); if (!p) return;
    const q = hasQty(p) ? clampQty(qty) : 1;
    const e = planFind(id);
    if (e) e.qty = q; else plan.push({ id, qty: q });
    savePlan(); syncPlanUI();
  }
  function toggleQuick(id) {
    if (inPlan(id)) { removeFromPlan(id); toast("Quitado de tu plan"); }
    else { addItem(id, 1); toast("✓ Agregado a tu plan"); }
  }
  function setQty(id, qty) {
    const e = planFind(id); if (!e) return;
    e.qty = clampQty(qty); savePlan(); syncPlanUI(); renderDrawer();
  }
  function removeFromPlan(id) {
    const i = plan.findIndex((e) => e.id === id);
    if (i >= 0) { plan.splice(i, 1); savePlan(); syncPlanUI(); renderDrawer(); }
  }

  function syncPlanUI() {
    const n = plan.length;
    ["#planCountTop", "#planCountBottom"].forEach((s) => { const el = $(s); if (el) el.textContent = n; });
    // refresh quick-add buttons en el grid
    $$(".card__add[data-add]").forEach((el) => {
      const on = inPlan(el.dataset.add);
      el.classList.toggle("added", on); el.textContent = on ? "✓" : "+";
    });
  }

  /* ---------- Modal producto ---------- */
  const modal = $("#modal");
  function openModal(id) {
    const p = byId(id); if (!p) return;
    const imgs = galleryFor(p);
    const inc = (p.includes || []).map((i) => `<li>${esc(i)}</li>`).join("");
    const ninc = (p.notIncludes || []).map((i) => `<li>${esc(i)}</li>`).join("");
    const tags = (p.tags || []).map((t) => `<span class="detail__tag">${esc(t)}</span>`).join("");
    const u = unitOf(p);
    const startQty = (planFind(p.id) || {}).qty || 1;

    $("#modalBody").innerHTML = `
      <div class="gallery">
        <div class="gallery__track" id="galTrack">
          ${imgs.map((f) => `<div class="gallery__slide"><img src="${IMG}${f}" alt="${esc(p.name)}" onerror="imgError(this)"></div>`).join("")}
        </div>
        ${imgs.length > 1 ? `
          <button class="gallery__nav gallery__nav--prev" id="galPrev" aria-label="Anterior">‹</button>
          <button class="gallery__nav gallery__nav--next" id="galNext" aria-label="Siguiente">›</button>
          <div class="gallery__dots" id="galDots">${imgs.map((_, i) => `<b class="${i === 0 ? "on" : ""}"></b>`).join("")}</div>` : ""}
      </div>
      <div class="detail">
        <div class="detail__tags">
          <span class="detail__tag detail__tag--zone">📍 ${esc(p.zone)}</span>${tags}
        </div>
        <h2 id="mTitle">${esc(p.name)}</h2>
        <div class="detail__meta">
          ${p.duration ? `<span>⏱️ ${esc(p.duration)}</span>` : ""}
          ${p.schedule ? `<span>🗓️ ${esc(p.schedule)}</span>` : ""}
        </div>
        <p class="detail__desc">${esc(p.desc)}</p>
        <div class="detail__price">${priceHTML(p, true)}</div>
        ${hasQty(p) ? `
        <div class="qtybar">
          <span class="qtybar__label">${unitCap(u)} <small>(1–20)</small></span>
          <div class="qty">
            <button class="qty__btn" id="qDec" type="button" aria-label="Disminuir">−</button>
            <input class="qty__val" id="qVal" type="number" min="1" max="20" step="1" value="${startQty}" inputmode="numeric" aria-label="Cantidad">
            <button class="qty__btn" id="qInc" type="button" aria-label="Aumentar">+</button>
          </div>
        </div>` : ""}
        ${inc ? acc("Qué incluye", inc, true, true) : ""}
        ${ninc ? acc("No incluye", ninc, false, false) : ""}
        ${p.notes ? `<p class="detail__note">ℹ️ ${esc(p.notes)}</p>` : ""}
      </div>
      <div class="detail__foot">
        <div class="pfoot" id="mFoot"></div>
        <button class="btn btn--soft" id="modalAdd">Agregar al plan</button>
        <button class="btn btn--primary" id="modalReserve">Reservar</button>
      </div>`;

    // ---- cantidad + precio en vivo ----
    const curQty = () => { const v = $("#qVal"); return v ? clampQty(v.value) : 1; };
    function updateModal() {
      const q = curQty(); const v = $("#qVal"); if (v) v.value = q;
      const foot = $("#mFoot");
      if (p.price == null) {
        foot.innerHTML = `<b style="color:var(--cyan)">Consultar</b><small>precio bajo cotización</small>`;
      } else if (hasQty(p)) {
        foot.innerHTML = `<b>${cop(p.price * q)}</b><small>${cop(p.price)} × ${q} ${unitWord(u, q)}</small>`;
      } else {
        foot.innerHTML = `<b>${cop(p.price)}</b><small>${p.oldPrice ? "Antes " + cop(p.oldPrice) : "precio del paquete"}</small>`;
      }
      const add = $("#modalAdd"); const on = inPlan(p.id);
      add.classList.toggle("added", on);
      add.innerHTML = on ? "✓ En tu plan" : "Agregar al plan";
    }
    function onQty() { if (inPlan(p.id)) { planFind(p.id).qty = curQty(); savePlan(); syncPlanUI(); } updateModal(); }
    if (hasQty(p)) {
      $("#qDec").addEventListener("click", () => { $("#qVal").value = clampQty(curQty() - 1); onQty(); });
      $("#qInc").addEventListener("click", () => { $("#qVal").value = clampQty(curQty() + 1); onQty(); });
      $("#qVal").addEventListener("input", onQty);
      $("#qVal").addEventListener("change", onQty);
    }
    updateModal();
    $("#modalAdd").addEventListener("click", () => { addItem(p.id, curQty()); updateModal(); toast("✓ Agregado a tu plan"); });
    $("#modalReserve").addEventListener("click", () => { addItem(p.id, curQty()); closeModal(); openDrawer(); });
    $$(".acc__head", $("#modalBody")).forEach((h) =>
      h.addEventListener("click", () => {
        const a = h.parentElement; a.classList.toggle("open");
        const body = $(".acc__body", a);
        body.style.maxHeight = a.classList.contains("open") ? body.scrollHeight + "px" : 0;
      }));
    setupGallery(imgs.length);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function acc(title, items, isInc, open) {
    return `<div class="acc ${isInc ? "" : "acc--no"} ${open ? "open" : ""}">
      <button class="acc__head" type="button">${esc(title)} <i>+</i></button>
      <div class="acc__body"${open ? ' style="max-height:600px"' : ""}><ul>${items}</ul></div>
    </div>`;
  }
  function closeModal() {
    modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true");
    if (!$("#drawer").classList.contains("is-open")) document.body.style.overflow = "";
  }
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));

  function setupGallery(count) {
    if (count < 2) return;
    const track = $("#galTrack"), dots = $$("#galDots b");
    const idx = () => Math.round(track.scrollLeft / track.clientWidth);
    track.addEventListener("scroll", () => {
      const i = idx(); dots.forEach((d, k) => d.classList.toggle("on", k === i));
    }, { passive: true });
    $("#galPrev").addEventListener("click", () => track.scrollBy({ left: -track.clientWidth, behavior: "smooth" }));
    $("#galNext").addEventListener("click", () => track.scrollBy({ left: track.clientWidth, behavior: "smooth" }));
  }

  /* ---------- Drawer / plan ---------- */
  const drawer = $("#drawer");
  let drawerView = "cart";
  function openDrawer() {
    drawerView = "cart"; renderDrawer();
    drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true");
    if (!modal.classList.contains("is-open")) document.body.style.overflow = "";
  }
  $$("[data-close-drawer]", drawer).forEach((el) => el.addEventListener("click", closeDrawer));
  ["#planBtnTop", "#planBtnBottom"].forEach((s) => { const el = $(s); if (el) el.addEventListener("click", openDrawer); });

  function planEntries() {
    return plan.map((e) => { const p = byId(e.id); return p ? { p, qty: clampQty(e.qty), unit: unitOf(p) } : null; })
               .filter(Boolean);
  }
  const lineTotal = (en) => (en.p.price != null ? en.p.price * (hasQty(en.p) ? en.qty : 1) : 0);
  function planTotal() {
    const ents = planEntries();
    const priced = ents.filter((en) => en.p.price != null);
    const allPriced = priced.length === ents.length && ents.length > 0;
    const total = priced.reduce((s, en) => s + lineTotal(en), 0);
    return { total, allPriced, hasAsk: priced.length !== ents.length };
  }

  function renderDrawer() {
    const body = $("#drawerBody"), foot = $("#drawerFoot");
    const ents = planEntries();
    if (drawerView === "form") return renderForm(body, foot);

    if (!ents.length) {
      body.innerHTML = `<div class="drawer__empty"><span>🧳</span>Tu plan está vacío.<br>Explora el catálogo y agrega tus experiencias favoritas.</div>`;
      foot.innerHTML = `<button class="btn btn--primary btn--block" id="dKeep">Explorar catálogo</button>`;
      $("#dKeep").addEventListener("click", () => { closeDrawer(); scrollToCatalog(); });
      return;
    }
    body.innerHTML = ents.map((en) => {
      const p = en.p, q = en.qty, u = en.unit, priced = p.price != null;
      let block;
      if (hasQty(p)) {
        block = `
          <div class="ci__qty">
            <div class="qty qty--sm">
              <button class="qty__btn" data-dec="${p.id}" type="button" aria-label="Disminuir">−</button>
              <input class="qty__val" data-qty="${p.id}" type="number" min="1" max="20" step="1" value="${q}" inputmode="numeric" aria-label="Cantidad">
              <button class="qty__btn" data-inc="${p.id}" type="button" aria-label="Aumentar">+</button>
            </div>
            <span class="ci__unit">${unitWord(u, q)}</span>
          </div>
          ${priced
            ? `<div class="ci__line"><span>${cop(p.price)} × ${q}</span><b>${cop(p.price * q)}</b></div>`
            : `<div class="ci__ask">Consultar precio · ${q} ${unitWord(u, q)}</div>`}`;
      } else {
        block = priced
          ? `<div class="ci__line"><span>Precio del paquete</span><b>${cop(p.price)}</b></div>`
          : `<div class="ci__ask">Consultar precio</div>`;
      }
      return `
      <div class="ci">
        <img src="${IMG}${p.img}" alt="" onerror="imgError(this)">
        <div class="ci__info">
          <b>${esc(p.name)}</b>
          <small>📍 ${esc(p.zone)}</small>
          ${block}
        </div>
        <button class="ci__rm" data-rm="${p.id}" aria-label="Quitar">✕</button>
      </div>`;
    }).join("");
    $$("[data-rm]", body).forEach((el) => el.addEventListener("click", () => removeFromPlan(el.dataset.rm)));
    $$("[data-dec]", body).forEach((el) => el.addEventListener("click", () => setQty(el.dataset.dec, (planFind(el.dataset.dec) || {}).qty - 1)));
    $$("[data-inc]", body).forEach((el) => el.addEventListener("click", () => setQty(el.dataset.inc, (planFind(el.dataset.inc) || {}).qty + 1)));
    $$("[data-qty]", body).forEach((el) => el.addEventListener("change", () => setQty(el.dataset.qty, el.value)));

    const { total, allPriced, hasAsk } = planTotal();
    foot.innerHTML = `
      <div class="sum"><span>Total aproximado ${hasAsk ? "<small>(sin ítems a cotizar)</small>" : ""}</span><b>${allPriced || total > 0 ? cop(total) : "Por cotizar"}</b></div>
      ${hasAsk ? `<p class="drawer__hint">Algunos planes son “precio bajo cotización”. Te los confirmamos por WhatsApp.</p>` : ""}
      <div style="display:grid;gap:8px">
        <button class="btn btn--primary btn--block" id="dGo">Continuar a contacto →</button>
        <button class="btn btn--soft btn--block" id="dKeep2">Seguir agregando</button>
      </div>`;
    $("#dGo").addEventListener("click", () => { drawerView = "form"; renderDrawer(); });
    $("#dKeep2").addEventListener("click", () => { closeDrawer(); scrollToCatalog(); });
  }

  /* ---------- Formulario ---------- */
  function renderForm(body, foot) {
    body.innerHTML = `
      <button class="form__back" id="fBack">← Volver a mi plan</button>
      <p class="drawer__hint">Completa tus datos y te enviamos la solicitud por WhatsApp con todo organizado.</p>
      <form class="form" id="planForm" novalidate>
        <div class="field"><label>Nombre completo *</label><input name="nombre" autocomplete="name" required><span class="err">Ingresa tu nombre.</span></div>
        <div class="form__row">
          <div class="field"><label>Celular *</label><input name="celular" inputmode="tel" autocomplete="tel" required><span class="err">Número inválido.</span></div>
          <div class="field"><label>WhatsApp</label><input name="whatsapp" inputmode="tel"><span class="err"></span></div>
        </div>
        <div class="field"><label>Correo electrónico *</label><input name="correo" type="email" inputmode="email" autocomplete="email" required><span class="err">Correo inválido.</span></div>
        <div class="form__row">
          <div class="field"><label>Fecha tentativa</label><input name="fecha" type="date"><span class="err"></span></div>
          <div class="field"><label>N° de personas</label><input name="personas" type="number" min="1" inputmode="numeric"><span class="err"></span></div>
        </div>
        <div class="field"><label>Ciudad / lugar de salida</label><input name="ciudad"><span class="err"></span></div>
        <div class="field"><label>Mensaje adicional</label><textarea name="mensaje" placeholder="Cuéntanos cualquier detalle…"></textarea><span class="err"></span></div>
      </form>`;
    foot.innerHTML = `<button class="btn btn--wa btn--block" id="fSend">
      <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 5-1.3A10 10 0 1 0 12 2"/></svg>
      Enviar por WhatsApp</button>`;
    $("#fBack").addEventListener("click", () => { drawerView = "cart"; renderDrawer(); });
    $("#fSend").addEventListener("click", submitForm);
  }

  function submitForm() {
    const form = $("#planForm");
    const data = Object.fromEntries(new FormData(form).entries());
    let ok = true;
    const setErr = (name, bad) => {
      const f = form.querySelector(`[name="${name}"]`).closest(".field");
      f.classList.toggle("invalid", bad); if (bad) ok = false;
    };
    setErr("nombre", !data.nombre.trim());
    setErr("celular", !/\d{7,}/.test((data.celular || "").replace(/\D/g, "")));
    setErr("correo", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo || ""));
    if (!ok) { toast("Revisa los campos marcados"); return; }

    const ents = planEntries();
    let msg = "Hola, quiero recibir información o reservar los siguientes servicios:\n\n";
    msg += "*Servicios seleccionados:*\n";
    ents.forEach((en, i) => {
      const p = en.p, q = en.qty, u = en.unit;
      if (p.price == null) {
        msg += `${i + 1}. ${p.name}${hasQty(p) ? ` x ${q} ${unitWord(u, q)}` : ""} - Consultar precio\n`;
      } else if (hasQty(p)) {
        msg += `${i + 1}. ${p.name} x ${q} ${unitWord(u, q)} - ${cop(p.price)} c/u = ${cop(p.price * q)}\n`;
      } else {
        msg += `${i + 1}. ${p.name} - ${cop(p.price)}\n`;
      }
    });
    const { total, allPriced } = planTotal();
    if (allPriced) msg += `\n*Total aproximado:* ${cop(total)}\n`;
    else if (total > 0) msg += `\n*Subtotal (planes con precio):* ${cop(total)}\n`;

    msg += "\n*Datos del cliente:*\n";
    msg += `Nombre: ${data.nombre}\n`;
    msg += `Celular: ${data.celular}\n`;
    msg += `WhatsApp: ${data.whatsapp || data.celular}\n`;
    msg += `Correo: ${data.correo}\n`;
    if (data.fecha) msg += `Fecha tentativa: ${data.fecha}\n`;
    if (data.personas) msg += `Número de personas: ${data.personas}\n`;
    if (data.ciudad) msg += `Ciudad de salida: ${data.ciudad}\n`;
    if (data.mensaje) msg += `Mensaje adicional: ${data.mensaje}\n`;
    msg += "\nQuedo atento/a a la información. ¡Gracias!";

    window.open(waLink(msg), "_blank");
    toast("Abriendo WhatsApp… 💬");
  }

  /* ---------- Testimonios ---------- */
  const TST = [
    { n: "Laura Gómez", c: "Bogotá", t: "El tour a Islas del Rosario fue espectacular. Todo súper organizado y el almuerzo delicioso. ¡Repetiré!", a: "LG" },
    { n: "Andrés Pérez", c: "Medellín", t: "La chiva rumbera en Cartagena fue lo mejor de mi viaje. Música, ambiente y guías geniales.", a: "AP" },
    { n: "Valentina Ruiz", c: "Cali", t: "Reservamos por WhatsApp en minutos. El atardecer en yate fue de película. 100% recomendado.", a: "VR" },
    { n: "Camilo Torres", c: "Barranquilla", t: "Guatapé y la Piedra del Peñol increíbles. Transporte cómodo y muy buena atención.", a: "CT" },
    { n: "Daniela M.", c: "EE.UU.", t: "El apartamento en Baia Kristal con vista a la laguna fue un sueño. Volveremos seguro.", a: "DM" }
  ];
  function renderTst() {
    $("#tstRail").innerHTML = TST.map((t) => `
      <figure class="tst">
        <div class="tst__stars">★★★★★</div>
        <blockquote class="tst__quote">“${esc(t.t)}”</blockquote>
        <figcaption class="tst__who">
          <span class="tst__av">${esc(t.a)}</span>
          <span><b>${esc(t.n)}</b><small>${esc(t.c)}</small></span>
        </figcaption>
      </figure>`).join("");
  }

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* ---------- Header shrink + Esc ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (modal.classList.contains("is-open")) closeModal(); else if (drawer.classList.contains("is-open")) closeDrawer(); }
  });

  /* ---------- Bloquear zoom en móvil (iOS + Android) ---------- */
  function preventMobileZoom() {
    // iOS Safari: gestos de pellizco (ignora user-scalable=no)
    ["gesturestart", "gesturechange", "gestureend"].forEach((ev) =>
      document.addEventListener(ev, (e) => e.preventDefault(), { passive: false })
    );
    // Pellizco con 2+ dedos en cualquier plataforma (no afecta el scroll de 1 dedo)
    document.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    }, { passive: false });
    // El doble-toque para hacer zoom queda desactivado vía CSS (touch-action:manipulation),
    // sin afectar toques rápidos en botones o selectores de cantidad.
  }

  /* ---------- Init ---------- */
  preventMobileZoom();
  wirePassiveWA();
  renderCatRail();
  renderFilters();
  renderGrid();
  renderTst();
  syncPlanUI();
})();
