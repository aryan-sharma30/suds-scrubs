import { CLIENT_ID } from './paypal_checkout/src/Config/Config';
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation(); // Retrieve price from location state
    const price = location.state?.price || 0; // Default to 0 if price is not passed

    console.log("Price received in checkout:", price);

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const navigate = useNavigate(); // Use navigate for redirection

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Car Wash Service",
                    amount: {
                        currency_code: "USD",
                        value: price, // Use the price passed from ScheduleWash
                    },
                },
            ],
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occurred with your payment ");
    };

    useEffect(() => {
        if (success) {
            navigate('/confirmation');
        }
    }, [success]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className="checkout-container">
                <div className="product-info">
                    <div className="product-text">
                        <h1>Car Wash Service</h1>
                    </div>
                    <div className="product-price-btn">
                        <p className="price">${price}</p>
                        <br />
                    </div>
                </div>
                <br />
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
            </div>
        </PayPalScriptProvider>
    );
}

export default Checkout;
