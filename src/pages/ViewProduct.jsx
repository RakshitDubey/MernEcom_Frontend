import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';
import { MoreVert } from '@mui/icons-material';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;


    const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);


    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };

        dispatch(updateStuff(fields, productID, "deleteProductReview"));
    };

    const reviewer = currentUser && currentUser._id

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                {
                    responseDetails ?
                        <div style={{ margin: '0 auto', padding: '1rem', textAlign: 'center', color: 'red' }}>Product not found</div>
                        :
                        <div style={{ margin: '0 auto', padding: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                <img
                                    style={{ width: '100%', maxWidth: '50%', height: 'auto', objectFit: 'cover', borderRadius: '0.5rem', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
                                    src={productDetails && productDetails.productImage}
                                    alt={productDetails && productDetails.productName}
                                />
                                <div style={{ width: '100%', maxWidth: '50%', padding: '1rem' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{productDetails && productDetails.productName}</div>
                                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
                                        <div style={{ fontSize: '1.25rem', color: 'green' }}>₹{productDetails && productDetails.price && productDetails.price.cost}</div>
                                        <div style={{ fontSize: '1rem', textDecoration: 'line-through', marginLeft: '0.5rem' }}>₹{productDetails && productDetails.price && productDetails.price.mrp}</div>
                                        <div style={{ fontSize: '1rem', color: 'red', marginLeft: '0.5rem' }}>{productDetails && productDetails.price && productDetails.price.discountPercent}% off</div>
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>{productDetails && productDetails.description}</div>
                                    <div style={{ marginTop: '1rem' }}>
                                        <p>Category: {productDetails && productDetails.category}</p>
                                        <p>Subcategory: {productDetails && productDetails.subcategory}</p>
                                    </div>
                                </div>
                            </div>
            
                            {
                                currentRole === "Customer" &&
                                <div style={{ marginTop: '1rem' }}>
                                    <button
                                        style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                                        onClick={() => dispatch(addToCart(productDetails))}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            }
            
                            Reviews Section
                            { 
                            <div style={{ marginTop: '2rem', gap: '1rem' }}>
                                {productDetails.reviews && productDetails.reviews.length > 0 ? (
                                    productDetails.reviews.map((review, index) => (
                                        <div key={index} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {String(review.reviewer.name).charAt(0)}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{review.reviewer.name}</div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                                        <div>{timeAgo(review.date)}</div>
                                                    </div>
                                                    <div style={{ marginTop: '0.5rem' }}>Rating: {review.rating}</div>
                                                    <div style={{ marginTop: '0.25rem' }}>{review.comment}</div>
                                                </div>
                                                {review.reviewer._id === reviewer &&
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <button onClick={handleOpenMenu} style={{ color: '#6b7280' }}>
                                                            <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h.01M12 12h.01M18 12h.01M6 12a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z"></path>
                                                            </svg>
                                                        </button>
                                                        <div
                                                            id="menu-appbar"
                                                            anchorEl={anchorElMenu}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                            keepMounted
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            }}
                                                            open={Boolean(anchorElMenu)}
                                                            onClose={handleCloseMenu}
                                                            onClick={handleCloseMenu}
                                                        >
                                                            <div onClick={() => {
                                                                handleCloseMenu()
                                                            }}>
                                                                <div style={{ textAlign: 'center' }}>Edit</div>
                                                            </div>
                                                            <div onClick={() => {
                                                                deleteHandler(review._id)
                                                                handleCloseMenu()
                                                            }}>
                                                                <div style={{ textAlign: 'center' }}>Delete</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#6b7280' }}>No Reviews Found. Add a review.</div>
                                )}
                            </div> 
                            }
                        </div>
                }
            </>
            
            }
        </>
    );
};

export default ViewProduct;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const ProductImage = styled.img`
    max-width: 300px;
    /* width: 50%; */
    margin-bottom: 20px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductName = styled.h1`
    font-size: 24px;
`;

const PriceContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const PriceMrp = styled.p`
    margin-top: 8px;
    text-decoration: line-through;
    color: #525050;
`;

const PriceCost = styled.h3`
    margin-top: 8px;
`;

const PriceDiscount = styled.p`
    margin-top: 8px;
    color: darkgreen;
`;

const Description = styled.p`
    margin-top: 16px;
`;

const ProductDetails = styled.div`
    margin: 16px;
`;

const ButtonContainer = styled.div`
    margin: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReviewWritingContainer = styled.div`
    margin: 6rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
  && {
    background-color: white;
    margin-bottom: 2rem;
    padding: 1rem;
  }
`;

const ReviewCardDivision = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewDetails = styled.div`
  flex: 1;
`;