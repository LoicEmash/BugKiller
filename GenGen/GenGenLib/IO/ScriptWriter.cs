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
        private string _identChar = "\t";     
        private String _bracketOpen = "{";
        private String _bracketClose = "}";
        private String _commentPrefix = "// ";
        private FileStream _stream;
        private StreamWriter _writer;

        public ScriptWriter(string fileName, string commentPrefix = "// ", bool isUtf8 = true, string indentChar = "\t", String bracketOpen = "{", String bracketClose = "}")
        {
            this._stream = new FileStream(fileName, FileMode.Create);
            if (isUtf8)
            { this._writer = new StreamWriter(this._stream, new System.Text.UTF8Encoding(false)); }
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
            this._writer.WriteLine(Indent() + content);
        }

        public void WriteComment(string content)
        {
            this._writer.WriteLine(Indent() + this._commentPrefix + content);
        }
        public String CurrentTabIndetString
        {
            get
            { return Indent( ); }
        }
        public void WriteOpen()
        {
            this._writer.WriteLine(Indent( )+ _bracketOpen);
            _identLevel++;
        }

        public string Indent()
        {
            StringBuilder sb = new StringBuilder();
            for (uint i = 0; i < this._identLevel; i++)
            { sb.Append(_identChar); }

            return sb.ToString();
        }  



        public void WriteClose()
        {
            
            _identLevel--;
            this._writer.WriteLine(Indent ()+ _bracketClose);
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
