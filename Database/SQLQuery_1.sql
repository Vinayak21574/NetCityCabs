-- USE MASTER
-- GO
-- xp_readerrorlog 0, 1, N'Server is listening on'
-- GO

-- SELECT @@SERVERNAME


-- USE master;
-- GO

-- ALTER DATABASE NetCityCabs SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
-- GO
-- DROP DATABASE NetCityCabs;
-- GO



-- DECLARE @sql NVARCHAR(max)=''

-- SELECT @sql += ' Drop table ' + QUOTENAME(TABLE_SCHEMA) + '.'+ QUOTENAME(TABLE_NAME) + '; '
-- FROM   INFORMATION_SCHEMA.TABLES
-- WHERE  TABLE_TYPE = 'BASE TABLE'

-- Exec Sp_executesql @sql