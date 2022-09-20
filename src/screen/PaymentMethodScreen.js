import React, {useContext, useEffect, useState} from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import {Helmet} from "react-helmet-async";
import {Button, Form} from "react-bootstrap";
import {Store} from "../Store";
import {useNavigate} from "react-router-dom";

export default function PaymentMethodScreen() {

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {shippingAddress, paymentMethod},
    } = state;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
      ctxDispatch({type: 'CART_SAVE_PAYMENT_METHOD', payload: paymentMethodName});
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
    };

    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <div className="container small-container">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className="my-3">Payment Method</h1>

                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="PayPal"
                            label="PayPal"
                            value="PayPal"
                            checked={paymentMethodName === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                        <div className="mb-3">
                            <Form.Check
                                type="radio"
                                id="Stripe"
                                label="Stripe"
                                value="Stripe"
                                checked={paymentMethodName === 'Stripe'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </div>
                        <div className="mb-3">
                            <Button type="submit">
                                Continue
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    );
}