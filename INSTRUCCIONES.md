# 🎂 ¡Feliz cumpleaños, Anheli Alca Gutierrez!

Primera edición de la página de cumpleaños del **31 de octubre**, lista para alojar en **GitHub Pages**.

## Incluye

- **Inicio:** portada con foto de Anheli, felicitación, contador hasta el próximo 31 de octubre, gatito y flores moradas.
- **Fotos:** carrusel interactivo con las primeras **7 fotografías** públicas, miniaturas, botones para avanzar y vista ampliada.
- **Momentos:** 3 notitas desplegables y dedicatoria amable (sin mensajes románticos).
- **Secreto:** **5 fotos** adicionales y una carta guardadas en `assets/solo-para-ti.dat`, **cifradas**. El visitante necesita la clave acordada para descifrarlas.
- **Música:** melodía instrumental **original** con inspiración pop/K-pop en `assets/melodia-violeta.mp3`, reproducible/pausable mediante el botón «Música». La música se inicia al tocar el botón, porque los navegadores bloquean la reproducción automática.
- Funciona en móvil y escritorio.

## Previsualizar en tu computadora

**Windows:** descomprime el ZIP en una carpeta. Si tienes Python instalado, ejecuta `INICIAR_EN_WINDOWS.bat` y entra a `http://localhost:8000/` (la ventana negra debe mantenerse abierta). Otra opción es abrir esta carpeta en VS Code y usar la extensión Live Server.

Puedes abrir `index.html` directamente para ver Inicio, Fotos y Momentos, pero **la sección secreta necesita HTTPS o un servidor local** porque los navegadores restringen acceso a archivos cifrados desde `file://`.

## Publicar GRATIS en GitHub Pages

1. Abre [github.com](https://github.com) e inicia sesión.
2. Crea un repositorio nuevo, por ejemplo **cumple-anheli**. Para GitHub Pages con plan gratuito, normalmente se usa un repositorio público.
3. En el repositorio elige **Add file → Upload files**, y sube **TODO el contenido extraído del ZIP** (incluidas las carpetas `assets` y `assets/fotos`). El archivo `index.html` debe estar en la raíz del repositorio.
4. Confirma los archivos con **Commit changes**.
5. Ve a **Settings → Pages**. En **Build and deployment**, selecciona **Deploy from a branch**, rama `main`, carpeta `/(root)` y guarda.
6. Espera a que se publique. El enlace suele seguir el formato `https://TU_USUARIO.github.io/cumple-anheli/`.
7. Abre el enlace en tu celular y verifica las fotos, la música y el secreto antes de enviarlo.

**No hay un enlace público hasta que lo subas y GitHub Pages confirme su publicación.**

## Sobre las fotos secretas — lee esto

- Las imágenes secretas **NO están sueltas** en la carpeta pública ni incrustadas en el HTML/JS como imágenes visibles: forman parte de un **archivo cifrado con AES-256-GCM** y una clave derivada por PBKDF2-SHA256.
- La contraseña **no aparece escrita en los archivos del sitio**, el programa solo pide que la introduzcan.
- **Sin embargo**, el sitio y el archivo cifrado siguen siendo públicos en GitHub Pages. Una contraseña numérica corta **puede adivinarse o probarse por fuerza bruta**. Esto no equivale a privacidad garantizada ni a autenticación de servidor. Por ello, evita incluir fotos realmente sensibles o información confidencial. Para protección fuerte se recomienda servicio con inicio de sesión o un sistema privado.
- Las primeras 7 fotografías son públicas: otras personas con el enlace o acceso al repositorio podrían verlas. Asegúrate de contar con el permiso de las personas fotografiadas antes de publicar.
- La pista en la pantalla secreta dice: **«recuerda el acceso a “Chino” de WhatsApp»**. Puedes modificar el texto dentro de `index.html` si deseas otra pista.

## Cambiar textos, imágenes o música

- Los mensajes visibles están en `index.html`, y las frases del carrusel en `app.js`.
- Para cambiar la foto de portada, reemplaza `assets/fotos/portada-anheli.jpg` por una foto con el mismo nombre.
- Para reemplazar alguna de las primeras 7 fotos, conserva los nombres `recuerdo-01.jpg` ... `recuerdo-07.jpg`.
- La melodía original se puede cambiar por otro archivo de audio para el que tengas permiso de uso, manteniendo el nombre `assets/melodia-violeta.mp3`. No incluimos ninguna canción comercial de K-pop.
- Cambiar las fotos secretas o su contraseña requiere **volver a crear el archivo cifrado**. Puedes pedirme que te genere otra versión a partir del material actualizado. No dejes las fotos sin cifrar en el repositorio.

Diseño y contenido preparados como una **prueba editable** para un regalo digital de cumpleaños. 💜
