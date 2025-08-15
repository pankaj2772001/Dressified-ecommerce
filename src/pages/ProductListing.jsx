import { useContext, useEffect, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import { useParams } from "react-router"
import { Link } from "react-router"
import { GoHeartFill  } from "react-icons/go";
import { GoHeart  } from "react-icons/go";


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


    const filterProducts = products?.filter((items) => selectedCategory.includes(items.category) && items.section === sectionName) || []


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
        <div className="row py-4 mx-2">

            <div style={{ border: "1px solid black" }} className="p-3 col-md-3">

                <h3>Filter Side Bar</h3>
                <button onClick={handleBtn}>Clear Filters</button><br />

                <label>Category</label><br />

                {categories && categories?.map(category => <>

                    <input type="checkbox" onChange={handleCheckbox} value={category} checked={selectedCategory.includes(category)} /> {category} <br />
                </>)}

                <hr />

                <h3>Sort by</h3>
                <input type="radio" name="filterPrice" onChange={() => setSortType("asc")} checked={sortType === "asc"} /> Price -- Low to High<br />
                <input type="radio" name="filterPrice" onChange={() => setSortType("des")} checked={sortType === "des"} /> Price -- High to Low
                <label></label>
            </div>



            <div className="col-md-9">
                <div className="row">
                    
                    {sortedProducts?.map(prod => <div className="col-md-4 mb-5">
                        <div className="card">

                            <Link to={`/product/${prod._id}`}>

                                <div >
                                    <img src={prod.image} alt="" className="img-fluid border-bottom rounded-top" />
                                </div>
                                


                            </Link>

                            <div className="p-2 lh-lg">
                                {wishList.find((item) => item.product._id === prod._id) ? <GoHeartFill onClick={() => removeWishList(prod._id)} className="text-danger fs-3"/> : <GoHeart className="fs-3" onClick={() => handleAddtoWishList(prod._id)}/>}

                                
                            <div>{prod.section} {prod.title}</div>
                                <span><b>₹{prod.price}</b></span> <span><strike>₹{prod.originalPrice}</strike></span> <span><b>{prod.discountPercentage}% off</b></span>
                                
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