from wsgiref.simple_server import make_server

from analytics_app import application


HOST = "127.0.0.1"
PORT = 8001


if __name__ == "__main__":
    print("Serving analytics app on http://{0}:{1}".format(HOST, PORT))
    make_server(HOST, PORT, application).serve_forever()
