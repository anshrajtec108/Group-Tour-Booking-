
import './Header.css'
function Header() {
  return (
 
    <div className='mainHeaderdiv'>
     <div className="leftdiv">
        <div className="logo">
         <span>LOGO</span>
        </div>
     </div>
     <div className="centerdiv">
        <div className="router">
            <span>Home</span>
            <span>Trips</span>
            <div>
            <input type="search" placeholder='search ' />
            </div>
            <span id="wish">💗</span>
            <span>About</span>
            
        </div>
     </div>
     <div className="rightdiv">
        <div className="loginIcon">
          
            <img src="./demouser.jpg" />
        </div>
     </div>
    </div>
  )
}

export default Header
