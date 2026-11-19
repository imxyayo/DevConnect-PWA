document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-post');
    
    // 1. Cargar y renderizar posts guardados en IndexedDB al abrir la app
    cargarYRenderizarPosts();

    // 2. Escuchar la creación de nuevos elementos
    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const textoInput = document.getElementById('input-contenido').value;
            if (!textoInput.trim()) return;

            // Objeto nuevo con ID único basado en timestamp
            const nuevoPost = {
                id: Date.now().toString(),
                autor: 'Desarrollador Local',
                contenido: textoInput,
                fecha: new Date().toLocaleTimeString()
            };

            // Guardamos en IndexedDB (Funciona 100% Offline)
            await guardarPost(nuevoPost);
            
            // Limpiamos el formulario y actualizamos la pantalla
            formulario.reset();
            await cargarYRenderizarPosts();
        });
    }
});

// Función para leer desde IndexedDB y pintar en la pantalla 
async function cargarYRenderizarPosts() { 
    const feedContainer = document.getElementById('feed'); 
    if (!feedContainer) return;

    // Leemos directamente de la base de datos del navegador
    const posts = await obtenerPosts();
    feedContainer.innerHTML = '';

    if (posts.length === 0) {
        feedContainer.innerHTML = '<p class="text-center text-gray-500 py-4">No hay publicaciones locales.</p>';
        return;
    }

    // Pintamos los registros guardados
    posts.forEach(post => {
        feedContainer.innerHTML += `
            <article class="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-start">
                <div>
                    <div class="flex items-center mb-1">
                        <span class="font-bold text-gray-800 text-sm mr-2">${post.autor}</span>
                        <span class="text-xs text-gray-400">${post.tiempo}</span>
                    </div>
                    <p class="text-gray-700">${post.contenido}</p>
                </div>
                <button onclick="borrarPostHandler('${post.id}')" class="text-red-500 hover:text-red-700 text-xs p-1">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </article>
        `;
    });
}

// Handler global para eliminar un registro 
async function borrarPostHandler(id) { 
    await eliminarPost(id); 
    await cargarYRenderizarPosts(); 
}