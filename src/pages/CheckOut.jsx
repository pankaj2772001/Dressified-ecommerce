import { useContext, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"


const CheckOut = () => {


    const {address, cart, checkOutItems, setCheckOutItems, checkOut, removeCartItem, notify} = useContext(StoreProvider)

    const [orderPlace, setOrderPlace] = useState(false)
    const [loading, setLoading] = useState(false)

    


    async function checkOutHandler(){

        if(!checkOutItems.address){

            notify("Please select address for checkout")
            return;
        }

        setLoading(true)
        const response = await checkOut(checkOutItems)

        if(response.ok){
            setLoading(false)
            setOrderPlace(true)
            notify("Order Placed!!")
            cart.item?.map(cartId => {removeCartItem(cartId._id)})
        }
        
        
    }


    return(
        
        <>

        {orderPlace ? "Order Places Successfully"  : <div>

            <h3>Checkout</h3><br />

        <h4>Select Shipping Address</h4>
        {
            address.map(add => <div><input type="radio" name="selectAddress" onClick={() => setCheckOutItems(prev => ({...prev, address: add._id}))}/> <span>{add.fullName + ", " + add.add1 + ", " + add.add2 + ", " + add.city + ", " + add.pincode}</span></div>)
        }

        <br />

        <h4>Order Summary</h4>
        <ul>
            {
            cart.item?.map(cartItem => <li>

                <p>{cartItem.product.title + " x " + cartItem.quantity}</p>

            </li>)
        }
        <li><b>Total: {checkOutItems.totalAmount}</b></li>
        </ul>
        

        <button onClick={checkOutHandler} disabled = {checkOutItems.cartItems.length === 0} >{loading ? "Placing Order..." : "Checkout"}</button>
        

            
            </div>}
        
       
        
        </>
    )
}

export default CheckOut