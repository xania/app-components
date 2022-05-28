import { jsx } from "@xania/view";
import { TopBar } from "./menu-card";
import styles from "./desserts/style.module.scss";
import chizkoffie from "./desserts/cheesecake-koffie.jpg";
import chizfruit from "./desserts/cheesecake-fruit.jpg";
import lavaice from "./desserts/lava-ice.jpg";
import redvelvet from "./desserts/redvelvet.jpg";
import carrot from "./desserts/carrot.jpg";
import icecup from "./desserts/ice.jpg";

export function DessertMenu() {
  return (
    <div>
      <TopBar subtitle="Desserts" />
      <div style="display: flex; padding: 40px;">
        <Dessert imageUrl={lavaice} />
        <Dessert imageUrl={chizkoffie} />
        <Dessert imageUrl={chizfruit} />
        <Dessert imageUrl={redvelvet} />
        <Dessert imageUrl={carrot} />
        <Dessert imageUrl={icecup} />
      </div>
    </div>
  );
}

interface DessertProps {
  imageUrl: string;
}
function Dessert(props: DessertProps) {
  return (
    <div class={styles["dessert"]}>
      <img src={props.imageUrl} />
    </div>
  );
}
