import {Client} from "../clientcomponents/Client";

export type Package = {
    id: number
    deliveryAddress: string
    type: string
    weight: number,
    isPaidFor: boolean
    price: number
    estimatedDeliveryDate: string
    ownerID: number
    routeID: number
}

export interface PackageIdOnly {
    packageID: number
}