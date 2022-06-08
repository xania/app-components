const friet: Product = {
  id: "friet",
  title: "Friet",
  price: 2.5,
};

const huisfriet: Product = {
  id: "huisfriet",
  title: "Huis friet",
  price: 3,
};

const colddrinks = [
  { id: "cola", title: "Cola", price: 2.5 },
  { id: "zero", title: "Cola Zero", price: 2.5 },
  { id: "fanta", title: "Fanta Orange, Lemon, Exotic of Cassis", price: 2.5 },
  { id: "spa", title: "Spa (500ml)", price: 2.5 },
  { id: "aa", title: "AA", price: 2.5 },
  { id: "icet", title: "Ice Tea Green, Sparkling of Peach", price: 2.5 },
  { id: "aplsap", title: "Appelsap", price: 2.5 },
  { id: "sprite", title: "Sprite", price: 2.5 },
  { id: "bitlemon", title: "Bitter Lemon", price: 2.5 },
  { id: "creamsoda", title: "Cream Soda", price: 2.5 },
  { id: "gngrale", title: "Ginger Ale", price: 2.5 },
  { id: "choco", title: "Chocomel", price: 2.5 },
  { id: "frnds", title: "Fernandes Rood, Blauw, Geel of Groen", price: 2.5 },
  { id: "rdbull", title: "Red bull", price: 3 },
];

export const products = {
  starters: [
    {
      id: "harira",
      title: "Harira",
      price: 4.5,
      options: [],
      description: "Met dadels en citroen",
    },
    {
      id: "bissara",
      title: "Bissara",
      price: 4.5,
      description: "Gereserveerd met brood",
    },
    {
      id: "briwat-pastilla",
      title: "Briwat en pastilla",
      price: 7.5,
      description: "zoethartige huisgemaakte briwat en pastilla met kip",
    },
    {
      id: "loempia",
      title: "Loempia",
      price: 4,
      description: "Krapperige vietnameze kip loempia, twee stuks per portie",
    },
    // {
    //   id: "msemmen",
    //   title: "Msemmen",
    //   price: 3,
    //   description: "Marokkaanse pancake",
    // },
    {
      id: "tortilla",
      title: "Tortilla",
      price: 4.5,
      description: "spaanse tortilla met aardappelen en eieren",
    },
    // { title: "Nacho's", price: 7.5 },
  ],
  sandwiches: [
    {
      id: "brdkip",
      title: "Kip (of hete kip)",
      price: 8.5,
      options: [
        option("Heet kip"),
        choice("Frisdrank", discount(colddrinks, 2)),
        choice("Friet", discount([friet, huisfriet], 1)),
      ],
    },
    { id: "brdgrillkip", title: "Gegrilde kipfilet", price: 8.5 },
    { id: "brdkefta", title: "Kefta", price: 8.5, description: "kalfsgehakt" },
    // { title: "Kip tenders (van de grill)", price: 8.5 },
    { id: "brdsossit", title: "Sossit / Merquez", price: 8.5 },
    { id: "brdgarnl", title: "Garnalen", price: 8.5 },
    { id: "brdshwa", title: "Shwa", price: 9 },
  ],
  burgers: [
    {
      id: "clasbrgr",
      title: "Classic Cheese Burger",
      price: 9,
      description: "180g kalfsgehakt, cheddar kaas en gekarameliseerde uien",
      extra: ["cheddar", "spiegel-ei", "champignon"],
    },
    {
      id: "gchickenbrgr",
      title: "Grilled chicken Burger",
      price: 9.5,
      description: "met kipfilet van de grill",
      extra: ["cheddar"],
    },
    {
      id: "dblchizbrgr",
      title: "Double Cheese Burger",
      price: 12.5,
      description: "300g kalfsgehakt, cheddar kaas en gekarameliseerde uien",
    },
    {
      id: "kipgehktbrgr",
      title: "Kipgehakt Burger",
      price: 9,
      description: "kipgehakt, cheddar kaas en gekarameliseerde uien",
    },
  ],
  salads: [
    {
      id: "ceasarsalad",
      title: "Ceasar Salade",
      price: 10,
      description: "met kip van de grill",
    },
    {
      id: "zalmsalad",
      title: "Zalm Salade",
      price: 11,
      description: "met zalm van de grill",
    },
    { id: "garnlsalad", title: "Garnalen Salade", price: 10 },
    {
      id: "tunsalad",
      title: "Tonijn Salade",
      price: 8,
    },
  ],
  colddrinks,
  hotdrinks: [
    { id: "espresso", title: "Espresso", price: 2.5 },
    { id: "cappucino", title: "Cappucino", price: 3 },
    { id: "koverkeerd", title: "Koffie Verkeerd", price: 3 },
    { id: "machiatto", title: "Machiatto", price: 3.5 },
    { id: "warmchco", title: "Warme Chocomel", price: 3.5 },
    { id: "muntglas", title: "Munt thee (glas, 1p)", price: 3 },
    { id: "munt2p", title: "Munt thee (kleine pot, 2p)", price: 5.5 },
    { id: "munt3p", title: "Munt thee (grote pot, 3 a 4p)", price: 7 },
  ],
  smoothies: [
    { id: "smo.appban", title: "Appel / banaan", price: 4.5 },
    { id: "smo.aardbei", title: "Aardbei", price: 4.5 },
    { id: "smo.avocado", title: "Avocado", price: 5 },
    { id: "smo.avoban", title: "Avocado / banaan", price: 4.5 },
    { id: "smo.anasmng", title: "Ananas / mango", price: 4.5 },
    { id: "smo.jus", title: "Verse Jus D'orange", price: 5 },
    {
      id: "smo.ace",
      title: "Ace",
      description: "Blauwe bessen, Banaan, Aarbei, Frambozen en Jus D'orange ",
      price: 5,
    },
  ],
  tajines: [
    {
      id: "tajkip",
      title: "Tajine kip",
      price: 13.5,
      description:
        "Half kip gekookt ei olijven en geroosterde amandelen en friet",
    },
    {
      id: "tajvlees",
      title: "Tajine Vlees",
      price: 14.5,
      description: "Malse kalfsvlees met barqooq (pruimen) en friet",
    },
    {
      id: "tajpilpil",
      title: "Tajine Pilpil",
      price: 12,
      description: "Pittige tajine garnalen in olijfolie",
    },
    {
      id: "tajkefta",
      title: "Tajine Kefta",
      price: 12,
      description: "Gehaktballetjes in tomaten saus en ei",
    },
  ],
  couscous: [
    { id: "couscousvega", title: "Vegetarisch", price: 11 },
    { id: "couscouskip", title: "Kip", price: 13.5 },
    { id: "couscousvlees", title: "Vlees", price: 14.5 },
    {
      id: "couscousroyal",
      title: "Royaal",
      price: 16.5,
      description: "met vlees of stukje kip met zoete uien en rozijnen",
    },
    {
      id: "couscous2p",
      title: "Voor twee personen",
      price: 21,
    },
  ],
  desserts: [
    {
      id: "mangocake",
      title: "Mango Cheese cake",
      price: 4.5,
    },
    {
      id: "frambocake",
      title: "Framboos Cheese cake",
      price: 4.5,
    },
    {
      id: "chococake",
      title: "Chocolade taart",
      price: 4.5,
    },
    // {
    //   id: "oreochizcake",
    //   title: "Oreo Cheese cake",
    //   price: 5.5,
    // },
    // {
    //   id: "passiechizcake",
    //   title: "Passie Cheese cake",
    //   price: 5.5,
    // },
    // {
    //   id: "snickchizcake",
    //   title: "Snicker Cheese cake",
    //   price: 5.5,
    // },
    { id: "redvelvet", title: "Redvelvet", price: 5.5 },
    // { id: "redvelvetorea", title: "Redvelvet Oreo", price: 6.5 },
    // { id: "brownsnik", title: "Brownie Snicker", price: 6.5 },
    { id: "wortltaart", title: "Worteltaart", price: 5.5 },
  ],
  grill: [
    { id: "schtlkipfilet", title: "Kip Filet", price: 13.5 },
    { id: "schtlspies", title: "Kalfs Spies / Brochette", price: 15.5 },
    { id: "schtlsate", title: "Kip Sate", price: 13.5 },
    {
      id: "schtlmixgrl",
      title: "Mix Grill",
      price: 17.5,
      description:
        "Met lams kotelet, merquez, schwa, kip tenders en kipsate en kalfsgehakt",
    },
    // { id: "schtllamskot", title: "Lams Koteletten Schotel ", price: 16.5 },
    { id: "schtlkefta", title: "Kefta Schotel", price: 13 },
    { id: "schtlzalm", title: "Zalm Schotel", price: 15.5 },
    { id: "schtlgarnl", title: "Garnalen Schotel", price: 14 },
    // { id: "schtlmerqez", title: "Sausage / Merquez Schotel", price: 14 },
  ],
  pasta: [
    { id: "pastakip", title: "Kip", price: 10 },
    { id: "pastagarnl", title: "Garnalen", price: 10 },
    { id: "pastazalm", title: "Zalm", price: 10 },
    { id: "pastabolognese", title: "Bolognese", price: 10 },
    { id: "pastarabiatta", title: "Arabiatta", price: 10 },
    { id: "pastafruit", title: "Fruit de mer", price: 10 },
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
  id: string;
  title: string;
  price?: number;
  description?: string;
  options?: ProductAddendum[];
  extra?: string[];
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
