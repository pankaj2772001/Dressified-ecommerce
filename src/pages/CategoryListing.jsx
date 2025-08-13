import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router"
import StoreProvider from "../contexts/StoreProvider"

const CategoryListing =()=>{

    const {sectionName} = useParams()

    const {findCategorie}  = useContext(StoreProvider)

    const navigate = useNavigate()

    

    const uniqueCategories = findCategorie(sectionName)
    


    function handleClick(cate){

        navigate(`/section/${sectionName}/category/${cate}`)
    }

    

    return(
        <div className="row mx-4">

        {uniqueCategories.map((cate => <div className="col-md-4 g-5">
            
                <div className="card" onClick={() => handleClick(cate)}>
                    <img src={`https://placehold.co/400x260?text=${cate}`} alt={`${cate}`} />
                </div>
                
            
            
        </div> ))}
        
        </div>
    )
}

export default CategoryListing
