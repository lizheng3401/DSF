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
  from pymongo import MongoClient
  client = MongoClient(urls)
  db = client.test
  post = {"author": "Mike",
          "text": "My first blog post!",
          "tags": ["mongodb", "python", "pymongo"],
          }
  new_posts = []
  for i in range(1, 10000):
    new_posts.append(post)
  posts = db.posts
  post_id = posts.insert_one({"newposts": new_posts}).inserted_id
  print("post id is ", post_id)

if __name__ == '__main__':
  start = time.time()
  t_num = 8
  pool = Pool(t_num)
  urls = []
  num = 100
  for i in range(1, num):
    urls.append("mongodb://120.79.137.249:27017/")
  pool.map(database, urls)
  t = time.time() - start

  print(t_num, num, t, t*t_num/num)
