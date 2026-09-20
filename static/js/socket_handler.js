// Global Socket.IO Connection Setup
const socket = io();

// Connection status listeners
socket.on('connect', () => {
    console.log('[Socket.IO] Connected to BloodLink Server');
    const statusBadge = document.getElementById('socket-status');
    if (statusBadge) {
        statusBadge.className = 'badge bg-success';
        statusBadge.textContent = 'Live';
    }
});

socket.on('disconnect', () => {
    console.log('[Socket.IO] Disconnected from server');
    const statusBadge = document.getElementById('socket-status');
    if (statusBadge) {
        statusBadge.className = 'badge bg-danger';
        statusBadge.textContent = 'Offline';
    }
});

// Incoming Notification Real-Time Handler
socket.on('notification_created', (data) => {
    addNotificationToBell(data);
});

// Function to append a notification to the bell menu UI
function addNotificationToBell(data) {
    const notifBadge = document.getElementById('notif-badge');
    const notifList = document.getElementById('notif-list');
    const noNotifs = document.getElementById('no-notifs');

    if (noNotifs) noNotifs.remove();

    // Increment Badge Count
    let currentCount = parseInt(notifBadge.textContent) || 0;
    notifBadge.textContent = currentCount + 1;
    notifBadge.classList.remove('d-none');

    // Prepend Notification Item into Dropdown
    const item = document.createElement('li');
    item.className = 'p-2 mb-1 rounded border-bottom bg-light small';
    
    const severityColor = data.severity === 'CRITICAL' ? 'danger' : (data.severity === 'HIGH' ? 'warning' : 'primary');

    item.innerHTML = `
        <div class="fw-bold text-${severityColor} d-flex justify-content-between">
            <span>${data.type}</span>
            <span class="text-muted micro-text" style="font-size:0.68rem">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="text-dark mt-1">${data.message}</div>
    `;

    // Insert right after the divider line (index position 2)
    notifList.insertBefore(item, notifList.children[2]);
}