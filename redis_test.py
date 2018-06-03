import redis
import os
from multiprocessing import Pool
import requests
from requests.exceptions import ConnectionError
import time


def scrape(url):
  try:
    resp = requests.get(url)
  except ConnectionError:
    print('Error Occured ', url)
  finally:
    print('URL ', url, ' Scraped')

def database(urls):
  pool = redis.ConnectionPool(host=urls[0], port=6379, db=0)
  r = redis.Redis(connection_pool=pool)
  post = {"author": "Mike",
          "text": "My first blog post!",
          "tags": ["mongodb", "python", "pymongo"],
          }
  new_posts = []
  for i in range(1, 900):
    new_posts.append(post)
  r.set("age", new_posts)
  print("第"+str(urls[1])+"次测试", r.get("age")[0])


if __name__ == '__main__':
  # start = time.time()
  t_num = 2
  pool = Pool(t_num)
  urls = []
  num = 200
  start = time.time()
  for i in range(1, num):
    urls.append(("120.79.137.249",i))
  pool.map(database, urls)
  t = time.time() - start
  print("process\t", "request\t", "total_time\t\t\t", "average_time")
  print(t_num,"\t\t", num,"\t\t", t," ", t*t_num/num)
