// Registro del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('¡Éxito! Service Worker registrado correctamente.', reg))
        .catch(err => console.warn('Error al registrar el Service Worker:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-post');
    const modal = document.getElementById('modal-post');
    const btnFab = document.getElementById('btn-fab');
    const btnCerrar = document.getElementById('btn-cerrar-modal');
    const btnCancelar = document.getElementById('btn-cancelar-modal');

    // Abrir y cerrar modal
    const abrirModal = () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };
    const cerrarModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    if (btnFab) btnFab.addEventListener('click', abrirModal);
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (btnCancelar) btnCancelar.addEventListener('click', cerrarModal);

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
                autor: 'Jair Prieto',
                contenido: textoInput.trim(),
                fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            // Guardamos en IndexedDB (Funciona 100% Offline)
            await guardarPost(nuevoPost);

            // Limpiamos el formulario, cerramos modal y actualizamos pantalla
            formulario.reset();
            cerrarModal();
            await cargarYRenderizarPosts();
        });
    }
});

// Función para leer desde IndexedDB y pintar en la pantalla
async function cargarYRenderizarPosts() {
    const feedContainer = document.getElementById('feed');
    if (!feedContainer) return;

    const posts = await obtenerPosts();
    feedContainer.innerHTML = '';

    if (posts.length === 0) {
        feedContainer.innerHTML = '<p class="text-center text-gray-500 py-8 text-sm">No hay publicaciones locales. Toca el botón azul para agregar una.</p>';
        return;
    }

    // Pintamos los registros guardados (los más recientes arriba)
    posts.reverse().forEach(post => {
        feedContainer.innerHTML += `
            <article class="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-start">
                <div>
                    <div class="flex items-center mb-1">
                        <span class="font-bold text-gray-800 text-sm mr-2">${post.autor}</span>
                        <span class="text-xs text-gray-400">${post.fecha}</span>
                    </div>
                    <p class="text-gray-700 text-sm">${post.contenido}</p>
                </div>
                <button onclick="borrarPostHandler('${post.id}')" class="text-red-500 hover:text-red-700 text-xs p-1" title="Eliminar">
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