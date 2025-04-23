//Importar el archivo de funciones
import { validarLogin } from "./login.js"

document.addEventListener("click", (clic)=>{
    //console.log(clic)
    if(clic.target.matches("#informes")) url("login old.html")
    if(clic.target.matches("#exit")) url("index.html")
    if(clic.target.matches(".mobile-menu")) document.getElementById('sidebar').classList.toggle('active')
})

document.addEventListener("submit", (e)=>{
    e.preventDefault()
    //console.log(e.target)
    if(e.target.matches("#loginForm")) validarLogin()
})

// Cambiar secciones
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