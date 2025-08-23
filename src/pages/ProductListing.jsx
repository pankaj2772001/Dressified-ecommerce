import { useContext, useEffect, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import { useParams } from "react-router"
import { Link } from "react-router"
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";


const ProductListing = () => {



    const { categoryName, sectionName } = useParams()



    const { products, addToWishList, findCategorie, wishList, removeWishList } = useContext(StoreProvider)

    const [selectedCategory, setSelectedCategory] = useState([categoryName])

    console.log(wishList)


    useEffect(() => {

        setSelectedCategory([categoryName])

    }, [categoryName])

    const [sortType, setSortType] = useState(null)


    const categories = findCategorie(sectionName)

    function handleCheckbox(e) {

        const { value, checked } = e.target

        if (checked) {
            setSelectedCategory((prev) => ([...prev, value]))
        } else {
            setSelectedCategory((prev) => prev.filter(item => item != value))
        }

    }



    function handleAddtoWishList(productId) {


        addToWishList(productId)


    }


    const filterProducts = selectedCategory.length === 0 ? products?.filter((item) => item.section === sectionName) : products?.filter((items) => selectedCategory.includes(items.category) && items.section === sectionName) || []



    const sortedProducts = [...filterProducts].sort((a, b) => {

        if (!sortType) {
            return 0
        } else {

            return sortType === "asc" ? a.price - b.price : b.price - a.price
        }
    })

    console.log(sortedProducts)

    function handleBtn() {

        setSortType(null)
        setSelectedCategory([categoryName])
    }





    return (
        <div className="row py-4 px-3 mx-3">

            <div className="col-md-3 mb-4">
                <div className="border border-2 p-3 rounded rounded-2">
                    <div className=" d-flex justify-content-between align-items-center">
                        <h3>Filters</h3>
                        <button className="btn border btn-sm" onClick={handleBtn}>Clear Filters</button>
                    </div>

                    <hr />

                    <h6>Categories</h6>

                    {categories && categories?.map(category => <>

                        <input type="checkbox" onChange={handleCheckbox} value={category} checked={selectedCategory.includes(category)} /> {category} <br />
                    </>)}

                    <hr />

                    <h6>Sort by Price</h6>
                    <input type="radio" name="filterPrice" onChange={() => setSortType("asc")} checked={sortType === "asc"} /> Low to High<br />
                    <input type="radio" name="filterPrice" onChange={() => setSortType("des")} checked={sortType === "des"} /> High to Low
                </div>

            </div>



            <div className="col-md-9">
                <div className="row">

                    {sortedProducts?.map(prod => <div className="col-md-4 mb-5">
                        <div className="card" >

                            <Link to={`/product/${prod._id}`}>

                                <div>
                                    <img src={prod.image} alt="" className="img-fluid border-bottom rounded-top h-100 w-100" style={{ objectFit: "cover" }} />
                                </div>



                            </Link>

                            <div className="p-3 lh-lg d-flex justify-content-between ">

                                <div>
                                    <div>{prod.section} {prod.title}</div>
                                    <div>
                                        <span><b>₹{prod.price}</b></span> <span><strike>₹{prod.originalPrice}</strike></span> <span><b>{prod.discountPercentage}% off</b></span>
                                    </div>

                                </div>

                                <div className="mt-4">
                                    {wishList?.find((item) => item.product?._id === prod._id) ? <GoHeartFill onClick={() => removeWishList(prod._id)} className="text-danger fs-2" /> : <GoHeart className="fs-2" onClick={() => handleAddtoWishList(prod._id)} />}
                                </div>





                            </div>

                        </div>
                    </div>
                    )}
                </div>
            </div>



        </div>
    )
}



export default ProductListing