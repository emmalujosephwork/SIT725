// Fetch and display all users
async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        const userList = document.getElementById('users');
        userList.innerHTML = ''; // Clear the current list
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${user.name} (${user.email}) - ${user.phone}
                <button onclick="showEditForm('${user._id}', '${user.name}', '${user.email}', '${user.phone}')">Edit</button>
                <button onclick="deleteUser('${user._id}')">Delete</button>
            `;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Add a new user
async function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone }),
        });
        if (response.ok) {
            alert('User added successfully');
            fetchUsers();
        } else {
            alert('Failed to add user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Show the edit form
function showEditForm(id, name, email, phone) {
    document.getElementById('edit-user-form').style.display = 'block';
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-email').value = email;
    document.getElementById('edit-phone').value = phone;

    document.getElementById('save-changes').onclick = () => updateUser(id);
    document.getElementById('cancel-edit').onclick = () => {
        document.getElementById('edit-user-form').style.display = 'none';
    };
}

// Update a user
async function updateUser(id) {
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const phone = document.getElementById('edit-phone').value;

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone }),
        });
        if (response.ok) {
            alert('User updated successfully');
            document.getElementById('edit-user-form').style.display = 'none';
            fetchUsers();
        } else {
            alert('Failed to update user');
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

// Delete a user
async function deleteUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('User deleted successfully');
            fetchUsers();
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', fetchUsers);
document.getElementById('add-user-form').addEventListener('submit', addUser);