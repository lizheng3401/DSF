from wsgiref.simple_server import make_server
import requests
import json

def application(environ, start_response):
    url = "http://api.deepsleeping.tech/api/RealTimeData?Phone=18081979297"
    start_response('200 OK', [('Content-Type', 'application/json')])
    resp = requests.get(url)
    print(resp.json())
    dic = {"a":1}
    return dic

httpd = make_server("127.0.0.1",8002,application)
httpd.serve_forever()
