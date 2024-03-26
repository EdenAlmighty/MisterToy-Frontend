import { NavLink } from "react-router-dom";


export function AppHeader() {

    return(
        <header className="app-header full main-layout">
            <section className="header-container">
            <nav className="app-nav">
            <h1 className="logo">Logo</h1>
            <NavLink to="/toy">Home</NavLink>
            </nav>
            </section>
        </header>
    )
}