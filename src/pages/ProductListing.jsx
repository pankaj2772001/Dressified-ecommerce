import { useContext, useEffect, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import { useLocation, useParams } from "react-router"
import { Link } from "react-router"
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";


const ProductListing = () => {

      window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}




    const { sectionName, categoryName } = useParams()


    const { products, addToWishList, findCategorie, wishList, removeWishList } = useContext(StoreProvider)


    const [selectedCategory, setSelectedCategory] = useState([])

    const [range, setRange] = useState(0)

    console.log(range)

  

    useEffect(() => {

        if (categoryName) {

            setSelectedCategory([categoryName])

        } else {
            setSelectedCategory([])
        }


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


    const filterProducts = selectedCategory.length === 0 ? products?.filter((item) => item.section === sectionName) : products?.filter((items) => selectedCategory.includes(items.category) && items.section === sectionName)


    const filterByPrice =  range !== 0 ? filterProducts?.filter((item) =>  item.price <= range) : filterProducts

    console.log(filterByPrice)




    const sortedProducts = filterByPrice ? [...filterByPrice]?.sort((a, b) => {

        if (!sortType) {
            return 0
        } else {

            return sortType === "asc" ? a.price - b.price : b.price - a.price
        }
    }) : []

    console.log(sortedProducts)

    function handleBtn() {

        setSortType(null)
        setSelectedCategory([])
        setRange(0)
    }





    return (
        <div className="row mx-4 mt-4">

            <div className="col-md-3  mb-4">
                <div className="border border-2 p-3 shadow-sm rounded rounded-2">
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

                    <hr />


                    <div>
                            <label for="range2" class="form-label"><h6>Price</h6></label>
<input type="range" className="form-range" min="0" max="5000" id="range2" step="200" value={range}  onChange={(e) => setRange(e.target.value)}></input>
<output for="range4" id="rangeValue" aria-hidden="true" >{range}</output>

                    </div>
                    
                </div>

            </div>



            <div className="col-md-9 ">
                <div className="row">

                    {sortedProducts?.map(prod => <div className="col-md-4 mb-4">
                        <div className="card shadow-sm" >

                            <Link to={`/product/${prod._id}`}>

                                <div>
                                    <img src={prod.image} alt="" className="img-fluid border-bottom rounded-top" style={{ objectFit: "contain", width: "100%", height: "380px" }} />
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
                                    {wishList?.find((item) => item.product?._id === prod._id) ? <GoHeartFill style={{cursor: "pointer"  }} onClick={() => removeWishList(prod._id)} className="text-danger fs-2" /> : <GoHeart style={{cursor: "pointer"  }} className="fs-2"  onClick={() => handleAddtoWishList(prod._id)} />}
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