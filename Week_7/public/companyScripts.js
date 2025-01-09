// Initialize Socket.IO
const socket = io();

// Listen for refresh events from the server
socket.on("refreshCompanies", () => {
    console.log("🔄 'refreshCompanies' event received");
    fetchCompanies(); // Refresh the company list
});

// Fetch and display all companies
async function fetchCompanies() {
    try {
        const response = await fetch('/api/companies');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const companies = await response.json();
        console.log("📥 Fetched companies:", companies); // Debugging log

        const companyList = document.getElementById('companies');
        companyList.innerHTML = ''; // Clear the current table rows

        companies.forEach(company => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${company.name}</td>
                <td>${company.address}</td>
                <td>${company.pin}</td>
                <td>
                    <button class="btn-small teal lighten-1 waves-effect waves-light" onclick="showEditCompanyForm('${company._id}', '${company.name}', '${company.address}', '${company.pin}')">Edit</button>
                    <button class="btn-small red lighten-1 waves-effect waves-light" onclick="deleteCompany('${company._id}')">Delete</button>
                </td>
            `;
            companyList.appendChild(tableRow);
        });
    } catch (error) {
        console.error("❌ Error fetching companies:", error);
    }
}

// Add a new company
async function addCompany(event) {
    event.preventDefault();
    const name = document.getElementById('company-name').value;
    const address = document.getElementById('company-address').value;
    const pin = document.getElementById('company-pin').value;

    try {
        const response = await fetch('/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address, pin }),
        });
        if (response.ok) {
            console.log("✅ Company added successfully");
            socket.emit("companyAdded", { name, address, pin }); // Notify server
            fetchCompanies(); // Refresh the list
        } else {
            console.error("❌ Failed to add company");
        }
    } catch (error) {
        console.error("❌ Error adding company:", error);
    }
}

// Delete a company
async function deleteCompany(id) {
    try {
        const response = await fetch(`/api/companies/${id}`, { method: 'DELETE' });
        if (response.ok) {
            console.log("✅ Company deleted successfully");
            socket.emit("companyDeleted", { id }); // Notify server
            fetchCompanies(); // Refresh the list
        } else {
            console.error("❌ Failed to delete company");
        }
    } catch (error) {
        console.error("❌ Error deleting company:", error);
    }
}

// Show the edit company form
function showEditCompanyForm(id, name, address, pin) {
    document.getElementById('edit-company-form').style.display = 'block';
    document.getElementById('edit-company-name').value = name;
    document.getElementById('edit-company-address').value = address;
    document.getElementById('edit-company-pin').value = pin;

    document.getElementById('save-company-changes').onclick = () => updateCompany(id);
    document.getElementById('cancel-company-edit').onclick = () => {
        document.getElementById('edit-company-form').style.display = 'none';
    };
}

// Update a company
async function updateCompany(id) {
    const name = document.getElementById('edit-company-name').value;
    const address = document.getElementById('edit-company-address').value;
    const pin = document.getElementById('edit-company-pin').value;

    try {
        const response = await fetch(`/api/companies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address, pin }),
        });
        if (response.ok) {
            console.log("✅ Company updated successfully");
            socket.emit("companyUpdated", { id, name, address, pin }); // Notify server
            fetchCompanies(); // Refresh the list
            document.getElementById('edit-company-form').style.display = 'none';
        } else {
            console.error("❌ Failed to update company");
        }
    } catch (error) {
        console.error("❌ Error updating company:", error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', fetchCompanies);
document.getElementById('add-company-form').addEventListener('submit', addCompany);