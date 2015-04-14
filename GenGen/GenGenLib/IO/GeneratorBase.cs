using Egis.GenGenLib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.IO
{
    public abstract class GeneratorBase 
    {
        

        public abstract string DisplayName
        {
            get;
        }

        public abstract void Generate(Revision sourceRevision, Revision targetRevision);
    }
}
