# Comunicador Pictográfico

Este proyecto es una aplicación de comunicación asistida por pictogramas, diseñada para ayudar a niños con autismo u otras dificultades de comunicación a expresar sus necesidades y deseos de forma sencilla e intuitiva. La aplicación es multiplataforma y funciona en la web, como aplicación de escritorio (Windows, macOS, Linux) y tiene una base para desarrollo móvil.

## ✨ Características Principales

- **Constructor de Frases:** Permite a los usuarios seleccionar una secuencia de pictogramas para construir una frase, con la habilidad de reordenarlos arrastrándolos.
- **Síntesis de Voz (TTS):** Reproduce las frases construidas en voz alta, con opción a seleccionar diferentes voces en español.
- **Frases Rápidas:** Un modo alternativo que permite guardar y reproducir frases completas de uso frecuente con un solo clic.
- **Diseño Profesional y Accesible:** La interfaz ha sido rediseñada por un profesional UI/UX para ser calma, clara y de alto contraste, ideal para niños con sensibilidades sensoriales.
- **Modo Oscuro:** Incluye un modo oscuro persistente para reducir la fatiga visual.
- **Modo Edición:** Una sección protegida para que familiares o tutores puedan gestionar el contenido:
  - **CRUD de Pictogramas:** Añadir, editar o eliminar pictogramas.
  - **CRUD de Frases Rápidas:** Añadir, editar o eliminar frases de uso frecuente.
  - **Buscador:** Encontrar pictogramas rápidamente por su nombre.
- **Multiplataforma:**
  - **Web:** Aplicación web progresiva (PWA) completamente funcional.
  - **Escritorio:** Empaquetada con Electron para una experiencia nativa en sistemas operativos de escritorio.
  - **Móvil:** Estructura de proyecto inicializada con React Native y Expo.

## 🛠️ Stack Tecnológico

- **Backend:** Node.js con Express y Sequelize (para el ORM con PostgreSQL).
- **Frontend (Web y Escritorio):** React con Vite y @hello-pangea/dnd para Drag and Drop.
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
    docker-compose up --build -d
    ```

3.  **Instalar Dependencias**

    ```bash
    npm install --prefix frontend
    ```

4.  **Poblar la Base de Datos (Solo la primera vez)**

    Ejecuta el siguiente comando para llenar la base de datos con los pictogramas iniciales.
    ```bash
    docker-compose exec api npx sequelize-cli db:seed:all
    ```

5.  **Ejecutar el Frontend**

    ```bash
    npm run dev --prefix frontend
    ```

6.  **¡Listo!**

    Abre tu navegador y visita [http://localhost:5173](http://localhost:5173) para ver la aplicación en funcionamiento.

### Scripts Útiles

-   `frontend/npm run dev`: Inicia el servidor de desarrollo web.
-   `frontend/npm run build`: Compila el proyecto de React para producción.
-   `frontend/npm run dist:electron`: Empaqueta la aplicación en un ejecutable de escritorio.
-   `docker-compose logs -f api`: Muestra los logs en tiempo real del contenedor del backend.
-   `docker-compose down`: Detiene y elimina los contenedores.

## 📝 Nota sobre la Base de Datos

El proyecto está configurado para usar migraciones y seeders de Sequelize para gestionar la base de datos. La sincronización automática (`sequelize.sync`) ha sido eliminada para garantizar un control explícito y seguro sobre el esquema de la base de datos, especialmente en producción.

## 📋 Historial de Mejoras y Funcionalidades Futuras

-   [x] **Rediseño UI/UX:** Se ha aplicado un rediseño visual completo para una apariencia más profesional, limpia y accesible.
-   [x] **Modo Oscuro:** Añadir un tema oscuro para reducir la fatiga visual.
-   [x] **Arrastrar y Soltar (Drag and Drop):** En la web, permitir que se reordenen los pictogramas en la frase arrastrándolos.
-   [ ] **Categorías:** Permitir agrupar los pictogramas por categorías ("Comida", "Animales", "Acciones").
-   [ ] **Búsqueda por Categorías:** Además de la búsqueda por texto, permitir filtrar los pictogramas por las categorías creadas.
-   [ ] **Historial de Frases:** Implementar un historial de frases creadas para un acceso rápido y repetido.
-   [ ] **Personalización de la Voz:** Permitir ajustar la velocidad y el tono de la voz de la síntesis de voz.
-   [ ] **Exportar/Importar Contenido:** Permitir exportar e importar los pictogramas y frases.
-   [ ] **Perfiles de Usuario:** Permitir crear múltiples perfiles de usuario.
-   [ ] **Estadísticas de Uso:** Mostrar estadísticas sobre los pictogramas y frases más utilizados.
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
- [x] **2.1.** Actualizar el código del frontend para que se conecte a la URL pública de la API de Render.
- [x] **2.2.** Desplegar el `frontend` en Vercel.

La aplicación está disponible en: [https://samuelexpicto.vercel.app](https://samuelexpicto.vercel.app)

### Aplicación de Escritorio (Versión Final)
- [ ] **3.1.** Generar el ejecutable final de Electron que se conecta a la API en la nube.