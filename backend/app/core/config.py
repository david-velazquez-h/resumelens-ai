import os
from dotenv import load_dotenv

# Load variables from the .env file into the environment.
# This must run before we try to read GROQ_API_KEY below.
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError(
        "GROQ_API_KEY is not set. Copy .env.example to .env "
        "and add your key."
    )