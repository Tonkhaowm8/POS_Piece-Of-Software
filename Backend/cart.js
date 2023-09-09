const cartQueue = [];

// Function for adding items to the shopping cart queue
const addToCartQueue = (userId, itemId, quantity = 1) => {
    const cartItem = { userId, itemId, quantity };
    cartQueue.push(cartItem);
    return { success: true };
};

// Function for removing items from the shopping cart queue by userId and itemId
const removeFromCartQueue = (userId, itemId) => {
    const updatedCartQueue = cartQueue.filter((cartItem) => {
        return cartItem.userId !== userId || cartItem.itemId !== itemId;
    });

    // Update the cart queue with the filtered items
    cartQueue.length = 0; // Clear the current cart queue
    updatedCartQueue.forEach((item) => {
        cartQueue.push(item); // Push the updated items back into the queue
    });

    return { success: true };
};

// Function for processing the shopping cart queue
const processCartQueue = () => {
    while (cartQueue.length > 0) {
        const cartItem = cartQueue.shift();

        // Here, you can perform actions like adding/updating items in the database
        // based on the cartItem data.

        console.log(`Processing cart item for user ${cartItem.userId}`);
        console.log(`Item ID: ${cartItem.itemId}, Quantity: ${cartItem.quantity}`);
    }
};

// Example usage:
addToCartQueue(1, 101, 2);
addToCartQueue(1, 102, 1);
processCartQueue(); // Process the remaining items in the cart
