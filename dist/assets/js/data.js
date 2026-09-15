/* =========================================================
   My Tours Cartagena — Datos del catálogo
   Generado a partir de Catalogo.txt (interpretado y organizado)
   ========================================================= */

const CONFIG = {
  brand: "My Tours Cartagena",
  whatsapp: "573058585358",        // línea principal
  whatsappAlt: "573045763880",     // línea alterna
  instagram: "https://instagram.com/mytourscartagena21",
  instagramHandle: "@mytourscartagena21",
  cardSurcharge: "Pagos con tarjeta tienen un recargo del 6%.",
  img: "assets/img/"
};

/* Categorías (filtros del catálogo) */
const CATEGORIES = [
  { id: "todos",        label: "Todos",            icon: "✦", img: "playa-2.jpg" },
  { id: "playas",       label: "Playas & Pasadías",icon: "🏖️", img: "playa-7.jpg" },
  { id: "islas",        label: "Islas del Rosario",icon: "🏝️", img: "isla-1.jpg" },
  { id: "barcos",       label: "Barcos & Yates",   icon: "⛵", img: "barco-1.jpg" },
  { id: "chivas",       label: "Chivas Rumberas",  icon: "🎉", img: "chiva-1.jpg" },
  { id: "medellin",     label: "Medellín & Antioquia", icon: "⛰️", img: "med-2.jpg" },
  { id: "citytours",    label: "City Tours",       icon: "🏛️", img: "city-1.jpg" },
  { id: "alojamientos", label: "Alojamientos",     icon: "🏡", img: "aloj-3.jpg" }
];

/* Pools de imágenes por categoría (para construir los carruseles) */
const IMG_POOL = {
  playas:       ["playa-1.jpg","playa-2.jpg","playa-3.jpg","playa-4.jpg","playa-5.jpg","playa-6.jpg","playa-7.jpg","playa-8.jpg","playa-9.jpg","playa-10.jpg"],
  islas:        ["isla-1.jpg","isla-2.jpg","isla-3.jpg","isla-4.jpg","isla-5.jpg","isla-6.jpg","isla-7.jpg","isla-8.jpg","isla-9.jpg"],
  barcos:       ["barco-1.jpg","barco-2.jpg","barco-3.jpg","barco-4.jpg","barco-5.jpg","barco-6.jpg","barco-7.jpg"],
  chivas:       ["chiva-1.jpg","chiva-2.jpg","chiva-3.jpg","chiva-4.jpg","city-2.jpg"],
  medellin:     ["med-2.jpg","med-3.jpg","med-4.jpg","med-5.jpg","med-1.jpg"],
  citytours:    ["city-1.jpg","city-2.jpg","city-3.jpg","city-4.jpg"],
  alojamientos: ["aloj-1.jpg","aloj-2.jpg","aloj-3.jpg","aloj-4.jpg","aloj-5.jpg","aloj-6.jpg","aloj-7.jpg","aloj-8.jpg","aloj-9.jpg","aloj-10.jpg","aloj-11.jpg","aloj-12.jpg","med-6.jpg"]
};

/* Productos / experiencias */
const PRODUCTS = [
  /* ---------------- PLAYAS & PASADÍAS ---------------- */
  {
    id: "playa-acuario-plankton", cat: "playas", zone: "Barú", name: "Playa Tranquila + Acuario + Plankton",
    price: 200000, oldPrice: null, img: "playa-1.jpg", duration: "Día completo",
    schedule: "Salida 8:30 a.m. · Regreso 8:30 p.m.",
    tags: ["Bus + lancha", "Bioluminiscencia"],
    desc: "Magia de día y de noche en el Caribe: recorrido por el Acuario, día de sol en Playa Tranquila y el espectáculo del plancton bioluminiscente bajo las estrellas.",
    includes: ["Recogida en hotel desde 7:00 a.m.","Bus climatizado a Barú","Lancha al Acuario (entrada incluida)","Silla y carpa en Playa Tranquila","Degustación de frutas tropicales","Almuerzo (3 opciones)","Actividad de plankton + refrigerio","Retorno al hotel"],
    notes: "Pagos con tarjeta tienen un recargo del 6%."
  },
  {
    id: "playa-mapaches", cat: "playas", zone: "Barú", name: "Playa Tranquila + Mapaches + Snorkeling",
    price: 190000, oldPrice: 240000, img: "playa-4.jpg", duration: "Día completo",
    schedule: "Salida 8:00 a.m. · Regreso 4:30 p.m.",
    tags: ["Snorkeling", "Manglares"],
    desc: "Aguas cristalinas y arena blanca en la Isla de Barú, con tour por los manglares, avistamiento de mapaches y snorkeling en aguas turquesa.",
    includes: ["Recogida en hotel","Bus climatizado a Barú","Lancha a Playa Tranquila","Silla y carpas","Tour de manglares y mapaches","Actividad de snorkeling","Degustación de frutas","Almuerzo (3 opciones)"],
    notes: "Otras variantes: Básico $100.000 · +Plankton $150.000 · +Oceanario $180.000 · +Oceanario y Plankton $190.000."
  },
  {
    id: "tamarindo", cat: "playas", zone: "Tierra Bomba", name: "Pasadía Tamarindo Beach",
    price: 175000, oldPrice: 195000, img: "playa-2.jpg", duration: "Pasadía",
    schedule: "Salida 9:00 a.m. · Regreso 4:00 p.m.",
    tags: ["A 10 min", "Club de playa"],
    desc: "Acogedor club de playa en la isla de Tierra Bomba, a solo 10 minutos de Cartagena, con gastronomía isleña y sonidos tropicales.",
    includes: ["Transporte ida y regreso en lancha","Cóctel de bienvenida","Almuerzo (típico isleño o pollo)","Piscina","Cama lounge o asoleadora","Duchas de agua dulce","Acceso a playa semiprivada"],
    notIncludes: ["Toallas (+$5.000)","Deportes acuáticos","Servicio de SPA"]
  },
  {
    id: "margaritas", cat: "playas", zone: "Punta Arena", name: "Pasadía Margaritas Beach",
    price: 170000, oldPrice: 210000, img: "playa-8.jpg", duration: "Pasadía",
    schedule: "9:00 a.m. – 4:00 p.m.",
    tags: ["Vista a la ciudad", "Piscina"],
    desc: "Día de playa en Punta Arena (Tierra Bomba), muy cerca de Cartagena, con una linda vista de la ciudad y ambiente tranquilo.",
    includes: ["Lancha rápida ida y regreso (10 min)","Cóctel de bienvenida","Almuerzo (pescado o pollo)","Cubículo con mesa, sillas y hamaca","Asoleadora","Piscina"],
    notIncludes: ["Bebida adicional en el almuerzo","Consumos no especificados"]
  },
  {
    id: "fenix", cat: "playas", zone: "Punta Arena", name: "Pasadía Fenix Beach",
    price: 280000, oldPrice: 320000, img: "playa-7.jpg", duration: "Pasadía",
    schedule: "Salida 9:30/10:30 a.m. · Regreso 5:30/6:00 p.m.",
    tags: ["Playa privada", "Restaurante & bar"],
    desc: "Una de las playas más extensas y privadas de Tierra Bomba, con restaurante, cocktail bar, piscina, hamacas y canchas deportivas.",
    includes: ["Lancha ida y regreso (15 min)","Welcome drink","Bebida no alcohólica + postre","Almuerzo (varias opciones)","Sombras y camas de playa","Toalla","Piscina y cancha de volley"],
    notIncludes: ["Impuesto de muelle $10.000","Gastos personales en la isla"]
  },
  {
    id: "namaste", cat: "playas", zone: "Punta Arena", name: "Pasadía Namaste Beach Club",
    price: null, oldPrice: null, img: "playa-10.jpg", duration: "Pasadía",
    schedule: "Salida 9:00–10:00 a.m. · Regreso desde 4:00 p.m.",
    tags: ["Bienestar", "Yoga & SPA"],
    desc: "Resort de playa holístico en Punta Arena: cabañas privadas, yoga, masajes, cocina caribeña y mediterránea, en un ambiente de relax total.",
    includes: ["Transporte ida y regreso","Bebida de bienvenida","Bono consumible $40.000","Préstamo de toalla","Cama, quiosco o pérgola","Actividades de bienestar (Plan Plus)"],
    notes: "Disponible en Plan Holístico y Plan Holístico Plus. Escríbenos para cotizar tu fecha."
  },
  {
    id: "tropical-inn", cat: "playas", zone: "Tierra Bomba", name: "Pasadía Tropical Inn",
    price: 190000, oldPrice: 210000, img: "playa-3.jpg", duration: "Pasadía",
    schedule: "8:00 a.m. – 4:00 p.m.",
    tags: ["Arena blanca", "Parque infantil"],
    desc: "Costa de arena blanca en Tierra Bomba, a 10 minutos en lancha de Cartagena, con piscina al aire libre y vistas a la ciudad moderna.",
    includes: ["Recepción en el punto de encuentro","Traslado en lancha ida y vuelta","Cóctel de bienvenida","Carpas y sillas playeras","Almuerzo típico + bebida","Piscina y zona de playa","Parque infantil, baños y duchas"],
    notIncludes: ["Tasa portuaria $12.000"]
  },
  {
    id: "punta-arena", cat: "playas", zone: "Tierra Bomba", name: "Tour Isla Punta Arena",
    price: 80000, oldPrice: 90000, img: "playa-5.jpg", duration: "Pasadía",
    schedule: "Salidas 9:00 / 10:00 / 11:00 a.m. · Regreso 4–5 p.m.",
    tags: ["Económico", "A 10 min"],
    desc: "La escapada perfecta y económica a Punta Arena, a solo 10 minutos de Cartagena, con almuerzo típico frente al mar.",
    includes: ["Transporte en lancha rápida ida y regreso","Chaleco salvavidas","Almuerzo típico (pescado o pollo, arroz con coco, ensalada y patacón)"],
    notIncludes: ["Cervezas, snorkel, sillas, carpas y actividades no especificadas"]
  },
  {
    id: "nena-beach", cat: "playas", zone: "Barú", name: "Playa Blanca · Nena Beach Club",
    price: null, oldPrice: null, img: "playa-9.jpg", duration: "Pasadía",
    schedule: "9:30 a.m. – 5:30 p.m.",
    tags: ["Playa Blanca", "Cócteles"],
    desc: "Un día de playa a tu ritmo en la famosa Playa Blanca: mar cristalino, cócteles artesanales y la mejor pizza isleña con receta original.",
    includes: ["Transporte ida y vuelta en van climatizada","Cóctel de bienvenida","Almuerzo","Cama de playa","Uso de instalaciones (baños y duchas)","Café"],
    notes: "Precio bajo cotización — consúltanos disponibilidad por WhatsApp."
  },
  {
    id: "aviario", cat: "playas", zone: "Barú", name: "Aviario Nacional + Playa Blanca",
    price: 290000, oldPrice: 320000, img: "playa-6.jpg", duration: "Día completo",
    schedule: "Salidas diarias",
    tags: ["+ Playa Blanca", "Show de aves"],
    desc: "El aviario más grande de América y el sexto del mundo, en Barú: cientos de aves en un santuario natural, y la tarde en Playa Blanca.",
    includes: ["Transporte en bus climatizado","Guía acompañante","Ticket de entrada al Aviario","Recorrido + show de aves","Traslado a Playa Blanca","Almuerzo típico","Retorno a Cartagena"]
  },

  /* ---------------- ISLAS DEL ROSARIO ---------------- */
  {
    id: "bora-bora", cat: "islas", zone: "Islas del Rosario", name: "Isla Bora Bora Beach Club",
    price: 385000, oldPrice: 390000, img: "isla-5.jpg", duration: "Pasadía",
    schedule: "Salida desde el muelle (mañana)",
    tags: ["Club de playa", "Ambiente de fiesta"],
    desc: "Paradisíaco club de playa de ambiente mágico y fiesta constante, en pleno archipiélago de las Islas del Rosario.",
    includes: ["Transporte náutico ida y vuelta","Cóctel de bienvenida","Cama o asoleadora","Almuerzo (pescado, pollo o vegetariano)","Panorámico de islas rumbo a Bora Bora"],
    notIncludes: ["Impuesto portuario $23.000","Ingreso de bebidas y alimentos a la isla"]
  },
  {
    id: "lizamar", cat: "islas", zone: "Islas del Rosario", name: "Pasadía Isla Lizamar",
    price: 310000, oldPrice: 330000, img: "isla-3.jpg", duration: "Pasadía",
    schedule: "Día completo en la isla",
    tags: ["Playa privada", "Aguas cristalinas"],
    desc: "Una de las mejores formas de conocer las Islas del Rosario: playa privada, aguas cristalinas y un día de puro relax en el Caribe.",
    includes: ["Transporte ida y vuelta en bote","Almuerzo","Bebida de bienvenida","Acceso a playas, piscinas y áreas comunes"]
  },
  {
    id: "rosario-clasica", cat: "islas", zone: "Islas del Rosario", name: "Pasadía Islas del Rosario",
    price: 280000, oldPrice: null, img: "isla-1.jpg", duration: "Pasadía",
    schedule: "Salidas diarias",
    tags: ["27 islas", "Corales"],
    desc: "Un archipiélago de unas 27 islas, rico en corales multicolores, arrecifes y playas de arena blanca con aguas cristalinas.",
    includes: ["Transporte ida y vuelta","Acceso a playas de arena blanca","Vida marina y corales para explorar"]
  },
  {
    id: "mangata", cat: "islas", zone: "Islas del Rosario", name: "Pasadía Mangata Beach Club",
    price: 390000, oldPrice: 400000, img: "isla-7.jpg", duration: "Pasadía",
    schedule: "Llegada al muelle 7:50 a.m. · Retorno 4:00 p.m.",
    tags: ["Premium", "Paddle & kayak"],
    desc: "Beach club premium en Isla Grande: lanchas rápidas, almuerzo a la carta con 8 opciones, paddleboards transparentes, kayak y snorkel.",
    includes: ["Transporte en lancha rápida ida y vuelta","Copa de champaña o jugo natural","Cama o silla asoleadora","Almuerzo a la carta (8 opciones)","Paddleboards / kayaks / snorkel","Ducha y servicio de toallas","Acceso a todas las instalaciones"],
    notIncludes: ["Impuesto de muelle $23.000 (efectivo)"]
  },
  {
    id: "tour-5-islas", cat: "islas", zone: "Islas del Rosario", name: "Tour 5 Islas en Lancha Rápida",
    price: 290000, oldPrice: 350000, img: "isla-2.jpg", duration: "Día completo",
    schedule: "Pick up desde 7:00 a.m. · Regreso 4:00 p.m.",
    tags: ["Circuito", "Snorkel"],
    desc: "Circuito en lancha rápida por las playas e islas más bellas del parque natural: snorkel, Isla Grande, Cholón y Playa Mambo.",
    includes: ["Recogida en zona turística","Vista panorámica del Fuerte de San Fernando","Snorkel en aguas claras","Almuerzo o crédito de $30.000","Meriendas y botella de agua","Equipo de snorkel","Guía y seguro de viaje","Impuestos"],
    notIncludes: ["Bebidas alcohólicas","Toallas","Propinas"]
  },
  {
    id: "isla-pirata", cat: "islas", zone: "Islas del Rosario", name: "Pasadía Isla del Pirata",
    price: 320000, oldPrice: 350000, img: "isla-6.jpg", duration: "Pasadía",
    schedule: "Muelle 8:00 a.m. · Regreso 2:40–3:00 p.m.",
    tags: ["Cocoteros", "Piscinas naturales"],
    desc: "Isla paradisíaca de exuberante vegetación, custodiada por la barrera de arrecifes: cocoteros, brisa marina y piscinas naturales.",
    includes: ["Transporte en lancha rápida","Almuerzo típico (pescado o pollo)","Bebida","Cama asoleadora"],
    notIncludes: ["Impuesto de embarque","Snorkel, buceo u oceanario","WiFi"]
  },
  {
    id: "islabela", cat: "islas", zone: "Islas del Rosario", name: "Tour a Islabela",
    price: 310000, oldPrice: 350000, img: "isla-4.jpg", duration: "Día completo",
    schedule: "Muelle 8:20 a.m. · Regreso 2:40 p.m.",
    tags: ["Cupo limitado", "Ecoturismo"],
    desc: "Isla de capacidad limitada para un día íntimo en el Caribe, en un área protegida de arrecifes con ecoturismo sostenible.",
    includes: ["Lancha rápida ida y vuelta (muelle La Bodeguita)","Bebida de bienvenida","Almuerzo (pescado, pollo o vegetariano)","Uso de instalaciones y restaurante","Kayak (según disponibilidad)","Clases de yoga (fines de semana)"],
    notIncludes: ["Traslado alojamiento–muelle","Impuesto de embarque","Toallas (+$10.000)"]
  },
  {
    id: "sol-papaya", cat: "islas", zone: "Islas del Rosario", name: "Tour Sol y Papaya · Isla Grande",
    price: 320000, oldPrice: 350000, img: "isla-9.jpg", duration: "Día completo",
    schedule: "8:15 a.m. – 3:30 p.m.",
    tags: ["Caminata ecológica", "Manglares"],
    desc: "Un paraíso escondido en Isla Grande: playa y mar, caminata ecológica, manglares y bosque, con recreación dirigida.",
    includes: ["Traslado en lancha rápida","Panorámica por las Islas del Rosario","Uso del restaurante e instalaciones","Camas asoleadoras y sillas","Almuerzo típico","Cóctel de bienvenida","Recreación con guía en español"],
    notIncludes: ["Impuesto de zarpe $23.000","Deportes náuticos","Consumos adicionales"]
  },
  {
    id: "buceo-baru", cat: "islas", zone: "Isla Barú", name: "Buceo en Isla Barú (2 inmersiones)",
    price: 490000, oldPrice: 590000, img: "isla-8.jpg", duration: "Día completo",
    schedule: "Salidas diarias",
    tags: ["Apto principiantes", "2 inmersiones"],
    desc: "Incluye minicurso para principiantes (teoría + práctica en piscina) y dos buceos de más de 40 minutos en distintos puntos de arrecife.",
    includes: ["Transporte terrestre y marítimo","Minicurso de buceo (si es tu primera vez)","2 inmersiones en puntos diferentes","Equipos para la actividad","Divemaster o instructor","Snacks y almuerzo típico","Tiempo de playa"]
  },

  /* ---------------- BARCOS & YATES ---------------- */
  {
    id: "phantom-atardecer", cat: "barcos", zone: "Bahía de Cartagena", name: "Atardecer en Barco Pirata Phantom",
    price: 90000, oldPrice: 120000, img: "barco-6.jpg", duration: "2 horas",
    schedule: "Abordaje 4–5 p.m. · Zarpe 5 p.m. · Regreso 7 p.m.",
    tags: ["Atardecer", "Bebidas incluidas"],
    desc: "Dos horas de navegación por la bahía al atardecer, con música a bordo y bebidas de cortesía. Pura energía caribeña sobre el mar.",
    includes: ["2 horas de navegación","3 bebidas alcohólicas de cortesía","Gaseosa y agua gratis","Servicio de baños amplios","Música a bordo"],
    notIncludes: ["Tasa portuaria (se paga en el muelle)"]
  },
  {
    id: "cena-yate", cat: "barcos", zone: "Bahía de Cartagena", name: "Cena por la Bahía en Yate",
    price: 280000, oldPrice: 350000, img: "barco-5.jpg", duration: "2 horas",
    schedule: "Embarque 6:30 p.m. · Miércoles a domingo",
    tags: ["Romántico", "Cena a bordo"],
    desc: "Tour nocturno navegando por la bahía con cena servida a la carta, copas de vino y música crossover. Una velada de lujo sobre el mar.",
    includes: ["Recorrido de 2 horas por la bahía","Cena a la carta (3 tiempos)","2 copas de vino por persona","Servicio a bordo","Música crossover","Baños a bordo"],
    notIncludes: ["Tasa portuaria $12.000","Bebidas premium adicionales"]
  },
  {
    id: "yate-carrousel", cat: "barcos", zone: "Bahía de Cartagena", name: "Atardecer en Yate Carrousel",
    price: 165000, oldPrice: 170000, img: "barco-1.jpg", duration: "2 horas",
    schedule: "Embarque 4:50 p.m. · Muelle de la Bodeguita",
    tags: ["3 niveles", "Música en vivo"],
    desc: "Elegante embarcación de tres niveles con salones climatizados, rooftop 360° y música en vivo para disfrutar el mejor atardecer de Cartagena.",
    includes: ["Recorrido de 2 horas por la bahía","Salones con aire acondicionado","Rooftop con vista 360°","Música crossover en vivo","Barra libre de bebidas no alcohólicas","2 bebidas alcohólicas (Plan Tradicional)"],
    notIncludes: ["Tasa portuaria $16.000"],
    notes: "Plan Barra Libre disponible (cerveza, cuba libre, vino de la casa y más)."
  },
  {
    id: "lancha-trapa", cat: "barcos", zone: "Cartagena", name: "Lancha Privada \"La Trapa\"",
    price: 1700000, oldPrice: 2000000, img: "barco-7.jpg", duration: "Privado / por día",
    schedule: "Salida en Cartagena",
    tags: ["Hasta 10 personas", "Exclusivo"],
    desc: "Plan exclusivo en el mar: recorrido cómodo y lleno de adrenalina por las islas o la bahía. Ideal para grupos, amigos o familia.",
    includes: ["Hasta 10 personas","2 motores Suzuki de 150 HP","Asientos acolchonados y cojinería nueva","Techo amplio con sombra","Zona para tomar el sol","Escalera para bajar al mar"]
  },
  {
    id: "bote-sofial", cat: "barcos", zone: "Cartagena", name: "Bote Sofial 38ft · TodoMar",
    price: null, oldPrice: null, img: "barco-4.jpg", duration: "Privado / por día",
    schedule: "Bajo reserva",
    tags: ["Hasta 15 personas", "Baño interno"],
    desc: "Bote deportivo de 38 pies legalmente registrado, con sonido marino Bluetooth, asoleadoras en proa, baño interno y ducha de agua dulce.",
    includes: ["Capacidad 15 personas","Sonido JL Audio marino Bluetooth","Asoleadoras en proa","Cava con hielo","Piloto y proel","Combustible","Baño interno y ducha de agua dulce"],
    notes: "Precio bajo cotización — escríbenos para tu fecha y plan."
  },

  /* ---------------- CHIVAS RUMBERAS ---------------- */
  {
    id: "chiva-cartagena-noche", cat: "chivas", zone: "Cartagena", name: "Chiva Rumbera Nocturna Cartagena",
    price: 75000, oldPrice: 90000, img: "chiva-1.jpg", duration: "4 horas",
    schedule: "7:30 p.m. a 11:30 p.m. · Todas las noches",
    tags: ["Música & rumba", "Discoteca incluida"],
    desc: "El paseo nocturno por excelencia: la chiva rumbera recorre los sitios emblemáticos de Cartagena con música y ambiente festivo.",
    includes: ["Recogida en hoteles de Bocagrande y El Laguito","Guía turístico","Música y ambiente festivo","Recorrido por la zona moderna","Panorámico Centro Histórico y Torre del Reloj","Letras de Cartagena, Botas Viejas y San Felipe","Ingreso a discoteca Taboo (cover)"]
  },
  {
    id: "chiva-cartagena-historica", cat: "chivas", zone: "Cartagena", name: "Chiva Típica · City Tour Histórico",
    price: 70000, oldPrice: 90000, img: "city-2.jpg", duration: "City tour",
    schedule: "Salidas diarias 8:30 a.m.–12:30 m. y 2:00–6:00 p.m.",
    tags: ["Centro Histórico", "Castillo San Felipe"],
    desc: "Recorre en chiva típica las calles, plazas e iglesias del Centro Histórico de Cartagena y descubre la historia del Corralito de Piedra.",
    includes: ["Recogida y retorno al hotel (según zona)","Parada en la bahía de Bocagrande","Letras de Cartagena y Botas Viejas","Panorámico (Torre del Reloj, murallas, India Catalina)","Ingreso al Castillo San Felipe","Caminata por el Centro Histórico","Guía certificado"],
    notIncludes: ["Comidas y bebidas no especificadas"],
    notes: "Niños de 0 a 4 años gratis."
  },
  {
    id: "chiva-medellin-noche", cat: "chivas", zone: "Medellín", name: "Chiva Nocturna en Medellín",
    price: 70000, oldPrice: 80000, img: "chiva-2.jpg", duration: "Nocturno",
    schedule: "Todos los días desde las 7:00 p.m.",
    tags: ["Parque Lleras", "Provenza"],
    desc: "Disfruta Medellín de noche con música, luces y el mejor ambiente rumbero, recorriendo los lugares más icónicos de la ciudad.",
    includes: ["Recorrido en chiva rumbera","1 bebida (agua, cerveza o gaseosa)","Guía acompañante","Música y animación"],
    notes: "Recorrido por Provenza, Parque Lleras, El Poblado, Milla de Oro y más."
  },
  {
    id: "chiva-medellin-barra", cat: "chivas", zone: "Medellín", name: "Chiva Medellín + Barra Libre",
    price: 100000, oldPrice: 120000, img: "chiva-4.jpg", duration: "Nocturno",
    schedule: "Diario 7:00 p.m. · Fines de semana también 2:00 p.m.",
    tags: ["Licor ilimitado", "Música en vivo"],
    desc: "El plan perfecto para tu combo: rumba en la ciudad de la eterna primavera con licor ilimitado, música en vivo y animadores.",
    includes: ["Recorrido en chiva rumbera","Licor ilimitado (aguardiente, ron y cerveza)","Guía acompañante","Música en vivo, luces y animación","Paradas en los mejores spots de Medellín"]
  },

  /* ---------------- MEDELLÍN & ANTIOQUIA ---------------- */
  {
    id: "guatape", cat: "medellin", zone: "Antioquia", name: "Tour a Guatapé + Piedra del Peñol",
    price: 135000, oldPrice: 150000, img: "med-2.jpg", duration: "Día completo",
    schedule: "Salidas diarias",
    tags: ["Piedra del Peñol", "Pueblo de zócalos"],
    desc: "Uno de los destinos más coloridos de Colombia: la majestuosa Piedra del Peñol y el encantador pueblo de Guatapé con sus zócalos.",
    includes: ["Transporte en vehículos de turismo","Desayuno típico","Almuerzo","Alto del Chocho y réplica del antiguo Peñol","Casa Museo y Casa al Revés","Tour en barco por la represa","Recorrido por Guatapé (zócalos, malecón, iglesia)","Guía y tarjeta de asistencia médica"],
    notIncludes: ["Ascenso a la Piedra del Peñol","Gastos no especificados"]
  },
  {
    id: "comuna-13", cat: "medellin", zone: "Medellín", name: "Comuna 13 + City Tour Medellín",
    price: 125000, oldPrice: 150000, img: "med-3.jpg", duration: "Día completo",
    schedule: "Salidas diarias 9:00 a.m.",
    tags: ["Grafitis", "Metrocable"],
    desc: "Lo mejor de Medellín en un día: el arte callejero de la Comuna 13, las escaleras eléctricas, Plaza Botero, Pueblito Paisa y el metrocable.",
    includes: ["Guía acompañante","Transporte ida y regreso","Almuerzo","Seguro de viaje","Pueblito Paisa y Plaza Botero","Metro y Metrocable","Grafitis y show de baile en la Comuna 13","Museo del Café"]
  },
  {
    id: "napoles", cat: "medellin", zone: "Antioquia", name: "Hacienda Nápoles · Safari",
    price: 300000, oldPrice: 350000, img: "med-5.jpg", duration: "Día completo",
    schedule: "Salidas programadas",
    tags: ["Parque temático", "Fauna exótica"],
    desc: "Un día lleno de naturaleza, animales exóticos y diversión: hipopótamos, sabana africana, parque jurásico, felinos y parques acuáticos.",
    includes: ["Transporte ida y regreso","Desayuno","Ingreso al parque (Pasaporte Safari)","Parque de hipopótamos y sabana africana","Parque jurásico e isla de los monos","Mariposario y parques acuáticos","Guía acompañante","Seguro de asistencia médica"]
  },
  {
    id: "tour-cafe", cat: "medellin", zone: "Antioquia", name: "Tour del Café en Antioquia",
    price: 190000, oldPrice: 200000, img: "med-4.jpg", duration: "Día completo",
    schedule: "Salidas programadas",
    tags: ["De la semilla a la taza", "Vivencial"],
    desc: "Experiencia auténtica del café colombiano: participa en la siembra, recolección, despulpado y preparación, entre paisajes increíbles.",
    includes: ["Transporte ida y regreso","Almuerzo típico (fiambre) y postre","Guía profesional","Degustación de café","Refrigerio e hidratación","Ropa típica prestada","Ingreso a la finca a caballo","Seguro"]
  },

  /* ---------------- CITY TOURS ---------------- */
  {
    id: "city-climatizado", cat: "citytours", zone: "Cartagena", name: "City Tour Climatizado",
    price: 95000, oldPrice: 128000, img: "city-1.jpg", duration: "4 horas",
    schedule: "1:40 p.m. – 6:00 p.m.",
    tags: ["Van/bus", "Guía certificado"],
    desc: "Recorrido cómodo en transporte climatizado por los miradores, fuertes y rincones más fotogénicos de Cartagena, con guía certificado.",
    includes: ["Transporte exclusivo (Master / Mercedes)","Guía certificado","Mirador de La Popa","Botas Viejas y panorámico San Felipe","Caminata en Getsemaní (grafitis, plazas)","Fuerte del Pastelillo","Letras de Cartagena y bahía de Bocagrande","Café del Mar"],
    notIncludes: ["Recorridos no especificados","Entrada al Fuerte San Felipe"]
  },
  {
    id: "full-day-stamarta", cat: "citytours", zone: "Costa Caribe", name: "Full Day Barranquilla & Santa Marta",
    price: 300000, oldPrice: null, img: "city-3.jpg", duration: "Día completo",
    schedule: "Miércoles y sábados · 5:30 a.m. – 9:00 p.m.",
    tags: ["2 ciudades", "Quinta de San Pedro"],
    desc: "Un día por la Costa: Santa Marta, baño de mar en el Rodadero, la Quinta de San Pedro Alejandrino y panorámico por Barranquilla.",
    includes: ["Recogida y retorno al hotel","Transporte en van o bus climatizado","Desayuno costeño","Tour panorámico de Santa Marta","Quinta de San Pedro Alejandrino (ingreso incluido)","Almuerzo típico y baño de mar en El Rodadero","Panorámico de Barranquilla","Seguro y guía"],
    notIncludes: ["Comidas y actividades no especificadas"]
  },

  /* ---------------- ALOJAMIENTOS ---------------- */
  {
    id: "baia-balcon", cat: "alojamientos", zone: "Cartagena · Baia Kristal", name: "Apartamento Balcón frente a Playa Artificial",
    price: 550000, oldPrice: 650000, img: "aloj-7.jpg", duration: "Por noche",
    schedule: "Check-in 3:00 p.m. · Check-out 11:00 a.m.",
    tags: ["Crystal Lagoon®", "Hasta 4 personas"],
    desc: "Despierta con vista directa a la playa artificial privada de Baia Kristal, con balcón, piscina, laguna cristalina y zonas verdes.",
    includes: ["1 habitación + sofá cama (hasta 4 personas)","1 baño","Cocina equipada y amoblado completo","Aire acondicionado y WiFi","Balcón con vista","Acceso a piscina, laguna y zonas comunes"],
    notIncludes: ["No mascotas","Solo estadía (no pasadía)"]
  },
  {
    id: "baia-laguna-6", cat: "alojamientos", zone: "Cartagena · Baia Kristal", name: "Apartamento de Lujo vista Laguna · 6 personas",
    price: 750000, oldPrice: 800000, img: "aloj-1.jpg", duration: "Por noche",
    schedule: "Check-in 3:00 p.m. · Check-out 11:00 a.m.",
    tags: ["Crystal Lagoon®", "Hasta 6 personas"],
    desc: "Refugio soñado a minutos del centro histórico, con balcón y vista directa a la laguna cristalina más grande de Latinoamérica.",
    includes: ["1 habitación (cama Queen) + sofá cama + colchón inflable","Hasta 6 personas","1 baño moderno","Cocina equipada y 100% amoblado","Aire acondicionado y WiFi","Balcón con vista a la laguna","Acceso a piscina y zonas verdes"],
    notIncludes: ["No mascotas","Solo estadía (no pasadía)"]
  },
  {
    id: "baia-laguna-4", cat: "alojamientos", zone: "Cartagena · Baia Kristal", name: "Apartamento de Lujo vista Laguna · 4 personas",
    price: 550000, oldPrice: 600000, img: "aloj-10.jpg", duration: "Por noche",
    schedule: "Check-in 3:00 p.m. · Check-out 11:00 a.m.",
    tags: ["Crystal Lagoon®", "Hasta 4 personas"],
    desc: "Comodidad y exclusividad en Baia Kristal: apartamento amoblado con balcón y vista a la laguna cristalina, cerca del aeropuerto.",
    includes: ["1 habitación (cama Queen) + sofá cama","Hasta 4 personas","1 baño moderno","Cocina equipada y amoblado","Aire acondicionado y WiFi","Balcón con vista","Acceso a piscina y zonas comunes"],
    notIncludes: ["No mascotas","Solo estadía (no pasadía)"]
  },
  {
    id: "baia-jardin-8", cat: "alojamientos", zone: "Cartagena · Baia Kristal", name: "Apartamento de Lujo vista Jardín · 8 personas",
    price: 750000, oldPrice: 900000, img: "aloj-2.jpg", duration: "Por noche",
    schedule: "Check-in 3:00 p.m. · Check-out 11:00 a.m.",
    tags: ["Para grupos", "Hasta 8 personas"],
    desc: "Apartamento moderno y amplio, ideal para grupos o familias, con acceso a la espectacular Crystal Lagoon® y balcón con vista al jardín.",
    includes: ["Habitación principal + camas auxiliares (hasta 8 personas)","1 baño moderno","Cocina completamente equipada","100% amoblado","Aire acondicionado y WiFi","Balcón con vista al jardín","Acceso a piscina y laguna cristalina"],
    notIncludes: ["No mascotas","Solo alojamiento"]
  },
  {
    id: "boquilla-5", cat: "alojamientos", zone: "La Boquilla", name: "Apartamento vista al Mar · 5 personas",
    price: 430000, oldPrice: 490000, img: "aloj-8.jpg", duration: "Por noche",
    schedule: "Bajo reserva",
    tags: ["Vista al mar", "Frente a la playa"],
    desc: "Hospédate frente al mar en las playas de La Boquilla, con vista espectacular, terraza y todas las comodidades para tu descanso.",
    includes: ["2 habitaciones con aire acondicionado","1 baño","Sala de estar y comedor","Cocina y nevera totalmente dotadas","Mirador / terraza","TV y toallas"]
  },
  {
    id: "boquilla-8", cat: "alojamientos", zone: "La Boquilla", name: "Apartamento vista al Mar · 8 personas",
    price: null, oldPrice: null, img: "aloj-3.jpg", duration: "Por noche",
    schedule: "Bajo reserva",
    tags: ["Vista al mar", "3 habitaciones"],
    desc: "Amplio apartamento frente al mar en La Boquilla, ideal para familias y grupos, con terraza, mirador y aire acondicionado en todas las habitaciones.",
    includes: ["3 habitaciones con aire acondicionado","1 baño social","Sala de estar y comedor","Cocina y nevera dotadas","Terraza y mirador","TV y toallas"],
    notes: "Precio bajo cotización — consúltanos por WhatsApp."
  },
  {
    id: "casa-perla", cat: "alojamientos", zone: "La Boquilla", name: "Casa La Perla · Rooftop con vista al mar",
    price: null, oldPrice: null, img: "aloj-9.jpg", duration: "Por noche",
    schedule: "Check-in 2:00 p.m. · Check-out 11:00 a.m.",
    tags: ["3 pisos", "16–20 personas"],
    desc: "Casa estilo mediterráneo de 3 pisos (460 m²) con terraza, piscina, rooftop con vista al mar y jacuzzi. Para grupos grandes.",
    includes: ["3 habitaciones con aire acondicionado","5 baños con agua caliente","Terraza con piscina","Rooftop con vista al mar y jacuzzi","Cocina abierta a sala y comedor","Capacidad 16–20 personas","Parqueadero interno y externo"],
    notes: "Precio bajo cotización — escríbenos para tu fecha."
  },
  {
    id: "casa-cayo-agua", cat: "alojamientos", zone: "La Boquilla", name: "Casa Cabaña Cayo de Agua",
    price: 2700000, oldPrice: null, img: "aloj-12.jpg", duration: "Por noche",
    schedule: "Bajo reserva",
    tags: ["Eventos", "Hasta 35 personas"],
    desc: "Gran casa cabaña en la zona norte de La Boquilla, con piscina, SPA jacuzzi y capacidad para eventos de hasta 120 personas.",
    includes: ["7 habitaciones con aire acondicionado","5 baños y WiFi","Piscina y SPA jacuzzi","Capacidad en cama: 35 personas","Capacidad para eventos: 120 personas","Cocina semi industrial"]
  },
  {
    id: "casa-icacos", cat: "alojamientos", zone: "La Boquilla", name: "Casa Punta Icacos",
    price: 3500000, oldPrice: null, img: "aloj-11.jpg", duration: "Por noche",
    schedule: "Bajo reserva",
    tags: ["Eventos", "Hasta 24 personas"],
    desc: "Espaciosa casa en La Boquilla con cocina semi industrial y gran capacidad, perfecta para celebraciones y eventos.",
    includes: ["5 habitaciones con aire acondicionado","7 baños y WiFi","Capacidad en cama: 24 personas","Capacidad para eventos: 120 personas","Cocina semi industrial"]
  },
  {
    id: "glamping-silver", cat: "alojamientos", zone: "Playa Blanca", name: "Glamping Silver · Playa Blanca",
    price: 450000, oldPrice: 490000, img: "aloj-4.jpg", duration: "Por noche",
    schedule: "Bajo reserva",
    tags: ["Frente al mar", "Experiencia única"],
    desc: "Dormir y despertar con la más bella vista al mar en Playa Blanca. Un glamping perfecto para las vacaciones que te mereces.",
    includes: ["Glamping frente al mar","Vista directa al mar","Experiencia de descanso en Playa Blanca"],
    notes: "Escríbenos para conocer disponibilidad y servicios incluidos."
  },
  {
    id: "palmarito", cat: "alojamientos", zone: "Tierra Bomba", name: "Palmarito Beach · Cabaña con Jacuzzi",
    price: 710000, oldPrice: 890000, img: "aloj-5.jpg", duration: "Por noche",
    schedule: "Check-in 2:00 p.m. · Check-out 11:00 a.m.",
    tags: ["Jacuzzi", "Frente al mar"],
    desc: "Habitación cabaña con jacuzzi frente al mar, con transporte en lancha, desayuno, piscina de agua dulce y zona de hamacas.",
    includes: ["Transporte en lancha ida y regreso","Bebida de bienvenida","Desayuno","Seguro hotelero","Piscina de agua dulce y playa","Zona de hamacas y parque infantil"],
    notIncludes: ["Cena romántica (valor adicional)","Ingreso de bebidas y alimentos"]
  },
  {
    id: "tropical-inn-aloj", cat: "alojamientos", zone: "Tierra Bomba", name: "Alojamiento Tropical Inn · 2 personas",
    price: 480000, oldPrice: 490000, img: "aloj-6.jpg", duration: "Por noche",
    schedule: "Lunes a viernes",
    tags: ["Para parejas", "Isla privada"],
    desc: "Plan para dos en la isla de Tierra Bomba, a minutos de Cartagena: lancha, desayuno, piscina y uso de todas las instalaciones.",
    includes: ["Lancha ida y regreso","Cóctel de bienvenida","Desayuno","Piscina y playa","Toallas y uso de carpas","Acceso a todas las instalaciones"],
    notes: "Aplica de lunes a viernes."
  },
  {
    id: "laureles-medellin", cat: "alojamientos", zone: "Medellín · Laureles", name: "Habitación Privada en Laureles",
    price: 150000, oldPrice: 180000, img: "med-6.jpg", duration: "Por noche",
    schedule: "Check-in 3:00 p.m. · Check-out 11:00 a.m.",
    tags: ["Zona estratégica", "Para 2 personas"],
    desc: "Estadía cómoda y moderna en Laureles, uno de los mejores barrios de Medellín, cerca de restaurantes, cafés y transporte.",
    includes: ["Habitación privada con cama doble","Baño privado","Aire acondicionado y WiFi","TV y zona de descanso","Cocina equipada compartida","Ingreso autónomo"]
  }
];
