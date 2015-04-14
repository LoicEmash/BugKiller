using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.IO
{
    [Serializable]
    public class MpdReaderException : Exception
    {
        public MpdReaderException(string message)
            : base(message)
        { }
    }
}
