import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {Client} from "./Client";

export default function AddNewClient() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")

    const handleSubmit = async () => {
        let client: Client = {
            id: 0,
            firstName: firstName,
            lastName: lastName,
            address: address,
            telephoneNumber: telephoneNumber
        }

        //'http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/addnew'
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/addnew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })
            .then(response => {
            if (response.ok){
                alert("Client added successfully");
            }
            else {
                alert("Error when adding client")
            }
        });
    }

    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setAddress("");
        setTelephoneNumber("");
    }

    return (
        <div>
            <h1>
                Add new client to system
            </h1>
            <Form className="form col-5">
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
                        placeholder={"ex. Doe"}
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
                        placeholder={"ex. Doey St. 9"}
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
                        placeholder={"ex. 000000000"}
                        onChange={e => setTelephoneNumber(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button className='btn btn-success mx-2' onClick={handleSubmit}>Submit</Button>
                    <Button className='btn btn-danger  mx-2' onClick={handleReset}>Clear</Button>
                </FormGroup>
            </Form>
            <Link to='/clientsoverview'>Back to clients overview</Link>
        </div>
    )
}