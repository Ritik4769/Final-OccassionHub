import img from '../../images/6.jpg';
import { Link } from 'react-router-dom';
import jscookie from 'js-cookie';
import concrt from '../../images/concrt.jpg';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


// import RequirmentForm from './RequirmentForm';

function Organise() {
    const navigate = useNavigate();

    const  checkLogin = ()=>{

    var status = jscookie.get("user");
    
        if(status == undefined){
            Swal.fire({
                background: "black",
                icon: "error",
                text: "First Login ",
                showCloseButton: true,
                focusConfirm: false,
            });
        }else{
            navigate('/eventRequest');
        }
    }

    return (<>
        <div className="pt-5 pb-5" style={{ background: `url(${concrt})`, backgroundPosition: "center", backgroundAttachment: 'fixed', marginTop: '-5%' }}>
            <div className="container text-white text-center">
                <h3><span className="webcolor">Let's Make </span> Your Event<br /> Memorable</h3>
                <h5 className="mt-4">Elevate Your Experience with Our Spectacular <br /> Events!"</h5>
                <button className="ourbtn mt-2">
                        <span onClick={checkLogin} >Organise Your Event</span>
                </button>
            </div>
        </div>
    </>);
}

export default Organise;