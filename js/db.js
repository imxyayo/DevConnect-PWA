const DB_NAME = 'devconnect-db';
const DB_VERSION = 1;
const STORE_NAME = 'posts';

// Inicialización de la Base de Datos 
const dbPromise = idb.openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
    }
});


// C - CREATE / UPDATE: Guardar un post en IndexedDB 
async function guardarPost(post) { 
    const db = await dbPromise; 
    const tx = db.transaction(STORE_NAME, 'readwrite'); 
    await tx.objectStore(STORE_NAME).put(post); 
    await tx.done;
    console.log('[DB] Post guardado en IndexedDB:', post.id); 
}

// R - READ: Obtener todos los posts guardados 
async function obtenerPosts() { 
    const db = await dbPromise; 
    return await db.getAll(STORE_NAME); 
}

// D - DELETE: Eliminar un post por su ID 
async function eliminarPost(id) { 
    const db = await dbPromise; 
    const tx = db.transaction(STORE_NAME, 'readwrite'); 
    await tx.objectStore(STORE_NAME).delete(id); 
    await tx.done; console.log('[DB] Post eliminado de IndexedDB:', id); 
}



// Opcional: Permitir ejecución manual desde la consola del navegador
window.guardarPost = guardarPost;
window.obtenerPosts = obtenerPosts;
window.eliminarPost = eliminarPost;



// C - CREATE / UPDATE: Guardar un post en IndexedDB 
async function guardarPost(post) { 
    const db = await dbPromise; 
    const tx = db.transaction(STORE_NAME, 'readwrite'); 
    await tx.objectStore(STORE_NAME).put(post); 
    await tx.done;
    console.log('[DB] Post guardado en IndexedDB:', post.id); 
}

// R - READ: Obtener todos los posts guardados 
async function obtenerPosts() { 
    const db = await dbPromise; 
    return await db.getAll(STORE_NAME); 
}

// D - DELETE: Eliminar un post por su ID 
async function eliminarPost(id) { 
    const db = await dbPromise; 
    const tx = db.transaction(STORE_NAME, 'readwrite'); 
    await tx.objectStore(STORE_NAME).delete(id); 
    await tx.done; 
    console.log('[DB] Post eliminado de IndexedDB:', id); 
}