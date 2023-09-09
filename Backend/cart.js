const cartQueue = [];
let totalCost = 0; // Initialize the total cost variable

// Function for adding items to the shopping cart queue
const addToCartQueue = async (userId, itemId, quantity = 1) => {
    try {
        // Fetch the item data and price from the route
        const response = await fetch(`/api/item/${itemId}`);
        const itemData = await response.json();

        // Calculate the total cost based on the fetched price
        const price = itemData.data.price;
        const cartItem = { userId, itemId, quantity, price };
        cartQueue.push(cartItem);

        // Calculate and update the total cost when items are added
        totalCost += price * quantity;

        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Function for removing items from the shopping cart queue by userId and itemId
const removeFromCartQueue = (userId, itemId, price) => {
    const updatedCartQueue = cartQueue.filter((cartItem) => {
        if (cartItem.userId === userId && cartItem.itemId === itemId) {
            // Calculate and subtract the cost of the item being removed
            totalCost -= price * cartItem.quantity;
            return false; // Exclude the item being removed from the updated queue
        }
        return true; // Include other items in the updated queue
    });

    // Update the cart queue with the filtered items
    cartQueue.length = 0; // Clear the current cart queue
    updatedCartQueue.forEach((item) => {
        cartQueue.push(item); // Push the updated items back into the queue
    });

    return { success: true };
};

// Function for processing the shopping cart queue
const processCartQueue = async () => {
    while (cartQueue.length > 0) {
        const cartItem = cartQueue.shift();

        // Here, you can perform actions like adding/updating items in the database
        // based on the cartItem data.
        console.log(`Processing cart item for user ${cartItem.userId}`);
        console.log(`Item ID: ${cartItem.itemId}, Quantity: ${cartItem.quantity}`);

        // You can also fetch additional item details if needed from the route or database.
        try {
            const response = await fetch(`/api/item/${cartItem.itemId}`);
            const itemData = await response.json();
            console.log(`Item Name: ${itemData.data.name}`);
        } catch (error) {
            console.error(`Error fetching item details: ${error.message}`);
        }
    }
};

// Function to get the current total cost
const getTotalCost = () => totalCost;

// Example usage:
addToCartQueue(1, 101, 2); // Adding an item with itemId 101
addToCartQueue(1, 102, 1); // Adding an item with itemId 102
removeFromCartQueue(1, 101, 10); // Removing an item with itemId 101
await processCartQueue(); // Process the remaining items in the cart (use await for asynchronous fetch)
console.log(`Total Cost: ${getTotalCost()}`); // Get and print the total cost
