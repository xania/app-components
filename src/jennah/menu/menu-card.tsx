import { jsx, useState } from "@xania/view";
import { Product, products } from "./menu-data";
import "@material/list/mdc-list.scss";
import styles from "./style.module.scss";
import kleurplaat from "./ramadan-0fd15db2b9bb812a21cd33ae082ec693.jpg";

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

export function MenuCard() {
  const state = useState(0);
  const events = {
    onSelect(p: Product) {
      state.update((x) => x + p.price);
    },
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
            <ProductList products={products.tajines} {...events} />
            <hr />
            <p class={styles.section__footer}>
              Tajine worden geserveerd met bruin of wit brood
            </p>
          </Section>
          {/* <Section title="Couscous">
            <ProductList products={[...products.couscous]} {...events} />
            <hr />
            <p class={styles.section__footer}>
              Traditioneel bereid couscous elke vrijdag en weekend
            </p>
          </Section> */}
        </div>
        <div>
          <Section title="Grill">
            <ProductList products={products.grill} {...events} />
            <hr />
            <p class={styles.section__footer}>
              Alle schotels worden geserveerd met salade, huis saus en keuze uit
              rijst of friet
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

      <div class={styles["menu-card"]}>
        <Section title="Broodjes">
          <ProductList products={products.sandwiches} {...events} />
          <hr />
          <p class={styles.section__footer}>
            Al onze broodjes worden geserveerd met salade, saus en friet
          </p>
        </Section>
        <Section title="Pasta">
          <ProductList products={products.pasta} {...events} />
        </Section>
      </div>
      <div style="page-break-inside:avoid;page-break-after:always"></div>
      <TopBar subtitle="Drankjes en Desserts" />
      <div class={styles["menu-card"]}>
        {/* <Section title="Panini">
            <ProductList products={products.paninis} {...events} />
          </Section> */}
        <Section title="Dranken">
          <ProductList
            products={[
              { title: "Frisdrank", price: 2.5 },
              { title: "Redbull", price: 3 },
            ]}
            {...events}
          />
          <hr />
          <ProductList products={products.hotdrinks} {...events} />
        </Section>
        <Section title="Smoothies">
          <ProductList products={products.smoothies} {...events} />
        </Section>
        <Section title="Dessert">
          <ProductList products={products.desserts} {...events} />
        </Section>
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
      <TopBar subtitle={"Ramadan iftar menu"} />
      <div class={styles["menu-card"]}>
        <div>
          <Section title="Iftar starter 12.5">
            <ProductList
              products={[
                { title: "Loempia" },
                { title: "Briwat" },
                { title: "Chebakiya" },
                { title: "Harira" },
                { title: "Spa water" },
                { title: "Gekookt ei" },
                { title: "Avocado smoothie" },
              ]}
              {...events}
            />
          </Section>
        </div>
        <div>
          <Section title="Iftar hoofdgerecht">
            <ProductList
              products={[
                { title: "Kip filet van de grill", price: 25 },
                { title: "Mix grill", price: 27 },
                { title: "Tajines", price: 25 },
                { title: "Broodjes", price: 20 },
              ]}
              {...events}
            />
            <hr />
            <p class={styles.section__footer}>
              Al onze iftar hoofdgerechten zijn inclusief starter menu
            </p>
          </Section>
        </div>
      </div>

      <div style="page-break-inside:avoid;page-break-after:always"></div>
      <div class={[styles["menu-card"], styles["menu-card--kinderen"]]}>
        <Section title="Kindermenu">
          <ProductList
            products={[
              {
                title: "Kip nuggets menu",
                price: 7,
                description: "6 kip nuggets met friet",
              },
              {
                title: "Kaassoufle menu",
                price: 7,
                description: "1 kipfilet van de grill met friet",
              },
              {
                title: "Kinder kip sate menu",
                price: 7,
                description: "2 kip spiesjes met friet",
              },
              {
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
                title: "Fristi",
                price: 1.5,
              },
              {
                title: "Ice thee green",
                price: 1.5,
              },
              {
                title: "Ice thee peach",
                price: 1.5,
              },
              {
                title: "Ice thee sparkling",
                price: 1.5,
              },
              {
                title: "Chocomel",
                price: 1.5,
              },
              {
                title: "Warme chocomel",
                price: 1.5,
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
}

function ProductList(options: ProductListOptions & ProductEvents) {
  const { products } = options;

  return (
    <ul class={styles["product-list"]}>
      {products.map((product) =>
        product.description ? (
          <a
            class={["mdc-list-item", "router-link", "mdc-list--two-line"]}
            tabIndex={0}
            click={() => options.onSelect(product)}
            // href={"/jennah/" + productPath(product).join("/")}
          >
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
              <span class="mdc-list-item__primary-text">
                {product.title} {product.price}
              </span>
              <span
                class={[
                  "mdc-list-item__secondary-text",
                  styles.product__description,
                ]}
              >
                {product.description}
              </span>
            </span>
          </a>
        ) : (
          <a
            class="mdc-list-item router-link mdc-list--one-line"
            tabIndex={0}
            click={() => options.onSelect(product)}
          >
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
              <span class="mdc-list-item__primary-text">
                {product.title} {product.price}
              </span>
            </span>
          </a>
        )
      )}
    </ul>
  );
}
