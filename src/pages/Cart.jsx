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
        <div className="d-flex justify-content-evenly row mt-5">

            <div  className=" col-md-6">
                {cartItems && cartItems.length > 0 ? cartItems?.map(cartItem => {

                    return (
                        
                            <div className="row border m-3">

                                <div className="card col-md-6">

                                    <img src={cartItem.product.image} alt="" className="img-fluid" />


                                </div>
                                <div className="col-md-6">
                                    <button onClick={() => removeCartItem(cartItem._id)}>Remove From Cart</button>
                                    <button onClick={() => handleMoveToWishlist(cartItem.product._id, cartItem._id)}>Move To Wishlist</button>
                                    <div>Qty: <button onClick={() => updateCartItemQty(cartItem._id, "decreement")}>-</button>{cartItem.quantity}<button onClick={() => updateCartItemQty(cartItem._id, "increement")}>+</button></div>
                                    <p>Price: {cartItem.product.price * cartItem.quantity}</p>
                                    <p><strike>{cartItem.product.originalPrice * cartItem.quantity}</strike></p>
                                    <p>You saved {(cartItem.product.originalPrice - cartItem.product.price) * cartItem.quantity}</p>
                                </div>
                            </div>

                        
                    )
                }) :
                    <div>
                        <h5>🛒 Cart is Empty! Please Add Products</h5>
                    </div>}

            </div>

            <div className="col-md-4">

                <div className="card p-4">
                    <h3>My Bag ( {cart.item?.length} {cart.item?.length > 1 ? "items" : "item"} )</h3>
                <hr />
                <h5>Price Summary</h5>
                <h5>Subtotal: {subTotal}</h5>
                <hr />
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



        </div>
    )
}

export default Cart