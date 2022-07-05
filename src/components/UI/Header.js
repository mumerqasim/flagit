import Classes from './Header.module.css';
import Button from './Button'

 const Header  = props => {
    return(
        <nav className={Classes.Nav}>
            <h1>Flagit.</h1>
            {/* <Button config={{type:"button", className:Classes.LoginButton}} text="Login"/> */}
        </nav>
    )
 }

 export default Header;