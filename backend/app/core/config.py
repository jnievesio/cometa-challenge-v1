import json
from pathlib import Path
from pydantic import BaseSettings

def load_config():
    config_path = Path(__file__).parent.parent.parent.parent / 'config.json'
    with open(config_path) as f:
        return json.load(f)

config = load_config()
env_config = config['development']

class Settings(BaseSettings):
    API_PORT: int = env_config['backend']['port']
    API_HOST: str = env_config['backend']['host']
    ENVIRONMENT: str = "development"
    FRONTEND_URL: str = env_config['frontend']['url']

    class Config:
        env_file = ".env"

settings = Settings()