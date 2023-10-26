'''
NOTE: When deploying to AWS, change app --> application
      When deploying to Vercel, change application --> app

        This is because AWS Elastic Beanstalk looks for a file called application.py
        and Vercel looks for app = Flask(__name__)
'''
import os
import base64
from urllib.parse import urlencode
import requests
from flask import Flask, redirect, request, make_response, session, url_for, jsonify, Response
from flask_session import Session
from flask_cors import CORS
import dotenv
from authlib.integrations.flask_client import OAuth

dotenv.load_dotenv()

app = Flask(__name__)
app.debug = True

app.config['SESSION_TYPE'] = 'filesystem'  # use filesystem as session storage. Other storages can be 'redis', 'memcached', etc.
Session(app)



CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:3000",
                "https://spotify-unwrapped-backend.vercel.app/",
            ]
        }
    },
    supports_credentials=True,
)

# DOTENV Variable Extraction and Assignment
redirect_uri = os.getenv("SPOTIFY_REDIRECT_URI")
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")


@app.route("/", methods=["GET"])
def home():
    return "Spotify Unwrapped API"

@app.route("/test", methods=["GET"])
def test():
    return "Test"


@app.route("/login", methods=["GET"])
def login():
    """
    Redirects the user to the Spotify authorization URL.
    """
    query_parameters = {
        "response_type": "code",
        "client_id": client_id,
        "scope": "user-read-private user-read-email\
                  user-library-read user-top-read user-follow-read\
                  playlist-read-private playlist-read-collaborative",
        "redirect_uri": redirect_uri,
    }
    url = "https://accounts.spotify.com/authorize?" + urlencode(query_parameters)
    return redirect(url)


@app.route("/callback", methods=["GET"])
def callback():
    """
    Handles the callback from Spotify after the user has authorized the app.
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


# <-------------- Google OAuth Routes -------------->

app.secret_key = os.getenv("FLASK_SECRET_KEY")
oauth = OAuth()
oauth.init_app(app)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.secret_key = os.getenv("FLASK_SECRET_KEY")

YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3"


google = oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_SECRET_KEY"),
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri=os.getenv("GOOGLE_REDIRECT_URI"),
    client_kwargs={
        "scope": "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly"
    },
)


@app.route("/googlelogin")
def google_login():
    """
    Redirects the user to the Google OAuth2 login page with the specified scope.

    Returns:
        A redirect to the Google OAuth2 login page.
    """
    redirect_uri2 = url_for("google_callback", _external=True)
    return google.authorize_redirect(redirect_uri2)


@app.route("/googlecallback")
def google_callback():
    token = oauth.google.authorize_access_token()
    session["google_access_token"] = token["access_token"]
    redirect_url = os.getenv("GOOGLE_FRONTEND_URI", "http://localhost:3000/transfer")
    response = make_response(redirect(redirect_url))
    print("success")
    return response


# @app.route("/create-youtube-playlist", methods=["POST"])
# def create_youtube_playlist():
#     token = session.get("google_access_token")
#     if not token:
#         return jsonify({"error": "Token not found"}), 401
#     print( "IN CREATE PLAYLIST", token)

#     data = request.get_json()
#     playlist_name = data["playlist_name"]
#     playlist_description = data["playlist_description"]
#     playlist_songs = data["songs"]

#     print(playlist_name)
#     print(playlist_description)
#     print(playlist_songs)
#     response = Response("Success")
#     response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
#     response.headers.add("Access-Control-Allow-Headers", "Content-Type")
#     response.headers.add("Access-Control-Allow-Methods", "POST")
#     return response


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    print(f"Listening on port {port} ")
    app.run(port=port, host="localhost")
