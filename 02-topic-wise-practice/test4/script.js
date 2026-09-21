/**
 * Practice Test 4 - Interactive DOM Manipulation & Form Validation Script
 */

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskCategorySelect = document.getElementById('task-category');
    const taskPrioritySelect = document.getElementById('task-priority');
    
    const titleError = document.getElementById('title-error');
    const categoryError = document.getElementById('category-error');
    
    const taskTableBody = document.getElementById('task-body');
    const emptyState = document.getElementById('empty-state');
    const taskCountSpan = document.getElementById('task-count');
    const searchInput = document.getElementById('search-input');
    const toast = document.getElementById('toast');

    let tasks = [
        { id: 1, title: 'Setup Node.js Server & Express Router', category: 'Backend', priority: 'High' },
        { id: 2, title: 'Create Responsive CSS Flexbox Layout', category: 'Frontend', priority: 'Medium' }
    ];

    // Helper: Show Toast Notification
    const showToast = (message, isSuccess = true) => {
        toast.textContent = message;
        toast.style.backgroundColor = isSuccess ? '#10b981' : '#ef4444';
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2500);
    };

    // Render Tasks to Table
    const renderTasks = (filterQuery = '') => {
        taskTableBody.innerHTML = '';

        const filteredTasks = tasks.filter(t => 
            t.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
            t.category.toLowerCase().includes(filterQuery.toLowerCase())
        );

        taskCountSpan.textContent = filteredTasks.length;

        if (filteredTasks.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        filteredTasks.forEach((task, index) => {
            const tr = document.createElement('tr');
            
            const priorityClass = task.priority.toLowerCase();

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${escapeHtml(task.title)}</strong></td>
                <td>${task.category}</td>
                <td><span class="badge badge-${priorityClass}">${task.priority}</span></td>
                <td>
                    <button class="btn btn-delete" data-id="${task.id}">Delete</button>
                </td>
            `;

            taskTableBody.appendChild(tr);
        });
    };

    // Escape HTML to prevent XSS
    const escapeHtml = (str) => {
        return str.replace(/[&<>"']/g, (m) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
        })[m]);
    };

    // Form Validation Function
    const validateForm = () => {
        let isValid = true;

        titleError.textContent = '';
        categoryError.textContent = '';

        if (!taskTitleInput.value.trim()) {
            titleError.textContent = 'Please enter a task title.';
            isValid = false;
        } else if (taskTitleInput.value.trim().length < 4) {
            titleError.textContent = 'Title must be at least 4 characters long.';
            isValid = false;
        }

        if (!taskCategorySelect.value) {
            categoryError.textContent = 'Please select a category.';
            isValid = false;
        }

        return isValid;
    };

    // Handle Form Submit
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const newTask = {
            id: Date.now(),
            title: taskTitleInput.value.trim(),
            category: taskCategorySelect.value,
            priority: taskPrioritySelect.value
        };

        tasks.push(newTask);
        renderTasks(searchInput.value);
        showToast('Task added successfully!');

        taskForm.reset();
    });

    // Delete Task Event Delegation
    taskTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const taskId = Number(e.target.getAttribute('data-id'));
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks(searchInput.value);
            showToast('Task deleted!', false);
        }
    });

    // Live Search Event Listener
    searchInput.addEventListener('input', (e) => {
        renderTasks(e.target.value);
    });

    // Initial Render
    renderTasks();
});
