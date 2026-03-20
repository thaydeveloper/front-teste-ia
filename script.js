// Product Manager JavaScript

// Sample initial products data
let products = [
    {
        id: 1,
        name: "Smartphone XYZ",
        description: "Latest model with advanced features",
        price: 699.99,
        category: "Electronics",
        image: "https://via.placeholder.com/50x50?text=Phone"
    },
    {
        id: 2,
        name: "Running Shoes",
        description: "Comfortable shoes for daily exercise",
        price: 89.99,
        category: "Sports",
        image: "https://via.placeholder.com/50x50?text=Shoes"
    }
];

let currentProductId = null;
let deleteProductId = null;

// DOM Elements
const productForm = document.getElementById('product-form');
const productTableBody = document.getElementById('product-table-body');
const noProductsMessage = document.getElementById('no-products-message');
const formTitle = document.getElementById('form-title');
const cancelBtn = document.getElementById('cancel-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Event listeners
    productForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    confirmDeleteBtn.addEventListener('click', deleteProduct);
});

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        category: document.getElementById('product-category').value,
        image: document.getElementById('product-image').value || 'https://via.placeholder.com/50x50?text=Product'
    };
    
    if (currentProductId) {
        // Update existing product
        updateProduct(currentProductId, productData);
    } else {
        // Add new product
        addProduct(productData);
    }
    
    resetForm();
}

// Add a new product
function addProduct(productData) {
    const newProduct = {
        id: Date.now(), // Simple ID generation
        ...productData
    };
    
    products.push(newProduct);
    renderProducts();
}

// Update an existing product
function updateProduct(id, productData) {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { id, ...productData };
        renderProducts();
    }
}

// Delete a product
function deleteProduct() {
    if (deleteProductId) {
        products = products.filter(product => product.id !== deleteProductId);
        renderProducts();
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
        deleteProductId = null;
    }
}

// Render products to the table
function renderProducts() {
    if (products.length === 0) {
        productTableBody.innerHTML = '';
        noProductsMessage.style.display = 'block';
        return;
    }
    
    noProductsMessage.style.display = 'none';
    
    productTableBody.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary btn-action" onclick="editProduct(${product.id})">
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="showDeleteModal(${product.id})">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Edit a product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-image').value = product.image;
        
        formTitle.textContent = 'Edit Product';
        currentProductId = id;
        
        // Scroll to form
        document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
    }
}

// Show delete confirmation modal
function showDeleteModal(id) {
    deleteProductId = id;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
}

// Reset the form
function resetForm() {
    productForm.reset();
    document.getElementById('product-id').value = '';
    formTitle.textContent = 'Add New Product';
    currentProductId = null;
}