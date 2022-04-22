import { jsx, State, useContext, useState } from "@xania/view";
import { Product } from "../menu-data";
import "@material/list/mdc-list.scss";
import "@material/elevation/styles.scss";
import styles from "./style.module.scss";

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

function Order() {
  const $ = useContext<Product>();
  return (
    <div>
      <span style="display: inline-block; margin: auto;">{$("title")}</span>
      <span>{$("price")}</span>
    </div>
  );
}

export function RamadanMenuCard() {
  const state = useState<Product[]>([]);
  const events = {
    onSelect(p: Product) {
      state.update((products) => [...products, p]);
    },
    orders: useState<Order[]>([]),
  };
  return (
    <>
      <TopBar subtitle="Ramadan menu" />
      <div class={[styles["menu-card"], styles["menu-card--one-column"]]}>
        <div>
          <Section title="">
            <ProductList
              products={[
                {
                  id: "iftar.basic",
                  title: (
                    <>
                      <h3>Menu 1</h3> Standaard Iftar menu
                    </>
                  ),
                  description:
                    "Harira, panache, briwa, loempia, tortilla, chebakiya, dadels en marokkaanse thee",
                  price: 15.5,
                },
                {
                  id: "iftar.filet",
                  title: (
                    <>
                      <h3>Menu 2</h3> Grilled chicken filet
                    </>
                  ),
                  description:
                    "Gegrilde groente, huisgemaakte champignon saus en rijst inclusief standaard iftar menu",
                  price: 25,
                },
                {
                  id: "iftar.mix",
                  title: (
                    <>
                      <h3>Menu 3</h3> Mix grill
                    </>
                  ),
                  description:
                    "Brochette, kotelette, Merquez, Kip en Gehakt salade met keuze uit friet of rijst inclusief standaard iftar menu",
                  price: 29,
                },
                {
                  id: "iftar.tajine.kip",
                  title: (
                    <>
                      <h3>Menu 4</h3> Tajine kip / chicken
                    </>
                  ),
                  description:
                    "Tajine kip met groene olijven, ei, geroosterde amandelen, brood en friet inclusief standaard iftar menu",
                  price: 25,
                },
                {
                  id: "iftar.tajine.vlees",
                  title: (
                    <>
                      <h3>Menu 5</h3> Tajine vlees
                    </>
                  ),
                  description:
                    "Tajine vlees met barqooq, ei, brood en friet inclusief standaard iftar menu",
                  price: 26,
                },
                {
                  id: "iftar.tajine.kefta",
                  title: (
                    <>
                      <h3>Menu 6</h3> Tajine kefta / meatballs
                    </>
                  ),
                  description:
                    "Tajine kefta met tomaten saus, ei en brood inclusief standaard iftar menu",
                  price: 23.5,
                },
                {
                  id: "iftar.brgr",
                  title: (
                    <>
                      <h3>Menu 7</h3> Classic cheese burger
                    </>
                  ),
                  description:
                    "Classic cheese burger met friet inclusief standaard iftar menu",
                  price: 21,
                },
                // { id: "iftar.broodjes", title: "Broodjes", price: 20 },
              ]}
              {...events}
            />
          </Section>
        </div>
        {/* <div class={styles["print-hidden"]}>
          naam
          <input type="text" value="" />
          <button class="mdc-button mdc-button--raised">Verzend</button>
        </div> */}
      </div>
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
            {product.title} {product.price}{" "}
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
