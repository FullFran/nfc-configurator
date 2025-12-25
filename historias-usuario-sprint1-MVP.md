### 📋 Historias de Usuario - Sprint 1

#### 1. Sistema de Redirección (El Resolver)

**Historia:** Como usuario final, quiero que al escanear un código se me dirija al destino correcto de forma rápida para tener una experiencia fluida.

* **AC 1:** Si el asset tiene estado `ACTIVE`, el sistema debe realizar un redireccionamiento HTTP 302 a la `destination_url` en menos de 100ms.
* **AC 2:** Si el asset tiene estado `NO_CLAIMED`, debe redirigir a la landing page de activación incluyendo el `public_id` en la URL.
* **AC 3:** Si el asset tiene estado `DISABLED`, debe mostrar una página de error del sistema indicando que el enlace no está disponible.
* **AC 4:** Cada redirección exitosa debe registrar de forma asíncrona un evento en la tabla `redirect_events` (País, dispositivo, navegador).

#### 2. Flujo de Reclamación (Claiming)

**Historia:** Como cliente que compró un NFC físico, quiero poder vincularlo a mi cuenta fácilmente para empezar a gestionar mi contenido.

* **AC 1:** El sistema debe permitir el acceso al endpoint `/assets/claim` solo a usuarios autenticados.
* **AC 2:** Al introducir un `claim_code` válido que coincida con el hash en la DB y cuyo `owner_id` sea NULL, el asset debe asignarse al usuario actual.
* **AC 3:** Tras un reclamo exitoso, el estado del asset debe cambiar de `NO_CLAIMED` a `ACTIVE`.
* **AC 4:** Si el código es incorrecto o el asset ya tiene dueño, el sistema debe devolver un error `404` o `409` respectivamente con un mensaje claro.

#### 3. Gestión de Assets (Dashboard)

**Historia:** Como usuario registrado, quiero ver y editar mis activos digitales para mantener mi información actualizada.

* **AC 1:** El usuario solo puede ver y editar assets donde el `owner_id` coincida con su ID de usuario.
* **AC 2:** Al actualizar la `destination_url`, el sistema debe validar que sea un formato URL válido (https) antes de persistir el cambio.
* **AC 3:** Cada vez que se cambie la URL de destino, se debe crear automáticamente una entrada en `asset_history` con los valores anterior y nuevo.
* **AC 4:** El usuario debe poder cambiar el estado a `DISABLED` para pausar la redirección temporalmente.

#### 4. Autenticación y Sesión

**Historia:** Como usuario de la plataforma, quiero que mi sesión sea segura pero cómoda para no tener que loguearme constantemente.

* **AC 1:** El registro debe validar que el email sea único y la contraseña cumpla con una política de seguridad mínima (8+ caracteres).
* **AC 2:** El sistema debe emitir un *Access Token* (JWT) de corta duración y un *Refresh Token* almacenado en una Cookie `httpOnly` y `Secure`.
* **AC 3:** El endpoint `/me` debe retornar los datos del usuario y sus límites de plan solo si el token es válido.
* **AC 4:** El cierre de sesión (`/logout`) debe invalidar el *Refresh Token* en el servidor.

---

### 🧪 Plan de Pruebas (QA Checklist)

| Caso de Test | Resultado Esperado |
| --- | --- |
| **Test de Estrés Resolver** | Simular 100 peticiones concurrentes; el p95 de respuesta debe ser < 100ms. |
| **Integridad de Claim** | Intentar reclamar un asset ya reclamado; debe fallar con error 409. |
| **Privacidad de Assets** | Intentar acceder por API al asset de otro usuario; debe devolver 403 Forbidden. |
| **Validación Anti-Phishing** | Intentar guardar `javascript:alert(1)` como destino; el sistema debe rechazarlo. |
| **Persistencia de Analítica** | Realizar 5 escaneos desde diferentes dispositivos; verificar 5 entradas nuevas en `redirect_events`. |
