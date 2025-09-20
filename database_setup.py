from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url="postgresql://postgres:2005@localhost:7070/pradeep"
engine=create_engine(db_url)
session=sessionmaker(bind=engine)