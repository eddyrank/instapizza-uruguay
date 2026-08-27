// Menu content, transcribed from the client's own flyer artwork.
// Prices are in Uruguayan pesos (UYU) and shown as plain numbers ($ prefix added at render time).

export const pizzas = {
  base: { name: 'Muzza', size: '32 cm', price: 340 },
  common: {
    price: 50,
    label: 'Comunes',
    items: [
      'Jamón',
      'Panceta grillada',
      'Aceitunas',
      'Choclo',
      'Huevo',
      'Parmesano',
      'Peperoni',
      'Ananá',
      'Tomate',
    ],
  },
  special: {
    price: 60,
    label: 'Especiales',
    items: [
      'Roquefort',
      'Rúcula',
      'Albahaca',
      'Cheddar',
      'Pesto',
      'Morrones',
      'Confitados',
      'Cebolla caramelizada',
    ],
  },
  premium: { price: 80, label: 'Premium', items: ['Jamón crudo'] },
  recommended: [
    '4 Quesos',
    'Capresse',
    'Panceta & Cheddar',
    'Jamón crudo, rúcula y parmesano',
    'Napolitana',
    'Picada',
    'Hawaiana',
    'A Caballo',
  ],
} as const;

export const burgers = [
  { name: 'Classic', description: 'Carne, cheddar, panceta, cebolla, lechuga, tomate y mayonesa', price: 320 },
  { name: 'Simple', description: 'Carne, cheddar, panceta y salsa', price: 280 },
  { name: 'Doble', description: '2 carnes, 2 cheddar, 2 panceta y salsa', price: 350 },
  { name: 'Triple', description: '3 carnes, 3 cheddar, 3 panceta y salsa', price: 400 },
  { name: 'American', description: 'Tomate, lechuga, cebolla caramelizada, cheddar, muzza, jamón y salsa de la casa', price: 340 },
  { name: 'Boom', description: '2 carnes, 2 muzza, tomate, rúcula, cebolla caramelizada, roquefort y mayonesa', price: 380 },
  { name: 'Golden', description: '2 carnes, 2 cheddar, 2 panceta, tomate, lechuga, huevo frito, pepino y salsa de la casa', price: 390 },
  { name: 'Rasta', description: '2 carnes, 2 cheddar, 2 panceta, tomate, lechuga, pepino y salsa de la casa', price: 380 },
  { name: 'Epic', description: '2 carnes, 2 cheddar, 2 panceta, tomate, lechuga, jamón, muzza, pepino y salsa de la casa', price: 390 },
] as const;

export const chivitos = [
  {
    name: 'Pizzachivi',
    description: 'Lomo, huevo a la plancha, jamón, mozzarella, panceta, tomate, lechuga o rúcula, aceitunas, morrón, mayonesa, papas fritas',
    single: 420,
    double: 800,
  },
  {
    name: 'Común',
    description: 'Lomo, tomate, lechuga, mayonesa, papas fritas',
    single: 300,
    double: 580,
  },
  {
    name: 'Canadiense',
    description: 'Lomo, huevo, jamón, mozzarella, panceta, tomate, lechuga, aceitunas, morrón, mayonesa, papas fritas',
    single: 420,
    double: 800,
  },
  {
    name: 'Instachivi',
    description: 'Lomo, huevo, cheddar, panceta, tomate, lechuga, cebolla, pepinillos, salsa de la casa, papas fritas',
    single: 420,
    double: 800,
  },
] as const;

export const milanesaNapolitanaPlato = {
  name: 'Milanesa Napolitana',
  description: 'Milanesa napolitana con ensalada mixta y papas fritas',
  price: 620,
};

export const milanesas = [
  { name: 'Al plato', description: 'Milanesa + papas fritas', price: null },
  { name: 'Al pan común', description: 'Tomate, lechuga, huevo, mayonesa + fritas', price: 300 },
  { name: 'Al pan completa', description: 'Jamón, muzza, panceta, tomate, lechuga, huevo, mayonesa + fritas', price: 420 },
  { name: 'Al pan Instamula', description: 'Cheddar, panceta, tomate, rúcula, huevo frito, salsa de la casa + fritas', price: 420 },
  { name: 'Napolitana (al pan)', description: 'P/2 jamón, muzza, salsa fileto, orégano, ensalada mixta + fritas', price: 590 },
] as const;

export const tortugon = {
  name: 'Tortugón de Carne Picada',
  description: 'Carne picada, jamón, panceta, muzzarella, tomate, lechuga, cebolla, triple huevo a la plancha, mayonesa',
  sinFritas: 560,
  conFritas: 620,
  promoConCoca: 790,
};

export const friendlyBox = {
  name: 'Friendly Box',
  description: '4 burgers + papas fritas + Coca-Cola 1.5 lts, todo en una caja',
  options: [
    { name: 'Simple x4', price: 1160 },
    { name: 'Doble x4', price: 1420 },
    { name: 'Classic x4', price: 1300 },
  ],
};
