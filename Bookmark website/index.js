

const form = document.getElementById('bookmark-form');
const bookmarkList = document.getElementById('bookmark-list');
const apiBase = 'https://crudcrud.com/api/9c4a2b170d2a4d93883e1da9cc508ee8/bookmark';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', getBookmarks);

// Add event listener to the form
form.addEventListener('submit', addBookmark);

// Get bookmarks from the API
function getBookmarks() {
    axios.get(apiBase)
        .then(response => {
            const bookmarks = response.data;
            bookmarkList.innerHTML = ''; // Clear the list before adding bookmarks
            bookmarks.forEach(bookmark => displayBookmark(bookmark));
        })
        .catch(error => console.log('Error fetching bookmarks:', error));
}

// Add a new bookmark
function addBookmark(event) {
    event.preventDefault();
    const name = document.getElementById('bookmark-name').value;
    const url = document.getElementById('bookmark-url').value;
    
    const newBookmark = { name, url };

    axios.post(apiBase, newBookmark)
        .then(response => {
            displayBookmark(response.data);
            form.reset();
        })
        .catch(error => console.error('Error adding bookmark:', error));
}

// Display a bookmark in the list
function displayBookmark(bookmark) {
    const p = document.createElement('p');
    p.className = 'bookmark-item';
    p.setAttribute('data-id', bookmark._id);
    p.innerHTML = `${bookmark.name} >
        <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
        <button onclick="deleteBookmark('${bookmark._id}')">Delete</button>
        <button onclick="editBookmark('${bookmark._id}', '${bookmark.name}', '${bookmark.url}')">Edit</button>
    `;
    bookmarkList.appendChild(p);
}

// Delete a bookmark
function deleteBookmark(id) {
    axios.delete(`${apiBase}/${id}`)
        .then(() => {
            getBookmarks(); // Refresh the list after deletion
        })
        .catch(error => console.error('Error deleting bookmark:', error));
}

// Edit a bookmark
function editBookmark(id, name, url) {
    const newName = prompt('Enter new bookmark name:', name);
    const newUrl = prompt('Enter new bookmark URL:', url);

    if (newName && newUrl) {
        const updatedBookmark = { name: newName, url: newUrl };

        axios.put(`${apiBase}/${id}`, updatedBookmark)
            .then(() => {
                getBookmarks(); // Refresh the list after editing
            })
            .catch(error => console.error('Error updating bookmark:', error));
    }
}
