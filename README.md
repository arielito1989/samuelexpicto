# Comunicador Pictográfico

Este proyecto es una aplicación de comunicación asistida por pictogramas, diseñada para ayudar a niños con autismo u otras dificultades de comunicación. **Actualmente, el proyecto está en transición a una arquitectura 100% local para ofrecer una experiencia de escritorio y móvil más rápida, privada y robusta.**

## ✨ Características Principales

- **Constructor de Frases:** Permite a los usuarios seleccionar una secuencia de pictogramas para construir una frase, con la habilidad de reordenarlos arrastrándolos.
- **Síntesis de Voz (TTS):** Reproduce las frases construidas en voz alta, con opción a seleccionar diferentes voces en español.
- **Gestión de Frases:** Permite guardar frases personalizadas para un acceso rápido. Cada frase puede tener un audio grabado por el usuario, ofreciendo una voz familiar en lugar de una sintética.
- **Diseño Profesional y Accesible:** La interfaz ha sido rediseñada por un profesional UI/UX para ser calma, clara y de alto contraste, ideal para niños con sensibilidades sensoriales.
- **Modo Oscuro:** Incluye un modo oscuro persistente para reducir la fatiga visual.
- **Modo Edición Intuitivo:** Una sección de gestión rediseñada para ser más clara y fácil de usar. Al entrar, un menú principal ofrece tres opciones:
  - **Agregar Contenido:** Un submenú para elegir si se quiere crear un pictograma para construir frases o una frase rápida con audio personalizado.
  - **Editar/Eliminar Pictogramas:** Muestra una cuadrícula con solo los pictogramas básicos para su gestión.
  - **Editar/Eliminar Frases Rápidas:** Muestra una cuadrícula con solo las frases rápidas para su gestión.
- **Multiplataforma (En Transición):**
  - **Escritorio:** El objetivo principal actual es una aplicación nativa para Windows, macOS y Linux usando Electron.
  - **Móvil:** Existe una base de proyecto con React Native para el futuro desarrollo móvil.

## 🛠️ Stack Tecnológico

- **Frontend:** React con Vite.
- **Aplicación de Escritorio:** Electron.
- **Base de Datos Local:** SQLite (a través de `better-sqlite3` y `knex`).

## 🚀 Instalación y Ejecución (Aplicación de Escritorio)

Sigue estos pasos para levantar el entorno de desarrollo local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior).
- `npm` (generalmente se instala con Node.js).

### Pasos

1.  **Clonar el Repositorio**
    ```bash
    git clone <url-del-repositorio>
    cd <nombre-del-repositorio>
    ```

2.  **Instalar Dependencias del Frontend**
    ```bash
    npm install --prefix frontend
    ```

3.  **Ejecutar en Modo Desarrollo**
    Este comando abrirá la aplicación de escritorio en modo de desarrollo con las herramientas de depuración activadas.
    ```bash
    npm run dev:electron --prefix frontend
    ```

4.  **Empaquetar la Aplicación (Opcional)**
    Para generar el instalador final para tu sistema operativo, ejecuta:
    ```bash
    npm run dist:electron --prefix frontend
    ```

## 🐞 Historial de Depuración Reciente (Transición a Local)

Esta sección documenta la serie de errores y soluciones aplicadas para alcanzar una versión local completamente funcional.

1.  **Pictogramas Iniciales No se Muestran**
    *   **Síntoma:** Al iniciar, las imágenes de los pictogramas aparecían rotas, con un error `net::ERR_INVALID_URL` en la consola.
    *   **Causa:** Los datos de las imágenes en el archivo de "seeds" (`initial_pictograms.js`) estaban incompletos (texto `base64` truncado).
    *   **Solución:** Se decidió, junto con el usuario, que la aplicación debía empezar vacía. Se modificó el archivo de seeds para no insertar ningún pictograma inicial.

2.  **Imposibilidad de Editar/Eliminar Contenido**
    *   **Síntoma:** Al intentar eliminar un pictograma, aparecía el error `No handler registered for 'db:delete-pictogram'`.
    *   **Causa:** El proceso principal de Electron (`electron.js`) no tenía la lógica para manejar las peticiones de actualizar o eliminar desde la interfaz.
    *   **Solución:** Se implementaron los manejadores de IPC (`ipcMain.handle`) para todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) tanto para pictogramas como para frases, conectando así el frontend con la base de datos.

3.  **Errores Persistentes en la Aplicación Instalada (.exe)**
    *   **Síntoma:** A pesar de los arreglos, la aplicación instalada seguía mostrando los errores antiguos.
    *   **Causa:** Se estaba instalando una versión antigua. Los cambios en el código fuente no se habían compilado en un nuevo instalador. Además, la base de datos antigua persistía en el directorio `AppData` del usuario, ignorando los cambios en los seeds.
    *   **Solución:** Se estableció el flujo de trabajo correcto: compilar la aplicación con `npm run dist:electron --prefix frontend`, desinstalar la versión anterior, eliminar manualmente la carpeta de datos de la aplicación en `C:\Users\<usuario>\AppData\Roaming\<nombre-app>` y, finalmente, instalar la nueva versión.

4.  **Error "The query is empty" al Iniciar**
    *   **Síntoma:** La aplicación fallaba al inicializar la base de datos después de vaciar el archivo de seeds.
    *   **Causa:** El gestor de base de datos (`knex`) no permite ejecutar una operación de inserción con una lista vacía.
    *   **Solución:** Se modificó la lógica de inicialización en `knex.js` para omitir la ejecución de los seeds si la base de datos se está creando por primera vez.

5.  **Regresión: No se Podían Crear Pictogramas/Frases**
    *   **Síntoma:** Las funciones para crear contenido nuevo dejaron de funcionar.
    *   **Causa:** Se introdujo un error en los manejadores de `electron.js` al usar una variable de base de datos no inicializada (`knex` en lugar de `db`). Adicionalmente, el código del frontend (`App.jsx`) para las frases aún contenía lógica de marcador de posición.
    *   **Solución:** Se corrigió `electron.js` para usar la instancia de base de datos correcta (`db`) en todas las operaciones. Se actualizó `App.jsx` para reemplazar los `console.log` con las llamadas funcionales a la API de Electron.

## 📋 Próximos Pasos y Mejoras

A continuación se detallan las próximas funcionalidades y mejoras estratégicas para hacer la aplicación más robusta, escalable y fácil de usar.

### 1. Nueva Funcionalidad: Carga de Imágenes Locales

La mejora más importante es permitir a los usuarios utilizar sus propias imágenes para los pictogramas.

**Objetivo:** Al crear o editar un pictograma desde `PictogramForm.jsx`, el usuario podrá subir un archivo de imagen (`.png`, `.jpg`) desde su dispositivo.

**Sugerencias de Implementación:**

Existen dos enfoques para manejar los archivos:

*   **Opción A (A corto plazo): Convertir a Base64**
    1.  **Frontend (`PictogramForm.jsx`):** Usar `<input type="file">` y la API `FileReader` para convertir la imagen seleccionada en un string `base64`.
    2.  **Backend (`electron.js`):** Enviar este string a través de IPC y guardarlo directamente en la columna `imageUrl` de la base de datos.
    *   **Ventaja:** Implementación rápida que no requiere cambios en la lógica del backend para manejar archivos.
    *   **Desventaja:** Aumenta significativamente el tamaño de la base de datos, lo que puede causar problemas de rendimiento a largo plazo.

*   **Opción B (Recomendada, a largo plazo): Almacenar Archivos Físicamente**
    1.  **Frontend (`PictogramForm.jsx`):** Al seleccionar un archivo, enviar la ruta del archivo (ej: `C:\Users\Juan\Pictures\gato.png`) al proceso principal a través de un nuevo canal IPC.
    2.  **Backend (`electron.js`):**
        *   Recibir la ruta temporal del archivo.
        *   Copiar el archivo a una carpeta segura y persistente dentro de los datos de la aplicación (usando `app.getPath('userData')`).
        *   Guardar la **nueva ruta local y permanente** de la imagen en la base de datos (ej: `C:\Users\Juan\AppData\Roaming\comunicador-pictografico\images\gato_16938488.png`).
    *   **Ventaja:** Mantiene la base de datos ligera y rápida. Es una solución mucho más escalable y robusta.

### 2. Pruebas Automatizadas para Evitar Regresiones

El historial de depuración muestra que se han introducido regresiones. Para garantizar la estabilidad a futuro, es crucial añadir pruebas automatizadas.

*   **Herramienta Sugerida:** [**Vitest**](https://vitest.dev/), por su perfecta integración con Vite.
*   **Objetivos de Prueba:**
    *   **Componentes de React:** Asegurar que renderizan correctamente.
    *   **Lógica de Base de Datos:** Probar las funciones CRUD en `electron.js` de forma aislada.
    *   **Comunicación IPC:** Simular eventos para verificar que los manejadores responden como se espera.

### 3. Gestión de Estado Centralizada

Para evitar la complejidad de pasar `props` por múltiples niveles de componentes (`prop drilling`), se recomienda centralizar el estado de la aplicación.

*   **Herramienta Sugerida:** [**Zustand**](https://zustand-demo.pmnd.rs/), una librería de gestión de estado minimalista y potente.
*   **Beneficios:** Simplifica la lógica, facilita la depuración y hace que el código sea más mantenible a medida que se añaden nuevas características.

### 4. Categorización y Búsqueda de Contenido

A medida que la biblioteca de pictogramas y frases crezca, encontrarlos será un desafío.

*   **Mejoras Sugeridas:**
    *   **Categorías:** Añadir una tabla `categories` a la base de datos y permitir al usuario agrupar su contenido.
    *   **Búsqueda:** Implementar un campo de búsqueda en la interfaz para filtrar pictogramas y frases por su nombre.

### 5. Funcionalidad de Exportación e Importación

Para dar seguridad a los usuarios, sería muy valioso permitirles crear copias de seguridad de su contenido.

*   **Implementación:** Crear funciones para exportar todos los pictogramas, frases y audios personalizados a un único archivo comprimido (`.zip`) que pueda ser importado de nuevo en la misma o en otra instalación de la aplicación.

## 🧹 Refactorización Arquitectónica: Transición a 100% Local

Esta sección documenta los pasos tomados para convertir el proyecto de una arquitectura cliente-servidor (conectada a servicios como Render/Vercel) a una aplicación de escritorio y móvil completamente autónoma y local.

### ☑ Paso 1: Eliminación del Backend Heredado y Archivos Obsoletos

*   **Objetivo:** Eliminar toda la infraestructura del antiguo backend que se conectaba a una base de datos en Render. La nueva arquitectura consiste en una aplicación local que maneja sus propios datos y una página web estática (desplegada en Vercel) que solo sirve para promocionar y ofrecer la descarga de la aplicación.
*   **Acción:** Se eliminarán los siguientes archivos y directorios por las razones que se detallan:
    *   `backend/`: Contenía todo el código del servidor (Node.js, Express, Sequelize), modelos y configuraciones de la base de datos remota.
    *   `docker-compose.yml`: Se utilizaba para orquestar la base de datos PostgreSQL para el desarrollo local del antiguo backend.
    *   `postgres_data/` y `database/`: Almacenaban datos y configuraciones relacionadas con la base de datos obsoleta.
*   **Comando a ejecutar:**
    ```bash
    rd /s /q backend database postgres_data && del docker-compose.yml
    ```
*   **Resultado:** El proyecto quedará limpio de código innecesario y se eliminará cualquier posible credencial sensible que estuviera en los archivos de configuración del backend.