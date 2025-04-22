document.addEventListener('DOMContentLoaded', function() {
    
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');
    const themeText = themeToggleBtn.querySelector('.theme-text');
    const body = document.body;

    
    let isSidebarCollapsed = false;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIcon.textContent = 'brightness_7';
        themeText.textContent = 'Modo claro';
    }

    
    function toggleSidebar() {
        isSidebarCollapsed = !isSidebarCollapsed;
        
        if (isSidebarCollapsed) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }

    
    function toggleTheme() {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeIcon.textContent = 'brightness_7';
            themeText.textContent = 'Modo claro';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.textContent = 'brightness_4';
            themeText.textContent = 'Modo oscuro';
            localStorage.setItem('theme', 'light');
        }
    }

    
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
    themeToggleBtn.addEventListener('click', toggleTheme);

    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!sidebar.classList.contains('collapsed')) {
                isSidebarCollapsed = false;
                sidebar.classList.add('collapsed');
            }
        }
    });

    
    if (window.innerWidth <= 768) {
        isSidebarCollapsed = true;
        sidebar.classList.add('collapsed');
    }
});