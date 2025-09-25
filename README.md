# TP04 - Aplicación de Palabras

## Descripción

Aplicación simple para cargar, guardar y listar palabras usando Node.js, Express y SQLite. Incluye frontend y backend, y un pipeline CI en Azure DevOps.

---

## Ejecución Local

### Prerrequisitos

- Node.js 18.x o superior
- npm
- [Opcional] SQLite3 (si quieres inspeccionar la base de datos manualmente)

### Instalación

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPO>
   cd app-simple-sofi
   ```

2. Instala dependencias en ambos módulos:

   **Backend:**
   ```sh
   cd backend
   npm install
   ```

   **Frontend:**
   ```sh
   cd ../frontend
   npm install
   ```

### Ejecución

1. Inicia el backend:
   ```sh
   cd backend
   npm start
   ```
   El backend corre por defecto en [http://localhost:3001](http://localhost:3001)

2. Inicia el frontend:
   ```sh
   cd ../frontend
   npm start
   ```
   El frontend corre por defecto en [http://localhost:3000](http://localhost:3000)

3. Abre tu navegador y accede a [http://localhost:3000](http://localhost:3000)

---

## Pipeline CI/CD en Azure DevOps

- El pipeline está definido en `azure-pipelines.yml`.
- Se ejecuta automáticamente ante cada push a la rama `main`.
- Realiza los siguientes pasos:
  1. Instala Node.js 18.x en el agente.
  2. Instala dependencias y ejecuta el build de frontend y backend.
  3. Publica los artefactos combinados para despliegue.

### Requisitos del Agente Self-Hosted

- Sistema operativo: Windows
- Node.js 18.x instalado y en el PATH
- Acceso a internet para instalar dependencias npm
- Permisos de escritura en el workspace del agente

---

## Puertos y URLs

| Servicio  | Puerto | URL Local                       |
|-----------|--------|---------------------------------|
| Backend   | 3001   | http://localhost:3001           |
| Frontend  | 3000   | http://localhost:3000           |

---

## Endpoints Principales

- `GET /api/palabras` — Listar todas las palabras
- `POST /api/palabras` — Agregar nueva palabra
- `DELETE /api/palabras/:id` — Eliminar palabra por ID

---

## Notas

- Si cambias los puertos, actualiza las URLs en el frontend para que apunten correctamente al backend.
- El backend crea automáticamente la base de datos `palabras.db` en la carpeta `backend` al iniciar.

---