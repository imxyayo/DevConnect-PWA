// js/app.js - App Shell, Service Worker y Renderizado Dinámico (CSR)

console.log('App Shell de DevConnect inicializado correctamente.');

// Evento para el botón de recargar
const btnSync = document.getElementById('btn-sync');
if (btnSync) {
    btnSync.addEventListener('click', () => {
        alert('Pronto aquí implementaremos la sincronización con Background Sync.');
    });
}

// 1. Verificamos si el navegador soporta Service Workers
if ('serviceWorker' in navigator) {
    // 2. Registramos el Service Worker usando ruta relativa
    navigator.serviceWorker.register('./sw.js')
        .then(registro => {
            console.log('¡Éxito! Service Worker registrado correctamente.', registro);
        })
        .catch(error => {
            console.warn('Error al registrar el Service Worker:', error);
        });
} else {
    console.error('Este navegador no soporta Service Workers.');
}

// 3. Renderizado Dinámico CSR (Client-Side Rendering)
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
});

function renderPosts() {
    const feedContainer = document.getElementById('feed');
    if (!feedContainer) return;

    // Arreglo de publicaciones dinámicas (mínimo 3 elementos)
    const posts = [
        {
            autor: 'Profesor Web',
            tiempo: 'Hace 2 minutos',
            contenido: '¡Bienvenidos a nuestra red social de la clase! Pronto esta app funcionará 100% sin conexión. 🚀',
            avatarBg: 'bg-blue-500'
        },
        {
            autor: 'Jair Prieto',
            tiempo: 'Hace 15 minutos',
            contenido: 'Probando la Splash Screen y el renderizado dinámico mediante CSR en DevConnect. 💻✨',
            avatarBg: 'bg-emerald-500'
        },
        {
            autor: 'DevConnect Bot',
            tiempo: 'Hace 1 hora',
            contenido: 'El App Shell y los recursos estáticos se cargan dinámicamente desde el cliente.',
            avatarBg: 'bg-purple-500'
        }
    ];

    // Limpiamos el contenedor
    feedContainer.innerHTML = '';

    // Renderizamos cada elemento dentro del feed
    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'bg-white p-4 rounded-lg shadow mb-4 transition hover:shadow-md';
        article.innerHTML = `
            <div class="flex items-center mb-3">
                <div class="w-10 h-10 rounded-full ${post.avatarBg} flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                    ${post.autor.charAt(0)}
                </div>
                <div>
                    <h2 class="font-bold text-gray-800">${post.autor}</h2>
                    <p class="text-xs text-gray-500">${post.tiempo}</p>
                </div>
            </div>
            <p class="text-gray-700 leading-relaxed">${post.contenido}</p>
        `;
        feedContainer.appendChild(article);
    });

    console.log('CSR: 3 publicaciones renderizadas dinámicamente en el cliente.');
}