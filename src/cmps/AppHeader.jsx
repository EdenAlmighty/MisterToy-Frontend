import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { UserMsg } from "./UserMsg";
import { LoginSignup } from "./LoginSignup";
import { logout } from "../store/actions/user.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";


export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
console.log(user);
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }
    return(
        <header className="app-header full main-layout">
            <section className="header-container">
            <nav className="app-nav">
            <NavLink to="/"><h1 className="logo"><img src="/logo/MisterToys-logo.png" alt="" /></h1></NavLink>

            <NavLink to="/toy">Toys</NavLink>
            </nav>
            </section>
            
            {user ? (   
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup  />
                </section>
            )}

            <UserMsg />
        </header>
    )
}