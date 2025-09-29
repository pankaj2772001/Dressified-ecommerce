import { useContext, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import { Link } from "react-router"
import { useEffect } from "react"

const Cart = () => {

    const { cart, addToWishList, removeCartItem, updateCartItemQty, checkOutItems, setCheckOutItems, notify, deliveryFees, setDeliveryFees } = useContext(StoreProvider)









    const cartItems = cart.item



    function handleMoveToWishlist(cartItemProductId, cartItemId) {

        addToWishList(cartItemProductId)
        removeCartItem(cartItemId)
    }


    const totalAmount = cartItems?.reduce((acc, curr) => {

        acc += curr.product.price * curr.quantity

        return acc
    }, 0)



    const subTotal = cartItems?.reduce((acc, curr) => {

        acc += curr.product.price * curr.quantity

        return acc
    }, 0)


    function handleCheckoutBtn() {

        setCheckOutItems({

            cartItems: cartItems,
            totalAmount: totalAmount
        })


    }


    useEffect(() => {
        if (totalAmount < 700) {
            setDeliveryFees(99)
        } else if (totalAmount < 1500) {
            setDeliveryFees(49)
        } else if (totalAmount > 1500) {
            setDeliveryFees(0)
        }


    }, [subTotal])







    return (
        <div className="d-flex flex-column min-vh-100">

            <main className="flex-fill">

                {cartItems && cartItems.length > 0 ? <div>
                    <h4 className="text-center py-4">MY BAG  ( {cart.item?.length} {cart.item?.length > 1 ? "Items" : "Item"} )</h4>

                    <div className="row mx-4 gap-4">

                        <div className="col-md-7">
                            {cartItems && cartItems.length > 0 && cartItems?.map(cartItem => {

                                return (

                                    <div key={cartItem._id} className="row border shadow-sm rounded mb-4">

                                        <div className=" col-md-5 border-end">

                                            <img
                                                src={cartItem.product.image}
                                                alt="Product"
                                                className="w-100"
                                                style={{ objectFit: "contain", height: "400px" }}
                                            />




                                        </div>
                                        <div className="col-md-7 p-4">
                                            <p>{cartItem.product.section} {cartItem.product.brand} {cartItem.product.title}</p>
                                            <h5>₹{cartItem.product.price * cartItem.quantity} <strike>₹{cartItem.product.originalPrice * cartItem.quantity}</strike></h5>
                                            <p>You saved ₹{(cartItem.product.originalPrice - cartItem.product.price) * cartItem.quantity}</p>
                                            <p>Size: {cartItem.selectedSize}</p>
                                            <p>Quantity: <span><span style={{ cursor: "pointer" }} className="border p-1" onClick={() => updateCartItemQty(cartItem._id, "decreement")}>-</span><span className="border py-1 px-3">{cartItem.quantity}</span><span style={{ cursor: "pointer" }} className="border p-1" onClick={() => updateCartItemQty(cartItem._id, "increement")}>+</span></span></p>
                                            <button className="w-100 p-2 btn btn-secondary" onClick={() => removeCartItem(cartItem._id)}>Remove From Cart</button>
                                            <button className="w-100 p-2 mt-3 btn btn-secondary" onClick={() => handleMoveToWishlist(cartItem.product._id, cartItem._id)}>Move To Wishlist</button>

                                        </div>
                                    </div>


                                )
                            })}

                        </div>

                        <div className="col-md-4 ">

                            <div className="card shadow-sm p-4">
                                <h5>PRICE DETAILS</h5>
                                <hr />



                                <div className="d-flex justify-content-between"><p>Total MRP (Incl. of taxes) </p> <p>₹{cartItems?.reduce((acc, curr) => {

                                    acc += curr.product.originalPrice * curr.quantity

                                    return acc
                                }, 0)}</p></div>
                                <div className="d-flex justify-content-between"><p>Bag Discount</p> <p>-₹{cartItems?.reduce((acc, curr) => {

                                    acc += curr.product.originalPrice * curr.quantity

                                    return acc
                                }, 0) - subTotal} </p></div>
                                <div className="d-flex justify-content-between"><p>Delivery Charges</p> <p>{deliveryFees === 0 ? "Free" : "₹" + deliveryFees}</p></div>


                                <hr />

                                <div className="d-flex justify-content-between"><h4>TOTAL AMOUNT </h4> <h4>₹{totalAmount}</h4> </div>




                                <hr />

                                <p>You will save ₹{cartItems?.reduce((acc, curr) => {

                                    acc += curr.product.originalPrice * curr.quantity

                                    return acc
                                }, 0) - subTotal} on this order</p>

                                <Link to={cartItems?.length === 0 ? "" : "/checkout"} ><button className=" p-2 btn btn-primary w-100" onClick={handleCheckoutBtn} disabled={cartItems?.length === 0}>PROCEED TO CHECKOUT</button></Link>
                            </div>

                        </div>



                    </div>



                </div> : <div className="text-center p-5">
                    <h3>🛒 Your Cart is Empty! Please Add Products</h3>
                </div>}
            </main>






        </div>

    )
}

export default Cart