import { useContext, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import { Link } from "react-router"

const Cart = () => {

    const { cart, addToWishList, removeCartItem, updateCartItemQty, checkOutItems, setCheckOutItems, notify } = useContext(StoreProvider)

    const [deliveryFees, setDeliveryFees] = useState(5)







    const cartItems = cart.item

    console.log(cartItems)

    function handleMoveToWishlist(cartItemProductId, cartItemId) {

        addToWishList(cartItemProductId)
        removeCartItem(cartItemId)
    }


    const totalAmount = cartItems?.reduce((acc, curr) => {

        acc += curr.product.price * curr.quantity

        return acc
    }, deliveryFees)

    const subTotal = cartItems?.reduce((acc, curr) => {

        acc += curr.product.price * curr.quantity

        return acc
    }, 0)

    console.log(totalAmount)

    function handleCheckoutBtn() {

        setCheckOutItems({

            cartItems: cartItems,
            totalAmount: totalAmount
        })


    }







    return (
        <>

            <h4 className="text-center py-4">MY BAG  ( {cart.item?.length} {cart.item?.length > 1 ? "Items" : "Item"} )</h4>

            <div className="row mx-4 gap-5">

                <div className="col-md-7">
                    {cartItems && cartItems.length > 0 ? cartItems?.map(cartItem => {

                        return (

                            <div className="row border rounded mb-4">

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
                                    <p>Quantity: <span><span className="border p-1" onClick={() => updateCartItemQty(cartItem._id, "decreement")}>-</span><span className="border py-1 px-3">{cartItem.quantity}</span><span className="border p-1" onClick={() => updateCartItemQty(cartItem._id, "increement")}>+</span></span></p>
                                    <button className="w-100 p-2 btn btn-secondary" onClick={() => removeCartItem(cartItem._id)}>Remove From Cart</button>
                                    <button className="w-100 p-2 mt-3 btn btn-secondary" onClick={() => handleMoveToWishlist(cartItem.product._id, cartItem._id)}>Move To Wishlist</button>

                                </div>
                            </div>


                        )
                    }) :
                        <div className="text-center p-5">
                            <h3>🛒 Cart is Empty! Please Add Products</h3>
                        </div>}

                </div>

                <div className="col-md-4">

                    <div className="card p-4">
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
                        <div className="d-flex justify-content-between"><p>Delivery Charges</p> <p>₹{deliveryFees}</p></div>


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
        </>

    )
}

export default Cart