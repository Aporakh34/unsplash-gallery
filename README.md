# Unsplash Gallery

## Description
This is a web application for searching and displaying images from Unsplash by a given category. The application allows the user to enter a search query and displays the results as an image gallery.

## Installation and Launch

### Requirements
- Node.js (recommended version 14.x or higher)
- npm (Node Package Manager) or yarn

### Installing Dependencies
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repository/unsplash-gallery.git
    ```

2. Navigate to the project directory:
    ```bash
    cd unsplash-gallery
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Launching the Application
1. Start the application:
    ```bash
    npm start
    ```

2. Open your browser and go to:
    ```
    http://localhost:3000
    ```

## Usage
1. Enter a search query in the search field.
2. The search results will be displayed as an image gallery.
3. Scroll down the page to load more images.

## Project Structure
- **Gallery**: Image gallery component.
- **SearchForm**: Search form component.
- **ImageGallery**: Component for displaying the image gallery.
- **ImageModal**: Modal window component for displaying the selected image.

## Error Handling
- If the search field is empty, a message "Enter something in the search field to start searching." is displayed.
- If nothing is found for the query, a message "Nothing found for the query." is displayed.
- If there is an error fetching images, a message "Error fetching images." is displayed.