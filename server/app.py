from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from utils import File

app = Flask(__name__)
CORS(app)
File.create_directory(app)


@app.route("/", methods=["GET"])
def home():
    return make_response("Hello from Project server", 200)


@app.route("/", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return make_response(jsonify({"error": "No file part"}), 400)

    file = request.files["file"]

    if File.save_file(app, file):
        return make_response(jsonify({"message": "File successfully uploaded"}), 200)

    return make_response(jsonify({"error": "Invalid file or error saving file"}), 400)


if __name__ == "__main__":
    app.run()
