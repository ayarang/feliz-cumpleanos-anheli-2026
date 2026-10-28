# Estructura de la web de cumpleaños de Anheli

Esta página se publica como sitio estático mediante **GitHub Pages**. No necesita instalación ni un proceso de compilación; usa **módulos nativos de JavaScript**.

## Archivos principales

- `index.html` — estructura de la página (portada, fotografías, cartas, velitas y rincón secreto).
- `app.js` — punto de entrada que conecta los módulos JavaScript.
- `styles.css` — estilos generales y componentes base.
- `assets/css/experience.css` — ajustes visuales acumulados: regalo, cartas, velitas, gatitos, reproductor y móvil.
- `assets/css/moon.css` — luna creciente, estrellas y atardecer violeta de la portada.

## Módulos JavaScript

| Archivo | Responsabilidad |
|---|---|
| `assets/js/core.js` | Utilidad para acceder a elementos del DOM |
| `assets/js/photos.js` | Siete fotos **públicas** y sus textos |
| `assets/js/gallery.js` | Carrusel, miniaturas y ampliación |
| `assets/js/presentation.js` | Regalo de bienvenida, gatito y navegación |
| `assets/js/music.js` | Reproductor oficial de IGLOO |
| `assets/js/effects.js` | Confeti y flores |
| `assets/js/celebration.js` | Velitas y sorpresa final |
| `assets/js/secret.js` | Lectura y descifrado del contenido protegido |

## Personalización rápida

1. Para cambiar **textos de la galería pública**, editar `assets/js/photos.js`.
2. Para cambiar **luna, estrellas y tonos del atardecer**, editar `assets/css/moon.css`.
3. Para ajustar **gatito o entrada de regalo**, editar `assets/js/presentation.js` y `assets/css/experience.css`.
4. Para cambiar la **interfaz de la portada**, editar el bloque `#inicio` de `index.html`.
5. Para ajustar **velitas o sorpresa final**, editar `assets/js/celebration.js`.
6. Para actualizar los estilos base, modificar `styles.css`.

## Seguridad y publicación

Las siete imágenes de `assets/fotos/recuerdo-*.jpg` y la portada son **públicas**. El contenido de la sección secreta está guardado en archivos cifrados (`assets/solo-para-ti.dat` y `assets/notas-secretas.enc`), y no se añade en claro a los módulos. **No publiques las fotos privadas descifradas en GitHub Pages**.

La contraseña numérica elegida es corta y no constituye una protección fuerte ante ataques de diccionario o fuerza bruta. Si las fotos son realmente confidenciales, conviene trasladarlas a un sistema privado con autenticación.

## Pruebas después de modificar

- Abrir el enlace de GitHub Pages y tocar «Abrir mi regalo».
- Revisar la luna en escritorio y celular, junto al gatito y la foto.
- Moverse por las siete fotos del carrusel.
- Abrir y cerrar una carta.
- Soplar las velitas y reiniciarlas.
- Verificar el reproductor IGLOO (el navegador puede pedir pulsar ▶).
- Probar el rincón secreto **sin publicar ni enviar la clave a terceros**.

> Si el navegador muestra una versión antigua, espera a que GitHub Pages actualice y fuerza una recarga (Ctrl + Shift + R en computadora).
