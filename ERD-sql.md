### Bloque 1: El Modelo de Datos (ERD + SQL v1.2)

Este es el cimiento. Incluye las correcciones de integridad, los estados de activación de NFC y la optimización de índices para alta velocidad.

```sql
-- Extensiones para seguridad y UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tipos Enumerate para consistencia
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
CREATE TYPE asset_type AS ENUM ('NFC', 'QR');
CREATE TYPE asset_status AS ENUM ('NO_CLAIMED', 'ACTIVE', 'DISABLED', 'ARCHIVED');

-- Tabla de Usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Assets (El corazón del sistema)
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id VARCHAR(12) NOT NULL UNIQUE,
    destination_url TEXT,
    type asset_type NOT NULL,
    status asset_status DEFAULT 'NO_CLAIMED',
    alias VARCHAR(100),
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    claim_code_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Constraint: NFC requiere código de reclamo, QR no.
    CONSTRAINT claim_code_required_for_nfc CHECK (
      (type = 'NFC' AND claim_code_hash IS NOT NULL) OR (type = 'QR')
    )
);

-- Índice parcial para resolución ultra-rápida
CREATE UNIQUE INDEX idx_assets_public_id_active ON assets(public_id) WHERE status != 'ARCHIVED';

-- Tabla de Analítica (Diseñada para escritura masiva)
CREATE TABLE redirect_events (
    id BIGSERIAL PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    country_code CHAR(2),
    device_type VARCHAR(50),
    os VARCHAR(50),
    browser VARCHAR(50),
    referrer TEXT
);

-- Tabla de Auditoría (Historial de cambios de URL)
CREATE TABLE asset_history (
    id BIGSERIAL PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    changed_by UUID REFERENCES users(id),
    previous_url TEXT,
    new_url TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
