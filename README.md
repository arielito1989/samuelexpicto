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

## 📋 Hoja de Ruta: Transición a Aplicación Local

El foco actual del proyecto es transformar la aplicación web en una aplicación de escritorio completamente funcional y autónoma.

-   [ ] **Fase 1: Aplicación de Escritorio Local**
    -   [x] **Integrar SQLite:** Configurar y preparar la base de datos local (`knex`, `better-sqlite3`, migraciones y seeds).
    -   [x] **Migrar Lógica de Backend:**
        - [x] CRUD de Pictogramas
        - [x] CRUD de Frases
    -   [x] **Crear Puente de Comunicación:**
        - [x] Creado el puente de comunicación (`preload.js`).
        - [x] Implementados todos los canales para Pictogramas y Frases.
    -   [x] **Conectar Frontend:**
        - [x] Conectado el CRUD de Pictogramas.
        - [x] Conectar el CRUD de Frases.
    -   [x] **Gestión de Archivos Locales:** Adaptar el sistema de grabación y reproducción de audio para que funcione con archivos guardados en el computador del usuario.

-   [ ] **Fase 2: Aplicación Móvil (Futuro)**
    -   [ ] Retomar el desarrollo de la aplicación móvil con React Native, aplicando la misma arquitectura de base de datos local.

## ✅ Historial de Mejoras (Funcionalidad Base)

-   [x] **Rediseño UI/UX:** Se ha aplicado un rediseño visual completo para una apariencia más profesional, limpia y accesible.
-   [x] **Modo Oscuro:** Añadir un tema oscuro para reducir la fatiga visual.
-   [x] **Arrastrar y Soltar (Drag and Drop):** En la web, permitir que se reordenen los pictogramas en la frase arrastrándolos.
-   [x] **Gestión de Frases con Audio:** Se ha implementado un sistema completo (CRUD) para crear, editar y eliminar frases personalizadas.
-   [x] **Grabación de Voz:** Se ha añadido la capacidad de grabar una voz personalizada para las frases, permitiendo una comunicación más personal y familiar.
