# ISC — Sitio corporativo integral | Noviembre 2026

**Ingeniería y Servicios Camarillo S.A.S. de C.V.**

Versión estática y multipágina que integra la información e imágenes del archivo **ISC - Perfil corporativo.pdf** (33 páginas), además del material fotográfico proporcionado previamente.

## Cómo abrirlo

1. Extrae todo el ZIP en una carpeta.
2. Abre `index.html` en tu navegador. Mantén intacta la estructura de carpetas.
3. Opcional (recomendado para probar todas las rutas con un servidor local): en esta carpeta ejecuta `python -m http.server 8000` y abre `http://localhost:8000`.

No requiere npm, compilador ni instalación de dependencias para funcionar. Las fuentes tipográficas externas requieren conexión a Internet; hay alternativas tipográficas locales definidas en CSS.

## Contenido

- **Inicio**: portada, cifras del perfil, acordeón de especialidades, trabajos destacados y carrusel infinito de clientes con logotipos.
- **Empresa**: historia, misión, visión, cinco valores y carrusel de clientes.
- **Servicios**: seis capacidades industriales tal como aparecen en el perfil nuevo, además de páginas de especialidad con alcances y fotografías.
- **Clientes**: directorio organizado por Calzado, Alimentos y agroindustria, Industria y logística e Instituciones.
- **Proyectos**: 5 fichas principales por cliente con sus intervenciones documentadas (Holcim, Novohielo, Roji, Montosa y Vazza), además de fichas técnicas por trabajo.
- **Galería completa**: 66 fotografías visibles del perfil, agrupadas en 18 series con filtros, tarjetas fotográficas uniformes y visor modal. Las 4 fotos correspondientes a CFE/IMSS no están publicadas en la galería. Las páginas de las seis especialidades también conservan las 35 fotos adicionales de los ZIP anteriores.
- **Contacto**: información institucional, teléfono, WhatsApp y formulario que prepara un correo o mensaje.

**Páginas:** 30 archivos `index.html` + `404.html`.

## Logotipos

Se extrajeron 15 logotipos transparentes de la página 4 del perfil entregado. **Constructora Roji** aparece en el documento únicamente como nombre: se representa tipográficamente en vez de utilizar un logo de otra compañía.

Los logotipos están en `assets/clientes/`. Verifica autorizaciones de uso para la publicación pública final.

## Galería y proyectos

- Las 72 fotografías fuente del perfil permanecen en `assets/perfil/` y el inventario en `perfil_imagenes.json`.
- Los recursos preexistentes están en `assets/proyectos/` y `assets/fotografias/`.
- No se ha adjudicado una foto de especialidad a un cliente si el documento no lo respalda.
- La ficha técnica y los textos evitan inventar fechas, cantidades, certificaciones o alcances no documentados.
- Las especificaciones de materiales T304, T306, T316 y T316L se muestran como aparecen en el perfil; confirmar la nomenclatura técnica antes de la publicación comercial definitiva.

## Funcionalidad / puesta en producción

- Menú responsive, progreso de lectura, acordeón de servicios, carrusel de clientes, filtros de proyectos, galería por series, visor accesible por teclado, transiciones compatibles con `prefers-reduced-motion`.
- **Formulario:** aún no existe integración de backend. Prepara una solicitud en el cliente de correo o WhatsApp; no guarda ni envía datos automáticamente.
- Para publicación definitiva, conviene conectar formularios, dominio, analítica, política de privacidad y pruebas completas en móviles reales.
- Este ZIP **no actualiza por sí mismo** el proyecto anterior en ChatGPT Sites. Debe incorporarse y publicarse desde el editor/proyecto que tenga acceso a Sites.

## Verificación automatizada realizada

- 31 documentos HTML.
- 0 rutas / recursos locales faltantes en las referencias HTML.
- 72 fotografías de perfil extraídas, 15 logos extraídos.
- Sintaxis JavaScript validada con Node.
- El navegador de prueba de esta sesión bloqueó la apertura de URLs locales, por lo que está pendiente la validación visual final en navegador tras la publicación.

## Fuentes

- Perfil corporativo ISC (archivo del usuario, actualizado en noviembre de 2026).
- Archivos ZIP de fotografías por especialidad compartidos por el usuario.
- Currículum empresarial ISC anterior y proyecto web previo.


## Ajuste de portafolio y galería (18 de noviembre de 2026)
- Portafolio principal: cinco clientes (Holcim, Novohielo, Constructora Roji, Montosa y Zapaterías Vazza).
- La portada de cada cliente agrupa las intervenciones documentadas; sus fichas técnicas individuales siguen disponibles.
- CFE, CAFINCO e IMSS figuran solamente en el directorio de clientes y ya no tienen fichas de proyecto ni series fotográficas publicadas.
- Galería: 18 series, 66 fotografías visibles, con portadas de dimensiones consistentes, filtros y visor en la parte superior.
- Todos los cambios se entregan como archivos HTML/CSS/JS estáticos; no modifican automáticamente el proyecto de Sites en ChatGPT.


## Ajuste editorial de Inicio y Servicios (18 noviembre 2026)
- Inicio incorpora un bloque de presentación de la empresa y un explorador interactivo de sectores con cuatro proyectos reales (Holcim, Novohielo, Constructora Roji, Vazza).
- Explorar sectores: pestañas con selección, navegación mediante flechas / Inicio / Fin, lectura por tecnología asistiva y enlaces a proyectos.
- Se reemplazó la cifra de fotografías en Inicio por seis especialidades, un indicador más útil para visitantes.
- Servicios: eliminadas las tres secciones que repetían categorías y se sustituyeron por un catálogo editorial único de las seis capacidades principales, más Soldadura y Climatización.
- No se modificaron fichas, fotografías ni logotipos del portafolio. CFE, CAFINCO e IMSS permanecen exclusivamente en el directorio de clientes.


## Acabado visual de sectores (19 de noviembre de 2026)
- Paneles de Cementero, Alimenticio, Agroindustria y Comercio con fotografías **ilustrativas** de stock web. No representan trabajos documentados de ISC.
- Todas las fotografías ilustrativas se guardan localmente en `assets/stock/` y se comprimieron a WebP. No requieren CDN en GitHub Pages.
- El texto de cada caso y sus enlaces a proyectos **sí** corresponden a trabajos documentados; en esas fichas permanecen sus fotos originales.
- Efectos de entrada y cambios de panel atenuados; respetan `prefers-reduced-motion`.
- Los datos de contacto y formularios no se modificaron. El formulario abre la app de correo / WhatsApp y no envía por backend.
