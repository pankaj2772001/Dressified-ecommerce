import { useContext, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import { Link, useNavigate } from "react-router"


const CheckOut = () => {


    const { address, cart, checkOutItems, setCheckOutItems, checkOut, removeCartItem, notify } = useContext(StoreProvider)

    const [orderPlace, setOrderPlace] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()




    async function checkOutHandler() {

        if (!checkOutItems.address) {

            notify("Please select address for checkout")
            return;
        }

        setLoading(true)
        const response = await checkOut(checkOutItems)

        if (response.ok) {
            setLoading(false)
            setOrderPlace(true)
            notify("Order Placed!!")

            setTimeout(() => {

                navigate("/cart")
                
                
            }, 5000);
            cart.item?.map(cartId => { removeCartItem(cartId._id) })
            
        }


    }

    console.log(checkOutItems)

    const subTotal = cart.item?.reduce((acc, curr) => {

        acc += curr.product.price * curr.quantity

        return acc
    }, 0)


    return (

        <div className="mx-5">

            <h3 className="text-center my-5">Checkout</h3>

            {orderPlace ? <div className="text-center"><h2>Order Placed Successfully</h2></div> : <div className="row gap-5">


                <div className="col-md-4">



                    <h4 className="mb-3">Select Shipping Address</h4>
                    {
                       address.length > 0 ? address?.map(add => <div className="p-4 shadow-sm border rounded-2 "><input type="radio" name="selectAddress" onClick={() => setCheckOutItems(prev => ({ ...prev, address: add._id }))} /> <span>{add.fullName + ", " + add.add1 + ", " + add.add2 + ", " + add.city + ", " + add.pincode}</span></div>) : null
                    }

                    <Link className="btn btn-secondary mt-3 " to={"/user"}>+ Add New Address</Link>
                </div>


                <div className="col-md-7">

                    <div className="border shadow-sm rounded-3 p-4">

                        <h4>Order Summary</h4>

                        <hr />

                        <div className="d-flex justify-content-between">
                            <h6>Items</h6>
                            <h6>Quantity</h6>
                        </div>

                        <div >
                            {
                                cart.item?.map(cartItem => <>

                                    <div className="d-flex justify-content-between">

                                        <p>{cartItem.product.section} {cartItem.product.title}</p>
                                        <p>{cartItem.quantity}</p>

                                    </div>


                                </>)
                            }
                          
                        </div>

                        <hr />

                        <h5>Price Details</h5>

                        <div className="d-flex justify-content-between"><p>Total MRP (Incl. of taxes) </p> <p>₹{cart.item?.reduce((acc, curr) => {

                            acc += curr.product.originalPrice * curr.quantity

                            return acc
                        }, 0)}</p></div>
                        <div className="d-flex justify-content-between"><p>Bag Discount</p> <p>-₹{cart.item?.reduce((acc, curr) => {

                            acc += curr.product.originalPrice * curr.quantity

                            return acc
                        }, 0) - subTotal} </p></div>


                        <hr />

<li className="d-flex justify-content-between">

                                        <b>Grand Total </b>
                                        <b>₹ {checkOutItems.totalAmount}</b>

                                    </li>

                                    <hr />

                                    
                       
<button className="w-100 btn btn-primary" onClick={checkOutHandler} disabled={checkOutItems.cartItems.length === 0} >{loading ? "Placing Order..." : "Place Order"}</button>



                    </div>

                    





                    



                </div>







            </div>}



        </div>
    )
}

export default CheckOut