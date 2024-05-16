import { HiChat, HiChatAlt, HiOutlineVideoCamera, HiPhoneMissedCall } from 'react-icons/hi'
import './contact.css'
import { MdAlternateEmail } from "react-icons/md";

function Contact(){
    return(
        <div>
            <section className="c-wrapper">
                <div className="paddings innerWidth flexCenter c-container">
                    <div className="flexColStart c-left">
                        <span className="orangeText">Our Contacts</span><br/>
                        <span className="primaryText">Easy to contact Us</span><br/>
                        <span className="secondaryText">For More Info Contact Us</span>

                        <div className="contactModes flexColStart">
                            <div className="row flexStart">
                                <div className="mode flexColCenter">
                                    <div className="flexStart">
                                        <div className="icon flexCenter">
                                            <HiPhoneMissedCall size={25} />
                                        </div>
                                        <div className="detail flexColStart">
                                            <span className='primaryText'>Call</span>
                                            <span className='secondaryText'>+263776477847</span>
                                        </div>
                                    </div>
                                    <div className="button flexCenter">
                                        You Can Call Now
                                    </div>
                                </div>
                                <div className="mode flexColCenter">
                                    <div className="flexStart">
                                        <div className="icon flexCenter">
                                            <HiChatAlt size={25} />
                                        </div>
                                        <div className="detail flexColStart">
                                            <span className='primaryText'>Message</span>
                                            <span className='secondaryText'>+263776477847</span>
                                        </div>
                                    </div>
                                    <div className="button flexCenter">
                                    You Can Message Now
                                    </div>
                                </div>
                            </div>
                            <div className="row flexStart">
                                <div className="mode flexColCenter">
                                    <div className="flexStart">
                                        <div className="icon flexCenter">
                                            <MdAlternateEmail size={25} />
                                        </div>
                                        <div className="detail flexColStart">
                                            <span className='primaryText'>Email</span>
                                            <span className='secondaryText'>douglasmahleko@gmail.com</span>
                                        </div>
                                    </div>
                                    <div className="button flexCenter">
                                    <a href="mailto:douglasmahleko@gmail.com">You Can Email Now</a>
                                    </div>
                                </div>
                                <div className="mode flexColCenter">
                                    <div className="flexStart">
                                        <div className="icon flexCenter">
                                            <HiChat size={25} />
                                        </div>
                                        <div className="detail flexColStart">
                                            <span className='primaryText'>Chart</span>
                                            <span className='secondaryText'>+263776477847</span>
                                        </div>
                                    </div>
                                    <div className="button flexCenter">
                                        You Can WhatsApp Now
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="c-right">
                        <div className="image-container">
                            <img src='/hous.jpg' alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Contact