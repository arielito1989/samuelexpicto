# Comunicador Pictográfico

Este proyecto es una aplicación de comunicación asistida por pictogramas, diseñada para ayudar a niños con autismo u otras dificultades de comunicación a expresar sus necesidades y deseos de forma sencilla e intuitiva. La aplicación es multiplataforma y funciona en la web, como aplicación de escritorio (Windows, macOS, Linux) y tiene una base para desarrollo móvil.

## ✨ Características Principales

- **Constructor de Frases:** Permite a los usuarios seleccionar una secuencia de pictogramas para construir una frase.
- **Síntesis de Voz (TTS):** Reproduce las frases construidas en voz alta, con opción a seleccionar diferentes voces en español.
- **Frases Rápidas:** Un modo alternativo que permite guardar y reproducir frases completas de uso frecuente con un solo clic.
- **Modo Edición:** Una sección protegida para que familiares o tutores puedan gestionar el contenido:
  - **CRUD de Pictogramas:** Añadir, editar o eliminar pictogramas.
  - **CRUD de Frases Rápidas:** Añadir, editar o eliminar frases de uso frecuente.
  - **Buscador:** Encontrar pictogramas rápidamente por su nombre.
- **Personalización Visual:** Permite cambiar los colores principales de la interfaz (primario, fondo, superficie y texto) para adaptarse a las preferencias sensoriales del usuario. La selección se guarda localmente.
- **Multiplataforma:**
  - **Web:** Aplicación web progresiva (PWA) completamente funcional.
  - **Escritorio:** Empaquetada con Electron para una experiencia nativa en sistemas operativos de escritorio.
  - **Móvil:** Estructura de proyecto inicializada con React Native y Expo.

## 🛠️ Stack Tecnológico

- **Backend:** Node.js con Express y Sequelize (para el ORM con PostgreSQL).
- **Frontend (Web y Escritorio):** React con Vite.
- **Base de Datos:** PostgreSQL.
- **Contenerización:** Docker y Docker Compose.
- **Empaquetado de Escritorio:** Electron.

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo completo.

### Prerrequisitos

- [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose.
- [Node.js](https://nodejs.org/) (versión 18 o superior).
- `npm` (generalmente se instala con Node.js).

### Pasos

1.  **Clonar el Repositorio (si aplica)**
    ```bash
    git clone <url-del-repositorio>
    cd <nombre-del-repositorio>
    ```

2.  **Levantar los Servicios de Backend y Base de Datos**

    Desde la raíz del proyecto, ejecuta el siguiente comando. Esto creará y levantará los contenedores para la API (backend) y la base de datos PostgreSQL.

    ```bash
    docker-compose up -d
    ```

3.  **Instalar Dependencias y Ejecutar el Frontend**

    Desde la raíz del proyecto, ejecuta los siguientes comandos. El primero instalará las dependencias del frontend y el segundo iniciará el servidor de desarrollo de Vite.

    ```bash
    npm install --prefix frontend
    npm run dev --prefix frontend
    ```

4.  **¡Listo!**

    Abre tu navegador y visita [http://localhost:5173](http://localhost:5173) para ver la aplicación en funcionamiento.

### Scripts Útiles

-   `frontend/npm run dev`: Inicia el servidor de desarrollo web.
-   `frontend/npm run build`: Compila el proyecto de React para producción.
-   `frontend/npm run dist:electron`: Empaqueta la aplicación en un ejecutable de escritorio.
-   `docker-compose logs -f api`: Muestra los logs en tiempo real del contenedor del backend.
-   `docker-compose down`: Detiene y elimina los contenedores.

## 📝 Nota sobre la Base de Datos

Este proyecto utiliza `sequelize.sync({ alter: true })` en el backend. Esto significa que cada vez que el servidor de la API se inicia, Sequelize intentará alterar las tablas existentes en la base de datos para que coincidan con la definición de los modelos. Es un método muy conveniente para el desarrollo, pero no se recomienda para un entorno de producción.

## 📋 Funcionalidades Futuras (Pendientes)

-   [ ] **Categorías:** Permitir agrupar los pictogramas por categorías ("Comida", "Animales", "Acciones").
-   [ ] **Historial de Frases:** Implementar el "Historial de frases más usadas".
-   [ ] **Arrastrar y Soltar (Drag and Drop):** En la web, permitir que se reordenen los pictogramas en la frase arrastrándolos.
-   [ ] **Sonidos de Interacción:** Añadir sonidos sutiles y opcionales al tocar botones o pictogramas.
-   [ ] **Desarrollo Móvil:** Continuar el desarrollo de la aplicación móvil con React Native.

---

## 🚀 Plan de Despliegue a Producción

Esta es la lista de tareas para desplegar la aplicación y hacerla accesible desde internet, logrando un ejecutable final verdaderamente portátil.

### Backend (Despliegue en Render)
- [x] **1.1.** Preparar la configuración de la base de datos para Render (`config.js`).
- [x] **1.2.** Crear una nueva base de datos PostgreSQL en Render.
- [x] **1.3.** Crear un nuevo "Web Service" en Render para el backend.
- [x] **1.4.** Configurar las variables de entorno en Render.
- [x] **1.5.** Desplegar el código del `backend` a Render.

### Frontend (Despliegue en Vercel)
- [ ] **2.1.** Actualizar el código del frontend para que se conecte a la URL pública de la API de Render.
- [ ] **2.2.** Desplegar el `frontend` en Vercel.

### Aplicación de Escritorio (Versión Final)
- [ ] **3.1.** Generar el ejecutable final de Electron que se conecta a la API en la nube.