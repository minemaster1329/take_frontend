import {Client} from "../clientcomponents/Client";

export type Package = {
    deliveryAddress: string
    type: string
    weight: number
    paidFor: boolean
    price: number
    estimatedDeliveryDate: string
    routeCarId: number
    definedRouteId: number
}



export interface PackageIdOnly {
    packageID: number
}