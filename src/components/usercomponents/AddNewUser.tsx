import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState} from "react";
import {NewUser, UserRole} from "./UserCredentials";

export function AddNewUser() {
    const [newUserName, setNewUserName] = useState<string>("")
    const [newUserPassword, setNewUserPassword] = useState<string>("")
    const [newUserPasswordRepeat, setNewUserPasswordRepeat] = useState<string>("")
    const [newUserRole, setNewUserRole] = useState<UserRole>(UserRole.User)

    const handleSubmit = async () => {
        let newUser: NewUser = {
            name: newUserName,
            password: newUserPassword,
            role: UserRole[newUserRole]
        }

        console.log(newUser);

        await fetch('http://localhost:8080/take/api/users/addnew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                if (response.ok){
                    alert("User added successfully");
                }
                else {
                    response.text().then(text => {
                        console.log(text);
                    })
                }
            })
            .catch(reason => {
                console.log(reason)
            })
    }

    const handleReset = () => {
        setNewUserName("");
        setNewUserPassword("");
        setNewUserPasswordRepeat("");
        setNewUserRole(0);
    }

    return (
        <Form>
            <FormGroup>
                <Label for='newUserName'>New user name</Label>
                <Input
                    type='text'
                    value={newUserName}
                    name='newUserName'
                    onChange={e => setNewUserName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='newUserPassword'>New user password</Label>
                <Input
                    type='password'
                    value={newUserPassword}
                    name='newUserPassword'
                    onChange={e => setNewUserPassword(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='newUserPasswordRepeat'>Repeat password</Label>
                <Input
                    type='password'
                    value={newUserPasswordRepeat}
                    name='newUserPassword'
                    onChange={e => setNewUserPasswordRepeat(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='newUserRole'>Repeat password</Label>
                <Input
                    type='select'
                    value={newUserRole}
                    name='newUserRole'
                    onChange={e => setNewUserRole(Number(e.target.value))}
                >
                    <option value={0}>User</option>
                    <option value={1}>Admin</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Button className='btn btn-success mx-2' onClick={handleSubmit}>Submit</Button>
                <Button className='btn btn-danger  mx-2' onClick={handleReset}>Clear</Button>
            </FormGroup>
        </Form>
    )
}