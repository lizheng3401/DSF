from multiprocessing import Pool
import requests
from requests.exceptions import ConnectionError
import time
import threading

a = []

def scrape(url):
  global a
  try:
    start = time.time()
    resp = requests.get(url)
    t = time.time() - start
  except ConnectionError:
    print('Error Occured ', url)
  finally:
    print(t)


def Login():
  return scrape("http://localhost:9527/api/now/live")

if __name__ == '__main__':
  try:
    i = 0
    tasks = []  # 任务列表
    task_number = 300
    while i < task_number:
      t = threading.Thread(target=Login)
      tasks.append(t)  # 加入线程池，按需使用
      t.start()  # 多线程并发
      i += 1
  except Exception as e:
    print(e)
