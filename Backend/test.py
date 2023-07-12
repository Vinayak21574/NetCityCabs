# import pyodbc 
# # Some other example server values are
# # server = 'localhost\sqlexpress' # for a named instance
# server = 'localhost,1434' # to specify an alternate port
# # server = 'tcp:myserver.database.windows.net' 
# database = 'NetCityCabs' 
# username = 'Vinayaks' 
# password = 'VinayakS' 
# # ENCRYPT defaults to yes starting in ODBC Driver 18. It's good to always specify ENCRYPT=yes on the client side to avoid MITM attacks.
# cnxn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD='+ password)
# cursor = cnxn.cursor()


import pyodbc 

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=VinayakS;'
                      'Database=NetCityCabs;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
cursor.execute('SELECT * FROM Person')

for i in cursor:
    print(i)


