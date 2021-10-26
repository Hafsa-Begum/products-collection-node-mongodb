import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5005/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    //delete product
    const handleDeleteProduct = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `http://localhost:5005/products/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully');
                        const remainingProducts = products.filter(product => product._id !== id)
                        setProducts(remainingProducts);
                    }
                })
        }
    }

    return (
        <div>
            <h1>Products: {products.length}</h1>
            <div className='row'>
                {
                    products.map(product => <div
                        key={product._id} className='col-md-4 '>
                        <div className='mx-3 bg-info mb-2 pb-2'>
                            <h1>Name: {product.name}</h1>
                            <p>Price: tk {product.price}</p>
                            <p>Quantity: <small>{product.quantity}</small></p>
                            <Link to={`/products/update/${product._id}`}> <button>Update</button></Link>
                            <button onClick={() => handleDeleteProduct(product._id)}>X</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Products;