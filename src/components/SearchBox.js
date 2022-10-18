import React, {useState} from "react";
import {Form, FormControl, InputGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function SearchBox() {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    };
    return (
        <Form className="d-flex me-auto" onSubmit={submitHandler}>

            <InputGroup>
                <FormControl
                    type="text"
                    name="q"
                    id="q"
                    onChange={(e) => setQuery(e.target.value)}
                placeholder={'Search Products'}
                    aria-label={'Search Products'}
                    aria-describedby={'button-search'}
                >
                </FormControl>
                <Button variant="outline-primary" type="submit" id={'button-search'}>
                    <i className="bi bi-search"></i>
                </Button>
            </InputGroup>

        </Form>
    )
}