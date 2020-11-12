import sys
from check_emotion import get_emotion

def main(argv):
  result = get_emotion(argv[1])
  print(result)

if __name__=="__main__":
  main(sys.argv)
