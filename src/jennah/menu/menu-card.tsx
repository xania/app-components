import { jsx, State, useContext, useState } from "@xania/view";
import { Product, products } from "./menu-data";
import "@material/list/mdc-list.scss";
import "@material/elevation/styles.scss";
import styles from "./style.module.scss";
import tajineImgs from "./section/tajine.png";

interface TopBarOptions {
  subtitle?: string;
}

function TopBar(props: TopBarOptions) {
  return (
    <div class={styles.topbar}>
      <h1>
        <span class={styles.hart}></span>
        Jennah
        {props?.subtitle && (
          <span class={styles.subtitle}>{props.subtitle}</span>
        )}
      </h1>
    </div>
  );
}

interface SectionImgProps {
  src: string;
}

function SectionImg(props: SectionImgProps) {
  return (
    <img
      class={styles["mobile-only"]}
      src={props.src}
      style="width: 100%;"
    ></img>
  );
}

function Order() {
  const $ = useContext<Product>();
  return (
    <div>
      <span style="display: inline-block; margin: auto;">{$("title")}</span>
      <span>{$("price")}</span>
    </div>
  );
}

export function MenuCard() {
  const state = useState<Product[]>([]);
  const events = {
    onSelect(p: Product) {
      state.update((products) => [...products, p]);
    },
    orders: useState<Order[]>([]),
  };
  return (
    <>
      <TopBar subtitle="Hoofdgerechten" />
      <div class={styles["menu-card"]}>
        <div>
          <Section title="Starters">
            <ProductList products={products.starters} {...events} />
          </Section>
          <Section title="Salades">
            <ProductList products={products.salads} {...events} />
          </Section>
          <Section title="Tajine">
            <SectionImg src={tajineImgs} />
            <ProductList products={products.tajines} {...events} />
            <hr />
            <p class={styles.section__footer}>
              Tajine worden geserveerd met bruin of wit brood
            </p>
          </Section>
        </div>
        <div>
          <Section title="Pasta">
            <ProductList products={products.pasta} {...events} />
          </Section>
          <Section title="Grill">
            <ProductList products={products.grill} {...events} />
            <hr />
            <p class={styles.section__footer}>
              Alle schotels worden geserveerd met salade, keuze uit rijst of
              friet, huisgemaakte saus en optie voor gegrilde groente
            </p>
          </Section>
          <Section title="Burgers">
            <ProductList products={products.burgers} {...events} />
            <hr />
            <p class={styles.section__footer}>
              Al onze burgers worden geserveerd met friet
            </p>
          </Section>
        </div>
      </div>
      <div style="page-break-inside:avoid;page-break-after:always"></div>
      <TopBar subtitle="Hoofgerechten" />
      <div class={styles["menu-card"]}>
        <div>
          <Section title="Broodjes">
            <ProductList products={products.sandwiches} {...events} />
            <hr />
            <p class={styles.section__footer}>
              Al onze broodjes worden geserveerd met salade, saus en friet
            </p>
          </Section>
        </div>
        <div>
          <Section title="Couscous">
            <ProductList products={[...products.couscous]} {...events} />
            <hr />
            <p class={styles.section__footer}>
              Traditioneel bereid couscous elke vrijdag en weekend
            </p>
          </Section>
        </div>
      </div>
      <div style="page-break-inside:avoid;page-break-after:always"></div>
      <TopBar subtitle="Drankjes en Desserts" />
      <div class={styles["menu-card"]}>
        {/* <Section title="Panini">
            <ProductList products={products.paninis} {...events} />
          </Section> */}
        <div>
          <Section title="Frisdranken">
            <ProductList
              products={[
                {
                  id: "spa",
                  title: "Spa water",
                  price: 2.5,
                  description: "blauw*, rood",
                },
                {
                  id: "cola",
                  title: "Cola",
                  price: 2.5,
                  description: "original, zero",
                },
                {
                  id: "fanta",
                  title: "Fanta",
                  price: 2.5,
                  description: "orange, cassis, exotic",
                },
                { id: "hawai", title: "Hawai", price: 2.5 },
                { id: "poms", title: "Poms", price: 2.5 },
                {
                  id: "fernandes",
                  title: "Fernandes",
                  price: 2.5,
                  description:
                    "green punch, pineapple, cherry, red grape (blauw)",
                },
                { id: "aa", title: "AA", price: 2.5 },
                { id: "sprite", title: "Sprite", price: 2.5 },
                {
                  id: "icet",
                  title: "Ice thee",
                  price: 2.5,
                  description: "green*, peach*, sparkling",
                },
                { id: "gingerale", title: "Ginger Ale", price: 2.5 },
                { id: "creamsoda", title: "Cream Soda", price: 2.5 },
                { id: "tonic", title: "Indian Tonic", price: 2.5 },
                { id: "appsap", title: "Applesap*", price: 2.5 },
                {
                  id: "oasis",
                  title: "Oasis",
                  price: 2.5,
                  description: "tropical*, framboos",
                },
                {
                  id: "redbull",
                  title: "Redbull",
                  price: 3,
                },
              ]}
              {...events}
            />
            <hr />
            <p class={styles.section__footer}>*) zonder prik</p>
          </Section>
        </div>
        <div>
          <Section title="Warme dranken">
            <ProductList products={products.hotdrinks} {...events} />
          </Section>
          <Section title="Smoothies">
            <ProductList products={products.smoothies} {...events} />
          </Section>
          <Section title="Dessert">
            <ProductList products={products.desserts} {...events} />
          </Section>
        </div>
      </div>
      {/* <Paninis {...events} />
        <Burgers {...events} />
        <Salad {...events} />
        <Traditional />
        <Pasta {...events} />
        <Grill {...events} />
        <Tajine {...events} />
        <Couscous {...events} />
        <Desserts {...events} />
        <ColdDrinks {...events} />
        <HotDrinks {...events} /> */}
      {/* <div style="flex: 1; display: inline-flex">
      <img style="width: 100%; margin: auto 0 0 0" src={burgerSrc} />
    </div> */}
      <div style="page-break-inside:avoid;page-break-after:always"></div>
      <TopBar subtitle="Voor de kinderen" />
      <div class={[styles["menu-card"], styles["menu-card--kinderen"]]}>
        <Section title="Kindermenu">
          <ProductList
            products={[
              {
                id: "nuggetsmenu",
                title: "Kip nuggets menu",
                price: 7,
                description: "6 kip nuggets met friet",
              },
              {
                id: "kaassouflemenu",
                title: "Kaassoufle menu",
                price: 7,
                description: "1 kipfilet van de grill met friet",
              },
              {
                id: "kinder.sate",
                title: "Kinder kip sate menu",
                price: 7,
                description: "2 kip spiesjes met friet",
              },
              {
                id: "kinder.kipfilet",
                title: "Kinder kipfilet menu",
                price: 7,
                description: "1 kipfilet van de grill met friet",
              },
            ]}
            {...events}
          />
        </Section>
        <Section title="Drankjes">
          <ProductList
            products={[
              {
                id: "fristi",
                title: "Fristi",
                price: 2.5,
              },
              {
                id: "icetgreen",
                title: "Ice thee green",
                price: 2.5,
              },
              {
                id: "icetpeach",
                title: "Ice thee peach",
                price: 2.5,
              },
              {
                id: "icetspark",
                title: "Ice thee sparkling",
                price: 2.5,
              },
              {
                id: "chocomel",
                title: "Chocomel",
                price: 2.5,
              },
              {
                id: "warmchoco",
                title: "Warme chocomel",
                price: 3.5,
              },
            ]}
            {...events}
          />
        </Section>
      </div>
      {/* <div style="text-align: center;">
        <img src={kleurplaat} style="width: 90%;" />
      </div> */}
    </>
  );
}

interface Order {
  price: number;
  productId: string;
}

interface SectionProps {
  title: string;
}

function Section(props: SectionProps, children) {
  return (
    <section class={styles.section}>
      <h1 class={styles.section__title}>{props.title}</h1>
      {children}
    </section>
  );
}

interface ProductListOptions {
  products: Product[];
}

interface ProductEvents {
  onSelect(product: Product): void;
  orders: State<Order[]>;
}

function ProductList(options: ProductListOptions & ProductEvents) {
  const { products, orders } = options;

  function ProductItem(product: Product) {
    const count = orders.map(
      (s) => s.filter((e) => e.productId === product.id).length
    );

    function onClick() {
      orders.update((list) => [
        ...list,
        {
          price: product.price || 0,
          productId: product.id,
        },
      ]);
    }
    return product.description ? (
      <a
        class={["mdc-list-item", "router-link", "mdc-list--two-line"]}
        tabIndex={0}
        click={product.price ? onClick : undefined}
        // href={"/jennah/" + productPath(product).join("/")}
      >
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">
          <span class="mdc-list-item__primary-text">
            {product.title} {product.price}
            <div
              class={[
                styles.counter,
                "mdc-elevation--z2",
                styles["print-hidden"],
              ]}
            >
              {count}
            </div>
          </span>
          <span
            class={[
              "mdc-list-item__secondary-text",
              styles.product__description,
            ]}
          >
            {product.description}
            {product.extra && (
              <div>
                extra:
                {product.extra.map((e) => (
                  <span style="border: 1px #EEE gray; padding: 0 10px;">
                    {e}
                  </span>
                ))}
              </div>
            )}
          </span>
        </span>
      </a>
    ) : (
      <a
        class="mdc-list-item router-link mdc-list--one-line"
        tabIndex={0}
        click={product.price ? onClick : undefined}
      >
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">
          <span class="mdc-list-item__primary-text">
            {product.title} {product.price}
            <div
              class={[
                styles.counter,
                "mdc-elevation--z3",
                styles["print-hidden"],
              ]}
            >
              {count}
            </div>
          </span>
        </span>
      </a>
    );
  }
  return <ul class={styles["product-list"]}>{products.map(ProductItem)}</ul>;
}
