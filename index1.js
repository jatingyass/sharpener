document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    form.addEventListener('submit', handleFormSubmit);
    displayUsers();
});

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect user details from the form inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create an object to store the user details
    const userDetails = {
        username: username,
        email: email,
        phone: phone
    };

    // Retrieve existing users from local storage or initialize an empty array if none exist
    let users = JSON.parse(localStorage.getItem('User Details')) || [];

    // Add the new user details to the array
    users.push(userDetails);

    // Store the updated array in local storage
    localStorage.setItem('User Details', JSON.stringify(users));

    // Display the updated user list
    displayUsers();

    // Reset the form
    event.target.reset();
}

function displayUsers() {
    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('User Details')) || [];

    // Get the user list element
    const userList = document.getElementById('user-list');

    // Clear the current list
    userList.innerHTML = '';

    // Loop through users and create list items
    users.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username} - ${user.email} - ${user.phone}`;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            // Remove the user details from the array
            users.splice(index, 1);
            // Update the user list in local storage
            localStorage.setItem('User Details', JSON.stringify(users));
            // Display the updated user list
            displayUsers();
        });

        // Create an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            // Remove the user details from the array
            users.splice(index, 1);
            // Update the user list in local storage
            localStorage.setItem('User Details', JSON.stringify(users));
            // Populate the input fields with existing values
            document.getElementById('username').value = user.username;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;
        });

        // Append the delete and edit buttons to the list item
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);

        // Append the list item to the user list
        userList.appendChild(listItem);
    });
}
