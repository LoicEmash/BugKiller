@ECHO OFF
SET BIN_TARGET=%~dp0/../vendor/phpdocumentor/phpdocumentor/bin/phpdoc
C:\xampp\php\php.exe "%BIN_TARGET%" %*
