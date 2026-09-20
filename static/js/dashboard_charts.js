document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('inventoryChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            datasets: [{
                label: 'Available Units',
                data: [25, 12, 30, 8, 15, 4, 40, 8],
                backgroundColor: '#1e293b',
                borderColor: '#0f172a',
                borderWidth: 1
            }, {
                label: 'Critical Threshold',
                data: [10, 5, 10, 5, 5, 3, 15, 10],
                type: 'line',
                borderColor: '#dc2626',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});