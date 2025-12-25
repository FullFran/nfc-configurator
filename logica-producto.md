### Bloque 3: Estrategia de Producto (Lógica del Resolver)

Este es el flujo lógico que debe implementar el desarrollador de Backend para el endpoint de resolución:

1. **Recibir `public_id**`.
2. **Buscar en DB**. Si no existe -> Redirigir a `404 Landing`.
3. **Check Status**:
* Si `status == NO_CLAIMED`: Redirigir a `/activar?id={public_id}` (**Growth Loop**).
* Si `status == DISABLED`: Redirigir a `/error/disabled`.
* Si `status == ACTIVE`: Obtener `destination_url`.


4. **Disparar Evento**: Enviar metadatos (país, device) a una cola asíncrona para la tabla `redirect_events`.
5. **Responder con `302 Found**` hacia la URL destino.
