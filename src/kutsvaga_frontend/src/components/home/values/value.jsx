import {Accordion, 
    AccordionItem, 
    AccordionItemHeading, 
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import './value.css'
import data from './accordion'
import {MdOutlineArrowDropDown} from 'react-icons/md'
function Value(){
    return(
        <section className="v-wrapper">
            <div className="paddings innerWidth flexCenter v-container">
                <div className="v-left">
                    <div className="image-container">
                        <img src="/cur.jpg" alt="" />
                    </div>
                </div>
                <div className="v-right flexColStart">
                    <span className="orangeText">Our Value</span>
                    <span className="primaryText">Value we give to you</span>
                    <span className="secondaryText">
                        We always ready to help by providing the best service for you
                        <br />
                        Either AGENT or CLIENT brace to be pleased
                    </span>
                    <Accordion>
                        {
                            data.map((item, i) => (
                                <AccordionItem className='accordionItem' key={i} uuid={i}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton className='flexCenter accordionButton'>
                                            <div className="icon flexCenter"> {item.icon} </div>
                                            <span className="primaryText">
                                                {item.heading}
                                            </span>
                                            <div className="icon flexCenter">
                                                <MdOutlineArrowDropDown size={35} />
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p className="secondaryText">
                                            {item.detail}
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
export default Value