
// ── Supabase Client ───────────────────────────────────────────────────────────
const supabaseUrl = 'https://woodcilxiuaemofemjtd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvb2RjaWx4aXVhZW1vZmVtanRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNzYyOTgsImV4cCI6MjA4ODc1MjI5OH0.3bXgZhXVk6coW72q6cDuGewd4sNHZamFMBBOBU7yMBs';
let client = null;
if (typeof supabase !== 'undefined') {
    client = supabase.createClient(supabaseUrl, supabaseKey);
}

// ── Mobile Bottom Nav ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    // Only inject on pages that have a sidebar (dashboard pages)
    if (!document.querySelector('.sidebar')) return;

    const page = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navItems = [
        {
            href: './dashboard.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
            label: 'Home',
            pages: ['dashboard.html']
        },
        {
            href: './consultdoctor.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="9.5" y1="13.5" x2="14.5" y2="13.5"/></svg>`,
            label: 'Consult',
            pages: ['consultdoctor.html', 'newconsultation.html', 'requestconsultation.html', 'doctorprofile(consultation).html']
        },
        {
            href: './appointment.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
            label: 'Appointments',
            pages: ['appointment.html', 'newappointment.html', 'bookappointment.html', 'doctorprofile(appointment).html']
        },
        {
            href: './myhospitals.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="12" y1="6" x2="12" y2="9"/></svg>`,
            label: 'Hospitals',
            pages: ['myhospitals.html']
        },
    ];

    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';

    navItems.forEach(function (item) {
        const a = document.createElement('a');
        a.href = item.href;
        if (item.pages.includes(page)) a.classList.add('mob-active');
        a.innerHTML = `<span class="mob-icon">${item.icon}</span><span>${item.label}</span>`;
        nav.appendChild(a);
    });

    document.body.appendChild(nav);
});

// ── Active Sidebar State (URL-based) ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const page = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navMap = {
        'dashboard.html': 'dashboard',
        'consultdoctor.html': 'consultadoctor',
        'newconsultation.html': 'consultadoctor',
        'doctorprofile(consultation).html': 'consultadoctor',
        'requestconsultation.html': 'consultadoctor',
        'appointment.html': 'appointments',
        'newappointment.html': 'appointments',
        'bookappointment.html': 'appointments',
        'doctorprofile(appointment).html': 'appointments',
        'myhospitals.html': 'myhospitals',
    };
    const activeId = navMap[page];
    if (activeId) {
        const navItem = document.getElementById(activeId);
        if (navItem) {
            const link = navItem.querySelector('a');
            if (link) {
                link.style.backgroundColor = '#EFF6FF';
                link.style.color = '#2563EB';
                link.style.fontWeight = '600';
            }
        }
    }
});

// ── Logout ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        // Clear Supabase session keys from localStorage
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('sb-')) localStorage.removeItem(key);
        });
        window.location.href = './login.html';
    });
});

// ── Date Label ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const dateLabel = document.getElementById('currentDate');
    if (dateLabel) {
        dateLabel.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }
});

// ── Calendar Widget ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const daysContainer = document.getElementById('dates');
    const prevBtn = document.querySelector('.prev-month');
    const nextBtn = document.querySelector('.next-month');
    if (!daysContainer || !prevBtn || !nextBtn) return;

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    const monthYearLabel = document.querySelector('.month-year');

    function updateMonthYearLabel(month, year) {
        if (monthYearLabel) {
            monthYearLabel.textContent = new Date(year, month, 1)
                .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
    }

    function loadCalendarDays(month, year) {
        daysContainer.innerHTML = '';
        updateMonthYearLabel(month, year);

        // Calculate Monday-based offset (calendar header: Mo Tu We Th Fr Sa Su)
        const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon...
        const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        for (let i = 0; i < offset; i++) {
            const blank = document.createElement('span');
            blank.classList.add('blank');
            daysContainer.appendChild(blank);
        }

        const date = new Date(year, month, 1);
        while (date.getMonth() === month) {
            const dayCell = document.createElement('span');
            dayCell.innerText = date.getDate();
            if (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            ) {
                dayCell.classList.add('today');
            }
            daysContainer.appendChild(dayCell);
            date.setDate(date.getDate() + 1);
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentMonth === 0) { currentMonth = 11; currentYear -= 1; }
        else { currentMonth -= 1; }
        loadCalendarDays(currentMonth, currentYear);
    });

    nextBtn.addEventListener('click', () => {
        if (currentMonth === 11) { currentMonth = 0; currentYear += 1; }
        else { currentMonth += 1; }
        loadCalendarDays(currentMonth, currentYear);
    });

    loadCalendarDays(currentMonth, currentYear);
});

// ── Form with Confirmation ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('appointment-form');
    const confirmation = document.getElementById('confirmation');
    const anotherAppointmentBtn = document.getElementById('another-appointment');
    if (!form || !confirmation || !anotherAppointmentBtn) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.classList.add('hidden');
        confirmation.classList.remove('hidden');
    });

    anotherAppointmentBtn.addEventListener('click', function () {
        form.reset();
        form.classList.remove('hidden');
        confirmation.classList.add('hidden');
    });
});

// ── Search / Filter ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();

        // Consultation table rows (consultdoctor.html)
        const tableRows = document.querySelectorAll('.consultation-table .table-row:not(.header)');
        if (tableRows.length) {
            let visible = 0;
            tableRows.forEach(row => {
                const match = row.textContent.toLowerCase().includes(query);
                row.style.display = match ? '' : 'none';
                if (match) visible++;
            });
            const empty = document.getElementById('consult-empty');
            if (empty) empty.style.display = visible === 0 ? 'flex' : 'none';
        }

        // Appointment visit rows (appointment.html)
        const visitRows = document.querySelectorAll('.visit-row');
        if (visitRows.length) {
            let visible = 0;
            visitRows.forEach(row => {
                const match = row.textContent.toLowerCase().includes(query);
                row.style.display = match ? '' : 'none';
                if (match) visible++;
            });
            const empty = document.getElementById('appointment-empty');
            if (empty) empty.style.display = visible === 0 ? 'flex' : 'none';
        }

        // Hospital list rows (myhospitals.html)
        const hospitalRows = document.querySelectorAll('.list-row');
        if (hospitalRows.length) {
            let visible = 0;
            hospitalRows.forEach(row => {
                const match = row.textContent.toLowerCase().includes(query);
                row.style.display = match ? '' : 'none';
                if (match) visible++;
            });
            const empty = document.getElementById('hospital-empty');
            if (empty) empty.style.display = visible === 0 ? 'flex' : 'none';
        }

        // Doctor table rows (newappointment.html / newconsultation.html)
        const doctorRows = document.querySelectorAll('table tbody tr');
        if (doctorRows.length) {
            let visible = 0;
            doctorRows.forEach(row => {
                const match = row.textContent.toLowerCase().includes(query);
                row.style.display = match ? '' : 'none';
                if (match) visible++;
            });
            const empty = document.getElementById('doctors-empty');
            if (empty) empty.style.display = visible === 0 ? 'flex' : 'none';
        }
    });
});

// ── Tab Switching ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const tabGroups = document.querySelectorAll('.tabs');
    tabGroups.forEach(function (group) {
        const tabs = group.querySelectorAll('.tab');
        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () {
                // Update active state
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const isAll = index === 0;

                // Rows across different page types
                const selectors = [
                    '.consultation-table .table-row:not(.header)',
                    '.visit-row',
                    '.list-row',
                    'table tbody tr'
                ];
                selectors.forEach(function (sel) {
                    const rows = document.querySelectorAll(sel);
                    rows.forEach(row => { row.style.display = isAll ? '' : 'none'; });
                });

                // Show/hide empty state
                const emptyStates = document.querySelectorAll('.empty-state');
                emptyStates.forEach(es => {
                    es.style.display = isAll ? 'none' : 'flex';
                });
            });
        });
    });
});

// ── Notification Bell Dropdown ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const notifIcon = document.querySelector('.notification-icon');
    if (!notifIcon) return;

    // Wrap icon so dropdown can be positioned relative to it
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position: relative; display: inline-flex; align-items: center;';
    notifIcon.parentNode.insertBefore(wrapper, notifIcon);
    wrapper.appendChild(notifIcon);

    // Build dropdown
    const dropdown = document.createElement('div');
    dropdown.id = 'notif-dropdown';
    dropdown.style.cssText = [
        'display: none',
        'position: absolute',
        'top: calc(100% + 12px)',
        'right: 0',
        'width: 300px',
        'background: #fff',
        'border: 1px solid #E4E7EC',
        'border-radius: 12px',
        'box-shadow: 0 8px 24px rgba(15,23,42,0.12)',
        'z-index: 1000',
        'overflow: hidden'
    ].join(';');

    dropdown.innerHTML = `
        <div style="padding:14px 16px;border-bottom:1px solid #E4E7EC;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:0.875rem;font-weight:600;color:#101928;">Notifications</span>
            <span style="font-size:0.75rem;color:#2563EB;cursor:pointer;font-weight:500;">Mark all read</span>
        </div>
        <div style="padding:40px 20px;text-align:center;">
            <div style="font-size:2rem;margin-bottom:10px;opacity:0.35;">🔔</div>
            <p style="margin:0 0 4px;font-size:0.875rem;font-weight:600;color:#6B7280;">No new notifications</p>
            <small style="font-size:0.78rem;color:#9CA3AF;">You're all caught up!</small>
        </div>
    `;
    wrapper.appendChild(dropdown);

    // Toggle on bell click
    notifIcon.style.cursor = 'pointer';
    notifIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Close on outside click
    document.addEventListener('click', function () {
        dropdown.style.display = 'none';
    });
});

// ── Supabase User Display ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
    if (!client) return;
    const welcomeEl = document.querySelector('.welcome-message h1');
    const profileNameEl = document.querySelector('.profile-card .profile-info h1');
    if (!welcomeEl && !profileNameEl) return;

    const { data, error } = await client.auth.getUser();
    if (error) { console.error('Error fetching user:', error); return; }

    const user = data?.user;
    if (!user || !user.user_metadata?.first_name) { console.error('User details not found'); return; }

    const firstName = user.user_metadata.first_name;
    const lastName = user.user_metadata.last_name || '';
    if (welcomeEl) welcomeEl.textContent = `Welcome, ${firstName}`;
    if (profileNameEl) profileNameEl.textContent = `${firstName} ${lastName}`.trim();
});
