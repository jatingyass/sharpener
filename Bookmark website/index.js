const form = document.getElementById('bookmark-form');
const bookmarkList = document.getElementById('bookmark-list');
const apiBase = 'https://crudcrud.com/api/660fd0239b0048b9b47754b98ba09516/bookmark';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', getBookmarks);

// Add event listener to the form
form.addEventListener('submit', addBookmark);

// Get bookmarks from the API
function getBookmarks() {
    axios.get(apiBase)
        .then(response => {
            const bookmarks = response.data;
            bookmarks.forEach(bookmark => displayBookmark(bookmark));
        })
        .catch(error => console.error('Error fetching bookmarks:', error));
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
    const li = document.createElement('li');
    li.className = 'bookmark-item';
    li.setAttribute('data-id', bookmark._id);
    li.innerHTML = `
        <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
        <button onclick="editBookmark('${bookmark._id}', '${bookmark.name}', '${bookmark.url}')">Edit</button>
        <button onclick="deleteBookmark('${bookmark._id}')">Delete</button>
    `;
    bookmarkList.appendChild(li);
}

// Delete a bookmark
function deleteBookmark(id) {
    axios.delete(`${apiBase}/${id}`)
        .then(() => {
            const bookmarkItem = document.querySelector(`li[data-id="${id}"]`);
            bookmarkItem.remove();
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
            .then(response => {
                const bookmarkItem = document.querySelector(`li[data-id="${id}"]`);
                bookmarkItem.innerHTML = `
                    <a href="${response.data.url}" target="_blank">${response.data.name}</a>
                    <button onclick="editBookmark('${id}', '${response.data.name}', '${response.data.url}')">Edit</button>
                    <button onclick="deleteBookmark('${id}')">Delete</button>
                `;
            })
            .catch(error => console.error('Error updating bookmark:', error));
    }
}
