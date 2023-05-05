import { CircleImage } from "../images/CircleImage"
import MapIconCarrot from "./MapIcons/MapIconCarrot.png"
import MapIconCarrotColor1 from "./MapIcons/MapIconCarrotColorGrey.png"
import MapIconCarrotColor2 from "./MapIcons/MapIconCarrotColor2.png"
import MapIconCarrotColor3 from "./MapIcons/MapIconCarrotColor3.png"
import MapIconCarrotColor4 from "./MapIcons/MapIconCarrotColor4.png"
import MapIconCarrotColorGreen from "./MapIcons/MapIconCarrotColorGreen.png"
import MapIconCarrotColorYellow from "./MapIcons/MapIconCarrotColorYellow.png"
import MapIconRabbit1 from "./MapIcons/MapIconRabbitBlue.png"
import MapIconRabbit2 from "./MapIcons/MapIconRabbitPurple.png"
import MapIconRabbit3 from "./MapIcons/MapIconRabbitGreen.png"
import MapIconRabbit4 from "./MapIcons/MapIconRabbitTeal.png"
import MapIconRabbit5 from "./MapIcons/MapIconRabbitYellow.png"
import MapIconRabbit6 from "./MapIcons/MapIconRabbitRed.png"
import MapIconRabbit7 from "./MapIcons/MapIconRabbitBlack.png"
import MapIconRabbit8 from "./MapIcons/MapIconRabbitGrey.png"


const rabbitList = [MapIconRabbit1, MapIconRabbit3, MapIconRabbit7]
const carrotList = [MapIconCarrotColor2, MapIconCarrotColor3, MapIconCarrotColor4]

export const MarkerIcons = {
    default: MapIconCarrot,
    color1: MapIconCarrotColor1,
    color2: MapIconCarrotColor2,
    color3: MapIconCarrotColor3,
    color4: MapIconCarrotColor4,
    green: MapIconCarrotColorGreen,
    yellow: MapIconCarrotColorYellow,
    getRandom: () => {
        const items = [MapIconCarrotColor2, MapIconCarrotColor3, MapIconCarrotColor4]
        return items[Math.floor(Math.random() * items.length)]
    },
    rabbit1: MapIconRabbit1,
    rabbitList,
    carrotList,

}