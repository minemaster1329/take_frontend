import {Client} from "../clientcomponents/Client";

export type Package = {
    deliveryAddress: string
    type: string
    weight: number
    paidFor: boolean
    price: number
    estimatedDeliveryDate: string
    packageOwnerId: number
    packageRouteId: number
}

export interface PackageIdOnly {
    packageID: number
}