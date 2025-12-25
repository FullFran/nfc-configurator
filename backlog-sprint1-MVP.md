# 🚀 Sprint 1: MVP - Infraestructura y Flujos Core

## Track 1: Backend (Infraestructura y API)

| ID | Tarea | Descripción Técnica / Criterios de Aceptación |
| --- | --- | --- |
| **BE-01** | **Setup de Base de Datos** | Ejecutar DDL v1.2. Configurar extensiones `uuid-ossp` y `pgcrypto`. Verificar tipos Enum y Constraints de integridad. |
| **BE-02** | **Servicio Resolver (Core)** | Implementar `GET /t/:id`. Lógica: Si `NO_CLAIMED` -> 302 a landing; Si `ACTIVE` -> 302 a `destination_url`; Si `DISABLED` -> 302 a error. |
| **BE-03** | **Sistema de Auth** | Endpoints `/register` y `/login`. Implementar JWT + Refresh Token en Cookie httpOnly. Endpoint `/me` para bootstrap de sesión. |
| **BE-04** | **Lógica de Claiming** | Endpoint `POST /assets/claim`. Debe recibir `claim_code`, verificar el hash en DB, validar que `owner_id` sea NULL y actualizarlo al ID del usuario. |
| **BE-05** | **Ingesta de Analítica** | Crear middleware o worker asíncrono. Capturar `User-Agent` (OS, Browser, Device) y `GeoIP` (País) e insertar en `redirect_events`. |

---

## Track 2: Frontend (Panel de Usuario & UX)

| ID | Tarea | Descripción Técnica / Criterios de Aceptación |
| --- | --- | --- |
| **FE-01** | **Layout & Auth Flow** | Implementar Login/Registro. Gestión de estado global de usuario (Context/Redux). Guardián de rutas protegidas. |
| **FE-02** | **Dashboard de Assets** | Consumir `GET /assets`. Mostrar tabla/cards con: Alias, Tipo (NFC/QR), Status (Badge de color) y contador de visitas (si está disponible). |
| **FE-03** | **Editor de Redirección** | Modal o página de edición. Campos: `alias` y `destination_url` (con validación de formato URL). Botón de Pausar/Activar. |
| **FE-04** | **Landing de Activación** | Vista pública para NFCs no reclamados. Debe extraer el `public_id` de la URL y guiar al usuario a registrarse para "reclamar" su activo. |

---

# 🏭 Bloque 5: Guía de Generación de Assets (Fábrica)

Esta guía define el proceso de pre-producción de los activos físicos antes de enviarlos a imprenta/grabación.

### 1. Algoritmo de Identificadores

* **`public_id` (URL Pública):** * Generar string aleatorio de 12 caracteres.
* Alfabeto: Base62 (`[a-zA-Z0-9]`).
* *Ejemplo:* `xR7y29kLp4Wm`


* **`claim_code` (Código de Activación):** * Generar string de 8-10 caracteres.
* Alfabeto: Alfanumérico legible (evitar `0`, `O`, `1`, `I`).
* *Ejemplo:* `XJ4-92P-K9`



### 2. Proceso de Inserción en DB (Pre-venta)

Por cada unidad física fabricada, insertar un registro en la tabla `assets`:

1. `public_id` = {generado}
2. `type` = 'NFC'
3. `status` = 'NO_CLAIMED'
4. `claim_code_hash` = `hash(claim_code)` (Usar Bcrypt o Argon2).
5. `owner_id` = `NULL`

### 3. Instrucciones para Proveedor/Fabricante

* **Grabación NFC:** Programar el chip con la URL: `https://r.tudominio.com/t/{public_id}`.
* **Impresión Física:** Imprimir el `claim_code` en el reverso del sticker, llavero o tarjeta para que el usuario pueda leerlo al recibirlo.
