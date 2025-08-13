import { useContext, useEffect, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import {useParams } from "react-router"
import { Link } from "react-router"


const ProductListing = () =>{

    

    const {categoryName, sectionName} = useParams()

    const {products, addToWishList, findCategorie} = useContext(StoreProvider)

    const [selectedCategory, setSelectedCategory] = useState([categoryName])

    console.log(selectedCategory)

    const [sortType, setSortType] = useState(null)

    const product = products?.filter((prod) => prod.category === categoryName)

    const categories = findCategorie(sectionName)

    console.log(selectedCategory)

    function handleCheckbox(e){

        const {value, checked} = e.target

        if(checked){
            setSelectedCategory((prev) => ([...prev, value]))
        }else{
            setSelectedCategory((prev) => prev.filter(item => item != value))
        }

    }

    function handleAddtoWishList(productId){

        addToWishList(productId)


    }


    const filterProducts = products?.filter((items) => selectedCategory.includes(items.category) && items.section === sectionName) || []


    const sortedProducts = [...filterProducts].sort((a, b) => {

        if(!sortType){
            return 0
        }else{

            return sortType === "asc" ? a.price - b.price : b.price - a.price
        }
    })

    console.log(sortedProducts)

    function handleBtn(){

        setSortType(null)
        setSelectedCategory([categoryName])
    }
   

    

    return(
        <div className="d-flex p-3">

            <div style={{width: "30vw", border: "1px solid black"}}>
                
                <h3>Filter Side Bar</h3>
                <button onClick={handleBtn}>Clear Filters</button>

                <label>Category</label><br />

                {categories && categories?.map(category => <>
                
                <input type="checkbox" onChange={handleCheckbox} value={category} checked={selectedCategory.includes(category)}/> {category} <br />
                </>)}

                    <hr />
                <input type="checkbox" />Mens<br />
                <input type="checkbox" />Womens<br />
                <input type="checkbox" />Kids<br />
                
                    <hr />

                <h3>Sort by</h3>
                <input type="radio" name="filterPrice" onChange={() => setSortType("asc")} checked={sortType === "asc"}/> Price -- Low to High<br />
                <input type="radio" name="filterPrice" onChange={() => setSortType("des")} checked={sortType === "des"}/> Price -- High to Low
                <label></label>
            </div>



            <div className="row mx-2">
                {sortedProducts?.map(prod => <div className="col-md-4">
                    <div className="card">

            <Link to={`/product/${prod._id}`}>

            <div className="card m-2" >
                <img src={`https://placehold.co/400x260?text=${prod.title}`} alt="" />
                
                
            </div>
            
            
            </Link>

            <div className="p-2 text-center">
                <button onClick={() => handleAddtoWishList(prod._id)}>Add To WishList</button>
                <h5>price {prod.price}</h5>
                </div>
        </div>
                </div> 
        )}
            </div>
        
        
        </div>
    )
}



export default ProductListing