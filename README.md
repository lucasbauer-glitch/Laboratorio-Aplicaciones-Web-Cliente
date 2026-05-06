
# Laboratorio-Aplicaciones-Web-Cliente
*
# 🛒 E-commerce: Mi Tienda

Este proyecto es un e-commerce desarrollado como práctica de laboratorio. La aplicación web simula una tienda en línea funcional donde los usuarios pueden explorar un catálogo de productos (visualizándolos en detalle a través de un modal), gestionar sus compras mediante un carrito interactivo y mantener su sesión de compra guardada gracias a la persistencia de datos.

## Tecnologias Utilizadas

*   **HTML5 & CSS3**
*   **JavaScript (Vanilla)**
*   **Fetch API** (Para el consumo de datos externos)
*   **Local Storage** (Para la persistencia del carrito de compras)
*   **SweetAlert2** (Para el manejo de alertas y notificaciones UI)

---

*   **[@mateomackinson-wq](https://github.com/mateomackinson-wq)**
    *   **Modal del Producto:** Creación del modal interactivo que incluye la descripción, título, precio, botón de cierre y la funcionalidad desde el botón de agregar al carrito.
    *   **Apertura del Carrito:** Implementación del botón para abrir el carrito.
    *   **Modal del Carrito:** Maquetación e implementación de la estructura del modal del carrito de compras.
    *   **Animación del Carrito:** Desarrollo del evento al apretar el botón del carrito para que el modal se deslice en la pantalla, incluyendo su CSS asociado.
    *   **Renderizado de Productos:** Lógica para renderizar dinámicamente los productos dentro del modal utilizando los datos guardados en el `localStorage`.
    *   **Estilos del Carrito:** Desarrollo del CSS específico para la correcta visualización de los productos dentro del modal.
      
*   **[@lucasbauer-glitch](https://github.com/lucasbauer-glitch)**
    * **Integración de API y Renderizado Dinámico:** 
        * Desarrollo del método para consumir la API externa y obtener el catálogo de productos.
        * Renderizado dinámico de los artículos directamente en la vista principal (`index.html`).
    * **Diseño e Interfaz (UI/UX):** 
        * Aplicación de estilos iniciales para asegurar una presentación limpia y estructurada del proyecto.
    * **Gestión del Carrito y Local Storage:**
        * Implementación de un botón para finalizar la compra, integrado con notificaciones para guiar al usuario.
        * Funcionalidad para vaciar el carrito (eliminar productos del `Local Storage`), incluyendo una alerta de validación previa para evitar borrados accidentales.
    * **Sistema de Búsqueda en Tiempo Real:** 
        * Creación de una barra y botón de búsqueda interactivos.
        * Desarrollo de un algoritmo de filtrado que re-renderiza los productos en pantalla de forma instantánea al presionar cada tecla.
    * **Feedback Visual con SweetAlert:** 
       * Integración de la librería SweetAlert para mejorar la experiencia del usuario, reemplazando las alertas nativas del navegador al agregar productos al carrito y al confirmar acciones importantes.
 
*   **[kevinrosales-kevs](https://github.com/kevinrosales-kevs)**
    * **Navegación y UI Moderna:**
        * **Header Reestructurado:** Diseñé una barra de navegación con jerarquía clara: Título destacado, carrito integrado en el área principal y buscador centrado de fácil acceso.
        * **Diseño Limpio:** Aplicación de estilos modernos mediante variables CSS, efectos de Glassmorphism y sombras sutiles.
    * **Gestión Dinámica del Carrito:**
        * **Controles de Cantidad:** Implementación de lógica para sumar (+) y restar (-) unidades y eliminar productos mediante icono de basura.
        * **Persistencia y Cálculo:** Uso de `localStorage` para mantener la sesión y cálculo de totales/subtotales en tiempo real.
    * **Experiencia de Usuario (UX):**
        * **Modales con `<dialog>`:** Optimización de rendimiento mediante el uso de la API nativa de HTML5 para detalles de productos y carrito.
