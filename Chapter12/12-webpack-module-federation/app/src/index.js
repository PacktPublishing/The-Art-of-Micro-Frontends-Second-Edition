import './style.css';

import('red/productPage').then(({ renderProductPage }) => {
    const root = document.body.appendChild(document.createElement('div'));
    root.id = 'app';
    
    renderProductPage(root);
});

