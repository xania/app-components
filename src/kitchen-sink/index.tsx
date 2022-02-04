import { RouteContext } from "@xania/router";
import { createContainer, jsx, useContext } from "@xania/view";
import styles from "./style.module.scss";

export class KitchenSink {
  constructor(public ctx: RouteContext) {}
  get view(): any {
    const container = createContainer<Person>();

    let selected: Node = null;

    return (
      <div>
        <button click={addOne}>add</button>
        <button click={(_) => addMany(1000)}>add 1000</button>
        <button click={(_) => addMany(10000)}>add 10000</button>
        <button click={(_) => container.removeAt(3)}>delete</button>
        <button click={(_) => container.swap(3, 1)}>swap</button>
        <button click={updateEvery10th}>update every 10th</button>
        <button click={container.clear}>clear</button>
        <div>{container.map(<Row />)}</div>
      </div>
    );

    function Row() {
      const $ = useContext<Person>();
      return (
        <div className={$("className")}>
          {$("name")} <button click={onDelete}>delete</button>
          <button click={onSelect}>select</button>
        </div>
      );

      function onSelect(e: JSX.EventContext<MouseEvent>) {
        if (selected) {
          container.update(selected, "className", () => null);
        }
        if (selected !== e.node) {
          selected = e.node;
          container.update(selected, "className", (p) =>
            p.className ? null : styles["selected"]
          );
        } else {
          selected = null;
        }
      }

      function onDelete(e: JSX.EventContext<MouseEvent>) {
        container.remove(e.node);
      }
    }

    function addMany(count: number) {
      const data: Person[] = new Array(count);
      const length = container.length;
      for (let i = 0; i < count; i++) {
        data[i] = {
          name: "person-" + (length + i),
        };
      }
      container.push(data);
    }

    function addOne() {
      container.push([
        {
          name: "person-" + container.length,
        },
      ]);
    }

    function updateEvery10th() {
      for (let i = 0, len = container.length; i < len; i += 10) {
        container.updateAt(i, "name", (p) => p.name + " !!!");
      }
    }
  }
}

interface Person {
  name: string;
  className?: string;
}
