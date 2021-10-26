import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProducts = () => {
    const [product, setProduct] = useState({});
    //const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    useEffect(() => {
        const url = `http://localhost:5005/products/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])

    const handleProductNameChange = e => {
        const updatedName = e.target.value;
        const updatedProduct = { name: updatedName, price: product.price, quantity: product.quantity };
        setProduct(updatedProduct);
    }

    const handleProductPriceChange = e => {
        const updatedPrice = e.target.value;
        const updatedProduct = { name: product.name, price: updatedPrice, quantity: product.quantity }
        setProduct(updatedProduct);
    }
    const handleProductQuantityChange = e => {
        const updatedQuantity = e.target.value;
        const updatedProduct = { name: product.name, price: product.price, quantity: updatedQuantity }
        setProduct(updatedProduct);
    }

    const handleUpdateProducts = e => {
        const url = `http://localhost:5005/products/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Update Successfully');
                    setProduct({});
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    // const handleIncrease = () => {
    //     setQuantity(quantity + 1)
    // }
    // const handleDecrease = () => {
    //     if (quantity < 1) {
    //         return;
    //     }
    //     setQuantity(quantity - 1)
    // }
    return (
        <div>
            <h1>update product: {product.name} {product.price} {product.quantity}</h1>
            <p>{id}</p>
            <form onSubmit={handleUpdateProducts}>
                <input type="text" onChange={handleProductNameChange} value={product.name || ''} />
                <input type="text" onChange={handleProductPriceChange} value={product.price || ''} />
                <input type="text" onChange={handleProductQuantityChange} value={product.quantity || ''} />
                {/* <button onClick={handleDecrease}>-</button><span>{quantity}</span> <button onClick={handleIncrease}>+</button> */}
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateProducts;