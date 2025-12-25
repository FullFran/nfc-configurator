# Guía de Manufactura y Operación de Negocio (NFC)

Este documento detalla el proceso físico y digital para crear, imprimir y entregar los dispositivos NFC (tags/stickers) a los clientes finales.

## 1. Definiciones de Identificadores (Core)

Para cada tag físico, existen dos códigos fundamentales que deben estar sincronizados:

| Código | Nombre | Visibilidad | Función |
| :--- | :--- | :--- | :--- |
| **`public_id`** | ID de Rastreo | Púbico (En el QR) | Se usa en la URL de redirección: `blakia.com/t/[public_id]`. |
| **`claim_code`** | Código de Activación | Privado (Impreso en el tag) | Secreto de 12 caracteres que el cliente debe ingresar para "adueñarse" del tag en el dashboard. |

---

## 2. Flujo de Preparación de Lote

### Paso 1: Generación Digital (Base de Datos)
Antes de imprimir, se deben generar los pares `public_id` y `claim_code` en la base de datos con el estado `NO_CLAIMED`.
- **Herramienta**: Usar el script de seeding `npm run seed`.
- **Seguridad**: Asegúrate de que el `claim_code` sea aleatorio y difícil de adivinar (nanoid de 12 chars).

### Paso 2: Diseño de Impresión (El Sticker)
Cada sticker físico debe contener:
1.  **Código QR**: Apuntando a la URL de resolución: `https://tu-dominio.com/t/[public_id]`.
2.  **ID visible**: El `public_id` impreso en pequeño para referencia técnica.
3.  **Instrucciones de activación**: "Escanea para configurar tu tag".
4.  **Código de Activación**: El `claim_code` impreso (por ejemplo, debajo de una zona de rascado o en la parte posterior).

### Paso 3: Codificación del Chip NFC
El chip NFC debe ser programado (escrito) con la misma URL que el código QR:
- **URL NDEF**: `https://tu-dominio.com/t/[public_id]`
- **Cierre de escritura**: Es recomendable bloquear el chip (Record Lock) para que el cliente no pueda sobreescribir la URL raíz, forzándolos a usar tu plataforma de gestión.

---

## 3. Experiencia del Cliente (Onboarding)

### Escenario A: Tag Nuevo (No Activado)
1.  El cliente recibe el producto y escanea el QR o acerca el teléfono al NFC.
2.  El **Edge Resolver** detecta que el estado es `NO_CLAIMED`.
3.  Redirige al cliente a: `tu-dominio.com/activar?id=[public_id]`.
4.  El cliente crea una cuenta (o inicia sesión).
5.  El cliente introduce el **`claim_code`** impreso en el físico.
6.  **Éxito**: El tag ahora aparece en su dashboard.

### Escenario B: Tag Ya Activado
1.  Cualquier persona escanea el tag.
2.  El Resolver verifica que el estado es `ACTIVE`.
3.  Registra la analítica (país, dispositivo) en segundo plano.
4.  Redirige instantáneamente (302) a la `destination_url` configurada por el dueño.

---

## 4. Tips para el Negocio

- **Venta física**: Puedes vender los tags en packs pre-generados. El negocio no necesita saber quién es el cliente en el momento de la venta; el vínculo ocurre digitalmente en el "Claim".
- **Reutilización**: Si un cliente deja de pagar o el tag es robado, el administrador puede cambiar el status a `DISABLED` en la DB, y el tag dejará de funcionar redirigiendo a una página de error.
- **Seguridad**: Nunca imprimas el `claim_code` en el código QR. El QR debe ser público, el `claim_code` debe requerir tener el objeto físico en la mano.
