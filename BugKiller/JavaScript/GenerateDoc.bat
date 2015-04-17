XCopy "apps\app" "ext-doc-1.0.131\sample\ext\source"
cd "ext-doc-1.0.131\sample"
ext-doc.bat
cd ".."
cd ".."
XCopy "ext-doc-1.0.131\output" "doc"  /t