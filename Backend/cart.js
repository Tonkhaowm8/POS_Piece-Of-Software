const cartQueue = [];
let totalCost = 0; // Initialize the total cost variable

// Function for adding items to the shopping cart queue
const addToCartQueue = async (itemId, price, quantity = 1) => {
    try {
        const cartItem = { itemId, quantity, price };
        cartQueue.push(cartItem);

        // Calculate and update the total cost when items are added
        totalCost += price * quantity;
        console.log(`Item ID: ${cartItem.itemId}, Quantity: ${cartItem.quantity}, Total: ${totalCost}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Function for removing items from the shopping cart queue by userId and itemId
const removeFromCartQueue = (itemId) => {
    let found = false; // Track whether an item has been removed

    const updatedCartQueue = cartQueue.map((cartItem) => {
        if (cartItem.itemId === itemId) {
            // Calculate and subtract the cost of one item being removed
            totalCost -= cartItem.price;
            // Decrease the quantity by 1
            cartItem.quantity -= 1;
            found = true; // Set found to true so that only one quantity of the item is removed
            console.log(`Item ID: ${cartItem.itemId}, Quantity: ${cartItem.quantity}, Total: ${totalCost}`);
        }
        return cartItem; // Return the modified or unmodified item
    });

    // Remove items with a quantity of 0 (or less)
    const filteredCartQueue = updatedCartQueue.filter((cartItem) => cartItem.quantity > 0);

    // Update the cart queue with the filtered items
    cartQueue.length = 0; // Clear the current cart queue
    cartQueue.push(...filteredCartQueue); // Push the updated items back into the queue

    return { success: found }; // Return whether an item quantity was removed
};


// Function for displaying all items in the shopping cart
const displayCart = () => {
    console.log("Items in the cart:");
    cartQueue.forEach((cartItem) => {
        console.log(`Item ID: ${cartItem.itemId}, Quantity: ${cartItem.quantity}, Price: ${cartItem.price * cartItem.quantity}`);
    });
    console.log(`Total Cost: ${getTotalCost()}`);
};

// Function to get the current total cost
const getTotalCost = () => totalCost;

// Example usage:
addToCartQueue(101, 10, 2); // Adding an item with itemId 101
addToCartQueue(102, 10, 1); // Adding an item with itemId 102
addToCartQueue(103, 10, 1); // Adding an item with itemId 102
removeFromCartQueue(1, 101); // Removing an item with itemId 101
displayCart(); // Display all items in the cart and the total value