import { useContext, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import { Link } from "react-router"

const Wishlist = () => {


    const { wishList, removeWishList, addToCart } = useContext(StoreProvider)


    const [selectedItem, setSelectedItem] = useState(null)

    console.log(wishList)


    const handleAddToCartClick = (item) => {


        setSelectedItem(item)


    }

    const handleSizeAndCart = (selectedSize) => {



        addToCart(selectedItem.product._id, selectedSize)

        

        removeWishList(selectedItem.product._id)

        

    }

    return (
        <div className="position-relative">
            <h4 className="text-center">My Wishlist</h4>

            <div className=" row mx-4">

                {
                    wishList?.map(item => {

                        return (


                            <div className="col-md-3 mb-4">

                                <div className="shadow-sm">

                                    <Link to={`/product/${item.product._id}`}>
                                        <img src={item.product.image} alt="" className="w-100 " style={{ objectFit: 'contain', height: "420px" }} />
                                    </Link>

                                    <div className="text-center p-2">
                                        <p>{item.product.section} {item.product.brand} {item.product.title}</p>
                                        <h4>₹{item.product.price}</h4>
                                    </div>

                                    <div className="px-2 pb-2">
                                        <button className="w-100 mb-2 p-2 btn-secondary btn" onClick={() => removeWishList(item.product._id)}>Remove From WishList</button>
                                    <button className="w-100 p-2 btn-secondary btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={() => handleAddToCartClick(item)}>Move To Cart</button>
                                    </div>

                                    


                                </div>

                            </div>




                        )
                    })
                }

            </div>
            { <div className=" text-center offcanvas offcanvas-top px-4" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  
  <div className="offcanvas-body">
    

    <h3 className="toffcanvas-title" id="offcanvasExampleLabel">Choose your perfect fit!</h3>
    <hr />

    {wishList?.map(item => {

                     return (

                           <>

                               {
                                    item?._id === selectedItem?._id && <div>

                                        {item.product?.sizes.map(size => {

                                             return (
                                               <>

                                                   <button data-bs-toggle="offcanvas" className="mx-2 px-3 py-1 rounded-3" onClick={() => handleSizeAndCart(size)}>{size}</button>
                                                    
                                                </>

                                             )
                                         })}

                                   </div>
                                }


                           </>


                       )
                   })}
    
    
  </div>
</div>



                // <div className="border z-3 text-center position-absolute top-50 start-50 p-5 row">

                //     {wishList?.map(item => {

                //         return (

                //             <>

                //                 {
                //                     item._id === selectedItem._id && <div>

                //                         {item.product?.sizes.map(size => {

                //                             return (
                //                                 <>

                //                                     <button onClick={() => handleSizeAndCart(size)}>{size}</button>
                                                    


                //                                 </>

                //                             )
                //                         })}

                //                     </div>
                //                 }


                //             </>


                //         )
                //     })}

                //     <button onClick={() => setPromptVisible(false)}>Cancel</button>



                // </div>
            }

            


        </div>



    )
}

export default Wishlist