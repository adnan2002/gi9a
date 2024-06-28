from flask import Flask, jsonify, send_file
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/api/story.pdf')
def download_pdf():
    # Assuming 'story.pdf' is in the same directory as server.py
    pdf_path = 'story.pdf'
    return send_file(pdf_path, as_attachment=True)


if __name__ == '__main__':
    app.run(port=5000, debug=True)