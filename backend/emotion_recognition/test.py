import sys
from check_emotion import get_emotion

result = get_emotion('1601631973679')
print(result)

def main(argv):
  result = get_emotion(argv[1])

if __name__=="__main__":
  main(sys.argv)
