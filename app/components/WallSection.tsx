import Wall from "./Wall";
import { getWall } from "../content/wall";

export default async function WallSection() {
  const tapes = await getWall();
  return <Wall initial={tapes} />;
}
