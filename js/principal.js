export function menu(){
    document.querySelectorAll('#sidebar a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ocultar todas las secciones
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Mostrar sección seleccionada
            const target = link.getAttribute('href');
            document.querySelector(target).style.display = 'block';
            
            // Actualizar menú activo
            document.querySelectorAll('#sidebar a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Ocultar menú en móvil
            if(window.innerWidth < 768) {
                document.getElementById('sidebar').classList.add('active');
            }
        });
    });
}

export function activar_menu(){
    document.getElementById('sidebar').classList.toggle('active')
}