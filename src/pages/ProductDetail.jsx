import { useContext } from "react"
import { useParams } from "react-router"
import StoreProvider from "../contexts/StoreProvider"
import { useState } from "react"

const ProductDetail = () => {

    const {productId} = useParams()

    const {products, addToCart, size, setSize} = useContext(StoreProvider)


    

    

    const productDetail = products?.find(prod => prod._id === productId)

    console.log(productDetail)



    return(
       
            <div className="container">
                {productDetail && <div className="d-flex">
                    <div style={{width: "50vw"}}>
                        <img src={productDetail.image} alt="" />
                    </div>
                    <div style={{width: "40vw"}}>
                    <h4>{productDetail.brand}</h4>
                    <p>{productDetail.title}</p>
                    <hr />
                    <span><h5 style={{display: "inline"}}>₹ {productDetail.price}</h5> &nbsp;MRP <strike>₹{productDetail.originalPrice}</strike> &nbsp;<h5 style={{display: "inline"}}>({productDetail.discountPercentage}% OFF)</h5> </span>

                    
                    <div className="mt-4">
                        <h6>Please select a size.</h6>
                        <p className="mt-3">
                            {productDetail.sizes?.map(size => <button onClick={() => setSize(size)}  className="me-3  rounded-5" style={{width: "40px", height: "40px"}}>{size}</button>)}
                        </p>
                        
                    </div>
                    <button onClick={() => addToCart(productDetail._id, size)}>Add to cart</button>
                
                    </div>
                
                </div>} 
              
            </div>
            
        
    )
}

export default ProductDetail