import { useContext } from "react"
import { useParams } from "react-router"
import StoreProvider from "../contexts/StoreProvider"
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import secure from "../assets/secure.png"
import dreturn from "../assets/return.png"
import original from "../assets/original.png"
import { RiShoppingBag2Line } from "react-icons/ri";


const ProductDetail = () => {

    const { productId } = useParams()

    const { products, addToCart, size, setSize, addToWishList, wishList, removeWishList } = useContext(StoreProvider)






    const productDetail = products?.find(prod => prod._id === productId)

    console.log(productDetail)



    return (

        <div className="container my-2">
            {productDetail && <div className="row" >
                <div className="col-md-5 my-3">
                    <img src={productDetail.image} alt="" className="img-fluid " />
                </div>
                <div className="col-md-7 my-3">

                    <div className="mx-2">
                        <h4>{productDetail.brand}</h4>
                        <p>{productDetail.title}</p>
                        <hr />
                        <span><h5 style={{ display: "inline" }}>₹{productDetail.price}</h5> &nbsp;<span><strike className="text-dark text-opacity-75">₹{productDetail.originalPrice}</strike></span> &nbsp;<h5 className="text-danger" style={{ display: "inline" }}>({productDetail.discountPercentage}% OFF)</h5> </span>


                        <div className="mt-4">
                            <h6>Please select a size.</h6>
                            <p className="mt-3">
                                {productDetail.sizes?.map(siz => <button onClick={() => setSize(siz)} className={`me-3 rounded-4 ${siz === size ? "bg-secondary" : "bg-light"}`} style={{ width: "40px", height: "40px" }}>{siz}</button>)}
                            </p>
                        </div>


                    </div>
                    <div className="row mx-1">
                        <span className="me-2 btn border py-2 px-5 bg-primary " onClick={() => addToCart(productDetail._id, size)}> <RiShoppingBag2Line /> ADD TO BAG</span>


                        {wishList?.find((item) => item.product?._id === productDetail._id) ?
                            <span onClick={() => removeWishList(productDetail._id)} className=" border btn py-2 px-5 mt-2"><GoHeartFill className="text-danger" /> WISHLISTED</span> :

                            <span onClick={() => addToWishList(productDetail._id)} className=" border btn py-2 px-5 mt-2"><GoHeart /> WISHLIST</span>}




                    </div>


                    <div className="mx-2">
                        <hr />
                        <h5>Description:</h5>
                        <ul className="list-group shadow-sm">

                            {productDetail.description?.map(desc => <li className="list-group-item">
                                {desc}
                            </li>)}
                        </ul>

                        <hr />

                        <div className="d-flex justify-content-between text-center mx-3">
                            <div>
                                <img src={secure} alt="" className="img-fluid" width={"50rem"} height={"50rem"} />
                                <p>100% SECURE<br />PAYMENT</p>
                            </div>
                            <div >
                                <img src={dreturn} alt="" className="img-fluid" width={"50rem"} height={"50rem"} />
                                <p>EASY RETURNS &<br />INSTANT REFUNDS</p>
                            </div>
                            <div>
                                <img src={original} alt="" className="img-fluid" width={"50rem"} height={"50rem"} />
                                <p>100% GENUINE<br />PRODUCT</p>
                            </div>
                        </div>

                    </div>






                </div>

            </div>}

        </div>


    )
}

export default ProductDetail