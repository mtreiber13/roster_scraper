import React, {useState} from 'react';

import { 
        Jumbotron, 
        Button, 
        FormGroup, 
        Input} from 'reactstrap';

        import NavComponent from './components/Nav'
import './css/login.css';


// import logo from './logo.svg';
// import './css/artboard.css';


function Register() {
    // useState will store what user enters in the form 
    // Gives current value of the variable you want to store in the state 
    // and a function to set a new value 
    var user_info = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        dob: "",
        instagram_handle: "",
        zip_code: "",
        phone: "",
        bio: "",
        business_name: ""
    }

    const [first_name, set_first_name] = useState("");
    const [last_name, set_last_name] = useState("");
    const [password, set_password] = useState("");
    const [email, set_email] = useState("");
    const [dob, set_dob] = useState("");
    const [instagram_handle, set_instagram_handle] = useState("");
    const [zip_code, set_zip_code] = useState("");
    const [phone, set_phone] = useState("");
    const [bio, set_bio] = useState("");
    const [business_name, set_business_name] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password);
    }

    return (
        
    <div className="Register">
        <NavComponent />
        
        <Jumbotron className="JTron">
        <h1>Register For Fluence </h1>
        <form onSubmit={handleSubmit}>
            <FormGroup controlId="first_name" bsSize="large">
                First Name
                <Input
                // Autofocus will focus this field when form loads 
                autoFocus
                type="first_name"
                value={first_name}
                // setEmail function stores what user types in to e.target.value
                // Component will get rerendered and email will have the new value 
                onChange={e => set_first_name(e.target.value)}
                />
            </FormGroup>
            <FormGroup controlId="last_name" bsSize="large">
                Last Name
                <Input
                // Autofocus will focus this field when form loads 
                autoFocus
                type="last_name"
                value={last_name}
                // setEmail function stores what user types in to e.target.value
                // Component will get rerendered and email will have the new value 
                onChange={e => set_last_name(e.target.value)}
                />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
                Email
                <Input
                // Autofocus will focus this field when form loads 
                autoFocus
                type="email"
                value={email}
                // setEmail function stores what user types in to e.target.value
                // Component will get rerendered and email will have the new value 
                onChange={e => set_email(e.target.value)}
                />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
                Password
                <Input
                value={password}
                onChange={e => set_password(e.target.value)}
                type="password"
                />
            </FormGroup>
            <FormGroup controlId="DOB" bsSize="large">
                Date of Birth
                <Input
                value={dob}
                onChange={e => set_dob(e.target.value)}
                type="dob"
                />
            </FormGroup>
            <FormGroup controlId="instagram_handle" bsSize="large">
                Instagram Handle
                <Input
                value={instagram_handle}
                onChange={e => set_instagram_handle(e.target.value)}
                type="instagram_handle"
                />
            </FormGroup>
            <FormGroup controlId="zip_code" bsSize="large">
                Zip Code
                <Input
                value={zip_code}
                onChange={e => set_zip_code(e.target.value)}
                type="zip_code"
                />
            </FormGroup>
            <FormGroup controlId="phone" bsSize="large">
                Phone Number
                <Input
                value={phone}
                onChange={e => set_phone(e.target.value)}
                type="phone"
                />
            </FormGroup>
            <FormGroup controlId="bio" bsSize="large">
                Bio
                <Input
                value={bio}
                onChange={e => set_bio(e.target.value)}
                type="bio"
                />
            </FormGroup>
            <FormGroup controlId="business_name" bsSize="large">
                Business Name
                <Input
                value={business_name}
                onChange={e => set_bio(e.target.value)}
                type="business_name"
                />
            </FormGroup>
            <Button color="primary" block type="submit">
                Register
            </Button>
            </form>
        </Jumbotron>
    </div>);}

export default Register