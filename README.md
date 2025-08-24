# Comunicador Pictográfico para Niños con Autismo

Este proyecto es una aplicación de comunicación asistida por pictogramas, diseñada para ayudar a niños con autismo u otras dificultades de comunicación a expresar sus necesidades y deseos de forma sencilla e intuitiva.

## Stack Tecnológico

*   **Frontend (Web):** React
*   **Frontend (Móvil):** React Native
*   **Backend:** Node.js con Express
*   **Base de Datos:** PostgreSQL
*   **Contenerización:** Docker
*   **Empaquetado:** Electron (Escritorio), Capacitor/Expo (Móvil)

## Funcionalidades

### Clave
*   Tablero de pictogramas inicial con acciones básicas (comer, beber, baño, plaza, dormir, jugar).
*   Construcción de frases mediante la selección de pictogramas.
*   Reproducción de frases completas mediante Text-to-Speech (TTS).
*   Modo edición para familiares: agregar nuevas acciones, imágenes o fotos reales.
*   Modo offline: la aplicación debe poder funcionar sin conexión a internet.

### Adicionales (Opcionales)
*   Historial de frases más usadas.
*   Colores personalizables para preferencias sensoriales.
*   Botón SOS para enviar notificación a un familiar.
*   Multiusuario para distintos niños o necesidades.

## ✅ Plan de Desarrollo

Aquí está nuestro plan de trabajo. Iremos marcando las tareas a medida que las completemos.

### Fase 1: Configuración y Backend

- [x] **1.1.** Crear estructura de directorios del proyecto (`backend`, `frontend`, `mobile`, etc.).
- [x] **1.2.** Inicializar el proyecto de Node.js en la carpeta `backend`.
- [x] **1.3.** Configurar el servidor básico con Express.
- [x] **1.4.** Definir los modelos/esquemas para la base de datos (ej: Pictogramas, Usuarios).
- [x] **1.5.** Crear los endpoints básicos del API REST para los pictogramas (CRUD).
- [x] **1.6.** Configurar Docker y `docker-compose.yml` para levantar el backend y la base de datos PostgreSQL.

### Fase 2: Frontend (Web)

- [x] **2.1.** Inicializar el proyecto de React en la carpeta `frontend`.
- [x] **2.2.** Diseñar y crear el componente del tablero de pictogramas.
- [x] **2.3.** Implementar la lógica para seleccionar pictogramas y construir una frase.
- [x] **2.4.** Conectar el frontend con el API del backend para obtener los pictogramas.
- [x] **2.5.** Integrar una librería de Text-to-Speech (TTS) para leer las frases.

### Fase 3: Funcionalidades Avanzadas

- [x] **3.1.** Desarrollar el "Modo Edición" para que los familiares puedan agregar/editar/eliminar pictogramas. (CRUD completo).
- [x] **3.2.** Implementar la funcionalidad offline (Service Workers en web).

### Fase 4: Empaquetado y Despliegue

- [x] **4.1.** Configurar Electron para empaquetar la aplicación web para escritorio.
- [x] **4.2.** Inicializar y configurar el proyecto de React Native para la versión móvil.

---

## 📌 Estado Actual (24/08/2025)

¡Se ha completado toda la configuración y el desarrollo inicial del proyecto multiplataforma!

*   **Backend:** API REST con Node.js/Express y base de datos PostgreSQL, todo gestionado con Docker.
*   **Frontend Web:** Aplicación completa en React con modo edición (CRUD), Text-to-Speech y capacidades offline (PWA).
*   **App de Escritorio:** Configuración de Electron finalizada. Su prueba está actualmente bloqueada por un problema del entorno de desarrollo local, pero el código está listo.
*   **App Móvil:** Proyecto inicializado con React Native y Expo, con la pantalla principal mostrando los pictogramas desde el backend.

**Próximo paso:** Mejorar la UI/UX y añadir funcionalidades adicionales.

---

## 🚀 Mejoras Futuras y Sugerencias

Aquí hay una lista de posibles próximas funcionalidades y mejoras para el proyecto.

### Mejoras Visuales y de Usabilidad (UI/UX)

- [ ] **Tema y Estilo Consistente:** Crear un archivo de tema (`theme.js` o similar) con colores, fuentes y tamaños definidos para usar tanto en la web como en el móvil.
- [ ] **Animaciones y Feedback Táctil:** Añadir pequeñas animaciones al pulsar un pictograma (que se agrande un poco, o cambie de color su borde).
- [ ] **Iconos Claros:** Usar una librería de iconos como `react-icons` (para web) y `react-native-vector-icons` (para móvil) para los botones de "editar", "borrar", "hablar", etc.
- [ ] **Indicadores de Carga Mejorados (Skeletons):** En lugar de un spinner de carga, mostrar "esqueletos" (placeholders con la forma del contenido que va a cargar).
- [ ] **Paleta de Colores Personalizable:** Implementar la funcionalidad de "colores personalizables" del plan original.

### Mejoras Funcionales

- [ ] **Buscador de Pictogramas:** En el "Modo Edición", añadir una barra de búsqueda para encontrar pictogramas rápidamente.
- [ ] **Categorías:** Permitir agrupar los pictogramas por categorías ("Comida", "Animales", "Acciones").
- [ ] **Historial de Frases:** Implementar el "Historial de frases más usadas".
- [ ] **Arrastrar y Soltar (Drag and Drop):** En la web, permitir que se reordenen los pictogramas en la frase arrastrándolos.
- [ ] **Sonidos de Interacción:** Añadir sonidos sutiles y opcionales al tocar botones o pictogramas.
