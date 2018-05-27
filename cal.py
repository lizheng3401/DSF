
def getRe(file):
  total = 0;
  num = 0
  with open(file, "r") as f:
    data = f.readlines()
    for line in data:
      total += float(line)
    print("time: ", total/ len(data))


getRe("D:\\Daily\\DeepSleep\DSF\\test.txt")
