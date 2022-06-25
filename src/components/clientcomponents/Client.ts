import {route} from "../packagecomponents/Package";

export type Client = {
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    telephoneNumber: string,
}

export interface ClientIdOnly {
    clientId: number
}