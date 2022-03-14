const friet: Product = {
  title: "Friet",
  price: 2.5,
};

const huisfriet: Product = {
  title: "Huis friet",
  price: 3,
};

const colddrinks = [
  { title: "Cola", price: 2.5 },
  { title: "Cola Zero", price: 2.5 },
  { title: "Fanta Orange, Lemon, Exotic of Cassis", price: 2.5 },
  { title: "Spa (500ml)", price: 2.5 },
  { title: "AA", price: 2.5 },
  { title: "Ice Tea Green, Sparkling of Peach", price: 2.5 },
  { title: "Appelsap", price: 2.5 },
  { title: "Sprite", price: 2.5 },
  { title: "Bitter Lemon", price: 2.5 },
  { title: "Cream Soda", price: 2.5 },
  { title: "Ginger Ale", price: 2.5 },
  { title: "Chocomel", price: 2.5 },
  { title: "Fernandes Rood, Blauw, Geel of Groen", price: 2.5 },
  { title: "Red bull", price: 3 },
];

export const products = {
  starters: [
    {
      title: "Harira",
      price: 4.5,
      options: [],
      description: "Dadels en citroen",
    },
    {
      title: "Bissara",
      price: 4.5,
      description: "gereserveerd met brood",
    },
    { title: "Loempia", price: 4 },
    {
      title: "Tortilla",
      price: 5.0,
      description: "spaanse tortilla met aardappelen en eieren",
    },
    // { title: "Nacho's", price: 7.5 },
  ],
  paninis: [
    {
      title: "Kip",
      price: 4.5,
    },
    {
      title: "Tuna",
      price: 4.5,
      options: [option("Olijven")],
    },
    {
      title: "Grillworst",
      price: 5.5,
    },
    {
      title: "Garnalen",
      price: 6.5,
    },
  ],
  sandwiches: [
    {
      title: "Kip (of hete kip)",
      price: 7.5,
      options: [
        option("Heet kip"),
        choice("Frisdrank", discount(colddrinks, 2)),
        choice("Friet", discount([friet, huisfriet], 1)),
      ],
    },
    { title: "Gegrilde kipfilet", price: 8 },
    { title: "Kefta", price: 7.5, description: "kalfsgehakt" },
    // { title: "Kip tenders (van de grill)", price: 7.5 },
    { title: "Sossit / Merquez", price: 8 },
    { title: "Garnalen", price: 8 },
  ],
  burgers: [
    {
      title: "Jennah Burger",
      price: 9.5,
      description:
        "kalfsgehakt, cheddar kaas, spiegel-ei, gekarameliseerde uien en augurken",
    },
    {
      title: "Classic Cheese Burger",
      price: 9,
      description: "180g kalfsgehakt, cheddar kaas en gekarameliseerde uien",
    },
    {
      title: "Double Cheese Burger",
      price: 12.5,
      description: "300g kalfsgehakt, cheddar kaas en gekarameliseerde uien",
    },
    {
      title: "Kipfilet Burger",
      price: 9.5,
      description: "met kipfilet van de grill",
    },
    {
      title: "Kipgehakt Burger",
      price: 8.5,
      description: "kipgehakt, cheddar kaas en gekarameliseerde uien",
    },
  ],
  salads: [
    {
      title: "Tonijn Salade",
      price: 7.5,
    },
    {
      title: "Ceasar Salade",
      price: 9,
      description: "met kip van de grill",
    },
    { title: "Zalm Salade", price: 10, description: "met zalm van de grill" },
    { title: "Garnalen Salade", price: 9 },
  ],
  colddrinks,
  hotdrinks: [
    { title: "Espresso", price: 2.5 },
    { title: "Cappucino", price: 3 },
    { title: "Koffie Verkeerd", price: 3 },
    { title: "Machiatto", price: 3.5 },
    { title: "Warme Chocomel", price: 3.5 },
    { title: "Munt thee (glas, 1p)", price: 3.5 },
    { title: "Munt thee (kleine pot, 2p)", price: 4.5 },
    { title: "Munt thee (grote pot, 3 a 4p)", price: 5.5 },
  ],
  smoothies: [
    { title: "Appel / banaan", price: 4.5 },
    { title: "Aardbei", price: 4.5 },
    { title: "Avocado", price: 5 },
    { title: "Avocado / banaan", price: 4.5 },
    { title: "Ananas / mango", price: 4.5 },
    { title: "Verse Jus D'orange", price: 5 },
    {
      title: "Ace",
      description: "Blauwe bessen, Banaan, Aarbei, Frambozen en Jus D'orange ",
      price: 5,
    },
  ],
  tajines: [
    {
      title: "Tajine kip",
      price: 13.5,
      description:
        "Half kip of twee kippendijen met gekookt ei olijven en geroosterde amandelen",
    },
    {
      title: "Tajine Vlees",
      price: 14.5,
      description:
        "Malse kalfsvlees met barqooq (pruimen) of groente (wordels en groene erwten)",
    },
    {
      title: "Tajine Pilpil",
      price: 12,
      description: "Pittige tajine garnalen in olijfolie",
    },
    {
      title: "Tajine Kefta",
      price: 12,
      description: "Gehaktballetjes in tomaten saus en ei",
    },
  ],
  couscous: [
    { title: "Vegetarisch", price: 11 },
    { title: "Kip", price: 13.5 },
    { title: "Vlees", price: 14.5 },
    {
      title: "Royaal",
      price: 16.5,
      description: "met vlees of stukje kip met zoete uien en rozijnen",
    },
    {
      title: "Voor twee personen",
      price: 21,
    },
  ],
  desserts: [
    {
      title: "Cheese cake",
      price: 5.5,
      description: "Informeer naar onze variaties",
    },
    { title: "Redvelvet", price: 5.5 },
    { title: "Worteltaart", price: 5.5 },
  ],
  grill: [
    { title: "Kip Filet", price: 13.5 },
    { title: "Kalfs Spies / Brochette", price: 15.5 },
    { title: "Kip Sate", price: 13.5 },
    { title: "Mix Grill", price: 17.5 },
    { title: "Lams Koteletten Schotel ", price: 16.5 },
    { title: "Kefta Schotel", price: 13 },
    { title: "Zalm Schotel", price: 15.5 },
    { title: "Garnalen Schotel", price: 14 },
    { title: "Sausage / Merquez Schotel", price: 14 },
  ],
  pasta: [
    { title: "Kip", price: 12.5 },
    { title: "Garnalen", price: 13 },
    { title: "Zalm of Zalm/Garnalen", price: 14 },
    { title: "Bolognese", price: 12.5 },
    { title: "Arabiatta", price: 10 },
  ],
};

function choice(title: string, products: Product[]): ProductChoice {
  return {
    type: "choice",
    title,
    products,
  };
}

export interface Product {
  title: string;
  price: number;
  description?: string;
  options?: ProductAddendum[];
}

type ProductAddendum = ProductOption | ProductChoice;

interface ProductOption {
  type: "option";
  title: string;
}
interface ProductChoice {
  type: "choice";
  title: string;
  products: Product[];
}

function option(title: string): ProductOption {
  return {
    type: "option",
    title,
  };
}

function discount(products: Product[], discount: number) {
  return products.map((product) => {
    return {
      ...product,
      price: product.price - discount,
    };
  });
}
