const API_URL = 'http://localhost:3000/api';

// Cargar palabras al inicio
document.addEventListener('DOMContentLoaded', function() {
    cargarPalabras();
    
    // Permitir agregar palabra con Enter
    document.getElementById('palabraInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarPalabra();
        }
    });
});

// Función para cargar y mostrar todas las palabras
async function cargarPalabras() {
    try {
        const response = await fetch(`${API_URL}/palabras`);
        const palabras = await response.json();
        
        const listaPalabras = document.getElementById('listaPalabras');
        
        if (palabras.length === 0) {
            listaPalabras.innerHTML = '<p style="text-align: center; color: #666;">No hay palabras guardadas</p>';
            return;
        }
        
        listaPalabras.innerHTML = palabras.map(palabra => `
            <div class="palabra-item">
                <span><strong>${palabra.palabra}</strong></span>
                <button class="delete-btn" onclick="eliminarPalabra(${palabra.id})">
                    Eliminar
                </button>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error al cargar palabras:', error);
        mostrarMensaje('Error al cargar las palabras', 'error');
    }
}

// Función para agregar una nueva palabra
async function agregarPalabra() {
    const palabraInput = document.getElementById('palabraInput');
    const palabra = palabraInput.value.trim();
    
    if (!palabra) {
        mostrarMensaje('Por favor ingresa una palabra', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/palabras`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ palabra: palabra })
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            mostrarMensaje('Palabra agregada exitosamente', 'exito');
            palabraInput.value = ''; // Limpiar input
            cargarPalabras(); // Recargar lista
        } else {
            mostrarMensaje(resultado.error || 'Error al agregar palabra', 'error');
        }
        
    } catch (error) {
        console.error('Error al agregar palabra:', error);
        mostrarMensaje('Error al agregar la palabra', 'error');
    }
}

// Función para eliminar una palabra
async function eliminarPalabra(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta palabra?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/palabras/${id}`, {
            method: 'DELETE'
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            mostrarMensaje('Palabra eliminada exitosamente', 'exito');
            cargarPalabras(); // Recargar lista
        } else {
            mostrarMensaje(resultado.error || 'Error al eliminar palabra', 'error');
        }
        
    } catch (error) {
        console.error('Error al eliminar palabra:', error);
        mostrarMensaje('Error al eliminar la palabra', 'error');
    }
}

// Función para mostrar mensajes al usuario
function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerHTML = `<div class="mensaje ${tipo}">${texto}</div>`;
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.innerHTML = '';
    }, 3000);
}