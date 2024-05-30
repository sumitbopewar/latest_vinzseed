import React, { useEffect, useContext} from 'react';
import Slider from "react-slick";
import './index.css';

import Slide1 from '../../../assets/images/newbanner1.jpg';
import Slide2 from '../../../assets/images/slider-2.png';
import Button from '@mui/material/Button';

import Newsletter from '../../../components/newsletter';

import { MyContext } from '../../../App';

const HomeSlider = () => {

    const context = useContext(MyContext);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: context.windowWidth>992 ? true : false,
        autoplay:true
    };



    return (
        <section className='homeSlider'>
            <div className='container-fluid position-relative'>
                <Slider {...settings} className='home_slider_Main'>
                    <div className="item">
                        <img src="https://cdn.pixabay.com/photo/2021/08/08/22/41/flowers-6532105_1280.jpg" className='w-100' />
                        <div className='info'>
                            <h2 class="mb-4">
                                Together We Can <br />
                                Restore The Planet.
                            </h2>
                            {/* <p>Sign up for the daily newsletter</p> */}
                        </div>
                    </div>
                    <div className="item">
                        <img src={Slide2} className='w-100' />
                        <div className='info'>
                            <h2 class="mb-3">
                               We Know You love <br />
                                Tree Just Like Us
                            </h2>
                            {/* <p>Sign up for the daily newsletter</p> */}
                        </div>
                    </div>
                </Slider>

                {/* {
                    context.windowWidth>992 && <Newsletter/>
                } */}
                

            </div>
        </section>
    )
}

export default HomeSlider;