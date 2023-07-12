from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError


# engine = create_engine("mysql+mysqlconnector://root:root@localhost:3306/NetCityCabs")
# engine=create_engine('mssql+pyodbc://VinayakS/NetCityCabs')
# engine = create_engine(f'mssql+pyodbc://VinayakS@localhost:1433/NetCityCabs?driver=ODBC+Driver+17+for+SQL+Server"')
# engine = create_engine(f'mssql+pymssql://{settings.DB_UID}:{settings.DB_PWD}@{settings.DB_SERVER}:{settings.DB_PORT}/{settings.DB_NAME}')

import urllib
params = urllib.parse.quote_plus("DRIVER={ODBC+Driver+17+for+SQL+Server};"
                                 "SERVER=VinayakS;"
                                 "DATABASE=NetCityCabs;"
                                 "Trusted_Connection=yes"
                                 )

engine =create_engine("mssql+pyodbc:///?odbc_connect={}".format(params),pool_size=50, max_overflow=5)

try:
   engine.connect()
except SQLAlchemyError as err:
   print("error", err.__cause__)  # this will give what kind of error


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_sess():    #Session for non FastAPI functions
    try:
        Session = sessionmaker(bind=engine)
        session = Session()
        return session
    finally:
        session.close()