


import mens from '../assets/mens.jpg'
import womens from '../assets/womens.jpg'
import kids from '../assets/kids.jpg'
import { useNavigate } from 'react-router'

const Home = () => {


    const navigate = useNavigate()


    return (

        < main className='text-center py-3'>
<div className='container '>
    <div id="carouselExampleRide" className='carousel slide' data-bs-ride="true">
                <div className='carousel-inner'>

                    <div className='carousel-item active'>
                        <img src="https://placehold.co/1200x400?text=First+Image" alt="First-Image" className='img-fluid d-block w-100 rounded-4' />
                    </div>
                    <div className='carousel-item'>
                        <img src="https://placehold.co/1200x400?text=Second+Image" alt="Second-Image" className='img-fluid d-block w-100 rounded-4' />
                    </div>
                    <div className='carousel-item'>
                        <img src="https://placehold.co/1200x400?text=Third+Image" alt="Third-Image" className='img-fluid d-block w-100 rounded-4' />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <h2 className='my-4 text-info'>SHOP IN</h2>


            <div className='row'>


                <div className='col-md-4 my-3'>
                
                               <div> <img src={mens} alt="" height={"250px"} width={"400px"} className='img-fluid mb-5 rounded-4' /></div>
                    <button onClick={() => navigate("/section/Mens")} className='px-5 py-1 btn-primary rounded'>Shop For Men</button>
                    
            
                </div>

                <div className='col-md-4 my-3'>
                    <div>
                        <img src={womens} alt="" height={"250px"} width={"400px"} className='img-fluid mb-5  rounded-4' />
                    </div>
                    
                    <button onClick={() => navigate("/section/Womens")} className='px-5 py-1 btn-primary rounded'>Shop For Women</button>
                </div>

                <div className='col-md-4 my-3'>
                    <div>
                        <img src={kids} alt="" height={"250px"} width={"400px"} className='img-fluid mb-5  rounded-4'  />
                    </div>
                    
                    <button onClick={() => navigate("/section/Kids")} className='px-5 py-1 btn-primary rounded'>Shop For Kid</button>
                </div>
            </div>

</div>
            





        </main>
    )

}


export default Home