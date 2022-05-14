import {Form, FormGroup, Input, Label} from "reactstrap";
import {useState} from "react";

export default function AddNewClient() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")

    return (
        <div>
            <h1>
                Add new client to system
            </h1>
            <Form className="form">
                <FormGroup className="m-2">
                    <Label for={"firstName"}>First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        placeholder={"ex. Jane"}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for={"lastName"}>Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        placeholder={"ex. Jane"}
                        onChange={e => setLastName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for={"address"}>Address</Label>
                    <Input
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        placeholder={"ex. Jane"}
                        onChange={e => setAddress(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for={"telephoneNumber"}>Telephone Number</Label>
                    <Input
                        type="text"
                        name="telephoneNumber"
                        id="telephoneNumber"
                        value={telephoneNumber}
                        placeholder={"ex. Jane"}
                        onChange={e => setTelephoneNumber(e.target.value)}
                    />
                </FormGroup>
            </Form>
        </div>
    )
}