export const MESSAGES = {
  // Product Messages
  PRODUCT: {
    ADDED_TO_CART: "Added to Cart Successfully",
    ITEM_REMOVED: "Item removed from cart",
    NO_PRODUCTS_FOUND: "No Products Found",
    NO_FILTER_PRODUCTS: "No products found matching the selected filters.",
    TRY_CHANGING_FILTERS: "Try adjusting your category or price filters to find what you are looking for.",
    NO_SIMILAR_PRODUCTS: "No similar products available at this time.",
    NO_CATEGORY_PRODUCTS: "No products in this category.",
    SEARCH_NO_RESULTS: "No Matching Products Found",
    SEARCH_SUGGESTION: "Try checking your spelling or use different keywords to find what you're looking for.",
  },

  // Auth Messages
  AUTH: {
    LOGIN_SUCCESS: "Successfully logged in!",
    LOGOUT_SUCCESS: "Successfully logged out",
    INVALID_CREDENTIALS: "Invalid email or password",
    REGISTER_SUCCESS: "Registered successfully!",
    REGISTER_ERROR: "Error in registration!",
    PROFILE_UPDATE_SUCCESS: "Profile updated successfully!",
    PROFILE_UPDATE_ERROR: "Failed to update profile",
    SOMETHING_WENT_WRONG: "Something went wrong!",
    ALL_FIELDS_REQUIRED: "All fields are required",
  },

  // Order Messages
  ORDER: {
    NO_ORDERS_FOUND: "No orders found.",
    ORDER_SUCCESS: "Payment Successful!",
    ORDER_SUCCESS_SUBTITLE: "Your order has been placed successfully.",
  },
};

export const APP_CONFIG = {
  ITEMS_PER_PAGE: 8,
};

export default MESSAGES;
