# PRD — Plataforma SaaS de Gestión de NFCs y QRs Dinámicos

**Producto:** Plataforma de gestión de URLs dinámicas para activos físicos y digitales.

**Versión:** 1.2 (Producción / MVP)

**Estado:** Aprobado para Desarrollo

**Owner:** Producto / CTO

---

## 1. Resumen Ejecutivo

Plataforma SaaS que permite a usuarios gestionar NFCs físicos y QRs dinámicos mediante URLs estables. El sistema permite configurar en tiempo real el destino de redirección y acceder a métricas de uso, sin necesidad de cambiar el activo físico.

El MVP valida:

1. Utilidad de la redirección dinámica.
2. Valor de la analítica básica.
3. Flujo de activación (Growth Loop) de productos físicos.

---

## 2. Objetivos del Producto

### 2.1 Objetivos Primarios

* **Redirección Dinámica:** Cambiar el destino de un NFC/QR sin reemplazarlo.
* **Gestión Centralizada:** Panel de control para múltiples activos.
* **Analítica:** Proporcionar métricas de uso (clics, países, dispositivos).
* **Escalabilidad Técnica:** Resolución de redirección en <100ms.

### 2.2 Objetivos Secundarios

* Minimizar la fricción en el registro mediante el flujo de "Reclamar NFC".
* Garantizar la reputación del dominio frente a abusos (Phishing).

---

## 3. Alcance (In / Out)

### Incluido en MVP

* Registro/Login (JWT + Refresh Tokens).
* Gestión de Assets (NFC y QR).
* **Mecánica de Claim:** Reclamar NFC físico mediante `claim_code`.
* **Redirección Dinámica:** Motor de resolución (Resolver).
* **Analítica:** Captura asíncrona de eventos y Dashboard básico.
* **Admin:** Bloqueo administrativo de assets por abuso.

### Fuera de Alcance

* Dominios personalizados por usuario.
* Equipos multiusuario.
* Integraciones externas (Webhooks/Zapier).
* Branding White-label.

---

## 4. Conceptos Clave del Dominio

| Término | Definición |
| --- | --- |
| **Asset** | Entidad central (NFC o QR). Tiene un `public_id` permanente. |
| **public_id** | ID corto de 12 caracteres único e inmutable usado en la URL pública. |
| **claim_code** | Código secreto impreso en NFC físicos para vincularlos a un dueño. |
| **Resolver** | Servicio encargado de procesar el escaneo y redirigir al destino. |

---

## 5. Requisitos Funcionales

### Módulo A: Autenticación e Identidad

* **A1. Registro/Login:** Email y contraseña. Soporte para Refresh Tokens.
* **A2. Endpoint /me:** Retorna perfil de usuario y límites actuales del plan.

### Módulo B: Gestión de Assets

* **B1. Reclamar NFC:** El usuario introduce un `claim_code`. El sistema valida que el asset no tenga dueño y lo asigna al usuario actual.
* **B2. Crear QR:** Generación instantánea de asset digital con destino inicial.
* **B3. Configuración:** Cambiar `destination_url`, `alias` y `status`.
* **B4. Estados del Asset:**
* `NO_CLAIMED`: NFC fabricado pero sin dueño. Redirige a Landing de Activación.
* `ACTIVE`: Redirige al destino configurado.
* `DISABLED`: Redirige a página informativa de sistema.
* `ARCHIVED`: Eliminación lógica. El `public_id` queda inoperativo.



### Módulo C: El Resolver (Crítico)

* **C1. Endpoint Público:** `GET r.tudominio.com/t/{public_id}`.
* **C2. Performance:** Resolución prioritaria sobre cualquier otra tarea.
* **C3. Auditoría:** Cada cambio de URL destino debe quedar registrado en el historial del asset.

### Módulo D: Analítica

* **D1. Captura:** Registrar país, dispositivo, navegador y timestamp por cada hit.
* **D2. Asincronía:** La analítica no debe retrasar la redirección del usuario.
* **D3. Dashboard:** Visualización de hits totales y distribución geográfica.

---

## 6. Requisitos No Funcionales

### Seguridad y Privacidad

* **GDPR:** No se almacenan IPs crudas. Se anonimizan los datos de tráfico.
* **Protección de Dominio:** Validación sintáctica de URLs para evitar abusos.
* **IDs No Enumerables:** Los `public_id` deben ser aleatorios, no secuenciales.

### Rendimiento

* Latencia del Resolver < 100ms (p95).
* Soporte para picos de tráfico (concurrencia) mediante caché y escrituras asíncronas de métricas.

---

## 7. Riesgos y Mitigaciones

| Riesgo | Mitigación |
| --- | --- |
| **Abuso de Phishing** | Implementar `status: DISABLED` y monitorización administrativa. |
| **Fallo en Redirección** | El motor de resolución debe ser el servicio más robusto y simple del stack. |
| **Colisión de IDs** | Uso de `public_id` de 12 caracteres alfanuméricos (baja probabilidad). |

---

## 8. Flujo de Usuario: El "Growth Loop"

1. **Escaneo:** El usuario recibe un NFC y lo escanea.
2. **Detección:** El Resolver nota que el asset tiene `status: NO_CLAIMED`.
3. **Conversión:** Redirige a `tudominio.com/activar?id=public_id`.
4. **Onboarding:** El usuario crea cuenta, introduce el `claim_code` y activa su producto.

---

## 9. Roadmap Post-MVP

* Soporte para dominios propios de cliente.
* Gestión de organizaciones y equipos.
* Monetización mediante suscripciones Pro (límites de assets y analítica avanzada).
