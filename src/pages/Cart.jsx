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

    function handleCheckoutBtn(){

        setCheckOutItems({

            cartItems: cartItems,
            totalAmount: totalAmount
        })

        
    }

    

    



    return (
        <div className="d-flex">

            <div style={{ width: "50vw" }}>
                {cartItems ? cartItems?.map(cartItem => {

                    return (
                        <div>
                            <div className=" d-flex">

                                <div className="card mt-2">

                                    <img src={`https://placehold.co/400x260?text=${cartItem.product.title}`} alt="" />


                                </div>
                                <div>
                                    <button onClick={() => removeCartItem(cartItem._id)}>Remove From Cart</button>
                                    <button onClick={() => handleMoveToWishlist(cartItem.product._id, cartItem._id)}>Move To Wishlist</button>
                                    <div>Qty: <button onClick={() => updateCartItemQty(cartItem._id, "decreement")}>-</button>{cartItem.quantity}<button onClick={() => updateCartItemQty(cartItem._id, "increement")}>+</button></div>
                                    <p>Price: {cartItem.product.price * cartItem.quantity}</p>
                                    <p><strike>{cartItem.product.originalPrice * cartItem.quantity}</strike></p>
                                    <p>You saved {(cartItem.product.originalPrice - cartItem.product.price) * cartItem.quantity}</p>
                                </div>
                            </div>

                        </div>
                    )
                }) :
                    <div>
                        No Items Presenet In Cart
                    </div>}

            </div>

            <div style={{ width: "50vw" }}>
                <h3>My Bag ( {cart.item?.length} {cart.item?.length > 1 ? "items" : "item"} )</h3>
                <hr />
                <h5>Price Summary</h5>
                <h5>Subtotal: {subTotal}</h5>
                <p>-----------------------------------------------------------------------------------------------</p>
                <h5>Total MRP (Incl. of taxes):  {cartItems?.reduce((acc, curr) => {

                    acc += curr.product.originalPrice * curr.quantity

                    return acc
                }, 0)}</h5>
                <h5>Bag Discount: -{cartItems?.reduce((acc, curr) => {

                    acc += curr.product.originalPrice * curr.quantity

                    return acc
                }, 0) - subTotal} </h5>
                <h5>Delivery Fee: {deliveryFees}</h5>
                <hr />
                <h4>Total Amount: {totalAmount}</h4>

                <Link   to={ cartItems?.length === 0 ? "" : "/checkout"} ><button className="btn btn-primary" onClick={handleCheckoutBtn} disabled = {cartItems?.length === 0}>Proceed To Checkout</button></Link>
            </div>



        </div>
    )
}

export default Cart