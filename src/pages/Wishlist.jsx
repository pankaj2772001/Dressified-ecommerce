import { useContext, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import { Link } from "react-router"

const Wishlist = () => {


    const {wishList, removeWishList, addToCart}= useContext(StoreProvider)

    const [isPromptVisible, setPromptVisible] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null)

    console.log(wishList)


    const handleAddToCartClick = (item) => {


          setSelectedItem(item)

        setPromptVisible(true)

    }

    const handleSizeAndCart = (selectedSize) => {

        

        addToCart(selectedItem.product._id, selectedSize)

        setPromptVisible(false)

        removeWishList(selectedItem.product._id)

    }

    return(
        <div>

{
    wishList?.map(item => {

        console.log(item)


        return(
            <div>
               <Link to={`/product/${item.product._id}`}>
               <p>{item.product.title}</p>
               </Link>
               <button  onClick={() => removeWishList(item.product._id)}>Remove From WishList</button>
               <button onClick={() => handleAddToCartClick(item)}>Add To Cart</button>

               {
                    isPromptVisible && item._id === selectedItem._id && <div className="text-center">

                            {item.product.sizes.map(size => {

                                return(

                                    <button onClick={() => handleSizeAndCart(size)}>{size}</button>
                                )
                            })}
                        
                    </div>
               }

               
               
                
            </div>
        )
    })
}
        

        <div className="border m-5 p-5 rounded">

            hii
        </div>
        </div>

        
    )
}

export default Wishlist