import json
from pathlib import Path
from typing import Optional
from pydantic import BaseSettings

def load_config():
    config_path = Path(__file__).parent.parent.parent.parent / 'config.json'
    try:
        with open(config_path) as f:
            return json.load(f)
    except FileNotFoundError:
        return {
            "development": {
                "frontend": {"url": "http://localhost:5173"},
                "backend": {"host": "http://localhost:8000", "port": 8000}
            }
        }

config = load_config()
env_config = config['development']

class Settings(BaseSettings):
    API_PORT: int = int(env_config['backend']['port'])
    API_HOST: str = env_config['backend']['host']
    ENVIRONMENT: str = "development"
    FRONTEND_URL: str = env_config['frontend']['url']

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()