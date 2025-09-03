import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const DiscountSlider = () => {
  return (
    <div className=" text-white mt-2 py-4 overflow-hidden position-relative rounded-3 align-items-center">
      <div
        className="d-inline-block"
        style={{
          whiteSpace: 'nowrap',
          position: 'absolute',
          animation: 'scrollText 25s linear infinite'
        }}
      >
        <span className="mx-5 text-danger">🎉 "🎉 Huge Savings Alert! Enjoy 25% DISCOUNT ON ALL PRODUCTS – Shop Now and Grab Your Favorites Before They’re Gone! 🛒✨" 🎉</span>
        <span className="mx-5 text-danger">🎉 "🎉 Huge Savings Alert! Enjoy 25% DISCOUNT ON ALL PRODUCTS – Shop Now and Grab Your Favorites Before They’re Gone! 🛒✨" 🎉</span>
        <span className="mx-5 text-danger">🎉 "🎉 Huge Savings Alert! Enjoy 25% DISCOUNT ON ALL PRODUCTS – Shop Now and Grab Your Favorites Before They’re Gone! 🛒✨" 🎉</span>
        <span className="mx-5 text-danger">🎉 "🎉 Huge Savings Alert! Enjoy 25% DISCOUNT ON ALL PRODUCTS – Shop Now and Grab Your Favorites Before They’re Gone! 🛒✨" 🎉</span>
        <span className="mx-5 text-danger">🎉 "🎉 Huge Savings Alert! Enjoy 25% DISCOUNT ON ALL PRODUCTS – Shop Now and Grab Your Favorites Before They’re Gone! 🛒✨" 🎉</span>
        <span className="mx-5 text-danger">🎉 "🎉 Huge Savings Alert! Enjoy 25% DISCOUNT ON ALL PRODUCTS – Shop Now and Grab Your Favorites Before They’re Gone! 🛒✨" 🎉</span>
      </div>

      <style>{`
        @keyframes scrollText {
          0% { left: 100%; }
          100% { left: -100%; }
        }
      `}</style>
    </div>
  );
};

export default DiscountSlider;
