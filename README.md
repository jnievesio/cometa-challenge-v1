# cometa-challenge-v1

Estructura monorepo para trabajar el challenge, debido a que solo se trabajará con un solo desarrollador

## 📂 Estructura del Monorepo

```
├── backend/                  # API REST con FastAPI
│   ├── app/                  
│   │   ├── api/              # Endpoints (Routers)
│   │   ├── core/             # Configuraciones y utilidades
│   │   ├── data/             # Datos iniciales y mockups
│   │   ├── models/           # Modelos Pydantic
│   │   └── servicios/        # Lógica de negocio
│   ├── requirements.txt      # Dependencias Python
│   └── .env                  # Variables de entorno

├── frontend/                 # Aplicación React con TypeScript

## 🔧 Variables de Entorno

### Backend (.env)
- `API_PORT=8000` - Puerto para la API
- `API_HOST=0.0.0.0` - Host de despliegue
- `ENVIRONMENT=development` - Entorno de ejecución
- `FRONTEND_URL=http://localhost:5173` - URL del frontend

### Frontend (.env)
- `VITE_API_PORT=http://localhost:8000/api` - URL base de la API

### Configuración Global (config.json)
Archivo que maneja diferentes entornos:
```json
{
  "development": {
    "frontend": {
      "url": "http://localhost:5173",
      "api_url": "http://localhost:8000/api"
    },
    "backend": {
      "host": "http://localhost:8000",
      "port": 8000
    }
  },
  "production": {
    "frontend": {
      "url": "https://your-production-url.com",
      "api_url": "https://api.your-production-url.com/api"
    }
  }
}
```
Actualizar los valores según el entorno de despliegue.
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/            # Vistas/páginas
│   │   ├── services/         # Clientes API
│   │   ├── contexts/         # Estado global (React Context)
│   │   └── styles/           # Tailwind CSS y temas
│   ├── package.json          
│   └── tsconfig.json         
├── .gitignore                
└── README.md                
```

## 🚀 Tecnologías Principales

**Backend**
- FastAPI (Python 3.10+)
- Uvicorn
- Pydantic (Validación de datos)
- Python-dotenv (Gestión de variables de entorno)

**Frontend**
- React 18 (TypeScript)
- Vite
- Axios (HTTP Client)

## 🔧 Instalación y Uso

1. **Requisitos previos**
   - Node.js 18.x
   - Python 3.10+
   - PIP

2. **Backend**
```bash
cd backend/
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

3. **Frontend**
```bash
cd frontend/
npm install
npm run dev
```

4. **Ejecución conjunta** (usando Concurrently):
```bash
npm install -g concurrently

npm run start
```
## 🏛️ Arquitectura y Patrones

### Backend (FastAPI)
- **Arquitectura por capas**:
  - Routes: Endpoints API (FastAPI routers)
  - Services: Lógica de negocio
  - Models: Entidades Pydantic
  - Data: Acceso a datos (mock inicial)

### Frontend (React)
- **Component-based architecture**
  - Container/Presentational pattern
  - Estado global con React Context
  - Separación clara entre:
    - Components (UI)
    - Pages (Vistas)
    - Services (Llamadas API)

### Patrones de diseño
- Inyección de dependencias en servicios
- Singleton para configuración
- Observer pattern en actualizaciones de estado

## 🌟 Características Clave

- **Sistema de órdenes**
  - Creación y gestión de pedidos
  - Agregar/Eliminar ordenes
  - Marcado de pedidos como pagados

- **Gestión de stock**
  - Validación en tiempo real
  - Prevención de pedidos sin stock

- **Frontend**
  - UI responsiva
  - Manejo de estado global
  - Formularios validados

## 🛠 Mejoras Propuestas

1. **Infraestructura**
   - [ ] Dockerizar la aplicación

2. **Testing**
   - [ ] Añadir pruebas E2E con Cypress
   - [ ] Implementar contract testing

3. **Documentación**
   - [ ] Generar API Docs con Swagger UI

4. **Funcionalidades**
   - [ ] Mostrar listado de inventario
   - [ ] Modificar el inventario
   - [ ] Liberar stock al eliminar orden con estado Pendiente de pago

## Contribución

1. Clona el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Add some feature'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request