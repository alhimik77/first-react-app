import React, {useContext, useEffect, useReducer, useState} from "react";
import {Store} from "../Store";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Container, Form} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import {getError} from "../utils";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "FETCH_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
    }
}


export default function ProductEditScreen() {

    const params = useParams();  //  /product/:id
    const {id: productId} = params;
    const {state} = useContext(Store);
    const {userInfo} = state;
    const [{loading, error}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({type: 'FETCH_SUCCESS'});
                const {data} = await axios.get(`/api/products/${productId}`);
                setName(data.name);
                setSlug(data.slug);
                setPrice(data.price);
                setImage(data.image);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setBrand(data.brand);
                setDescription(data.description);

                dispatch({type: 'FETCH_SUCCESS'});

            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err),
                });
            }
        }
        fetchData();
    }, [productId]);


    return <Container className={'small-container'}>
        <Helmet>
            <title>Edit Product ${productId}</title>
        </Helmet>
        <h1>Edit Product {productId}</h1>

        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <Form>
                <Form.Group className={'mb-3'} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        requered
                        />
                </Form.Group>

                <Form.Group className={'mb-3'} controlId="slug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        requered
                    />
                </Form.Group>

                <Form.Group className={'mb-3'} controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        requered
                    />
                </Form.Group>

                <Form.Group className={'mb-3'} controlId="image">
                    <Form.Label>Image File</Form.Label>
                    <Form.Control
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        requered
                    />
                </Form.Group>

                <Form.Group className={'mb-3'} controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        requered
                    />
                </Form.Group>

                <Form.Group className={'mb-3'} controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        requered
                    />
                </Form.Group>

                <Form.Group className={'mb-3'} controlId="countInStock">
                    <Form.Label>Count in Stock</Form.Label>
                    <Form.Control
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        requered
                    />
                </Form.Group>

                <Form.Group className={'mb-3'} controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        requered
                    />
                </Form.Group>

                <div className={'mb-3'}>
                    <Button type={'submit'} variant={'primary'}>
                        Update
                    </Button>

                </div>
            </Form>
        )}


    </Container>

}






