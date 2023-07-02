import Wave from '../assets/waving.gif'
import './Waving.css'

function Waving({name}) {
    return ( <div className="waving">
        <img src={Wave} alt="Waving" />
        <h2>Welcome <span>{name}</span> </h2>
        <h2>Click on a chat Head to Get Started</h2>
    </div> );
}

export default Waving;