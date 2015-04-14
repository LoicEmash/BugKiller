using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbColumnNumeric : DbColumn
    {
        public int Precision { get; set; }

        public int Scale { get; set; }
    }
}
