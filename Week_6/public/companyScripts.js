// Fetch and display all companies
async function fetchCompanies() {
    try {
        const response = await fetch('/api/companies');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const companies = await response.json();
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
        console.error('Error fetching companies:', error);
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
            alert('Company added successfully');
            fetchCompanies();
        } else {
            alert('Failed to add company');
        }
    } catch (error) {
        console.error('Error adding company:', error);
    }
}

// Show the edit form for a company
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
            alert('Company updated successfully');
            document.getElementById('edit-company-form').style.display = 'none';
            fetchCompanies();
        } else {
            alert('Failed to update company');
        }
    } catch (error) {
        console.error('Error updating company:', error);
    }
}

// Delete a company
async function deleteCompany(id) {
    try {
        const response = await fetch(`/api/companies/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Company deleted successfully');
            fetchCompanies();
        } else {
            alert('Failed to delete company');
        }
    } catch (error) {
        console.error('Error deleting company:', error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', fetchCompanies);
document.getElementById('add-company-form').addEventListener('submit', addCompany);