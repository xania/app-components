import { jsx } from "@xania/view";
import { Product, products } from "./menu-data";
import "@material/list/mdc-list.scss";
import styles from "./style.module.scss";

export function MenuCard() {
  const events = {
    onSelect() {},
  };
  return (
    <>
      <div class={styles.topbar}>
        <h1>
          <span class={styles.hart}></span>
          Jennah
          {/* <span class={styles.halal}></span> */}
          <span class={styles.subtitle}>Restaurant en Cafe</span>
        </h1>

        {/* <span class="topbar-wifi">
          <span class="material-icons">rss_feed</span>
          Jennah-Gast / Jennah2021 |
          <span class="material-icons" style="color: #128C7E">
            whatsapp
          </span>
          +31 6 87120348
        </span> */}
      </div>
      <div class={styles["menu-card"]}>
        <div>
          <Section title="Starters">
            <ProductList products={products.starters} {...events} />
          </Section>
          <Section title="Broodjes">
            <ProductList products={products.sandwiches} {...events} />
          </Section>
          <Section title="Grill">
            <ProductList products={products.grill} {...events} />
          </Section>
        </div>
        <div>
          <Section title="Tajine">
            <ProductList products={products.tajines} {...events} />
          </Section>
          <Section title="Couscous">
            <ProductList products={[...products.couscous]} {...events} />
          </Section>
          <Section title="Burgers">
            <ProductList products={products.burgers} {...events} />
          </Section>
        </div>
      </div>
      <div style="page-break-inside:avoid;page-break-after:always"></div>{" "}
      <div class={styles["menu-card"]}>
        <div>
          <Section title="Pasta">
            <ProductList products={products.pasta} {...events} />
          </Section>
          <Section title="Salades">
            <ProductList products={products.salads} {...events} />
          </Section>
          <Section title="Panini">
            <ProductList products={products.paninis} {...events} />
          </Section>
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
        </div>
        <div>
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
      </div>
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
