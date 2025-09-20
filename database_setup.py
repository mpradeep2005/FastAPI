from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url="postgresql://postgres:2005@localhost:7070/my_db"
engine=create_engine(db_url)
session_local=sessionmaker(autocommit=False, autoflush=False, bind=engine)