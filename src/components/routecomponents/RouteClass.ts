import {DefinedRoute} from "./DefinedRoute";
import {Car} from "../carcomponents/Car";


export type RouteClass = {
    id: number
    date: string
    routeType: DefinedRoute
    vehicle: Car
}