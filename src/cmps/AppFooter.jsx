export function AppFooter() {

    return (
        <div className="pg-footer">
            <footer className="footer">

                <svg className="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <path className="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
                </svg>

                <div className="footer-content">
                    <div className="footer-content-column">
                        <div className="footer-logo">
                            <img className="logo" srcSet="/logo/MisterToys-logo.png" alt="" />
                        </div>
                    </div>

                    <div className="footer-content-column">
                        <div className="footer-call-to-action">
                            <h2 className="footer-call-to-action-title"> Let's Chat</h2>
                            <p className="footer-call-to-action-description"> Have a support question?</p>
                            <a className="btn" href="#" target="_self"> Get in Touch </a>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <div className="footer-copyright-wrapper">
                        <p className="footer-copyright-text">
                            2024 | Designed By: Eden Gilady. | All rights reserved.
                        </p>
                    </div>
                </div>

            </footer>
        </div>
    )
}