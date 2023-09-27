'''
test
'''

import os
import base64
from urllib.parse import urlencode

import requests
from flask import Flask, redirect, request, make_response
from flask_cors import CORS
import dotenv

dotenv.load_dotenv()

application = Flask(__name__)
application.debug = True
CORS(
    application,
    resources={
        r"/*": {
            "origins": "http://spotifyunwrapped.s3-website-us-east-1.amazonaws.com/"
        }
    },
    supports_credentials=True,
)

# DOTENV Variable Extraction and Assignment
redirect_uri = os.getenv("SPOTIFY_REDIRECT_URI")
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")


@application.route("/", methods=["GET"])
def home():
    """
    Returns a string indicating the Spotify Unwrapped API.
    """
    return "Spotify Unwrapped API"


@application.route("/IDANDSECRET", methods=["GET"])
def test():
    """
    Returns a string containing the client ID, client secret, and redirect URI.
    """
    return (
        "Client Id: "
        + client_id
        + " Client Secret: "
        + client_secret
        + " Redirect URI: "
        + redirect_uri
    )


@application.route("/login", methods=["GET"])
def login():
    """
    Redirects the user to the Spotify authorization URL.
    """
    query_parameters = {
        "response_type": "code",
        "client_id": client_id,
        "scope": "user-read-private user-read-email user-library-read user-top-read user-follow-read playlist-read-private playlist-read-collaborative",
        "redirect_uri": redirect_uri,
    }
    url = "https://accounts.spotify.com/authorize?" + urlencode(query_parameters)
    return redirect(url)


@application.route("/callback", methods=["GET"])
def callback():
    """
    Handles the callback from Spotify after the user has authorized the application.
    """
    code = request.args.get("code")
    auth_data = {
        "code": code,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
    }
    headers = {
        "Authorization": "Basic "
        + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    }
    res = requests.post(
        "https://accounts.spotify.com/api/token",
        data=auth_data,
        headers=headers,
        timeout=10,
    )
    access_token = res.json().get("access_token")
    redirect_url = os.getenv("FRONTEND_URI", "http://localhost:3000/main")
    redirect_url += "?access_token=" + access_token
    response = make_response(redirect(redirect_url))
    return response


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    print(f"Listening on port {port} ")
    application.run(port=port, host="localhost")
