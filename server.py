from flask import Flask, redirect, request, jsonify, Response, make_response
from flask_cors import CORS
import requests
import os
import base64
from urllib.parse import urlencode
import dotenv
dotenv.load_dotenv()

app = Flask(__name__)
app.debug = True
CORS(app, resources={r"/*": {"origins": "*"}})

# Spotify Configuration
redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')
client_id = os.getenv('SPOTIFY_CLIENT_ID')
client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')


token_key = ''  # This seems to be a security key for your /token endpoint


@app.route('/', methods=['GET'])
def home():
    return "Home route"


@app.route('/test', methods=['GET'])
def test():
    return "Test successful"

@app.route('/login', methods=['GET'])
def login():
    query_parameters = {
        'response_type': 'code',
        'client_id': client_id,
        'scope': 'user-read-private user-read-email user-library-read user-top-read playlist-read-private playlist-read-collaborative',
        'redirect_uri': redirect_uri
    }
    url = 'https://accounts.spotify.com/authorize?' + urlencode(query_parameters)
    return redirect(url)

@app.route('/callback', methods=['GET'])
def callback():
    # print("Callback route")
    code = request.args.get('code')
    auth_data = {
        'code': code,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    headers = {
        'Authorization': 'Basic ' + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    }
    res = requests.post('https://accounts.spotify.com/api/token', data=auth_data, headers=headers)
    # print(res.json())
    access_token = res.json().get('access_token')
    # print(access_token)
    
    # Redirecting to the frontend app
    redirect_url = os.getenv('FRONTEND_URI', 'http://localhost:3000/main')
    
    # Create a response that redirects user
    response = make_response(redirect(redirect_url))
    
    # Set the access token as a cookie in the response
    # Here, the cookie is set to expire in 3600 seconds (1 hour). Adjust this value based on the token's actual expiration, if needed.
    response.set_cookie('spotify_access_token', access_token, max_age=3600, secure=True, httponly=False, samesite='Lax')


    return response

@app.route('/get_spotify_playlists', methods=['GET'])
def get_spotify_playlists():
    access_token = request.args.get('access_token')
    headers = {
        'Authorization': f"Bearer {access_token}"
    }
    response = requests.get('https://api.spotify.com/v1/me/playlists', headers=headers)
    return jsonify(response.json())

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8000))
    print(f"Listening on port {port} ")
    app.run(port=port, host='localhost')
