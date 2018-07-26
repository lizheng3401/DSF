from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from requests import get


def now(requests):
    url = "http://api.deepsleeping.tech/api/RealTimeData?Phone=18081979297"
    resp = get(url)
    print(resp.json())
    return JsonResponse(resp.json(), safe=False)