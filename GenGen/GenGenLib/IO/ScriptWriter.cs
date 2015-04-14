using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.IO
{
    public class ScriptWriter : IDisposable
    {
        private int _identLevel = 0;

        public int IdentLevel
        {
            get { return _identLevel; }
            set { _identLevel = value; }
        }
        private char _identChar = '\t';     
        private String _bracketOpen = "{";
        private String _bracketClose = "}";
        private String _commentPrefix = "// ";
        private FileStream _stream;
        private StreamWriter _writer;
        
        public ScriptWriter(string fileName,string commentPrefix = "// ", bool isUtf8 = true, char indentChar = '\t', String bracketOpen = "{", String bracketClose = "}")
        {
            this._stream = new FileStream(fileName, FileMode.Create);
            if (isUtf8)
            { this._writer = new StreamWriter(this._stream, System.Text.Encoding.UTF8); }
            else { this._writer = new StreamWriter(this._stream); }
            this._identChar = indentChar;
            this._bracketOpen = bracketOpen;
            this._bracketClose = bracketClose;
            this._commentPrefix = commentPrefix;
           
        }

        public ScriptWriter(string fileName,bool withBom)
        {
            this._stream = new FileStream(fileName, FileMode.Create);
            this._writer = new StreamWriter(this._stream, new System.Text.UTF8Encoding(withBom));
        }
        public void WriteLine(string content)
        {
            this._writer.WriteLine(new string(_identChar, _identLevel) + content);
        }

        public void WriteComment(string content)
        {
            this._writer.WriteLine(new string(_identChar, _identLevel) + this._commentPrefix + content);
        }
        public String CurrentTabIndetString
        {
            get
            { return new string(_identChar, _identLevel); }
        }
        public void WriteOpen()
        {
            this._writer.WriteLine(new string(_identChar, _identLevel) + _bracketOpen);
            _identLevel++;
        }
        public void WriteClose()
        {
            
            _identLevel--;
            this._writer.WriteLine(new string(_identChar, _identLevel) + _bracketClose);
        }

        

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private bool _disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (_disposed)
            { return; }

            if (disposing)
            {
                this._writer.Flush();
                this._writer.Dispose();
                this._stream.Dispose();
            }
            _disposed = true;
        }
    }
}
