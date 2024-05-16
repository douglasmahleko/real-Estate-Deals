import './hero.css'
import CountUp from 'react-countup'

function Hero({login, isAuthenticated, usersCount, agentsCount, houseCount}){
    return(
        <section className="herowrapper">
            <div className="paddings innerWidth flexCenter herocontainer">

                <div className="flexColStart heroleft">
                    <div className="hero-title">
                        <h1>
                            WELCOME <br />
                            TO <br /> Kutsvaga
                        </h1>
                    </div>
                    <div className="flexColStart hero-des">
                        <span className='secondaryText'>Find a HOUSE on Kutsvaga with cheap transactions of digital currency</span>
                        <span className='secondaryText'>Find a CLIENT on Kutsvaga By uploading the houses on Kutsvaga and get paid</span>
                        <span className='secondaryText'>Forget all difficulties in using banks and expenses</span>
                        <span className='secondaryText'>To Register or Login CLICK Login</span>
                        <span className='secondaryText'>You can register as CLIENT or AGENT</span>
                    </div>
                    <div className="search-bar">
                        { !isAuthenticated ? ( <button onClick={() => login()} className="button">Login</button> ) : ( null ) }
                    </div>
                    <div className="stats flexCenter">
                        <div className="stat flexColCenter">
                            <span>
                                <CountUp start={0} end={agentsCount > 0 ? agentsCount : 35 } duration={4} />
                                <span>+</span>
                            </span>
                            <span className='secondaryText'>Number of Agents</span>
                        </div>
                        <div className="stat flexColCenter">
                            <span >
                                <CountUp start={0} end={usersCount > 0 ? usersCount : 45} duration={4} />
                                <span>+</span>
                            </span>
                            <span className='secondaryText'>Number of Clients</span>
                        </div>
                        <div className="stat flexColCenter">
                            <span>
                                <CountUp start={0} end={houseCount > 0 ? houseCount : 55} />
                                <span>+</span>
                            </span>
                            <span className='secondaryText'>Houses Under Advertisement</span>
                        </div>
                    </div>
                </div>
                <div className="flexCenter heroright">
                    <div className="image-container">
                        <img src="/imba.jpg" alt="house" />
                    </div>
                </div>

            </div>
        </section>
        )
}
export default Hero