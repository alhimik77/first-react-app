    import React, {useContext, useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Store} from "../Store";
import CheckOutSteps from "../components/CheckOutSteps";


export default function ShippingAddressScreen() {

        const navigate = useNavigate();
        const{ state, dispatch: ctxDispatch } = useContext(Store);

        const {
            userInfo,
            cart: { shippingAddress },
        } = state;

    const [fullName, setFullName] = useState( shippingAddress.fullName || ' ');
    const [address, setAddress] = useState(shippingAddress.address || ' ');
    const [city, setCity] = useState(shippingAddress.city || ' ');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || ' ');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate]);

    const [country, setCountry] = useState(shippingAddress.country || ' ');
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });
         localStorage.setItem(
             'shippingAddress',
             JSON.stringify({
                    fullName,
                    address,
                    city,
                    postalCode,
                    country,
             })
            );
            navigate('/payment');
    };

    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
               <CheckOutSteps step1 step2 />
            <div className="container small-container">
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            // placeholder="Enter full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            // placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            // placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            // placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            // placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className="md-3">
                        <Button onSubmit={submitHandler}  type="submit" variant="primary">Continue</Button>
                    </div>
                </Form>

            </div>


        </div>
    );
}
