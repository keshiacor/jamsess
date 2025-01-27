import App from './App.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


test('page has a search', () => {
    render(<App />);
    
        const searchBar = screen.getByPlaceholderText('Search by title, artist or album'); 
        expect(searchBar).toBeInTheDocument();
}),

test ('page has a search button', () => {
    render(<App />);
    
        const searchButton = screen.getByText('Search');
        expect(searchButton).toBeInTheDocument();
});
