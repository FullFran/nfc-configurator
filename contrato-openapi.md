### Bloque 2: Contrato de API (OpenAPI 3.1)

Este documento permite que el Frontend y el Backend se desarrollen en paralelo sin fricciones.

```yaml
openapi: 3.1.0
info:
  title: SaaS NFC/QR Platform API
  version: 1.1.0
servers:
  - url: https://api.tu-dominio.com/v1
    description: Management API (Auth required)
  - url: https://r.tu-dominio.com
    description: Public Resolver (No Auth)

paths:
  /t/{public_id}:
    get:
      summary: Resolver Redirección (Público)
      parameters:
        - name: public_id
          in: path
          required: true
          schema: { type: string }
      responses:
        '302':
          description: Redirige según el estado (Destino, Claim Landing o Error)

  /auth/login:
    post:
      summary: Autenticación
      responses:
        '200': { description: Retorna JWT y Refresh Token }

  /me:
    get:
      summary: Bootstrap del usuario
      responses:
        '200': { description: Perfil y límites del plan }

  /assets/claim:
    post:
      summary: Vincular NFC físico
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [claim_code]
              properties:
                claim_code: { type: string }
                public_id: { type: string }
      responses:
        '200': { description: Asset vinculado con éxito }

  /assets/{id}/stats:
    get:
      summary: Métricas para Dashboard
      parameters:
        - name: from
          in: query
          schema: { type: string, format: date }
      responses:
        '200': { description: Timeline y distribución geográfica }

```
