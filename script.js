document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');
    const themeText = themeToggleBtn.querySelector('.theme-text');
    const body = document.body;
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mainContent = document.querySelector('.main-content');
    
    // Estados
    let isSidebarCollapsed = false;
    let isMobileView = window.innerWidth <= 1024;
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIcon.textContent = 'brightness_7';
        themeText.textContent = 'Modo claro';
    }
    
    // Función para alternar el sidebar
    function toggleSidebar() {
        if (isMobileView) {
            sidebar.classList.toggle('expanded');
            sidebarOverlay.classList.toggle('active');
        } else {
            isSidebarCollapsed = !isSidebarCollapsed;
            if (isSidebarCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = '80px';
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.style.marginLeft = '280px';
            }
        }
    }
    
    // Función para alternar el tema
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
    
    // Función para manejar cambios de tamaño de pantalla
    function handleResize() {
        isMobileView = window.innerWidth <= 1024;
        
        if (isMobileView) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('expanded');
            mainContent.style.marginLeft = '0';
            mobileMenuToggle.style.display = 'flex';
        } else {
            sidebar.classList.remove('expanded');
            sidebarOverlay.classList.remove('active');
            mobileMenuToggle.style.display = 'none';
            
            if (isSidebarCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = '80px';
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.style.marginLeft = '280px';
            }
        }
    }
    
    // Event listeners
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
    themeToggleBtn.addEventListener('click', toggleTheme);
    mobileMenuToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    // Manejar cambios de tamaño de pantalla
    window.addEventListener('resize', handleResize);
    
    // Inicializar según el tamaño de pantalla
    handleResize();
    
    // Cerrar sidebar al hacer clic en un enlace en móviles
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobileView) {
                toggleSidebar();
            }
        });
    });
});
