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

### Nueva Funcionalidad: Carga de Imágenes Locales

La próxima gran mejora será permitir a los usuarios usar sus propias imágenes para los pictogramas, en lugar de depender de URLs de internet.

**Objetivo:**

Al crear o editar un pictograma, el usuario tendrá la opción de subir un archivo de imagen (`.png`, `.jpg`) desde su dispositivo. En el futuro, en plataformas móviles, esto podría extenderse a tomar una foto directamente desde la cámara.

**Sugerencias de Implementación:**

1.  **Modificar el Formulario (`PhraseForm.jsx`):**
    *   Añadir un botón "Subir Archivo" que abrirá un diálogo para seleccionar archivos.
    *   El campo de texto actual para la URL de la imagen puede eliminarse o mantenerse como una opción alternativa.

2.  **Manejar la Carga de Archivos en React:**
    *   Utilizar un elemento `<input type="file" accept="image/*" />` para la selección de archivos.
    *   Una vez que el usuario selecciona un archivo, usar la API `FileReader` del navegador para leer el archivo local.
    *   Convertir la imagen leída a una cadena de texto en formato `base64`.

3.  **Guardado en la Base de Datos:**
    *   El string `base64` generado se guardará en la columna `imageUrl` de la base de datos, de la misma forma que se haría con una URL. **No se requieren cambios en el backend (`electron.js`) para esta primera implementación**, ya que la base de datos simplemente almacenará el texto.

4.  **Mejora de Rendimiento (Futuro):**
    *   **Problema:** Almacenar imágenes como `base64` directamente en la base de datos puede hacerla muy pesada con el tiempo.
    *   **Solución a futuro:** Se podría implementar una lógica más avanzada donde, al subir una imagen, se copie el archivo a una carpeta segura dentro de los datos de la aplicación (`app.getPath('userData')`) y en la base de datos solo se guarde la ruta a ese archivo local. Esto requeriría nuevas funciones en `electron.js` para manejar la escritura y lectura de archivos de forma segura.
