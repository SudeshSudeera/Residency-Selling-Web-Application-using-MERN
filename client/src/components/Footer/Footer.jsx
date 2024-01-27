import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <section className='f-wrapper'>
        <div className="paddings innerWidth flexCenter f-container">
            {/* left side */}
            <div className="flexColStart f-left">
                <img src="./logo.png" alt="" width={120}/>

                <span>Our vision is to make all people <br />
                the best place to live for them.
                </span>
            </div>

            {/* right side */}
            <div className="f-right flexColStart">
                <span className='primaryText'>Information</span>
                <span className='secondaryText'>Old kurugama Road, Wellawaya.</span>

                <div className="flexColStart f-menu">
                    <span>Property</span>
                    <span>Services</span>
                    <span>Product</span>
                    <span>About Us</span>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Footer