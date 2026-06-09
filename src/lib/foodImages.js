/*
 * Curated Unsplash photography for the Cosmic · Linear visual direction.
 *
 * Art-directed (not just subject-matched) for a calm, premium, atmospheric feel:
 * warm + neutral tones, soft directional light, dark ceramic / wooden surfaces,
 * a single focal point, and minimal clutter — chosen to sit comfortably next to
 * Linear, Arc, Oura, and Apple Health and to still read as premium on the dark
 * Linear surfaces (the hero / featured scrims keep white text legible on top).
 *
 * The base greyscale wireframe screens stay image-free; only the `*-linear`
 * wrappers pull these in (via the `images` / `heroImage` props the shared
 * components now accept). One photo per food, reused across screens for
 * cohesion — e.g. the salmon ties the Recipes row to the Recipe Detail hero,
 * and the grilled chicken ties the Log Food rows to the Food Details hero.
 *
 * Each value is an Unsplash photo id; `u()` appends sizing + format params so a
 * single source can serve both a 1200px hero and a 200px thumbnail.
 */

const BASE = 'https://images.unsplash.com/'

// id → sized, auto-format, crop-fit delivery URL.
const u = (id, w) => `${BASE}${id}?auto=format&fit=crop&w=${w}&q=80`

// Photo ids, sourced from Unsplash and screened against the art direction
// (dark ceramic / warm wooden surfaces, soft light, single subject).
const P = {
  salmon: 'photo-1519708227418-c8fd9a32b7a2', // grilled fish + vegetables, editorial plate
  buddhaBowl: 'photo-1505576633757-0ac1084af824', // grain salad on warm wooden board
  chicken: 'photo-1762631934518-f75e233413ca', // grilled chicken breast, single plate
  stirFry: 'photo-1601226809816-b8c32440158a', // vegetables on a dark pan
  greekSalad: 'photo-1625944230945-1b7dd3b949ab', // salad in a warm wooden bowl
  avocadoToast: 'photo-1628556820645-63ba5f90e6a2', // avocado dish on a black plate
  oats: 'photo-1619854232008-0a9f0fd3cab0', // oats + dark berries on wood
  lentilSoup: 'photo-1552298013-de2af4b94854', // soup in a warm maroon pot
  proteinShake: 'photo-1579954115545-a95591f28bfc', // shake in a clear glass
  greekYogurt: 'photo-1627308594190-a057cd4bfac8', // wooden spoon on a ceramic bowl
  oatmealBerries: 'photo-1650294411492-8343eaec1124', // oatmeal with raspberries + nuts
  eggsOnToast: 'photo-1582169505937-b9992bd01ed9', // sunny egg on a black ceramic plate
  eggs: 'photo-1608475861994-cf7af0f0c1be', // fried egg on a dark pan
  banana: 'photo-1603833665858-e61d17a86224', // banana on a wooden table
  avocado: 'photo-1601039641847-7857b994d704', // sliced avocado on wood
  milk: 'photo-1517448931760-9bf4414148c5', // milk in a clear glass
  apple: 'photo-1584306670957-acf935f5033c', // red apple on a wooden table
  peanutButter: 'photo-1719956797292-21d15f9a14a4', // peanut butter jar on wood
  rice: 'photo-1516684732162-798a0062be99', // rice + sesame in a black bowl
  broccoli: 'photo-1584270354949-c26b0d5b4a0c', // broccoli on a wooden board
  cheese: 'photo-1683314573422-649a3c6ad784', // cheese on a wooden board
  quinoaSalad: 'photo-1650539688297-88df97068f2e', // grain bowl on a wooden table
  smoothieBowl: 'photo-1590301157284-ab2f8707bdc1', // berries in a warm wooden bowl
  lemon: 'photo-1551445639-26f1a3b51671', // single lemon on dark wood, soft moody light
  dill: 'photo-1758055660094-c0c6557f9a1f', // bundles of fresh green dill
  oliveOil: 'photo-1474979266404-7eaacbcd87c5', // glass oil cruet, soft warm light
  garlic: 'photo-1625229466998-42ee9c597290', // garlic in a warm wooden bowl, dark ground
  blackPepper: 'photo-1600728255690-edd070021d02', // peppercorns on a dark surface
  seaSalt: 'photo-1763974463967-647601c65961', // coarse salt in spoons on dark
}

/* Recipes (recipes-linear) — featured hero + per-recipe row thumbnails. */
export const recipeImages = {
  featured: u(P.buddhaBowl, 1200),
  rows: {
    'Grilled Lemon Herb Salmon': u(P.salmon, 400),
    'Berry Overnight Oats': u(P.oats, 400),
    'Chicken Veggie Stir Fry': u(P.stirFry, 400),
    'Classic Greek Salad': u(P.greekSalad, 400),
    'Avocado Egg Toast': u(P.avocadoToast, 400),
    'Hearty Lentil Soup': u(P.lentilSoup, 400),
  },
}

/* Recipe Detail (recipe-details-linear) hero — the Grilled Lemon Herb Salmon. */
export const recipeHeroImage = u(P.salmon, 1200)

/*
 * Recipe Detail ingredient-row thumbnails — one photo per ingredient, keyed by
 * the ingredient name. Salmon reuses the hero photo so the ingredient ties back
 * to the dish above it; the rest are single-subject, dark/warm, soft-lit stills
 * screened against the same art direction as the food photos.
 */
export const recipeIngredientImages = {
  'Salmon Fillet': u(P.salmon, 200),
  Lemon: u(P.lemon, 200),
  'Fresh Dill': u(P.dill, 200),
  'Olive Oil': u(P.oliveOil, 200),
  'Garlic Cloves': u(P.garlic, 200),
  'Black Pepper': u(P.blackPepper, 200),
  'Sea Salt': u(P.seaSalt, 200),
}

/* Food Details (food-detail-linear) hero — the Grilled Chicken Breast. */
export const foodHeroImage = u(P.chicken, 1200)

/* Log Food (log-food-linear) — list-row thumbnails + Suggested carousel cards. */
export const logFoodImages = {
  rows: {
    // Favourites
    'Overnight Oats': u(P.oats, 200),
    'Grilled Chicken Breast': u(P.chicken, 200),
    'Protein Shake': u(P.proteinShake, 200),
    // Recently Logged
    'Greek Yogurt': u(P.greekYogurt, 200),
    'Oatmeal with Berries': u(P.oatmealBerries, 200),
    'Eggs on Toast': u(P.eggsOnToast, 200),
    // Popular Foods
    Eggs: u(P.eggs, 200),
    Banana: u(P.banana, 200),
    Avocado: u(P.avocado, 200),
    Chicken: u(P.chicken, 200),
    Milk: u(P.milk, 200),
    Apple: u(P.apple, 200),
    'Peanut Butter': u(P.peanutButter, 200),
    Rice: u(P.rice, 200),
    Broccoli: u(P.broccoli, 200),
    Cheese: u(P.cheese, 200),
  },
  suggested: {
    'Grilled Salmon': u(P.salmon, 400),
    'Quinoa Salad': u(P.quinoaSalad, 400),
    'Smoothie Bowl': u(P.smoothieBowl, 400),
  },
}
