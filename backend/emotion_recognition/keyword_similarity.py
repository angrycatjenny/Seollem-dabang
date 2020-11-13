import sys
import pandas as pd

import pymysql
from sqlalchemy import create_engine
from sklearn.metrics.pairwise import cosine_similarity

def cal_sim(user_id):
  db = pymysql.connect(
      host='127.0.0.1',
      port=3306,
      user='root',
      password='ssafy',
      db='b103',
      charset = 'utf8'
  )

  SQL = 'select * from keyword'
  keyword_lst = pd.read_sql(SQL,db)
  keyword_lst = keyword_lst[['word','user_id']]
  SQL2 = 'select * from user'
  user_lst = pd.read_sql(SQL2,db)
  user_lst = user_lst[['id','nickname']]
  # print(keyword_lst)
  # print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  # print(user_lst)
  # print("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
  user_keyword_lst = pd.merge(keyword_lst,user_lst,left_on='user_id',right_on='id')
  user_keyword_lst['check']=1
  # print(user_keyword_lst)
  # print("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
  user_keyword_lst = user_keyword_lst.pivot_table('check',index="user_id",columns='word')
  # print(user_keyword_lst)
  # print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
  user_keyword_lst.fillna(0,inplace=True)
  # print(user_keyword_lst)
  # print("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")


  item_based_collabor = cosine_similarity(user_keyword_lst)
  item_based_collabor = pd.DataFrame(data=item_based_collabor,index=user_keyword_lst.index,columns=user_keyword_lst.index)
  # print(item_based_collabor)

  #추후 수정######
  user_id=user_id
  ################

  all_user=item_based_collabor.drop(user_id,axis=1).loc[user_id]

  simliar_user = all_user.sort_values(ascending=False)[all_user.sort_values(ascending=False).values>0]
  return simliar_user.index

def main(argv):
  result = cal_sim(int(argv[1]))
  print(result)

if __name__=="__main__":
  main(sys.argv)