import { RouteContext } from "@xania/router";
import { createContainer, jsx, useContext } from "@xania/view";

export class KitchenSink {
  constructor(public ctx: RouteContext) {}
  get view(): any {
    const container = createContainer<Person>();

    return (
      <div>
        <button click={onClick}>add</button>
        <div>{container.map(<Row />)}</div>
      </div>
    );

    function Row() {
      const $ = useContext<Person>();
      return (
        <div>
          {$("name")} <button click={onDelete}>delete</button>
        </div>
      );

      function onDelete(e: JSX.EventContext<MouseEvent>) {
        console.log(e.values);
        // container.removeAt(e)
      }
    }

    function onClick() {
      container.push([
        {
          name: "person-" + container.length,
        },
      ]);
    }
  }
}

interface Person {
  name: string;
}
