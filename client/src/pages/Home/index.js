import React, { useState, useEffect, useRef, useContext } from 'react';
import SliderBanner from './slider/index';
import CatSlider from '../../components/catSlider';
import Banners from '../../components/banners';
import './style.css';
import Product from '../../components/product';
import axios from 'axios';
import { MyContext } from '../../App';

const Home = ({ data }) => {
    const [prodData, setProdData] = useState(data);
    const [catArray, setCatArray] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [activeTabData, setActiveTabData] = useState([]);
    const [bestSells, setBestSells] = useState([]);
    const productRow = useRef();
    const context = useContext(MyContext);

    const settings = {
        dots: false,
        infinite: context.windowWidth >= 992,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: context.windowWidth >= 992,
    };

    useEffect(() => {
        if (prodData.length) {
            const categories = Array.from(new Set(prodData.flatMap(item => item.items.map(subItem => subItem.cat_name))));
            setCatArray(categories);
            setActiveTab(categories[0]);
        }
        window.scrollTo(0, 0);
    }, [prodData]);

    useEffect(() => {
        if (activeTab) {
            const filteredData = prodData.flatMap(item => item.items)
                .filter(subItem => subItem.cat_name === activeTab)
                .flatMap(subItem => subItem.products);
            setActiveTabData(filteredData);
        }
    }, [activeTab, prodData]);

    useEffect(() => {
        const bestSellsData = prodData.flatMap(item => item.items)
            .flatMap(subItem => subItem.products);
        setBestSells(bestSellsData);
    }, [prodData]);

    const [products, setProducts] = useState([]);
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/1`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div style={{ display: 'block' }}>
            <SliderBanner />
            <CatSlider data={prodData} />
            <Banners />

            <section className='homeProducts homeProductWrapper'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center homeProductsTitleWrap'>
                        <h2 className='hd mb-0 mt-0 res-full'>Popular Products</h2>
                        <ul className='list list-inline ml-auto filterTab mb-0 res-full'>
                            {catArray.map((cat, index) => (
                                <li className="list list-inline-item" key={index}>
                                    <a className={`cursor text-capitalize ${activeTab === cat ? 'act' : ''}`}
                                       onClick={() => {
                                           setActiveTab(cat);
                                           productRow.current.scrollLeft = 0;
                                       }}>
                                        {cat}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='productRow' ref={productRow}>
                        {activeTabData.map((item, index) => (
                            <div className='item' key={index}>
                                <Product tag={item.type} item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
