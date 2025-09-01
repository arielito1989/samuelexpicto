# Comunicador Pictográfico

Este proyecto es una aplicación de comunicación asistida por pictogramas, diseñada para ser una herramienta rápida, privada y robusta para niños con autismo u otras dificultades de comunicación.

La arquitectura del proyecto se divide en dos componentes principales:

1.  **Aplicación de Escritorio (Electron):** Es el programa principal, 100% local y funcional sin conexión a internet. Aquí los usuarios interactúan con los pictogramas, construyen frases y utilizan todas las características de la aplicación.
2.  **Página Web (Landing Page):** Es un sitio web estático (diseñado para Vercel/Netlify) que actúa como un escaparate. Su propósito es describir la aplicación, mostrar sus beneficios y proporcionar un enlace para descargar la versión de escritorio.

## ✨ Características de la Aplicación

- **Constructor de Frases:** Permite a los usuarios seleccionar una secuencia de pictogramas para construir una frase, con la habilidad de reordenarlos arrastrándolos.
- **Síntesis de Voz (TTS):** Reproduce las frases construidas en voz alta.
- **Personalización Profunda:**
    - **Imágenes Propias:** Los usuarios pueden reemplazar los pictogramas genéricos con sus propias fotos, creando una conexión más personal y reconocible.
    - **Voz Familiar:** Se pueden grabar clips de audio personalizados para las frases, permitiendo que el niño escuche una voz familiar en lugar de una sintética.
- **Diseño Profesional y Accesible:** La interfaz ha sido diseñada para ser calma, clara y de alto contraste, ideal para niños con sensibilidades sensoriales. Incluye un modo oscuro persistente.
- **Gestión de Contenido Intuitiva:** Un "Modo Edición" claro y fácil de usar para añadir, editar o eliminar pictogramas y frases personalizadas.

## 🛠️ Stack Tecnológico

- **React con Vite:** Base para toda la interfaz de usuario, tanto en la aplicación de escritorio como en la página web.
- **Electron:** Permite empaquetar la aplicación de React como una aplicación nativa de escritorio (Windows, macOS, Linux).
- **SQLite:** Base de datos local, ligera y basada en archivos, gestionada a través de `better-sqlite3` y `knex`.

## 🌐 Próximo Objetivo: Construcción de la Página de Aterrizaje

El siguiente gran paso es desarrollar la página web informativa. Esta página no será la aplicación en sí, sino un sitio de marketing y descarga.

### Estructura de la Página

Se implementó un renderizado condicional en `main.jsx`: si el entorno es Electron, se carga la aplicación; si es un navegador web, se carga la `LandingPage`. La página se ha maquetado con las siguientes secciones:

1.  **☑ Sección Hero:**
    *   **Contenido:** Titular emotivo, subtítulo explicativo y un botón principal de "Descargar Aplicación".
    *   **Visual:** Imagen de fondo de alta calidad y acogedora.

2.  **☑ Sección "Cómo Funciona":**
    *   **Contenido:** Explicación sencilla del constructor de frases.
    *   **Visual:** Marcador de posición visual estilizado.

3.  **☑ Sección de Características Principales:**
    *   **Personalización Total:** Explica la carga de imágenes y la grabación de audio.
    *   **Diseñada para la Calma:** Muestra el diseño de la interfaz, incluyendo el modo claro y oscuro.
    *   **Visual:** Marcadores de posición visuales estilizados para cada característica.

4.  **☑ Sección Final de Llamada a la Acción (CTA):**
    *   **Contenido:** Mensaje final de ánimo.
    *   **Acción:** Un último y prominente botón de "Descargar Aplicación".

## 📱 Próximo Gran Objetivo: Desarrollo de la Aplicación Móvil

Con la aplicación de escritorio y la página de aterrizaje finalizadas, el siguiente gran paso es dar vida a la versión móvil.

El objetivo es utilizar la base del proyecto existente en la carpeta `/mobile` (creada con React Native y Expo) para desarrollar una aplicación funcional para Android y iOS, reutilizando la lógica y los componentes que sean posibles.

### Fases Iniciales del Desarrollo Móvil

1.  **☐ Análisis del Entorno:** Inspeccionar el directorio `/mobile`, revisar su `package.json` y entender la estructura y dependencias actuales.
2.  **☐ Instalación y Ejecución:** Instalar las dependencias del proyecto móvil y ponerlo en marcha en un entorno de desarrollo (Expo Go) para verificar su estado inicial.
3.  **☐ Conexión con la Lógica Local:** Adaptar la lógica de la base de datos (que ahora es local en el escritorio) a un formato compatible con el almacenamiento del dispositivo móvil (ej. SQLite para móviles).

## 🚀 Instalación y Ejecución (Entorno de Desarrollo)

Sigue estos pasos para levantar la aplicación de escritorio en tu máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior) y `npm`.

### Pasos

1.  **Clonar el Repositorio:** `git clone <url-del-repositorio> && cd <nombre-del-repositorio>`
2.  **Instalar Dependencias:** `npm install --prefix frontend`
3.  **Ejecutar en Modo Desarrollo:** `npm run dev:electron --prefix frontend`
4.  **Empaquetar la Aplicación (Opcional):** `npm run dist:electron --prefix frontend`

---
*Las siguientes secciones son un registro histórico del desarrollo y pueden ser eliminadas o archivadas en el futuro.*

## 🧹 Refactorización Arquitectónica: Transición a 100% Local

Esta sección documenta los pasos tomados para convertir el proyecto a una aplicación completamente autónoma.

### ☑ Paso 1: Eliminación del Backend Heredado y Archivos Obsoletos

*   **Objetivo:** Eliminar la infraestructura del antiguo backend (Node.js, PostgreSQL) que se conectaba a Render.
*   **Acción:** Se eliminaron los directorios `backend/`, `postgres_data/`, `database/` y el archivo `docker-compose.yml`.
*   **Resultado:** El proyecto quedó limpio de código innecesario y de posibles credenciales sensibles.

## 🐞 Historial de Depuración Reciente

Esta sección documenta la serie de errores y soluciones aplicadas durante la transición a una versión local funcional.
*(Se mantiene el historial de depuración anterior para referencia)*

1.  **Pictogramas Iniciales No se Muestran**
2.  **Imposibilidad de Editar/Eliminar Contenido**
3.  **Errores Persistentes en la Aplicación Instalada (.exe)**
4.  **Error "The query is empty" al Iniciar**
5.  **Regresión: No se Podían Crear Pictogramas/Frases**
