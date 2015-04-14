using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Egis.GenGenLib.Models.PowerAmc
{
    public class DbCustomObject : DbObject
    {
        public DbCustomObject()
        {
            this.Id = "DbCustomObject_" + Guid.NewGuid().ToString("N");
        }
    }
}
