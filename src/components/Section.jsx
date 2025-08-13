
import { useNavigate } from "react-router"

const Section = () => {

    const navigate = useNavigate()

    function handleClick(sectionName){

      navigate(`/section/${sectionName}`)

    }

    return (
              
        <div className="d-flex justify-content-evenly">

            <div onClick={() => handleClick("Mens")}>
                Mens
            </div>
            <div onClick={() => handleClick("Womens")}>
                Womens
            </div>
            <div onClick={() => handleClick("Kids")}>
                Kids
            </div>

        </div>
                       
            
    )
}

export default Section