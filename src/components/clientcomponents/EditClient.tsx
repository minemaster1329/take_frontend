import {useLocation} from "react-router-dom";
import {ClientIdOnly, Client} from "./Client";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useEffect, useState} from "react";

export default function EditClient() {
    const {state} = useLocation();
    const {clientId} = state as ClientIdOnly

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")

    const [clientCopy, setClientCopy] = useState<Client>();

    useEffect(() => {
        const fetchClient = async () => {
            await fetch(`http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/${clientId}`).then(response => {
                if (response.ok){
                    return response.json();
                }
            })
                .then(responseJson => {
                    let client = responseJson as Client
                    setClientCopy(client);
                    setFirstName(client.firstName)
                    setLastName(client.lastName)
                    setAddress(client.address)
                    setTelephoneNumber(client.telephoneNumber)
                })
        }

        fetchClient();
    }, [clientId])

    const handleSubmit = async () => {
        const client: Client = {
            id: clientId,
            firstName: firstName,
            lastName: lastName,
            address: address,
            telephoneNumber: telephoneNumber
        }
        await fetch('http://localhost:8080/take_project-1.0-SNAPSHOT/api/client/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })
            .then(response => {
                if (response.ok){
                    alert("Client edited successfully");
                }

                else alert("Something went wrong when saving changes");
            })
;    }

    const handleReset = () => {
        if (clientCopy !== undefined){
            setFirstName(clientCopy.firstName);
            setLastName(clientCopy.lastName);
            setAddress(clientCopy.address);
            setTelephoneNumber(clientCopy.telephoneNumber);
        }
    }

    return(
        <div>
            <h1>Edit client {clientId}</h1>
            <Form className='form col-5'>
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
        </div>
    )
}