import React, { useRef } from 'react';

const AddProducts = () => {
    const nameRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();

    const handleAddProducts = e => {
        const name = nameRef.current.value;
        const quantity = quantityRef.current.value;
        const price = priceRef.current.value;
        //let newPrice = parseFloat(price) * parseFloat(quantity);

        const newProduct = { name, price, quantity };
        console.log(name, price, quantity)

        fetch('http://localhost:5005/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully added product.')
                    e.target.reset()
                }

            }
            )


        e.preventDefault();
    }

    return (
        <div>
            <h1>Add Products</h1>
            <form onSubmit={handleAddProducts}>
                <input type="text" ref={nameRef} />
                <input type="text" ref={priceRef} />
                <input type="text" ref={quantityRef} />
                <input type="submit" value="Add Products" />
            </form>
        </div>
    );
};

export default AddProducts;